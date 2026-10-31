import { Link } from 'react-router-dom';
import { contactLink } from '../../data/links';
import { Section } from './PageKit';
import '../../pages/ServicePages.css';

const AudiencePaths = ({ subject, enquiryType, work }) => (
    <Section id="who-for" tone="white" eyebrow="Who this page is for" title="Clients, partners and job seekers" align="left">
        <div className="sv-paths">
            <article>
                <h3>Clients</h3>
                <p>You want {work} delivered for your organisation. The enquiry names this work.</p>
                <Link to={contactLink(subject, enquiryType)}>Enquire as a client</Link>
            </article>
            <article>
                <h3>Partners</h3>
                <p>You want to deliver or sell this work with us. A partnership enquiry is not a job application.</p>
                <Link to={contactLink(`Partnership: ${subject}`, 'Partnership')}>Enquire as a partner</Link>
            </article>
            <article>
                <h3>Job seekers</h3>
                <p>You want a role. Openings and applications are on Careers, not on this service page.</p>
                <Link to="/careers">View careers</Link>
            </article>
        </div>
    </Section>
);

export default AudiencePaths;
