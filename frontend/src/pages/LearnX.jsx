import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowRight,
    CheckCircle2,
    Globe,
    Building2,
    Users,
    Brain,
    Layers,
    Shield,
    Lock,
    Server,
    FileCheck,
    ChevronDown,
    Mail,
    Phone,
    MessageCircle,
    Download,
    GraduationCap,
    UserCog,
    BookOpen,
    ClipboardList,
    Bus,
    Wallet,
    Calendar,
    Megaphone,
    LayoutDashboard,
    Sparkles,
} from 'lucide-react';
import './LearnX.css';

const pillars = [
    {
        icon: Globe,
        title: 'White-Label School Presence',
        short: 'Branded website + secure admin on your school identity.',
        long: 'Every school gets a branded public website and secure admin panel — logo, colours, content pages, and domain that match your identity. Build admissions trust and keep parents informed from the first visit.',
    },
    {
        icon: Building2,
        title: 'Complete School Operations (ERP)',
        short: 'Admissions to accounting — one connected workflow.',
        long: 'Run admissions, student lifecycle, timetable, attendance, exams, fees, HR, transport, hostel, library, visitors, and accounting in one connected workflow — with audit-ready records.',
    },
    {
        icon: Users,
        title: 'Parent & Student Engagement',
        short: 'Fees, attendance, PTM, transport — in one portal.',
        long: 'Parents track fees, attendance, notices, PTM slots, transport updates, and alerts. Students access resources, assessments, and results in one portal — fewer calls, clearer communication.',
    },
    {
        icon: Brain,
        title: 'AI Academic Studio',
        short: 'Board-aligned papers, PPTs, and evaluation support.',
        long: 'Teachers generate board-aligned question papers, lesson PPTs, and evaluation support — with chapter selection, difficulty, Bloom’s levels, preview/edit, print-ready PDF, and teacher-only answer keys.',
    },
    {
        icon: Layers,
        title: 'Modular + Multi-Branch Scale',
        short: 'Pay for modules you use. Scale across campuses.',
        long: 'Enable only what you use. Manage multiple campuses under one organisation with clean data isolation, role permissions, and consistent academic standards.',
    },
];

const qpSteps = [
    'Name the paper — title, academic year, paper type',
    'Select board — CBSE, ICSE, IGCSE, or State Boards',
    'Choose grade & subject',
    'Pick chapters & sub-topics for the current year',
    'Set difficulty & Bloom’s levels',
    'Configure question distribution by assessment type',
    'Upload reference papers or question banks',
    'Preview & edit — regenerate one question or the full paper',
    'Brand & export — logo, header, date, duration, print-ready PDF',
    'Insights & bank — frequency cues and reusable question banks',
];

const modules = [
    { icon: ClipboardList, title: 'Admissions & applicant pipeline', desc: 'Track enquiries to enrolment without losing leads.' },
    { icon: GraduationCap, title: 'Kindergarten readiness / campus visits', desc: 'Manage KG visits and readiness workflows smoothly.' },
    { icon: Users, title: 'Student directory & 360° profiles', desc: 'One profile for academics, fees, attendance, and documents.' },
    { icon: BookOpen, title: 'Academic structure & syllabus', desc: 'Map curriculum, classes, and board-aligned syllabi.' },
    { icon: Calendar, title: 'Timetable & substitution', desc: 'Publish periods and handle substitutions without chaos.' },
    { icon: FileCheck, title: 'Attendance + biometric support', desc: 'Daily attendance with optional biometric capture.' },
    { icon: ClipboardList, title: 'Unit tests, exams, seating & grading', desc: 'Run assessments with seating plans and structured grading.' },
    { icon: LayoutDashboard, title: 'Results & rankings', desc: 'Publish results and rankings with less manual effort.' },
    { icon: FileCheck, title: 'Digital report cards & certificates', desc: 'Board-style report cards and certificates, digitally ready.' },
    { icon: Wallet, title: 'Fee management & online payments', desc: 'Improve recovery with clear dues and online payment flows.' },
    { icon: Users, title: 'Parent engagement & PTM booking', desc: 'Notices, PTM slots, and updates parents can actually use.' },
    { icon: Megaphone, title: 'Communications & emergency alerts', desc: 'Broadcasts and urgent push alerts across the campus.' },
    { icon: Calendar, title: 'Events & school calendar', desc: 'Keep terms, events, and holidays in one shared calendar.' },
    { icon: Sparkles, title: 'Extracurricular / houses / sports', desc: 'Track houses, clubs, and sports participation.' },
    { icon: UserCog, title: 'HRMS & staff onboarding', desc: 'Hire, onboard, and manage staff records centrally.' },
    { icon: Calendar, title: 'Leave management', desc: 'Staff leave requests with clear approval trails.' },
    { icon: Wallet, title: 'Salary & payroll', desc: 'Run payroll with fewer reconciliation errors.' },
    { icon: FileCheck, title: 'Document management + OCR', desc: 'Store campus documents with smarter retrieval.' },
    { icon: Bus, title: 'Transport fleet + live GPS', desc: 'Live bus tracking and parent arrival alerts.' },
    { icon: Building2, title: 'Hostel & mess', desc: 'Hostel occupancy, mess, and resident workflows.' },
    { icon: ClipboardList, title: 'Front desk & visitor gate pass', desc: 'Controlled visitor entry with digital gate passes.' },
    { icon: BookOpen, title: 'Library', desc: 'Issue, return, and catalogue library resources.' },
    { icon: Wallet, title: 'Canteen / cashless wallet', desc: 'Cashless canteen purchases for students.' },
    { icon: LayoutDashboard, title: 'Accounting, budgeting, vendors', desc: 'Campus finance, budgets, and vendor records.' },
    { icon: BookOpen, title: 'LMS / resources / live class', desc: 'Learning resources and live-class support in one place.' },
    { icon: Brain, title: 'AI Academic Studio', desc: 'Papers, PPTs, evaluation & proctoring support for teachers.' },
    { icon: LayoutDashboard, title: 'Analytics & leadership dashboards', desc: 'Principal-ready views across academics and operations.' },
    { icon: Globe, title: 'White-label school website CMS', desc: 'Branded public site on your school domain.' },
];

const roles = [
    {
        id: 'principal',
        label: 'Principal',
        title: 'Principal / Academic Head',
        points: [
            'See attendance, fees, academics, and transport in one dashboard',
            'Standardise processes across branches',
            'Act early on exceptions and academic gaps',
        ],
    },
    {
        id: 'teacher',
        label: 'Teacher',
        title: 'Teacher / HOD',
        points: [
            'Mark attendance and manage classes',
            'Publish resources in the LMS',
            'Generate board-aligned papers and lesson PPTs with AI',
        ],
    },
    {
        id: 'parent',
        label: 'Parent',
        title: 'Parent',
        points: [
            'Track fees, attendance, and notices',
            'Book PTM slots without WhatsApp chaos',
            'Receive transport and emergency alerts',
        ],
    },
    {
        id: 'student',
        label: 'Student',
        title: 'Student',
        points: [
            'Access learning resources in one portal',
            'Take assessments and view results',
            'Stay aligned with classroom and homework updates',
        ],
    },
    {
        id: 'frontdesk',
        label: 'Front Desk',
        title: 'Front Desk / Admin',
        points: [
            'Handle admissions queries',
            'Issue visitor gate passes',
            'Manage documents with audit-friendly records',
        ],
    },
];

const steps = [
    { n: '01', title: 'Register your school', desc: 'Create your organisation and campus profile.' },
    { n: '02', title: 'Choose your modules', desc: 'Enable only what you need; expand later.' },
    { n: '03', title: 'Launch branded website + admin', desc: 'White-label presence and secure staff portals.' },
    { n: '04', title: 'Run daily operations with AI', desc: 'Fees, academics, parents, transport, and AI Academic Studio.' },
];

const faqs = [
    {
        q: 'Which boards does LearnX support?',
        a: 'CBSE, ICSE, IGCSE, and Indian State Boards including Telangana, Karnataka, Tamil Nadu, Andhra Pradesh, Kerala, Maharashtra, and more.',
    },
    {
        q: 'Is pricing modular?',
        a: 'Yes. Schools enable only the modules they need and pay for what they use — then add modules as the campus grows.',
    },
    {
        q: 'Can we manage multiple branches?',
        a: 'Yes. Education groups can run multi-campus operations under one organisation with secure tenant data isolation and role permissions.',
    },
    {
        q: 'How is school data secured?',
        a: 'LearnX uses multi-tenant isolation, role-based access, secure authentication, and audit-friendly records designed for school operations.',
    },
    {
        q: 'How does the AI Question Paper Generator work?',
        a: 'Teachers select board, grade, subject, chapters/sub-topics, difficulty, and Bloom’s levels; preview and edit questions; brand the paper; download a print-ready PDF; and view teacher-only answer keys on screen.',
    },
    {
        q: 'How long does implementation take?',
        a: 'Timelines depend on modules and campus size. Most schools start with core modules first. Onboarding support and training are included.',
    },
];

const jumpLinks = [
    { href: '#what', label: 'What is LearnX' },
    { href: '#pillars', label: 'Pillars' },
    { href: '#ai-studio', label: 'AI Studio' },
    { href: '#modules', label: 'Modules' },
    { href: '#demo', label: 'Book Demo' },
];

const Eyebrow = ({ children, center, lines = true }) => (
    <div className={`lx-eyebrow${center ? ' lx-eyebrow-center' : ''}`}>
        {lines && <span className="lx-eyebrow-line" aria-hidden="true" />}
        <span>{children}</span>
        {lines && <span className="lx-eyebrow-line" aria-hidden="true" />}
    </div>
);

const LearnX = () => {
    const [activeRole, setActiveRole] = useState('principal');
    const [openFaq, setOpenFaq] = useState(0);
    const [formData, setFormData] = useState({
        schoolName: '',
        board: '',
        city: '',
        campuses: '',
        modules: '',
        phone: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState({ type: 'idle', message: '' });

    const activeRoleData = roles.find((r) => r.id === activeRole) || roles[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending your demo request...' });

        if (!formData.schoolName || !formData.email || !formData.phone) {
            setStatus({ type: 'error', message: 'Please complete school name, email, and phone.' });
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.schoolName,
                    email: formData.email,
                    phone: formData.phone,
                    subject: 'LearnX Demo Request',
                    message: [
                        `Board: ${formData.board || '—'}`,
                        `City: ${formData.city || '—'}`,
                        `Campuses: ${formData.campuses || '—'}`,
                        `Modules: ${formData.modules || '—'}`,
                        formData.message || '',
                    ].join('\n'),
                }),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Demo request sent! Our team will contact you soon.' });
                setFormData({
                    schoolName: '',
                    board: '',
                    city: '',
                    campuses: '',
                    modules: '',
                    phone: '',
                    email: '',
                    message: '',
                });
            } else {
                setStatus({ type: 'error', message: 'Could not send request. Please try again or email us.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'Connection error. Please email info@kamglobalai.com.' });
        }
    };

    return (
        <div className="learnx-page">
            <Helmet>
                <title>LearnX | School Management System, ERP, LMS & AI Academic Tools</title>
                <meta
                    name="description"
                    content="LearnX is a modular school ERP and LMS with white-label websites, fee management, parent portals, transport tracking, and AI question paper generation for CBSE, ICSE, and State Board schools in India."
                />
                <meta
                    name="keywords"
                    content="school management system India, school ERP software, school LMS, AI question paper generator, CBSE school software, multi-branch school ERP, LearnX"
                />
            </Helmet>

            {/* Hero */}
            <section className="lx-hero">
                <div className="container">
                    <div className="lx-hero-grid">
                        <motion.div
                            className="lx-hero-copy"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                        >
                            <Eyebrow lines={false}>LearnX · School Operating System</Eyebrow>
                            <h1>One platform to run your school — academics, operations, parents, and AI teaching tools.</h1>
                            <p className="lx-hero-lead">
                                School ERP + LMS + AI — built for Indian boards. Replace Excel, WhatsApp groups,
                                fee apps, and exam tools with one connected system for CBSE, ICSE, IGCSE, and State Boards.
                            </p>
                            <div className="lx-hero-actions">
                                <a href="#demo" className="lx-btn lx-btn-primary">
                                    Book a Demo <ArrowRight size={16} />
                                </a>
                                <a href="#modules" className="lx-btn lx-btn-outline">
                                    Explore Modules
                                </a>
                            </div>
                            <p className="lx-trust-line">
                                CBSE · ICSE · State Boards · Multi-branch · AI Academic Tools
                            </p>
                            <p className="lx-micro">
                                Modular plans · Onboarding &amp; training included · Secure multi-tenant architecture
                            </p>
                            <nav className="lx-jump-nav" aria-label="LearnX sections">
                                {jumpLinks.map((l) => (
                                    <a key={l.href} href={l.href} className="lx-jump-link">{l.label}</a>
                                ))}
                            </nav>
                        </motion.div>
                        <motion.div
                            className="lx-hero-visual"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.1 }}
                        >
                            <img
                                src="/images/learnx-hero.png"
                                alt="LearnX school management platform hero"
                                loading="eager"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust strip */}
            <section className="lx-trust">
                <div className="container">
                    <p className="lx-trust-headline">Trusted by schools and education groups across India</p>
                    <p className="lx-trust-sub">
                        From single-campus schools to multi-branch education groups — LearnX helps leadership run
                        daily operations with one connected system.
                    </p>
                    <div className="lx-logo-row" aria-hidden="true">
                        {['CBSE Schools', 'ICSE Campuses', 'State Boards', 'Education Groups', 'Multi-branch'].map((t) => (
                            <span key={t} className="lx-logo-pill">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* What is LearnX */}
            <section id="what" className="lx-what">
                <div className="container">
                    <div className="lx-what-grid">
                        <div>
                            <Eyebrow>Product Overview</Eyebrow>
                            <h2>What is LearnX?</h2>
                            <p>
                                LearnX is an end-to-end, multi-tenant school management platform designed for modern
                                Indian campuses. It brings your white-label school website, admin ERP, role-based
                                portals, LMS, and AI Academic Studio into one secure ecosystem — so every stakeholder
                                works from the same source of truth.
                            </p>
                            <p>
                                Instead of juggling separate tools for fees, attendance, transport, exams, and parent
                                communication, schools enable only the modules they need and grow into more as they
                                scale. Whether you run one campus or a multi-branch group, LearnX keeps processes
                                consistent while isolating each school’s data with strong role-based access.
                            </p>
                            <p>
                                Built around real Indian academic workflows — unit tests, board exams, PTMs, report
                                cards, and board-aligned assessments — LearnX helps management, teachers, parents, and
                                students stay aligned every day.
                            </p>
                        </div>
                        <div className="lx-what-visual">
                            <img
                                src="/images/learnx-before-after.png"
                                alt="From manual school operations to LearnX digital platform"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Before / After */}
            <section className="lx-compare-ba">
                <div className="container">
                    <div className="lx-section-header">
                        <Eyebrow center>Problem → Solution</Eyebrow>
                        <h2>From fragmented tools to one connected system</h2>
                    </div>
                    <div className="lx-ba-grid">
                        <div className="lx-ba-card lx-ba-before">
                            <h3>Before LearnX</h3>
                            <ul>
                                {[
                                    'Multiple softwares + paper registers',
                                    'Fee delays and reconciliation errors',
                                    'WhatsApp notice chaos',
                                    'Hours spent on papers & PPTs',
                                    'No single view for the principal',
                                    'Inconsistent multi-branch processes',
                                ].map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="lx-ba-card lx-ba-after">
                            <h3>After LearnX</h3>
                            <ul>
                                {[
                                    'One login ecosystem for the whole campus',
                                    'Transparent fees & online payments',
                                    'Structured broadcasts, PTM, alerts',
                                    'AI Academic Studio for teachers',
                                    'Leadership dashboards across operations',
                                    'Multi-campus standards with data isolation',
                                ].map((t) => (
                                    <li key={t}>
                                        <CheckCircle2 size={15} aria-hidden="true" /> {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className="lx-ba-close">Less spreadsheet dependency. Fewer missed updates. Faster campus decisions.</p>
                </div>
            </section>

            {/* Pillars */}
            <section id="pillars" className="lx-pillars">
                <div className="container">
                    <div className="lx-section-header">
                        <Eyebrow center>Product Pillars</Eyebrow>
                        <h2>Five pillars that power every campus</h2>
                        <p>Everything your school needs — modular, connected, and ready for Indian boards.</p>
                    </div>
                    <div className="lx-pillars-grid">
                        {pillars.map((p, i) => (
                            <motion.article
                                key={p.title}
                                className="lx-pillar-card"
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <span className="lx-pillar-icon" aria-hidden="true">
                                    <p.icon size={20} strokeWidth={1.75} />
                                </span>
                                <h3>{p.title}</h3>
                                <p className="lx-pillar-short">{p.short}</p>
                                <p className="lx-pillar-long">{p.long}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Studio */}
            <section id="ai-studio" className="lx-ai">
                <div className="container">
                    <div className="lx-ai-grid">
                        <div>
                            <Eyebrow>Key Differentiator</Eyebrow>
                            <h2>AI Academic Studio — built for classroom reality</h2>
                            <p className="lx-lead">
                                Help teachers create board-aligned assessments and lessons faster — with full control
                                to preview, edit, and regenerate every question.
                            </p>
                            <p>
                                Supports Question Paper Generation, Lesson PPT Generation, Answer Sheet Evaluation
                                support, and proctoring-ready workflows for CBSE, ICSE, IGCSE, and State Board classrooms.
                            </p>
                            <h3 className="lx-ai-steps-title">AI Question Paper Generator — workflow</h3>
                            <ol className="lx-ai-steps">
                                {qpSteps.map((step, i) => (
                                    <li key={step}>
                                        <span>{i + 1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                            <p className="lx-ai-note">
                                <strong>Teacher-only:</strong> Answer keys stay on-screen for teachers — not
                                downloadable as a student-facing file.
                            </p>
                            <a href="#demo" className="lx-btn lx-btn-primary">
                                See AI Academic Studio in a Demo <ArrowRight size={16} />
                            </a>
                        </div>
                        <div className="lx-ai-visual">
                            <img
                                src="/images/learnx-ai-qp.png?v=2"
                                alt="Teacher using LearnX platform dashboard in classroom"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules */}
            <section id="modules" className="lx-modules">
                <div className="container">
                    <div className="lx-section-header">
                        <Eyebrow center>Module Explorer</Eyebrow>
                        <h2>Explore LearnX modules</h2>
                        <p>Start with what you need today. Add more as your campus grows.</p>
                    </div>
                    <div className="lx-modules-grid">
                        {modules.map((m) => (
                            <div key={m.title} className="lx-module-card">
                                <span className="lx-module-icon" aria-hidden="true">
                                    <m.icon size={18} strokeWidth={1.75} />
                                </span>
                                <div>
                                    <h3>{m.title}</h3>
                                    <p>{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roles */}
            <section className="lx-roles">
                <div className="container">
                    <div className="lx-section-header">
                        <Eyebrow center>Role-Based Experience</Eyebrow>
                        <h2>Built for every role on campus</h2>
                        <p>One platform. The right permissions. Clear daily workflows.</p>
                    </div>
                    <div className="lx-role-tabs" role="tablist" aria-label="Campus roles">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                role="tab"
                                aria-selected={activeRole === r.id}
                                className={`lx-role-tab${activeRole === r.id ? ' lx-role-tab--active' : ''}`}
                                onClick={() => setActiveRole(r.id)}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                    <div className="lx-role-panel" role="tabpanel">
                        <h3>{activeRoleData.title}</h3>
                        <ul>
                            {activeRoleData.points.map((p) => (
                                <li key={p}>
                                    <CheckCircle2 size={15} aria-hidden="true" /> {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="lx-steps">
                <div className="container">
                    <div className="lx-section-header">
                        <Eyebrow center>How It Works</Eyebrow>
                        <h2>Live in four practical steps</h2>
                    </div>
                    <div className="lx-steps-grid">
                        {steps.map((s) => (
                            <div key={s.n} className="lx-step-card">
                                <span className="lx-step-n">{s.n}</span>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="lx-steps-note">Onboarding support and training included.</p>
                </div>
            </section>

            {/* Security */}
            <section className="lx-security">
                <div className="container">
                    <div className="lx-section-header">
                        <Eyebrow center>Security &amp; Reliability</Eyebrow>
                        <h2>Secure by design for multi-campus education groups</h2>
                    </div>
                    <div className="lx-security-grid">
                        {[
                            { icon: Shield, title: 'Multi-tenant isolation', desc: 'Each school’s data stays separated.' },
                            { icon: Lock, title: 'Role-based access', desc: 'Every role sees only what they should.' },
                            { icon: Server, title: 'Secure authentication', desc: 'Controlled access for every portal.' },
                            { icon: FileCheck, title: 'Audit-friendly records', desc: 'Clear trails for fees, attendance, and approvals.' },
                            { icon: Layers, title: 'Scalable cloud', desc: 'From one campus to large education groups.' },
                        ].map((item) => (
                            <div key={item.title} className="lx-security-card">
                                <item.icon size={20} aria-hidden="true" />
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why choose */}
            <section className="lx-why">
                <div className="container">
                    <div className="lx-section-header">
                        <Eyebrow center>Why LearnX</Eyebrow>
                        <h2>Why schools choose LearnX over patchwork tools</h2>
                    </div>
                    <div className="lx-why-table-wrap">
                        <table className="lx-why-table">
                            <thead>
                                <tr>
                                    <th>Criteria</th>
                                    <th>Excel / WhatsApp</th>
                                    <th>Single-module tools</th>
                                    <th>Legacy ERPs</th>
                                    <th className="lx-why-hl">LearnX</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['All-in-one operations', 'No', 'Partial', 'Often heavy', 'Yes — modular ERP + LMS'],
                                    ['Parent engagement', 'Chaotic', 'Limited', 'Mixed', 'Portals + PTM + alerts'],
                                    ['AI teaching tools', 'No', 'Rare', 'Rare', 'AI Academic Studio'],
                                    ['Indian board workflows', 'Manual', 'Partial', 'Generic', 'CBSE / ICSE / State'],
                                    ['Multi-branch scale', 'Painful', 'Weak', 'Costly', 'Built-in isolation'],
                                    ['Pricing flexibility', 'Time cost', 'Pay for silos', 'Unused features', 'Pay for modules used'],
                                ].map((row) => (
                                    <tr key={row[0]}>
                                        <td>{row[0]}</td>
                                        <td>{row[1]}</td>
                                        <td>{row[2]}</td>
                                        <td>{row[3]}</td>
                                        <td className="lx-why-hl">{row[4]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Social proof */}
            <section className="lx-proof">
                <div className="container">
                    <div className="lx-section-header">
                        <Eyebrow center>Outcomes</Eyebrow>
                        <h2>Outcomes schools care about</h2>
                    </div>
                    <div className="lx-proof-grid">
                        <blockquote>
                            “Fee follow-ups became clearer for parents and accounts in the first term.”
                            <cite>— Principal, Multi-branch CBSE school</cite>
                        </blockquote>
                        <blockquote>
                            “Teachers cut paper-setting time significantly with board and chapter controls.”
                            <cite>— Academic Coordinator</cite>
                        </blockquote>
                        <blockquote>
                            “Parents finally stopped asking ‘Did you send the notice?’ every week.”
                            <cite>— School Admin</cite>
                        </blockquote>
                    </div>
                    <div className="lx-outcomes">
                        <div><strong>Fee recovery</strong><span>Clear dues + online payments</span></div>
                        <div><strong>Teacher time saved</strong><span>AI paper + PPT workflows</span></div>
                        <div><strong>Parent engagement</strong><span>Attendance, PTM, bus alerts</span></div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="lx-faq">
                <div className="container">
                    <div className="lx-section-header">
                        <Eyebrow center>FAQ</Eyebrow>
                        <h2>Common questions</h2>
                    </div>
                    <div className="lx-faq-list">
                        {faqs.map((faq, i) => (
                            <div key={faq.q} className={`lx-faq-item${openFaq === i ? ' lx-faq-item--open' : ''}`}>
                                <button
                                    type="button"
                                    className="lx-faq-q"
                                    aria-expanded={openFaq === i}
                                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown size={18} aria-hidden="true" />
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="lx-faq-a"
                                        >
                                            <p>{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo CTA */}
            <section id="demo" className="lx-demo">
                <div className="container">
                    <div className="lx-demo-grid">
                        <div>
                            <Eyebrow lines={false}>Get Started</Eyebrow>
                            <h2>Ready to run your school on one platform?</h2>
                            <p>
                                Book a demo to see LearnX ERP, parent portals, and AI Academic Studio configured for
                                your board and campus.
                            </p>
                            <ul className="lx-demo-points">
                                <li><CheckCircle2 size={15} /> Modular plans — pay for what you use</li>
                                <li><CheckCircle2 size={15} /> Onboarding support and training included</li>
                                <li><CheckCircle2 size={15} /> Built for CBSE, ICSE &amp; State Boards</li>
                            </ul>
                            <div className="lx-demo-links">
                                <a
                                    href="https://wa.me/918050766363?text=Hi%2C%20I%27m%20interested%20in%20a%20LearnX%20demo%20for%20our%20school."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="lx-btn lx-btn-outline"
                                >
                                    <MessageCircle size={16} /> WhatsApp Enquire
                                </a>
                                <a href="mailto:info@kamglobalai.com?subject=LearnX%20Brochure" className="lx-btn lx-btn-outline">
                                    <Download size={16} /> Request Brochure
                                </a>
                                <a href="tel:+918050766363" className="lx-btn lx-btn-outline">
                                    <Phone size={16} /> Talk to Onboarding
                                </a>
                            </div>
                        </div>

                        <form className="lx-demo-form" onSubmit={handleSubmit}>
                            <h3>Book a Demo</h3>
                            {status.type !== 'idle' && (
                                <div className={`lx-form-status lx-form-status--${status.type}`}>
                                    {status.message}
                                </div>
                            )}
                            <input name="schoolName" placeholder="School name *" value={formData.schoolName} onChange={handleChange} required />
                            <div className="lx-form-row">
                                <select name="board" value={formData.board} onChange={handleChange}>
                                    <option value="">Board</option>
                                    <option value="CBSE">CBSE</option>
                                    <option value="ICSE">ICSE</option>
                                    <option value="IGCSE">IGCSE</option>
                                    <option value="State Board">State Board</option>
                                    <option value="Multiple">Multiple</option>
                                </select>
                                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                            </div>
                            <div className="lx-form-row">
                                <input name="campuses" placeholder="No. of campuses" value={formData.campuses} onChange={handleChange} />
                                <input name="modules" placeholder="Modules interested" value={formData.modules} onChange={handleChange} />
                            </div>
                            <div className="lx-form-row">
                                <input name="phone" type="tel" placeholder="Phone *" value={formData.phone} onChange={handleChange} required />
                                <input name="email" type="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
                            </div>
                            <textarea name="message" placeholder="Message (optional)" rows={3} value={formData.message} onChange={handleChange} />
                            <button type="submit" className="lx-btn lx-btn-primary lx-btn-full" disabled={status.type === 'loading'}>
                                {status.type === 'loading' ? 'Sending...' : 'Request Demo'}
                                {status.type !== 'loading' && <ArrowRight size={16} />}
                            </button>
                            <p className="lx-form-alt">
                                Or email <a href="mailto:info@kamglobalai.com"><Mail size={13} /> info@kamglobalai.com</a>
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            <section className="lx-cta-bar">
                <div className="container">
                    <div className="lx-cta-card">
                        <h2>Modular school ERP + LMS + AI — built for Indian boards</h2>
                        <p>Explore all KamGlobal AI education products or talk to our team today.</p>
                        <div className="lx-cta-actions">
                            <Link to="/products" className="lx-btn lx-btn-primary">
                                All Products <ArrowRight size={16} />
                            </Link>
                            <Link to="/contact" className="lx-btn lx-btn-secondary">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LearnX;
