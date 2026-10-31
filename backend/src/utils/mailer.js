const nodemailer = require('nodemailer');
const User = require('../models/User');
const { escapeHtml } = require('./http');

const APPLICATION_ROLES = ['super_admin', 'admin', 'hr', 'recruiter', 'department_manager'];
const ENQUIRY_ROLES = ['super_admin', 'admin', 'sales', 'department_manager'];
const TALENT_ROLES = ['hr', 'recruiter'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const uniqueEmails = (list) => {
    const seen = new Set();
    const out = [];
    (list || []).forEach((raw) => {
        const email = String(raw || '').trim().toLowerCase();
        if (!EMAIL_RE.test(email) || seen.has(email)) return;
        seen.add(email);
        out.push(email);
    });
    return out;
};

const listFromEnv = (name, fallback) => {
    const raw = process.env[name];
    const source = raw === undefined || raw === null ? fallback : raw;
    return String(source).split(',');
};

const createTransporter = () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
    const auth = { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS };
    if (process.env.SMTP_HOST) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === '1',
            auth,
        });
    }
    return nodemailer.createTransport({ service: 'gmail', auth });
};

const fromAddress = () => `"KAM Global AI" <${process.env.EMAIL_USER}>`;

const layout = (title, body) => `<!DOCTYPE html><html><head><style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0c213d; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-row { margin: 12px 0; padding: 10px; background: white; border-left: 4px solid #f7941d; }
    .label { font-weight: bold; color: #0c213d; }
</style></head><body><div class="container">
    <div class="header"><h1>${escapeHtml(title)}</h1></div>
    <div class="content">${body}</div>
</div></body></html>`;

const row = (label, value) => (
    value ? `<div class="info-row"><span class="label">${escapeHtml(label)}:</span> ${escapeHtml(value)}</div>` : ''
);

const staffEmails = async (roles) => {
    try {
        const users = await User.find({ active: true, role: { $in: roles } }).select('email').lean();
        return users.map((user) => user.email);
    } catch (err) {
        console.error(`Could not load staff emails: ${err.message}`);
        return [];
    }
};

let mailboxWarningShown = false;

const sendEach = async (addresses, message) => {
    const transporter = createTransporter();
    if (!transporter) {
        if (!mailboxWarningShown) {
            console.warn('Email skipped: set EMAIL_USER and EMAIL_PASS to send mail');
            mailboxWarningShown = true;
        }
        return;
    }
    const recipients = uniqueEmails(addresses);
    await Promise.all(recipients.map(async (to) => {
        try {
            await transporter.sendMail({ ...message, from: fromAddress(), to });
        } catch (err) {
            console.error(`Email to ${to} failed: ${err.message}`);
        }
    }));
};

const confirmToSender = (to, subject, title, paragraphs) => sendEach([to], {
    subject,
    html: layout(title, paragraphs.map((text) => `<p>${text}</p>`).join('')),
});

const notifyApplication = async ({ application, resumeFile, brand }) => {
    const a = application;
    const name = [a.firstName, a.middleName, a.lastName].filter(Boolean).join(' ');
    const when = a.appliedAt ? new Date(a.appliedAt).toLocaleString() : '';
    const dob = a.dateOfBirth ? new Date(a.dateOfBirth).toLocaleDateString('en-GB') : '';
    const internal = [
        ...(await staffEmails(APPLICATION_ROLES)),
        ...listFromEnv('HR_NOTIFY_EMAILS', 'hr@kamglobalai.com,info@kamglobalai.com'),
    ];
    const attachment = resumeFile?.path
        ? [{ filename: resumeFile.originalname || 'resume', path: resumeFile.path }]
        : [];

    await sendEach(internal, {
        subject: `New application: ${a.position}`.slice(0, 150),
        html: layout('New job application', `
            ${row('Application ID', a.applicationRef)}
            ${row('Applicant', name)}
            ${row('Email', a.email)}
            ${row('Phone', `${a.countryCode || ''} ${a.phone || ''}`.trim())}
            ${row('Date of birth', dob)}
            ${row('Location', a.location)}
            ${row('Position', a.position)}
            ${row('Qualification', a.qualification)}
            ${row('Field of study', a.fieldOfStudy)}
            ${row('Experience', a.experience)}
            ${row('Candidate type', a.candidateType)}
            ${row('Current company', a.currentCompany)}
            ${row('Expected pay', a.expectedCtc)}
            ${row('Notice period', a.noticePeriod)}
            ${row('LinkedIn', a.linkedinUrl)}
            ${row('GitHub', a.githubUrl)}
            ${row('Portfolio', a.portfolioUrl)}
            ${a.message ? `<div class="info-row"><span class="label">Message:</span><p style="white-space:pre-wrap">${escapeHtml(a.message)}</p></div>` : ''}
            ${row('Applied on', when)}
            <p>This application is in the admin dashboard under Applications.</p>
        `),
        attachments: attachment,
    });

    await confirmToSender(
        a.email,
        `Application received - ${brand}`,
        'Application received',
        [
            `Dear ${escapeHtml(a.firstName)},`,
            `Thank you for applying for <strong>${escapeHtml(a.position)}</strong>.`,
            `Your application ID is <strong>${escapeHtml(a.applicationRef)}</strong>. Please keep it for future correspondence.`,
            'We have received your application. The recruitment team will review it and contact you if your profile matches the role.',
            `Best regards,<br/><strong>${escapeHtml(brand)} Recruitment Team</strong>`,
        ]
    );
};

const detailEntries = (details) => {
    if (!details) return [];
    if (details instanceof Map || typeof details.entries === 'function') return [...details.entries()];
    if (typeof details === 'object') return Object.entries(details);
    return [];
};

const notifyEnquiry = async (contact) => {
    const roles = contact.enquiryType === 'Request Talent'
        ? [...ENQUIRY_ROLES, ...TALENT_ROLES]
        : ENQUIRY_ROLES;
    const internal = [
        ...(await staffEmails(roles)),
        ...listFromEnv('ENQUIRY_NOTIFY_EMAILS', 'info@kamglobalai.com'),
    ];
    const extras = detailEntries(contact.details)
        .map(([key, value]) => row(key, value))
        .join('');

    await sendEach(internal, {
        subject: `New enquiry: ${contact.enquiryType || contact.subject || 'Website'}`.slice(0, 150),
        html: layout('New website enquiry', `
            ${row('Reference', contact.reference)}
            ${row('Type', contact.enquiryType)}
            ${row('Name', contact.name)}
            ${row('Email', contact.email)}
            ${row('Phone', contact.phone)}
            ${row('Company', contact.company)}
            ${row('Country', contact.country)}
            ${row('Subject', contact.subject)}
            ${contact.message ? `<div class="info-row"><span class="label">Message:</span><p style="white-space:pre-wrap">${escapeHtml(contact.message)}</p></div>` : ''}
            ${extras}
            <p>This enquiry is in the admin dashboard under Enquiries.</p>
        `),
    });

    const firstName = String(contact.name || '').trim().split(/\s+/)[0] || 'there';
    await confirmToSender(
        contact.email,
        `We received your message - KAM Global AI`,
        'Message received',
        [
            `Dear ${escapeHtml(firstName)},`,
            `We received your ${escapeHtml(contact.enquiryType || 'enquiry')}${contact.reference ? `. Your reference is <strong>${escapeHtml(contact.reference)}</strong>` : ''}.`,
            'The team will review it and reply from the office that handles this request.',
            'Best regards,<br/><strong>KAM Global AI</strong>',
        ]
    );
};

module.exports = {
    uniqueEmails,
    notifyApplication,
    notifyEnquiry,
};
