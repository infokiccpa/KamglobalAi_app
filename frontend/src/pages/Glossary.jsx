import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Seo, PageHero, Section, CtaBand } from '../components/page/PageKit';
import { contactLink, discoveryLink } from '../data/links';
import './Glossary.css';

const TERMS = [
    { term: 'Applicant Tracking System (ATS)', def: 'Software that manages job postings, applications, candidate pipelines and interview stages in one place, so recruiters can track every candidate from application to offer.', to: '/hr/technology/ats' },
    { term: 'Agile delivery', def: 'A way of building software in short, planned cycles, with working increments reviewed by the client at the end of each cycle instead of one large release at the end.', to: '/services/custom-development' },
    { term: 'API (Application Programming Interface)', def: 'A defined way for two software systems to exchange data, for example a website sending orders to an ERP system without manual re-entry.', to: '/services/custom-development' },
    { term: 'Background verification', def: 'Checks on a candidate’s identity, employment history, education or references, carried out with the candidate’s consent before or during hiring.', to: '/hr/services/background-verification' },
    { term: 'Build-Operate-Transfer (BOT)', def: 'An engagement in which a partner sets up and runs a team for a client, then transfers the team and its operations to the client on terms agreed in the contract.', to: '/services/bot-model' },
    { term: 'Business Process Outsourcing (BPO)', def: 'Handing a defined, repeatable business process, such as data entry or order processing, to an external team that runs it under agreed rules and quality measures.', to: '/outsourcing/business-process-outsourcing' },
    { term: 'CI/CD (Continuous Integration / Continuous Delivery)', def: 'Automated pipelines that build, test and release software changes, so updates reach users more often and with fewer manual steps.', to: '/services/cloud-devops' },
    { term: 'Cloud migration', def: 'Moving applications, data or infrastructure from on-premise servers or another provider to a cloud platform, usually in planned stages.', to: '/services/cloud-devops' },
    { term: 'Contract staffing', def: 'Placing professionals with a client for a fixed period or project, while employment and payroll are handled under an agreed arrangement.', to: '/hr/services/contract-staffing' },
    { term: 'CRM (Customer Relationship Management)', def: 'Software for managing leads, customers, sales pipelines and service interactions in one shared record.', to: '/services/erp-crm' },
    { term: 'Dedicated resource', def: 'A single specialist who works full time on a client’s priorities as an extension of the client’s team.', to: '/engagement-models/dedicated-resource' },
    { term: 'Dedicated team', def: 'A stable, multi-role team assembled around a client’s product or function, usually with a named lead and shared delivery goals.', to: '/engagement-models/dedicated-team' },
    { term: 'DevOps', def: 'Practices and tooling that bring software development and IT operations together to release, run and monitor applications more reliably.', to: '/services/cloud-devops' },
    { term: 'Discovery phase', def: 'The first stage of a project, used to understand goals, users, constraints and existing systems before scope, cost and timelines are agreed.', to: '/services' },
    { term: 'ERP (Enterprise Resource Planning)', def: 'Software that connects core business functions such as finance, inventory, purchasing and HR in one system.', to: '/services/erp-crm' },
    { term: 'Executive search', def: 'A confidential, research-led process for finding and approaching senior leaders, rather than advertising the role publicly.', to: '/hr/services/executive-search' },
    { term: 'HRMS (Human Resource Management System)', def: 'Software that holds employee records and manages HR processes such as onboarding, leave, attendance and performance.', to: '/hr/technology/hrms' },
    { term: 'ITSM (IT Service Management)', def: 'The processes used to deliver and support IT services, such as handling tickets, incidents, changes and service requests.', to: '/services/managed-it' },
    { term: 'Managed services', def: 'An arrangement in which a partner runs an agreed service, such as IT support, against defined scope, responsibilities and reporting.', to: '/engagement-models/managed-services' },
    { term: 'MVP (Minimum Viable Product)', def: 'The smallest usable version of a product that can be released to real users to test whether it solves the intended problem.', to: '/services/custom-development' },
    { term: 'Offshore Development Center (ODC)', def: 'A dedicated, longer-term engineering setup in another country, working to the client’s processes under an agreed governance model.', to: '/engagement-models/offshore-development-center' },
    { term: 'Payroll outsourcing', def: 'Handing salary calculation, payslips and related reporting to an external provider, with the client reviewing and approving each cycle.', to: '/hr/services/payroll-outsourcing' },
    { term: 'Project-based outsourcing', def: 'An engagement with a defined scope, milestones and acceptance criteria, where the partner is responsible for delivering the agreed outcome.', to: '/engagement-models/project-outsourcing' },
    { term: 'QA (Quality Assurance) testing', def: 'Checking that software works as intended through manual and automated tests before and after each release.', to: '/services/qa-testing' },
    { term: 'Recruitment Process Outsourcing (RPO)', def: 'An ongoing arrangement in which an external team runs part or all of a company’s hiring process, usually embedded in the client’s workflow and tools.', to: '/outsourcing/recruitment-rpo' },
    { term: 'Staff augmentation', def: 'Adding external specialists to an existing team for a period of time, while the client continues to manage the daily work.', to: '/engagement-models/staff-augmentation' },
    { term: 'UAT (User Acceptance Testing)', def: 'The stage where the client’s own users test the software against agreed criteria before it is approved for release.', to: '/services/qa-testing' },
    { term: 'UI/UX design', def: 'Designing how a product looks (user interface) and how easy it is to use (user experience), based on research, journeys and testing.', to: '/services/ui-ux-design' },
    { term: 'Virtual assistant', def: 'A remote professional who handles tasks such as scheduling, inbox management, research, data entry and CRM updates.', to: '/outsourcing/virtual-assistance' },
];

const PAGE_NAMES = {
    '/hr/technology/ats': 'Applicant tracking system',
    '/hr/technology/hrms': 'HRMS',
    '/services': 'IT services and delivery process',
    '/services/custom-development': 'Software development',
    '/services/cloud-devops': 'Cloud & DevOps',
    '/services/erp-crm': 'ERP & CRM',
    '/services/managed-it': 'Managed IT',
    '/services/qa-testing': 'QA & testing',
    '/services/ui-ux-design': 'UI/UX design',
    '/services/bot-model': 'BOT model',
};
const pageName = (to) => PAGE_NAMES[to] || to.split('/').pop().replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase()).replace(/\b(rpo|hr)\b/gi, (m) => m.toUpperCase());

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const sorted = [...TERMS].sort((a, b) => a.term.localeCompare(b.term));
const letters = [...new Set(sorted.map((t) => t.term[0].toUpperCase()))];

const Glossary = () => (
    <div className="pg-page">
        <Seo
            title="Glossary: Outsourcing, HR & IT Terms | KAM Global AI"
            description="Plain-English definitions of outsourcing, HR and technology terms such as BPO, RPO, BOT, ODC, ATS, HRMS, ITSM, staff augmentation and CI/CD."
            path="/resources/glossary"
            crumbs={[
                { label: 'Home', to: '/' },
                { label: 'Resources', to: '/resources' },
                { label: 'Glossary', to: '/resources/glossary' },
            ]}
        />
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'DefinedTermSet',
                    name: 'KAM Global AI Glossary',
                    url: 'https://kamglobalai.com/resources/glossary',
                    hasDefinedTerm: sorted.map(({ term, def }) => ({
                        '@type': 'DefinedTerm',
                        name: term,
                        description: def,
                        url: `https://kamglobalai.com/resources/glossary#${slugify(term)}`,
                    })),
                })}
            </script>
        </Helmet>

        <PageHero
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Resources', to: '/resources' }, { label: 'Glossary' }]}
            eyebrow="Glossary"
            title="Outsourcing, HR and Technology Terms, Explained"
            sub="Short, plain-English definitions of the terms you will meet when planning software, outsourcing or hiring work."
            body="Each definition links to the related KAM Global AI service or engagement model, so you can see how it applies in practice."
            primary={{ label: 'Discuss Your Requirements', to: contactLink('Glossary enquiry') }}
            secondary={{ label: 'Compare Engagement Models', to: '/engagement-models' }}
        />

        <Section id="terms" tone="white" eyebrow={`${sorted.length} terms`} title="A–Z Glossary" align="left">
            <nav className="gl-index" aria-label="Jump to letter">
                {letters.map((l) => (
                    <a key={l} href={`#letter-${l}`}>{l}</a>
                ))}
            </nav>
            {letters.map((l) => (
                <div key={l} className="gl-group" id={`letter-${l}`}>
                    <h2 className="gl-letter">{l}</h2>
                    <dl className="gl-list">
                        {sorted.filter((t) => t.term[0].toUpperCase() === l).map(({ term, def, to }) => (
                            <div key={term} className="gl-item" id={slugify(term)}>
                                <dt>{term}</dt>
                                <dd>
                                    <p>{def}</p>
                                    <Link to={to} className="gl-link">Related: {pageName(to)}</Link>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            ))}
        </Section>

        <CtaBand
            title="Have a Term or Question We Haven't Covered?"
            text="Ask us directly. We will explain how it applies to your requirement."
            primary={{ label: 'Contact Our Team', to: contactLink('Glossary question') }}
            secondary={{ label: 'Book a Discovery Call', to: discoveryLink('Glossary') }}
        />
    </div>
);

export default Glossary;
