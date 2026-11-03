import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { COMPANY, ISO_27001, whatsappLink } from '../data/company';
import { OFFICE_LOCATIONS } from '../config/officeLocations';
import './Legal.css';

const HOURS = {
    KW: 'Sun–Thu · 9:00 AM – 6:00 PM (local time)',
    IN: 'Mon–Sat · 9:00 AM – 7:00 PM (local time)',
};

const OFFICE_LINES = {
    KW: { phone: COMPANY.kuwaitPhone, tel: COMPANY.kuwaitTel, email: COMPANY.email, whatsapp: COMPANY.kuwaitWhatsapp },
    IN: { phone: COMPANY.phone, tel: COMPANY.tel, email: COMPANY.email, whatsapp: COMPANY.whatsapp },
};

const Support = () => (
    <div className="legal-container">
        <Helmet>
            <title>Help &amp; Support | KAM Global AI</title>
            <meta
                name="description"
                content="Contact KAM Global AI for a client enquiry, a partnership, a job application, a privacy request, or the published ISO/IEC 27001:2022 certificate."
            />
        </Helmet>
        <header className="legal-header">
            <h1>Help &amp; Support</h1>
            <p>Use the path that matches why you are writing. Office hours are below. A reply time is agreed in a written engagement, not on this page.</p>
        </header>

        <div className="legal-content">
            <div className="support-grid">
                <article className="support-card">
                    <Mail size={28} aria-hidden="true" />
                    <h2>Email</h2>
                    <p>Kuwait and India</p>
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </article>
                <article className="support-card">
                    <Phone size={28} aria-hidden="true" />
                    <h2>Phone</h2>
                    <p>Kuwait · {HOURS.KW}</p>
                    <a href={`tel:${COMPANY.kuwaitTel}`}>{COMPANY.kuwaitPhone}</a>
                    <p>India · {HOURS.IN}</p>
                    <a href={`tel:${COMPANY.tel}`}>{COMPANY.phone}</a>
                </article>
                <article className="support-card">
                    <MessageSquare size={28} aria-hidden="true" />
                    <h2>WhatsApp</h2>
                    <p>Kuwait, same number as calls</p>
                    <a href={whatsappLink(undefined, COMPANY.kuwaitWhatsapp)}>{COMPANY.kuwaitPhone}</a>
                    <p>India, same number as calls</p>
                    <a href={whatsappLink(undefined, COMPANY.whatsapp)}>{COMPANY.phone}</a>
                </article>
            </div>

            <div className="legal-section">
                <h2>Who to contact</h2>
                <ul>
                    <li><strong>Clients.</strong> Read <Link to="/about#for-clients">how a client engagement works</Link>, then send the requirement through the <Link to="/contact#form">contact form</Link>.</li>
                    <li><strong>Partners.</strong> Read <Link to="/about#for-partners">how a partnership starts</Link>. That path is not a job application.</li>
                    <li><strong>Job seekers.</strong> Open roles are listed on <Link to="/careers#jobs">Careers</Link>.</li>
                    <li><strong>Privacy.</strong> Ask for a copy, a correction, or deletion at {COMPANY.email}. The request rules are in the <Link to="/privacy">Privacy Policy</Link>.</li>
                    <li><strong>Website terms.</strong> Use of this site is covered by the <Link to="/terms">Terms &amp; Conditions</Link>. A paid engagement follows the signed proposal.</li>
                </ul>
            </div>

            <div className="legal-section">
                <h2>Information security</h2>
                <p>
                    {ISO_27001.legalName} holds {ISO_27001.standard}, certificate {ISO_27001.number}. The published scope is {ISO_27001.scope} Certificate details, including the certification body and the expiry date, are on the <Link to="/hr/trust">trust page</Link>. That certificate does not set the security terms of a separate HR, media, or operations engagement. Those terms are in the agreement for that work.
                </p>
            </div>

            <div className="legal-section">
                <h2>Offices</h2>
                <div className="support-offices">
                    {OFFICE_LOCATIONS.map((office) => {
                        const line = OFFICE_LINES[office.addressCountry];
                        return (
                            <article key={office.addressCountry}>
                                <h3>{office.shortName}</h3>
                                <p>{office.streetAddress}</p>
                                <p>{HOURS[office.addressCountry]}</p>
                                {line && (
                                    <p>
                                        <a href={`tel:${line.tel}`}>{line.phone}</a>
                                        <br />
                                        <a href={whatsappLink(undefined, line.whatsapp)}>WhatsApp {line.phone}</a>
                                        <br />
                                        <a href={`mailto:${line.email}`}>{line.email}</a>
                                    </p>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

export default Support;
