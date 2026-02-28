const Application = require('../models/Application');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;

// Create email transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // You can change this based on your email provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// @desc    Submit job application
// @route   POST /api/applications
// @access  Public
const submitApplication = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            email,
            phone,
            countryCode,
            location,
            qualification,
            experience,
            position,
            linkedinUrl,
            message,
            consent
        } = req.body;

        // Check if resume file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'Resume file is required'
            });
        }

        // Create application record
        const application = await Application.create({
            firstName,
            lastName,
            dateOfBirth,
            email,
            phone,
            countryCode,
            location,
            qualification,
            experience,
            position,
            linkedinUrl,
            message,
            resumePath: req.file.path,
            consent: consent === 'true' || consent === true
        });

        // Send email notification
        try {
            const transporter = createTransporter();

            const emailHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                        .info-row { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #3b82f6; }
                        .label { font-weight: bold; color: #3b82f6; }
                        .footer { margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎯 New Job Application</h1>
                            <p>KamGlobalAI Careers Portal</p>
                        </div>
                        <div class="content">
                            <h2>Application Details</h2>
                            
                            <div class="info-row">
                                <span class="label">Applicant Name:</span> ${firstName} ${lastName}
                            </div>
                            
                            <div class="info-row">
                                <span class="label">Email:</span> ${email}
                            </div>
                            
                            <div class="info-row">
                                <span class="label">Phone:</span> ${countryCode} ${phone}
                            </div>
                            
                            ${location ? `<div class="info-row"><span class="label">Location:</span> ${location}</div>` : ''}
                            
                            ${dateOfBirth ? `<div class="info-row"><span class="label">Date of Birth:</span> ${new Date(dateOfBirth).toLocaleDateString()}</div>` : ''}
                            
                            <div class="info-row">
                                <span class="label">Applied Position:</span> ${position}
                            </div>
                            
                            <div class="info-row">
                                <span class="label">Highest Qualification:</span> ${qualification}
                            </div>
                            
                            <div class="info-row">
                                <span class="label">Years of Experience:</span> ${experience}
                            </div>
                            
                            ${linkedinUrl ? `<div class="info-row"><span class="label">LinkedIn Profile:</span> <a href="${linkedinUrl}">${linkedinUrl}</a></div>` : ''}
                            
                            ${message ? `
                            <div class="info-row">
                                <span class="label">Cover Letter / Message:</span><br/>
                                <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
                            </div>
                            ` : ''}
                            
                            <div class="info-row">
                                <span class="label">Applied On:</span> ${new Date().toLocaleString()}
                            </div>
                        </div>
                        <div class="footer">
                            <p>This is an automated email from KamGlobalAI Careers Portal.</p>
                            <p>Resume is attached to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: ['hr@kamglobalai.com', 'info@kamglobalai.com'],
                subject: `New Job Application – KamGlobalAI - ${position}`,
                html: emailHtml,
                attachments: [
                    {
                        filename: req.file.originalname,
                        path: req.file.path
                    }
                ]
            };

            await transporter.sendMail(mailOptions);

            // Also send confirmation email to applicant
            const confirmationEmail = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Application Received - KamGlobalAI',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                            .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>✓ Application Received</h1>
                            </div>
                            <div class="content">
                                <div class="success-icon">✅</div>
                                <h2>Dear ${firstName},</h2>
                                <p>Thank you for applying for the <strong>${position}</strong> position at KamGlobalAI.</p>
                                <p>We have successfully received your application and our HR team will review it carefully.</p>
                                <p>If your profile matches our requirements, we will contact you shortly to discuss the next steps.</p>
                                <p style="margin-top: 30px;">Best regards,<br/>
                                <strong>KamGlobalAI Talent Acquisition Team</strong></p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            };

            await transporter.sendMail(confirmationEmail);

        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Continue even if email fails - application is still saved
        }

        res.status(201).json({
            success: true,
            data: application,
            message: 'Application submitted successfully'
        });

    } catch (error) {
        console.error('Application submission error:', error);
        res.status(400).json({
            success: false,
            error: error.message || 'Failed to submit application'
        });
    }
};

// @desc    Get all applications (for admin)
// @route   GET /api/applications
// @access  Private (should be protected in production)
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ appliedAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
const getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                error: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private
const updateApplicationStatus = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                error: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    submitApplication,
    getApplications,
    getApplication,
    updateApplicationStatus
};
