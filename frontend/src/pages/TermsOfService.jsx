import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { COMPANY } from '../data/company';
import './Legal.css';

const TermsOfService = () => (
    <div className="legal-container">
        <Helmet>
            <title>Terms & Conditions | KAM Global AI</title>
            <meta
                name="description"
                content="Terms for using the KAM Global AI website and for IT, AI media, global outsourcing, HR, and product engagements."
            />
        </Helmet>
        <header className="legal-header">
            <h1>Terms &amp; Conditions</h1>
            <p>Last updated: 31 October 2026</p>
        </header>

        <section className="legal-content">
            <div className="legal-section">
                <h2>1. Agreement</h2>
                <p>
                    These terms apply to your use of kamglobalai.com and to enquiries you send through it. They are issued by {COMPANY.legalName}. If you do not agree, do not use the site or send an enquiry.
                </p>
                <p>
                    A paid engagement is governed by the proposal, statement of work, or service agreement we both sign. If that document conflicts with these website terms, the signed document wins for that engagement. Pages on this website describe how we work. They are an invitation to discuss a requirement. They are not a quotation, a guarantee of availability, or a promise of a particular result.
                </p>
            </div>

            <div className="legal-section">
                <h2>2. Services these terms relate to</h2>
                <p>The website describes five divisions:</p>
                <ul>
                    <li><strong>IT &amp; Technology,</strong> delivered from India: websites, business software, mobile apps, AI and automation, data and analytics, cloud and DevOps, managed IT, IT staffing, and Build-Operate-Transfer teams.</li>
                    <li><strong>AI Media &amp; Creative,</strong> delivered from India: content and creative production, video and motion, SEO and campaign support, and marketing operations. Channel choice, ad spend, approvals, and the result you expect are agreed in the brief.</li>
                    <li><strong>Business Outsourcing:</strong> technology and digital delivery from India, and business operations from the Philippines, including customer experience, BPO and back office, and sales support. Partnership countries named on the website are not delivery offices.</li>
                    <li><strong>HR Solutions:</strong> recruitment, contract staffing, payroll administration, executive search, and HR technology. We discuss these for India and the GCC where the role and the law allow it.</li>
                    <li><strong>EdTech:</strong> learning platforms and school software, including LearnX.school and EduAiTutors. A demo or a product page does not, by itself, give a licence to use the product.</li>
                </ul>
                <p>
                    Where a service needs a licence, a registration, a client approval, or a local employment rule, we perform it only after that point is confirmed in the agreement. Healthcare support described on the site is administrative and non-clinical. A Build-Operate-Transfer of people, knowledge, or assets happens only on the written transfer terms, not automatically.
                </p>
            </div>

            <div className="legal-section">
                <h2>3. Using the website</h2>
                <p>You may read the site and send a genuine enquiry or job application. You may not:</p>
                <ul>
                    <li>Copy the site, our product names, or our materials for your own commercial use, or mirror the site.</li>
                    <li>Attempt to break, probe, or overload the site, or to reach admin tools, résumés, or other non-public files.</li>
                    <li>Send false enquiry or application details, or upload a file you have no right to share.</li>
                    <li>Scrape the site in a way that degrades it for other visitors.</li>
                </ul>
                <p>
                    Our name, logo, page text, and layout belong to us or to our licensors. Product names LearnX, EduAiTutors, and AI-Powered LMS are ours. You may share a link to a public page.
                </p>
            </div>

            <div className="legal-section">
                <h2>4. Scope, fees, and delivery</h2>
                <p>
                    After an enquiry we may propose a scope, a team, a timeline, and a fee. Work starts when that proposal, or another written agreement, is accepted. Fees, currency, taxes, expenses, and payment timing are those written terms. Support hours, response targets, and what is in or out of scope are agreed there as well. Nothing on a marketing page sets a service level by itself.
                </p>
                <p>
                    You provide the access, decisions, brand guidance, and source material the work needs, on the dates we agree. If those are late, the timeline moves. We will tell you when a change needs a revised fee or scope.
                </p>
                <p>
                    For outsourcing and HR work, you remain responsible for the decisions that the law places on you as the employer or the data controller, including final hiring decisions, pay approval, and instructions you give us about your customers or staff.
                </p>
            </div>

            <div className="legal-section">
                <h2>5. Confidentiality</h2>
                <p>
                    Each party keeps the other’s non-public business information confidential and uses it only for the enquiry or the engagement. This includes proposals, pricing, source code, creative files, customer lists, candidate information, and payroll data. The duty does not cover information that is already public, that the receiver already knew, or that a law requires to be disclosed. A signed agreement may set a longer confidentiality period.
                </p>
            </div>

            <div className="legal-section">
                <h2>6. Intellectual property</h2>
                <p>
                    We keep ownership of our pre-existing tools, methods, templates, and products, including LearnX, EduAiTutors, and the AI-Powered LMS. You keep ownership of materials you supply, including your brand, content, and data.
                </p>
                <p>
                    Ownership or licence of a deliverable we create for you — software, a design, a video, a campaign asset, or a configuration — is stated in the statement of work. Until the agreed fees for that deliverable are paid, we retain the rights the statement of work says we retain. Open-source components remain under their own licences.
                </p>
            </div>

            <div className="legal-section">
                <h2>7. Personal information</h2>
                <p>
                    Enquiry, application, and client personal information is handled as described in the <Link to="/privacy">Privacy Policy</Link>. You must have the right to send us any personal information you include in an enquiry or a file. If we process personal information for you during an engagement, the agreement states whether we act on your instructions and what each party must do if there is a request or an incident.
                </p>
            </div>

            <div className="legal-section">
                <h2>8. Careers and applications</h2>
                <p>
                    Submitting an application, or a general application, does not create an employment or contractor relationship. An offer, if we make one, will be a separate written document. You confirm that the details and documents you upload are accurate and that you have the right to share them. We may keep the application for a later matching role, as the privacy policy describes, until you ask us to delete it and we are allowed to do so.
                </p>
            </div>

            <div className="legal-section">
                <h2>9. Third-party services</h2>
                <p>
                    The site links to product sites, LinkedIn, WhatsApp, maps, and other pages we do not operate. Those sites have their own terms. A link is not an endorsement of everything on that site. If you message us on WhatsApp, WhatsApp’s terms also apply to that conversation.
                </p>
            </div>

            <div className="legal-section">
                <h2>10. Availability and liability</h2>
                <p>
                    We aim to keep the website available, but we do not warrant that it will be uninterrupted or free of errors. Page content can change. Published case notes are labelled, and internal products are not presented as client engagements.
                </p>
                <p>
                    For a paid engagement, each party’s liability is as the signed agreement states. For use of the website itself, we are not liable for loss of profit, loss of data, or business interruption arising only from use of the public pages, to the extent the law allows that limit. Nothing in these terms limits liability that the law does not allow us to limit, including liability for fraud.
                </p>
            </div>

            <div className="legal-section">
                <h2>11. Law and changes</h2>
                <p>
                    The company is an Indian private limited company. These website terms are governed by the laws of India. The courts at Bengaluru, Karnataka, have jurisdiction over disputes about the website, unless a written engagement chooses another law or venue. A mandatory local rule that applies to a particular staffing, payroll, or employment engagement still applies to that engagement.
                </p>
                <p>
                    We may update these terms by posting a new version on this page with a new date. The version on the page when you send an enquiry applies to that enquiry. An engagement that is already signed keeps the terms in that signed document.
                </p>
                <p>
                    Questions: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or {COMPANY.phone}.
                </p>
            </div>
        </section>
    </div>
);

export default TermsOfService;
