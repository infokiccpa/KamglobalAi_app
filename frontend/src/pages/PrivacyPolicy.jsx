import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { COMPANY } from '../data/company';
import './Legal.css';

const PrivacyPolicy = () => (
    <div className="legal-container">
        <Helmet>
            <title>Privacy Policy | KAM Global AI</title>
            <meta
                name="description"
                content="How KAM Global AI handles enquiries, job applications, client information, and website visits across IT, AI media, outsourcing, and HR services."
            />
        </Helmet>
        <header className="legal-header">
            <h1>Privacy Policy</h1>
            <p>Last updated: 31 October 2026</p>
        </header>

        <section className="legal-content">
            <div className="legal-section">
                <h2>1. Who we are</h2>
                <p>
                    This notice explains how {COMPANY.legalName} (“KAM Global AI”, “we”) handles personal information on kamglobalai.com and in the services described on this website. The company is backed by KAM Group, Kuwait. Technology delivery is from our Bengaluru office. Business operations may be delivered from the Philippines. The Kuwait office is our relationship office.
                </p>
                <p>
                    Write to us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>, call {COMPANY.phone}, or use the <Link to="/contact">contact form</Link>. Our published offices are in Hawally, Kuwait, and RT Nagar, Bengaluru.
                </p>
            </div>

            <div className="legal-section">
                <h2>2. What this notice covers</h2>
                <p>It covers personal information connected with:</p>
                <ul>
                    <li><strong>IT &amp; Technology</strong> — software, websites, apps, AI and automation, data and analytics, cloud and DevOps, managed IT, IT staffing, and Build-Operate-Transfer teams.</li>
                    <li><strong>AI media</strong> — content and creative work, video and motion, SEO and campaign support, and marketing operations.</li>
                    <li><strong>Global outsourcing</strong> — India technology delivery, Philippines business operations, customer experience, BPO and back office, and sales support.</li>
                    <li><strong>HR &amp; workforce</strong> — recruitment, contract staffing, payroll administration, executive search, and HR technology, for clients in the markets we serve, including India and the GCC, where the engagement allows it.</li>
                    <li><strong>EdTech</strong> — learning platforms, school software, and information you send us about LearnX, EduAiTutors, or the AI-Powered LMS. Use of those products themselves is covered by the agreement or notice for that product.</li>
                    <li><strong>Careers</strong> — applications and general applications submitted on this website.</li>
                </ul>
            </div>

            <div className="legal-section">
                <h2>3. Information we collect</h2>
                <p>We collect only what the form or the engagement asks for.</p>
                <ul>
                    <li><strong>Enquiries.</strong> Name, work email, company, country, phone, the service you ask about, and the message you write.</li>
                    <li><strong>Job applications.</strong> Name, contact details, location, education, experience, the role, and any optional details you add, such as notice period, expected compensation, or profile links. The form also asks for a résumé. Where the role asks for them, it may also ask for education certificates or a salary slip.</li>
                    <li><strong>Product interest.</strong> Name, email, phone, institution, role, and the product you ask about, when you use a product request form.</li>
                    <li><strong>Website visits.</strong> Our host may record the IP address, browser type, and time of a request so the site can run and so we can investigate misuse. We do not run an advertising or analytics cookie programme on this website.</li>
                    <li><strong>Assistant on the site.</strong> The on-page assistant keeps the conversation in your browser so it can point you to a service, a job, or a contact path. It does not send that chat to our servers.</li>
                </ul>
            </div>

            <div className="legal-section">
                <h2>4. How we use it</h2>
                <ul>
                    <li>To reply to an enquiry and route it to the IT, AI media, outsourcing, HR, or product team it concerns.</li>
                    <li>To assess an application, contact you about that role or a later matching role, and keep a record of the decision.</li>
                    <li>To prepare a proposal, deliver an agreed service, invoice, and handle support for that engagement.</li>
                    <li>To protect the website, our staff, and the people whose information we hold, and to meet a legal duty such as tax, employment, or a lawful request from an authority.</li>
                </ul>
                <p>We do not sell personal information. We do not use enquiry or application details to build advertising profiles.</p>
            </div>

            <div className="legal-section">
                <h2>5. Information we handle for a client</h2>
                <p>
                    During a project we may see personal information that belongs to our client: customer records in a support or BPO workflow, candidate or employee records in recruitment, staffing, or payroll work, and files supplied for software, content, or campaign work. We use that information only to perform the written engagement, on the client’s instructions. Access is limited to the people assigned to the work.
                </p>
                <p>
                    Healthcare-related work on this site is administrative and non-clinical. A background check, payroll run, or staffing placement is done only when the engagement includes it and the people concerned have been informed as the engagement requires.
                </p>
            </div>

            <div className="legal-section">
                <h2>6. Who we share it with</h2>
                <ul>
                    <li>Staff and contractors assigned to the enquiry, application, or engagement, including people working from India, the Philippines, or the Kuwait relationship office when the work requires it.</li>
                    <li>A client, when we present a candidate for a role that client has asked us to fill, or when the contract says we must return work product that contains personal information.</li>
                    <li>A hosting, email, or file-storage provider that processes the information for us under our instructions.</li>
                    <li>WhatsApp, if you choose to message us there. That conversation is then handled by WhatsApp as well as by us.</li>
                    <li>A court, regulator, or other authority when the law requires it.</li>
                </ul>
            </div>

            <div className="legal-section">
                <h2>7. How long we keep it</h2>
                <p>
                    Enquiry records are kept long enough to respond and to keep a record of the conversation. Application records, including the résumé and any documents you upload, are kept for the hiring process and for a later matching role, unless you ask us to delete them and we are not required to keep them for a legal claim or duty. Client files are kept for the life of the engagement and for the period the contract or the law requires after it ends. We then delete or return them.
                </p>
            </div>

            <div className="legal-section">
                <h2>8. Security</h2>
                <p>
                    Application files are stored so they are not publicly downloadable. Only signed-in staff with the right role can open them. We limit access to people who need it for the work. The company holds ISO/IEC 27001:2022 for the published scope of consultancy for web and software development services. Certificate details are on the <Link to="/hr/trust">trust page</Link>. That certificate does not, by itself, change the security terms of a separate HR, media, or operations engagement. Those terms are in the agreement for that work.
                </p>
            </div>

            <div className="legal-section">
                <h2>9. Cookies and browser storage</h2>
                <p>
                    Necessary cookies keep the site working. The notice at the bottom of the page stores your choice, Necessary only or Accept, in this browser. We do not use advertising or analytics cookies, so either choice leaves only those necessary cookies. Choosing Accept does not subscribe you to email updates. If you are a staff member, the admin sign-in keeps a session in the browser until you sign out. The careers page can also remember roles you save on that device. You can clear these in your browser settings. Either choice still lets you use the contact form or send a job application.
                </p>
            </div>

            <div className="legal-section">
                <h2>10. Your choices</h2>
                <p>
                    You can ask us what personal information we hold about you, ask for a correction, or ask us to delete an enquiry or a general application. You can object to us keeping a general application for future roles. We will honour a request unless a law, a tax duty, or an active client contract requires us to keep the record. Contact {COMPANY.email} and include the email address you used, so we can find the record.
                </p>
                <p>
                    If you are in India, you may also use the rights in the Digital Personal Data Protection Act, 2023. If another law applies because of where you live or where a client engagement is performed, we will handle the request under that law as well.
                </p>
            </div>

            <div className="legal-section">
                <h2>11. Students and education products</h2>
                <p>
                    kamglobalai.com is for businesses and adult applicants. We do not ask children to create an account here. LearnX, EduAiTutors, and the AI-Powered LMS may be used by schools, parents, and students. Student information for those products is handled under the product agreement with the school or the account holder, not under a child’s use of this corporate website.
                </p>
            </div>

            <div className="legal-section">
                <h2>12. Changes and contact</h2>
                <p>
                    We will post any change on this page and update the date above. Continued use of the website after that date means the new notice applies to new enquiries and applications.
                </p>
                <p>
                    <strong>Email:</strong> <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
                    <strong>India:</strong> {COMPANY.phone}<br />
                    <strong>Kuwait office:</strong> {COMPANY.kuwaitPhone}
                </p>
                <p>
                    The terms for using the website and for buying services are in the <Link to="/terms">Terms &amp; Conditions</Link>.
                </p>
            </div>
        </section>
    </div>
);

export default PrivacyPolicy;
