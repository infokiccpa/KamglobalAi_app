import {
    UserSearch,
    Users,
    Wallet,
    Compass,
    Crown,
    ShieldCheck,
    KanbanSquare,
    UserCog,
    Receipt,
    Laptop,
    HardHat,
    Factory,
    GraduationCap,
    HeartPulse,
    Hotel,
    ShoppingBag,
    Handshake,
    Building2,
    Briefcase,
    Network,
    Lock,
    FileClock,
    Database,
    ClipboardCheck,
} from 'lucide-react';
import { contactLink } from './links';
import { COMPANY } from './company';

/*
 * HR & Workforce content (formerly "KAM Global HR", presented as KAM Global).
 *
 * Validate all stats before launch.
 * Anything marked TODO_VERIFY must be confirmed by KAM Global before publishing:
 * service scope, software features, country availability, roles, timelines and contacts.
 */

export const HR_BRAND = 'KAM Global';
export const HR_TYPE = 'HR & Workforce';

export const hrContactLink = (subject) => contactLink(subject, HR_TYPE);
export const candidateLink = (subject = 'Candidate Registration') => contactLink(subject, 'Candidate Registration');
export const hrDemoLink = (product) => contactLink(product, 'Product Demo');
export const hrPartnerLink = () => contactLink('HR Partnership', 'Partnership');
export const HR_WHATSAPP = COMPANY.whatsapp;

// TODO_VERIFY: stats stay hidden (value: null) until each figure is confirmed.
export const hrStats = [
    { key: 'years', value: null, suffix: '+', label: 'Years of experience' },
    { key: 'clients', value: null, suffix: '+', label: 'Clients served' },
    { key: 'industries', value: null, suffix: '', label: 'Industries supported' },
    { key: 'countries', value: null, suffix: '', label: 'Countries in focus' },
];

export const hrServices = [
    {
        slug: 'recruitment',
        name: 'Recruitment',
        icon: UserSearch,
        image: '/images/hr/hr-recruitment.jpg',
        alt: 'Recruiter interviewing a candidate while reviewing a shortlist on a tablet',
        cardDesc: 'Permanent hiring from requisition to joining, supported by an applicant tracking system.',
        points: ['Requirement and job description scoping', 'Sourcing, screening and shortlisting', 'Interview coordination and offer support'],
        hero: {
            title: 'Hire the Right People, With a Clear Process',
            sub: 'Permanent recruitment for domestic and overseas roles, managed end to end.',
            body: 'We work from your requirement, source and screen candidates, coordinate interviews, and support offers and joining. Every step is tracked in our ATS so you can see where each role stands.',
        },
        capabilities: [
            { title: 'Requirement scoping', desc: 'Role, skills, experience, location, budget and timeline agreed up front.' },
            { title: 'Sourcing', desc: 'Candidate database, job portals, referrals and our talent network.' },
            { title: 'Screening', desc: 'Profile checks and initial screening against the agreed criteria.' },
            { title: 'Interview coordination', desc: 'Scheduling, briefings and feedback collection.' },
            { title: 'Offer and joining', desc: 'Offer roll-out support and follow-up until the joining date.' },
            { title: 'Overseas hiring', desc: 'Trade tests, interview drives and documentation support for international roles.' }, // TODO_VERIFY
        ],
        discuss: ['Roles and headcount', 'Skills and experience', 'Location and work model', 'Salary range', 'Hiring timeline', 'Interview panel availability'],
    },
    {
        slug: 'contract-staffing',
        name: 'Contract Staffing',
        icon: Users,
        image: '/images/hr/hr-contract-staffing.jpg',
        alt: 'Supervisor briefing a contract workforce team in safety gear at an industrial site',
        cardDesc: 'Flexible, compliant contract workforce for projects, peaks and ongoing operations.',
        points: ['Temporary and project-based staff', 'Onboarding and attendance tracking', 'Payroll and statutory compliance handled'],
        hero: {
            title: 'Flexible Workforce, Without the Admin Load',
            sub: 'Contract staff deployed for your projects and operations, with payroll and compliance managed.',
            body: 'We source and deploy contract staff, manage onboarding and attendance, and run payroll and statutory compliance, so your team can focus on the work.',
        },
        capabilities: [
            { title: 'Workforce planning', desc: 'Headcount, shift patterns, duration and site requirements.' },
            { title: 'Sourcing and deployment', desc: 'Screened candidates deployed to your site or project.' },
            { title: 'Onboarding', desc: 'Documentation, induction coordination and records set-up.' },
            { title: 'Attendance', desc: 'Attendance capture feeding directly into payroll.' },
            { title: 'Payroll and compliance', desc: 'Salary processing with statutory checks.' },
            { title: 'Replacements', desc: 'Backfills and changes managed during the contract.' }, // TODO_VERIFY
        ],
        discuss: ['Headcount and roles', 'Contract duration', 'Work location and shifts', 'Pay structure', 'Compliance requirements', 'Start date'],
    },
    {
        slug: 'payroll-outsourcing',
        name: 'Payroll Outsourcing',
        icon: Wallet,
        image: '/images/hr/hr-payroll.jpg',
        alt: 'Payroll specialist reviewing salary dashboards and payslips',
        cardDesc: 'Accurate, on-time payroll with compliance checks, payslips and reporting.',
        points: ['Attendance-linked salary processing', 'Tax and statutory compliance checks', 'Employee payslip portal and reports'],
        hero: {
            title: 'Payroll That Is Accurate, On Time and Audit-Ready',
            sub: 'From attendance collection to employee payslips, run on our payroll platform.',
            body: 'We collect attendance, validate the workforce, calculate pay, run compliance checks, process salaries, and publish payslips and reports, with controls at each step.',
        },
        capabilities: [
            { title: 'Payroll processing', desc: 'Monthly salary calculation and processing.' },
            { title: 'Compensation management', desc: 'Pay components, allowances and deductions.' },
            { title: 'Tax and compliance', desc: 'Statutory deductions and compliance checks.' },
            { title: 'Attendance integration', desc: 'Attendance data flows into each payroll run.' },
            { title: 'Payslip portal', desc: 'Employees access payslips online.' },
            { title: 'Reports and controls', desc: 'Payroll analytics, approvals and audit trail.' },
        ],
        discuss: ['Employee count and locations', 'Pay cycle and components', 'Attendance source', 'Statutory requirements', 'Current payroll process', 'Go-live date'],
    },
    {
        slug: 'hr-advisory',
        name: 'HR Advisory',
        icon: Compass,
        image: '/images/hr/hr-advisory.jpg',
        alt: 'HR consultant presenting an organisation structure to business leaders',
        cardDesc: 'Practical HR guidance on structure, policies and processes as you grow.',
        points: ['Organisation structure and roles', 'HR policies and processes', 'Workforce planning support'],
        hero: {
            title: 'HR Guidance That Fits How You Operate',
            sub: 'Advice on structure, policy and process from a team that also runs hiring and payroll.',
            body: 'We help you set up or improve HR foundations: organisation structure, policies, processes and workforce planning, grounded in day-to-day delivery experience.',
        },
        capabilities: [
            { title: 'Organisation design', desc: 'Roles, reporting lines and team structure.' },
            { title: 'Policies', desc: 'HR policies and employee handbook support.' }, // TODO_VERIFY
            { title: 'Processes', desc: 'Hiring, onboarding and exit process design.' },
            { title: 'Workforce planning', desc: 'Headcount planning aligned to business goals.' },
        ],
        discuss: ['Company size and growth plans', 'Current HR set-up', 'Priority gaps', 'Locations', 'Timeline', 'Stakeholders'],
    },
    {
        slug: 'executive-search',
        name: 'Executive Search',
        icon: Crown,
        confidential: true,
        image: '/images/hr/hr-executive-search.jpg',
        alt: 'Executive search consultant meeting a senior candidate in a private office',
        cardDesc: 'Confidential search for senior and leadership roles.',
        points: ['Discreet market mapping', 'Direct approach and assessment', 'Confidential shortlist and offer support'],
        hero: {
            title: 'Confidential Search for Leadership Roles',
            sub: 'Discreet, research-led search for senior positions.',
            body: 'We map the market, approach candidates directly and confidentially, assess fit, and present a focused shortlist, then support you through offer and transition.',
        },
        capabilities: [
            { title: 'Role briefing', desc: 'Mandate, success profile and confidentiality terms.' },
            { title: 'Market mapping', desc: 'Research into target companies and talent pools.' },
            { title: 'Direct approach', desc: 'Discreet outreach to potential candidates.' },
            { title: 'Assessment', desc: 'Structured interviews and reference checks.' },
            { title: 'Shortlist', desc: 'A focused shortlist with clear rationale.' },
            { title: 'Offer and transition', desc: 'Negotiation support and onboarding follow-up.' },
        ],
        discuss: ['Role and mandate', 'Confidentiality needs', 'Target companies', 'Compensation range', 'Decision makers', 'Timeline'],
    },
    {
        slug: 'background-verification',
        name: 'Background Verification',
        icon: ShieldCheck,
        image: '/images/hr/hr-background-verification.jpg',
        alt: 'Verification analyst checking an identity card and certificates against a checklist',
        cardDesc: 'Pre-employment checks that help you hire with confidence.',
        points: ['Identity and address checks', 'Education and employment verification', 'Clear, consolidated reports'],
        hero: {
            title: 'Hire With Confidence',
            sub: 'Pre-employment verification with clear, consolidated reports.',
            body: 'We verify candidate information before joining and share a clear report, so your hiring decisions rest on confirmed facts.',
        },
        // TODO_VERIFY: confirm which checks are offered and in which countries.
        capabilities: [
            { title: 'Identity', desc: 'Identity document verification.' },
            { title: 'Address', desc: 'Current and permanent address checks.' },
            { title: 'Education', desc: 'Qualification and institution verification.' },
            { title: 'Employment', desc: 'Previous employer and tenure checks.' },
            { title: 'Reference checks', desc: 'Structured references from previous managers.' },
            { title: 'Reports', desc: 'Consolidated report per candidate.' },
        ],
        discuss: ['Checks required', 'Volume per month', 'Countries involved', 'Turnaround needs', 'Consent process', 'Report format'],
    },
];

export const getHrService = (slug) => hrServices.find((s) => s.slug === slug);

export const hrTechnology = [
    {
        slug: 'ats',
        name: 'ATS',
        full: 'Applicant Tracking System',
        icon: KanbanSquare,
        tagline: 'Every requisition, candidate and interview in one place.',
        desc: 'Manage hiring from requisition to offer: career portal, pipeline, resume database, interviews, approvals and analytics.',
        features: [
            { title: 'Requisition management', desc: 'Raise, approve and track hiring requests.' },
            { title: 'Career portal', desc: 'Publish openings and collect applications.' },
            { title: 'Candidate pipeline', desc: 'Move candidates through stages on a visual board.' },
            { title: 'Resume database', desc: 'Searchable candidate profiles and resumes.' },
            { title: 'Interview scheduling', desc: 'Coordinate interviews and collect feedback.' },
            { title: 'Approvals', desc: 'Approval workflows for requisitions and offers.' },
            { title: 'Hiring analytics', desc: 'Pipeline and hiring progress reports.' },
            { title: 'Audit logs', desc: 'A record of actions taken in the system.' },
        ],
    },
    {
        slug: 'hrms',
        name: 'HRMS',
        full: 'Human Resource Management System',
        icon: UserCog,
        tagline: 'Core employee records, attendance and dashboards.',
        desc: 'Keep employee information, attendance and workforce dashboards organised, and connected to payroll.',
        features: [
            { title: 'Core HR records', desc: 'Central employee profiles and documents.' },
            { title: 'Attendance', desc: 'Attendance capture that feeds payroll.' },
            { title: 'HR dashboards', desc: 'Workforce overview at a glance.' },
            // TODO_VERIFY: confirm before removing the roadmap flag.
            { title: 'Leave management', desc: 'Leave requests and balances.', roadmap: true },
            { title: 'Employee self-service', desc: 'Employees update details and view records.', roadmap: true },
            { title: 'Performance', desc: 'Goals and review cycles.', roadmap: true },
        ],
    },
    {
        slug: 'payroll',
        name: 'Payroll',
        full: 'Payroll Platform',
        icon: Receipt,
        tagline: 'Accurate pay runs with compliance built in.',
        desc: 'Process salaries, manage compensation, run tax and compliance checks, and publish payslips, with analytics and controls.',
        features: [
            { title: 'Payroll processing', desc: 'Monthly pay runs with validation.' },
            { title: 'Compensation management', desc: 'Pay components, allowances and deductions.' },
            { title: 'Tax and compliance', desc: 'Statutory deductions and compliance checks.' },
            { title: 'Attendance integration', desc: 'Attendance flows into each pay run.' },
            { title: 'Payslip portal', desc: 'Employees access payslips online.' },
            { title: 'Payroll analytics', desc: 'Cost and payroll trend reports.' },
            { title: 'Controls', desc: 'Approvals, role-based access and audit trail.' },
        ],
    },
];

export const getHrTech = (slug) => hrTechnology.find((t) => t.slug === slug);

export const payrollSteps = [
    { title: 'Attendance collection', desc: 'Attendance is gathered from sites and systems for the pay period.' },
    { title: 'Workforce validation', desc: 'Joiners, leavers and changes are confirmed before calculation.' },
    { title: 'Payroll calculation', desc: 'Earnings, allowances and deductions are calculated.' },
    { title: 'Compliance checks', desc: 'Statutory deductions and rules are checked.' },
    { title: 'Salary processing', desc: 'Approved payroll is released for payment.' },
    { title: 'Payslip generation', desc: 'Payslips are generated for every employee.' },
    { title: 'Reporting', desc: 'Payroll reports are shared with your team.' },
    { title: 'Employee distribution', desc: 'Employees receive payslips through the portal.' },
];

// TODO_VERIFY: timelines are illustrative only and must be confirmed per engagement.
export const hiringJourneys = [
    {
        key: 'recruitment',
        label: 'Recruitment',
        timeline: 'Often 2 to 6 weeks per role, depending on seniority and market', // TODO_VERIFY
        steps: ['Requirement', 'Sourcing', 'Screening', 'Interviews', 'Offer', 'Joining'],
    },
    {
        key: 'contract-staffing',
        label: 'Contract Staffing',
        timeline: 'Often 1 to 3 weeks to deploy, depending on volume', // TODO_VERIFY
        steps: ['Workforce plan', 'Sourcing', 'Screening', 'Onboarding', 'Deployment', 'Payroll and compliance'],
    },
    {
        key: 'payroll',
        label: 'Payroll',
        timeline: 'Monthly cycle once set up', // TODO_VERIFY
        steps: ['Attendance', 'Validation', 'Calculation', 'Compliance', 'Processing', 'Payslips'],
    },
    {
        key: 'executive-search',
        label: 'Executive Search',
        timeline: 'Often 6 to 12 weeks, depending on the mandate', // TODO_VERIFY
        steps: ['Briefing', 'Market mapping', 'Direct approach', 'Assessment', 'Shortlist', 'Offer and transition'],
    },
];

// TODO_VERIFY: typical roles per industry.
export const hrIndustries = [
    { key: 'it', name: 'IT & Technology', icon: Laptop, image: '/images/pages/pg-ind-saas.webp', roles: ['Software developers', 'QA engineers', 'IT support', 'Project managers'] },
    { key: 'engineering', name: 'Engineering', icon: HardHat, image: '/images/hr/hr-contract-staffing.jpg', roles: ['Site engineers', 'Supervisors', 'Technicians', 'ITI trades'] },
    { key: 'manufacturing', name: 'Manufacturing', icon: Factory, image: '/images/pages/pg-ind-manufacturing.webp', roles: ['Machine operators', 'Quality inspectors', 'Production supervisors', 'Maintenance staff'] },
    { key: 'education', name: 'Education & EdTech', icon: GraduationCap, image: '/images/pages/pg-ind-education.webp', roles: ['Teachers', 'Academic coordinators', 'Counsellors', 'Admin staff'] },
    { key: 'healthcare', name: 'Healthcare', icon: HeartPulse, image: '/images/pages/pg-ind-healthcare.webp', roles: ['Nurses', 'Lab technicians', 'Front office', 'Hospital admin'] },
    { key: 'hospitality', name: 'Hospitality', icon: Hotel, image: '/images/pages/pg-ind-hospitality.webp', roles: ['Front desk', 'Chefs and kitchen staff', 'Housekeeping', 'F&B service'] },
    { key: 'retail', name: 'Retail', icon: ShoppingBag, image: '/images/pages/pg-ind-retail.webp', roles: ['Store staff', 'Store managers', 'Merchandisers', 'Warehouse staff'] },
];

// TODO_VERIFY: services, compliance notes and contacts per country.
export const hrCountries = [
    { code: 'IN', name: 'India', services: 'Recruitment, contract staffing, payroll and HR technology', note: 'Local compliance details to be confirmed', contact: 'info@kamglobalai.com' },
    { code: 'KW', name: 'Kuwait', services: 'Recruitment and overseas hiring support', note: 'Local compliance details to be confirmed', contact: 'info@kamgroups.com' },
    { code: 'SA', name: 'Saudi Arabia', services: 'Recruitment and overseas hiring support', note: 'Local compliance details to be confirmed', contact: '' },
    { code: 'QA', name: 'Qatar', services: 'Recruitment and overseas hiring support', note: 'Local compliance details to be confirmed', contact: '' },
    { code: 'BH', name: 'Bahrain', services: 'Recruitment and overseas hiring support', note: 'Local compliance details to be confirmed', contact: '' },
    { code: 'AE', name: 'UAE', services: 'Recruitment and overseas hiring support', note: 'Local compliance details to be confirmed', contact: '' },
    { code: 'US', name: 'USA', services: 'Recruitment and HR technology', note: 'Local compliance details to be confirmed', contact: '' },
];

export const partnerTypes = [
    { title: 'Recruitment agencies', icon: Briefcase },
    { title: 'Staffing companies', icon: Users },
    { title: 'HR consulting firms', icon: Handshake },
    { title: 'Regional talent networks', icon: Network },
];

export const partnerBenefits = [
    { title: 'Lead sharing and referrals', desc: 'Share and receive opportunities across markets.' },
    { title: 'Collaborative delivery', desc: 'Deliver larger mandates together.' },
    { title: 'Industry expertise', desc: 'Combine sector knowledge and networks.' },
    { title: 'Broader services', desc: 'Offer clients payroll, staffing and HR technology.' },
];

export const trustClaims = [
    { title: 'Role-based permissions', desc: 'Users see only what their role allows.', icon: Lock },
    { title: 'Audit logs', desc: 'Key actions are recorded for review.', icon: FileClock },
    { title: 'Secure candidate data', desc: 'Candidate information is handled with care.', icon: Database },
    { title: 'Audit-ready payroll', desc: 'Payroll runs keep approvals and records.', icon: ClipboardCheck },
];

// TODO_VERIFY: every item must be confirmed by KAM Global before publishing. Items still reading 'To be confirmed' are hidden.
export const TRUST_UNCONFIRMED = 'To be confirmed';
export const trustPending = [
    { title: 'Hosting region', value: 'To be confirmed' },
    { title: 'Encryption', value: 'To be confirmed' },
    { title: 'Backups', value: 'To be confirmed' },
    { title: 'Data retention', value: 'To be confirmed' },
    { title: 'Single sign-on (SSO)', value: 'To be confirmed' },
    { title: 'Service levels (SLA)', value: 'To be confirmed' },
];

export const overseasSupport = ['Trade-test schedules', 'Visa-status questions', 'Interview briefings', 'Document checklists'];

export const jobCategories = ['Technical & ITI', 'Engineering', 'Manufacturing', 'Domestic', 'Overseas'];

/*
 * TODO_VERIFY: sample openings for layout review only.
 * They are shown in development; production shows an empty state until real openings are added here.
 */
export const SAMPLE_JOBS = import.meta.env.DEV;
export const hrJobs = SAMPLE_JOBS
    ? [
        { id: 'sample-electrician-kw', title: 'Electrician', category: 'Overseas', location: 'Kuwait', experience: '2+ years, ITI', type: 'Contract', vacancies: 10, pkg: 'As per company norms', posted: '2026-10-01' },
        { id: 'sample-site-engineer-in', title: 'Site Engineer (Civil)', category: 'Engineering', location: 'Bengaluru, India', experience: '3 to 6 years, B.E. Civil', type: 'Full-time', vacancies: 3, pkg: 'Competitive', posted: '2026-10-03' },
        { id: 'sample-machine-operator-in', title: 'CNC Machine Operator', category: 'Manufacturing', location: 'Chennai, India', experience: '1 to 3 years, ITI', type: 'Full-time', vacancies: 8, pkg: 'Competitive', posted: '2026-10-05' },
        { id: 'sample-welder-sa', title: 'Welder (6G)', category: 'Technical & ITI', location: 'Saudi Arabia', experience: '3+ years', type: 'Contract', vacancies: 15, pkg: 'As per company norms', posted: '2026-10-06' },
        { id: 'sample-staff-nurse-qa', title: 'Staff Nurse', category: 'Overseas', location: 'Qatar', experience: '2+ years, B.Sc Nursing', type: 'Full-time', vacancies: 6, pkg: 'As per company norms', posted: '2026-10-07' },
        { id: 'sample-store-associate-in', title: 'Retail Store Associate', category: 'Domestic', location: 'Hyderabad, India', experience: 'Freshers welcome', type: 'Full-time', vacancies: 12, pkg: 'Competitive', posted: '2026-10-08' },
    ]
    : [];

export const getHrJob = (id) => hrJobs.find((j) => j.id === id);

export const hrFaqs = {
    Employers: [
        { q: 'Which HR services does KAM Global offer?', a: 'Recruitment, contract staffing, payroll outsourcing, HR advisory, executive search and background verification, supported by our ATS, HRMS and payroll platforms.' },
        { q: 'Can you hire for roles outside India?', a: 'Yes. We focus on India, Kuwait, Saudi Arabia, Qatar, Bahrain, UAE and the USA. Availability varies by country and workforce type, so we confirm it for each requirement.' },
        { q: 'How do we start?', a: 'Share your roles, headcount, location and timeline. We review the requirement and confirm the right service and next steps.' },
    ],
    Candidates: [
        { q: 'How do I register?', a: 'Use the registration form to share your details and the roles you are interested in. Our team contacts you when a suitable opening is available.' },
        { q: 'Do you help with overseas jobs?', a: 'Yes. We share trade-test schedules, interview briefings and guidance on visa-status questions for overseas openings.' },
        { q: 'Do I pay to apply?', a: 'Please contact our team directly to confirm the process for the role you are applying to. Always use official KAM Global contact details.' }, // TODO_VERIFY
    ],
    Software: [
        { q: 'What does the HR technology include?', a: 'An ATS for hiring, an HRMS for core employee records and attendance, and a payroll platform for processing, compliance and payslips.' },
        { q: 'Can we use the software on its own?', a: 'Please book a demo and we will discuss how the platforms can fit your set-up.' }, // TODO_VERIFY
        { q: 'How is data protected?', a: 'The platforms use role-based permissions and audit logs. See the Trust page for details that are being confirmed.' },
    ],
    Partners: [
        { q: 'Who can partner with KAM Global?', a: 'Recruitment agencies, staffing companies, HR consulting firms and regional talent networks.' },
        { q: 'What do partners get?', a: 'Lead sharing and referrals, collaborative delivery, shared industry expertise and access to broader services for your clients.' },
    ],
};
