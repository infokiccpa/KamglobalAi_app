import { useEffect, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    CheckCircle,
    XCircle,
    Mail,
    School,
    GraduationCap,
    Sparkles,
    Brain,
    Video,
    MessageCircle,
    Globe2,
    BarChart3,
    Users,
    BookOpen,
    Award,
    ClipboardCheck,
    CalendarClock,
    FileText,
    AlertTriangle,
    Wallet,
    ScanFace,
    Compass,
    Bus,
    Bell,
    UserRound,
    Building2,
    ShieldCheck,
    Target,
    Minus,
    Check,
} from 'lucide-react';
import { Reveal, SplitText } from '../components/motion/Reveal';
import { EASE_OUT, VIEWPORT, fadeUpItem, staggerParent, trackPointer } from '../components/motion/motionPresets';
import { PRODUCT_GETTING_STARTED } from '../data/products';
import './Products.css';

const SITES = {
    learnx: { url: 'https://learnx.school', domain: 'learnx.school' },
    eduaitutors: { url: 'https://eduaitutors.com', domain: 'eduaitutors.com' },
    lms: { url: 'https://kam.eduaitutors.online', domain: 'kam.eduaitutors.online' },
};

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' };

const gridMotion = (stagger = 0.08, delay = 0) => ({
    variants: staggerParent(stagger, delay),
    initial: 'hidden',
    whileInView: 'show',
    viewport: VIEWPORT,
});

const Eyebrow = ({ children, center }) => (
    <div className={`pr-eyebrow${center ? ' pr-eyebrow--center' : ''}`}>
        <span className="pr-eyebrow-line" aria-hidden="true" />
        <span>{children}</span>
    </div>
);

const SectionHead = ({ eyebrow, title, accent, children, center = true }) => (
    <div className={`pr-head${center ? ' pr-head--center' : ''}`}>
        <Reveal y={12}>
            <Eyebrow center={center}>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText text={title} accent={accent} />
        {children && (
            <Reveal delay={0.15} y={14}>
                <p>{children}</p>
            </Reveal>
        )}
    </div>
);

const MockWindow = ({ url, children, className = '' }) => (
    <div className={`pr-win ${className}`.trim()}>
        <div className="pr-win-bar" aria-hidden="true">
            <span className="pr-win-dots">
                <i />
                <i />
                <i />
            </span>
            <span className="pr-win-url">{url}</span>
            <span className="pr-win-live">
                <span className="pr-pulse" /> Live
            </span>
        </div>
        <div className="pr-win-body">{children}</div>
    </div>
);

/* ---------------- LearnX preview ---------------- */
const LX_ROLES = {
    Principal: {
        greet: 'Good morning, Principal',
        sub: 'Campus overview',
        stats: [
            ['Students', '1,248', '+36 this term'],
            ['Present today', '96.4%', 'All classes marked'],
            ['Fees this term', '82%', 'Collected'],
        ],
        listTitle: 'Needs your attention',
        list: [
            ['Grade 9A — 4 repeated absences this week', 'Review'],
            ['Bus R-2 running 10 min late · parents informed', 'Track'],
            ['12 admission applications ready to review', 'Open'],
        ],
    },
    Teacher: {
        greet: 'Good morning, Ms. Rao',
        sub: 'My day',
        stats: [
            ['Periods today', '5', 'Clash-free timetable'],
            ['Homework to review', '18', 'Grade 7B · 8A'],
            ['Attendance', 'Done', 'All periods marked'],
        ],
        listTitle: 'Today',
        list: [
            ['Substitute suggested for Period 4 · Grade 6C', 'Accept'],
            ['AI question paper draft ready · Science', 'Review'],
            ['Grade 8A unit test marks pending', 'Enter'],
        ],
    },
    Parent: {
        greet: 'Welcome back, Mrs. Sharma',
        sub: 'Aarav · Grade 7B',
        stats: [
            ['Attendance', '96%', 'This term'],
            ['Homework', '2 due', 'This week'],
            ['Next PTM', 'Fri', 'Slot confirmed'],
        ],
        listTitle: 'Updates',
        list: [
            ['Term 2 fee · ₹12,500 due in 5 days', 'Pay'],
            ['WhatsApp · bus ETA 6 min', 'Track'],
            ['Report card published', 'View'],
        ],
    },
    Finance: {
        greet: 'Finance desk',
        sub: 'Fees & payroll',
        stats: [
            ['Fees this term', '82%', 'Collected'],
            ['UPI receipts today', '64', 'Posted to student records'],
            ['Fee-default signals', '7', 'Families flagged early'],
        ],
        listTitle: 'Follow-ups',
        list: [
            ['Scholarship approvals pending', 'Open'],
            ['Payroll run due Friday', 'Review'],
            ['Hostel & canteen wallets synced', 'View'],
        ],
    },
};
const LX_ROLE_KEYS = Object.keys(LX_ROLES);

const LearnXPreview = () => {
    const [role, setRole] = useState('Principal');
    const [auto, setAuto] = useState(true);

    useEffect(() => {
        if (!auto) return undefined;
        const id = setInterval(() => {
            setRole((r) => LX_ROLE_KEYS[(LX_ROLE_KEYS.indexOf(r) + 1) % LX_ROLE_KEYS.length]);
        }, 4200);
        return () => clearInterval(id);
    }, [auto]);

    const data = LX_ROLES[role];

    return (
        <div className="pr-preview pr-preview--learnx">
            <MockWindow url="portal.yourschool.edu/overview">
                <div className="pr-lx-roles" role="group" aria-label="Preview LearnX as">
                    {LX_ROLE_KEYS.map((key) => (
                        <button
                            key={key}
                            type="button"
                            className={`pr-lx-role${role === key ? ' is-active' : ''}`}
                            aria-pressed={role === key}
                            onClick={() => {
                                setAuto(false);
                                setRole(key);
                            }}
                        >
                            {role === key && <motion.span layoutId="pr-lx-role-pill" className="pr-lx-role-pill" />}
                            <span>{key}</span>
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={role}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                    >
                        <div className="pr-lx-greet">
                            <small>{data.sub}</small>
                            <strong>{data.greet}</strong>
                        </div>
                        <div className="pr-lx-stats">
                            {data.stats.map(([label, value, note]) => (
                                <div key={label} className="pr-lx-stat">
                                    <small>{label}</small>
                                    <strong>{value}</strong>
                                    <em>{note}</em>
                                </div>
                            ))}
                        </div>
                        <div className="pr-lx-list">
                            <span className="pr-lx-list-title">{data.listTitle}</span>
                            <ul>
                                {data.list.map(([text, action]) => (
                                    <li key={text}>
                                        <span className="pr-lx-dot" aria-hidden="true" />
                                        <span>{text}</span>
                                        <b>{action}</b>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </MockWindow>
            <span className="pr-float pr-float--a" aria-hidden="true">
                <Wallet size={14} /> Fee paid · receipt ready
            </span>
            <span className="pr-float pr-float--b" aria-hidden="true">
                <Bus size={14} /> WhatsApp · bus ETA 6 min
            </span>
            <p className="pr-preview-note">Illustrative preview with sample data</p>
        </div>
    );
};

/* ---------------- EduAiTutors preview ---------------- */
const EDU_GAPS = [
    { chapter: 'Physics · Rotational motion', value: 42 },
    { chapter: 'Chemistry · Equilibrium', value: 58 },
    { chapter: 'Biology · Genetics', value: 81 },
    { chapter: 'Biology · Human physiology', value: 74 },
];

const EduPreview = () => (
    <div className="pr-preview pr-preview--edu">
        <MockWindow url="eduaitutors.com/dashboard">
            <div className="pr-edu-head">
                <div>
                    <small>AI mock test report</small>
                    <strong>NEET · Mock test 12</strong>
                </div>
                <span className="pr-chip pr-chip--accent">
                    <Sparkles size={12} aria-hidden="true" /> Gap report ready
                </span>
            </div>
            <div className="pr-edu-grid">
                <div className="pr-edu-card">
                    <small>Predicted rank trajectory</small>
                    <svg viewBox="0 0 200 70" className="pr-edu-spark" aria-hidden="true">
                        <motion.path
                            d="M4 58 C 30 52, 44 56, 62 44 S 98 40, 118 30 S 160 22, 196 10"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.3 }}
                        />
                        <circle cx="196" cy="10" r="4" />
                    </svg>
                    <em>Recalculated after every mock</em>
                </div>
                <div className="pr-edu-card pr-edu-card--time">
                    <small>Time per question</small>
                    <strong>74s</strong>
                    <em>Hesitation flagged in 6 questions</em>
                </div>
            </div>
            <div className="pr-edu-gaps">
                <span className="pr-lx-list-title">Chapter mastery</span>
                {EDU_GAPS.map((g, i) => (
                    <div key={g.chapter} className="pr-edu-gap">
                        <span>{g.chapter}</span>
                        <span className="pr-edu-bar">
                            <motion.span
                                className={g.value < 60 ? 'is-low' : ''}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${g.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 + i * 0.12 }}
                            />
                        </span>
                        <b>{g.value}%</b>
                    </div>
                ))}
            </div>
            <div className="pr-edu-flag">
                <AlertTriangle size={14} aria-hidden="true" />
                Repeat error · Units &amp; dimensions (3 tests) — added to mentor call
            </div>
        </MockWindow>
        <span className="pr-float pr-float--a" aria-hidden="true">
            <Video size={14} /> Live class · GCC batch tonight
        </span>
        <span className="pr-float pr-float--b" aria-hidden="true">
            <MessageCircle size={14} /> Doubt answered by mentor
        </span>
        <p className="pr-preview-note">Illustrative preview with sample data</p>
    </div>
);

/* ---------------- AI-Powered LMS preview ---------------- */
const LMS_TASKS = ['Revise: Cell structure (12 min)', 'Practice quiz · 10 questions', 'Live class · Algebra basics'];
const LMS_COURSES = [
    { name: 'Demo package', progress: 100 },
    { name: 'NEET Full time', progress: 64 },
    { name: 'Foundation', progress: 38 },
];

const LmsPreview = () => (
    <div className="pr-preview pr-preview--lms">
        <MockWindow url="kam.eduaitutors.online/learn">
            <div className="pr-edu-head">
                <div>
                    <small>Student dashboard</small>
                    <strong>Your learning today</strong>
                </div>
                <span className="pr-chip pr-chip--accent">
                    <Brain size={12} aria-hidden="true" /> AI Tutor
                </span>
            </div>
            <div className="pr-lms-grid">
                <div className="pr-edu-card pr-lms-plan">
                    <small>Personalized study plan</small>
                    <motion.ul {...gridMotion(0.35, 0.4)}>
                        {LMS_TASKS.map((task) => (
                            <motion.li key={task} variants={fadeUpItem}>
                                <span className="pr-lms-check" aria-hidden="true">
                                    <Check size={11} strokeWidth={3} />
                                </span>
                                {task}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
                <div className="pr-lms-side">
                    <div className="pr-edu-card pr-lms-ring">
                        <svg viewBox="0 0 44 44" aria-hidden="true">
                            <circle cx="22" cy="22" r="18" className="pr-ring-track" />
                            <motion.circle
                                cx="22"
                                cy="22"
                                r="18"
                                className="pr-ring-fill"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 0.86 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.3 }}
                            />
                        </svg>
                        <div>
                            <strong>86%</strong>
                            <small>Progress</small>
                        </div>
                    </div>
                    <div className="pr-edu-card pr-lms-badge">
                        <Award size={18} aria-hidden="true" />
                        <div>
                            <strong>12</strong>
                            <small>Certificates</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pr-edu-gaps">
                <span className="pr-lx-list-title">My courses</span>
                {LMS_COURSES.map((c, i) => (
                    <div key={c.name} className="pr-edu-gap">
                        <span>{c.name}</span>
                        <span className="pr-edu-bar">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: `${c.progress}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: EASE_OUT, delay: 0.3 + i * 0.12 }}
                            />
                        </span>
                        <b>{c.progress}%</b>
                    </div>
                ))}
            </div>
        </MockWindow>
        <span className="pr-float pr-float--a" aria-hidden="true">
            <Video size={14} /> Live class starts in 5 min
        </span>
        <span className="pr-float pr-float--b" aria-hidden="true">
            <Award size={14} /> Badge earned · Consistency
        </span>
        <p className="pr-preview-note">Illustrative preview with sample data</p>
    </div>
);

/* ---------------- Product chapter layout ---------------- */
const ProductChapter = ({
    id,
    index,
    theme,
    name,
    kind,
    site,
    to,
    toLabel,
    demo,
    headline,
    desc,
    facts,
    highlights,
    preview,
    reverse,
    children,
}) => (
    <section id={id} className={`pr-chapter pr-theme--${theme}`} aria-labelledby={`${id}-title`}>
        <span className="pr-chapter-num" aria-hidden="true">{index}</span>
        <div className="container">
            <div className={`pr-chapter-grid${reverse ? ' is-reverse' : ''}`}>
                <div className="pr-chapter-copy">
                    <Reveal y={14}>
                        <div className="pr-chapter-tag">
                            <span className="pr-chapter-mark" aria-hidden="true">{name.charAt(0)}</span>
                            <span>
                                <small>{kind}</small>
                                <a href={site.url} {...EXTERNAL} className="pr-domain">
                                    {site.domain} <ArrowUpRight size={13} aria-hidden="true" />
                                </a>
                            </span>
                        </div>
                    </Reveal>
                    <Reveal y={16} delay={0.05}>
                        <h2 id={`${id}-title`}>
                            {name}
                            <span>{headline}</span>
                        </h2>
                        <p className="pr-lead">{desc}</p>
                    </Reveal>
                    {facts && (
                        <motion.ul className="pr-facts" {...gridMotion(0.08, 0.1)}>
                            {facts.map((f) => (
                                <motion.li key={f.label} variants={fadeUpItem}>
                                    <strong>{f.value}</strong>
                                    <span>{f.label}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                    <motion.ul className="pr-highlights" {...gridMotion(0.06, 0.15)}>
                        {highlights.map((h) => (
                            <motion.li key={h} variants={fadeUpItem}>
                                <CheckCircle2 size={16} aria-hidden="true" />
                                {h}
                            </motion.li>
                        ))}
                    </motion.ul>
                    <Reveal y={12} delay={0.1}>
                        <div className="pr-actions">
                            <a href={site.url} {...EXTERNAL} className="pr-btn pr-btn--accent">
                                Visit {site.domain} <ArrowUpRight size={16} aria-hidden="true" />
                            </a>
                            <Link to={to} className="pr-btn pr-btn--ghost">
                                {toLabel} <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                            {demo && (
                                <Link to={demo.to} className="pr-text-link">
                                    {demo.label} <ArrowRight size={14} aria-hidden="true" />
                                </Link>
                            )}
                        </div>
                    </Reveal>
                </div>
                <motion.div
                    className="pr-chapter-visual"
                    initial={{ opacity: 0, y: 40, rotateX: 12 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, ease: EASE_OUT }}
                >
                    {preview}
                </motion.div>
            </div>
            {children}
        </div>
    </section>
);

/* ---------------- Data ---------------- */
const LX_JOBS = [
    { title: 'Win admissions', desc: 'Enquiry → campus visit → enrolment on one pipeline — no lost leads in WhatsApp threads.' },
    { title: 'Run academics', desc: 'Timetable, homework, exams, report cards and AI lesson help in one academic spine.' },
    { title: 'Teach online & offline', desc: 'LMS, live class and proctoring on the same student record.' },
    { title: 'Move money safely', desc: 'Fees, scholarships, accounting, payroll and gateways tied to every student.' },
    { title: 'Operate the campus', desc: 'Transport, hostel, canteen, library, biometric and front desk on one login.' },
    { title: 'Keep parents close', desc: 'App alerts, WhatsApp, PTM booking and fee clarity — without five group chats.' },
];

const LX_AI = [
    { icon: CalendarClock, title: 'Timetable & substitution', desc: 'Clash-free timetables and a substitute suggested when a teacher is absent.' },
    { icon: FileText, title: 'Question papers', desc: 'Balanced papers drafted from your syllabus — teachers review, not retype.' },
    { icon: AlertTriangle, title: 'Early-warning risk', desc: 'Attendance dips and falling grades flagged before the term report.' },
    { icon: Wallet, title: 'Fee-default signals', desc: 'Families likely to miss dues surfaced early for finance.' },
    { icon: ScanFace, title: 'Online proctoring', desc: 'Face and gaze signals keep online exams honest.' },
    { icon: Compass, title: 'Career counselling', desc: 'Guidance drawn from years of real marks and strengths.' },
];

const LX_FOR = ['Promoters & directors', 'Principals & academic heads', 'Trust / NGO administrators', 'Finance & HR managers', 'Multi-branch operators'];

const EDU_METHOD = [
    { title: 'Diagnose', desc: 'AI diagnostic maps weak zones.' },
    { title: 'Design', desc: 'A study plan built around the gaps.' },
    { title: 'Deliver', desc: 'Live, concept-first mentor classes.' },
    { title: 'Evaluate', desc: 'AI mocks with chapter-level reports.' },
    { title: 'Improve', desc: 'Mentor calls fix repeat errors.' },
];

const EDU_PILLARS = [
    { icon: Video, title: 'Live interactive classes', desc: 'Real-time two-way sessions with digital whiteboards, polling and doubt-solving — India & GCC batches.' },
    { icon: Brain, title: 'AI-powered mock analytics', desc: 'Time-per-question tracking, gap reports, predictive rank trajectory and repeat-error tagging.' },
    { icon: MessageCircle, title: '24/7 doubts & 1:1 mentorship', desc: 'Text, photo and voice doubts with weekly mentor calls from IITian and doctor mentors.' },
    { icon: Globe2, title: 'GCC / NRI-ready batches', desc: 'UAE, Saudi & Oman-friendly timings, DASA/CIWG counselling, same NCERT curriculum.' },
];

const EDU_PROGRAMS = [
    { title: 'Foundation (Classes 6–10)', desc: 'Maths & Science basics for school success and future NEET/JEE readiness.' },
    { title: 'NEET Full-Time / Crash', desc: 'Structured medical entrance prep with AI diagnostics and mentor reviews.' },
    { title: 'JEE Mains & Advanced', desc: 'Concept-first Physics, Chemistry and Maths with live mentoring.' },
    { title: 'Dropper batches', desc: 'Gap-led personalisation from your previous attempt — not a generic repeat syllabus.' },
];

const EDU_COMPARE = [
    { label: 'Class size', edu: 'Small, mentor-accessible live batches', old: '150 to 300 students per batch' },
    { label: 'Learning plan', edu: 'AI-personalised for each student’s gaps and pace', old: 'Same plan for every student' },
    { label: 'Mock analysis', edu: 'Breakdown by chapter, time and errors', old: 'Basic score report' },
    { label: 'Parent reports', edu: 'Weekly AI reports and a real-time dashboard', old: 'Monthly reports or none' },
    { label: 'GCC support', edu: 'Batches in UAE and KSA-friendly time zones', old: 'IST timings only' },
];

const LMS_FEATURES = [
    { icon: Brain, title: 'AI-powered learning', desc: 'Smart recommendations and personalised learning paths.' },
    { icon: Video, title: 'Live classes & meetings', desc: 'Integrated live sessions, chat and screen sharing.' },
    { icon: ClipboardCheck, title: 'Courses & assessments', desc: 'Interactive courses and assessment tools.' },
    { icon: Award, title: 'Certificates & badges', desc: 'Reward achievements with custom badges.' },
    { icon: BarChart3, title: 'Analytics & reports', desc: 'Track learner progress with clear analytics.' },
    { icon: Users, title: 'Multi-role access', desc: 'Dashboards for students, instructors and admins.' },
];

const LMS_ROLES = [
    { icon: GraduationCap, title: 'Students', desc: 'Access courses, track progress and achieve goals.' },
    { icon: UserRound, title: 'Instructors', desc: 'Create, manage and teach courses with ease.' },
    { icon: Building2, title: 'Institutions', desc: 'Manage users, courses and reports in one platform.' },
    { icon: ShieldCheck, title: 'Admins', desc: 'Control, security and management.' },
];

const GRADE_LEVELS = [
    { title: 'Pre-KG', desc: 'Early foundations & play-based learning' },
    { title: 'Elementary', desc: 'Core skills, Grades 1–5' },
    { title: 'Middle School', desc: 'Concept mastery, Grades 6–8' },
    { title: 'High School', desc: 'Exam prep & success, Grades 9–12' },
];

const FIT_ROWS = [
    { label: 'Built for', values: ['Schools, colleges & multi-branch trusts', 'NEET, JEE & foundation students (India & GCC)', 'Students, instructors & institutions'] },
    { label: 'What it does', values: ['Runs admissions, academics, fees, campus ops & parent comms', 'Live mentor-led coaching with AI mock analytics', 'Courses, live classes, assessments & certificates'] },
    { label: 'AI inside', values: ['Timetable solver, question papers, risk & fee signals', 'Diagnostics, gap reports, rank prediction', 'Personalised study plans & recommendations'] },
];

const HERO_STACK = [
    { key: 'learnx', theme: 'learnx', name: 'LearnX', kind: 'School OS', site: SITES.learnx, icon: School },
    { key: 'eduaitutors', theme: 'edu', name: 'EduAiTutors', kind: 'NEET & JEE coaching', site: SITES.eduaitutors, icon: GraduationCap },
    { key: 'lms', theme: 'lms', name: 'AI-Powered LMS', kind: 'Learning platform', site: SITES.lms, icon: Brain },
];

const NAV_LINKS = [
    { href: '#learnx', label: 'LearnX', theme: 'learnx' },
    { href: '#eduaitutors', label: 'EduAiTutors', theme: 'edu' },
    { href: '#ai-lms', label: 'AI-Powered LMS', theme: 'lms' },
    { href: '#compare', label: 'Which fits?' },
    { href: '#getting-started', label: 'Getting Started' },
    { href: '#demo', label: 'Request Demo' },
];

const ROLE_OPTIONS = ['Student', 'Parent', 'Educator', 'Administrator', 'Other'];
const INTEREST_OPTIONS = ['LearnX', 'EduAiTutors', 'AI-Powered LMS', 'Multiple'];

/* ---------------- Page ---------------- */
const Products = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', institution: '', role: '', gradeRange: '' });
    const [status, setStatus] = useState({ type: 'idle', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const pick = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.role) {
            setStatus({ type: 'error', message: 'Please complete the required fields, including “I am a”.' });
            return;
        }
        setStatus({ type: 'loading', message: 'Submitting your request...' });
        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setStatus({ type: 'success', message: 'Request received! We’ll be in touch soon.' });
                setFormData({ name: '', email: '', phone: '', institution: '', role: '', gradeRange: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className="pr-page">
                <Helmet>
                    <title>Products | LearnX, EduAiTutors & AI-Powered LMS | KAM Global AI</title>
                    <meta
                        name="description"
                        content="Explore KAM Global AI's education products: LearnX school operating system, EduAiTutors online NEET & JEE coaching, and the AI-Powered LMS for students, instructors and institutions."
                    />
                </Helmet>

                {/* Hero */}
                <section className="pr-hero">
                    <span className="pr-hero-glow" aria-hidden="true" />
                    <div className="container pr-hero-grid">
                        <div className="pr-hero-copy">
                            <motion.span
                                className="pr-kicker"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: EASE_OUT }}
                            >
                                <span className="pr-pulse" aria-hidden="true" /> 3 live products
                            </motion.span>
                            <SplitText as="h1" text="Education Products for" accent="Schools, Students & Institutions" breakBeforeAccent />
                            <Reveal delay={0.2} y={14}>
                                <p className="pr-hero-lead">
                                    A school operating system, an online NEET &amp; JEE coaching platform, and an AI-Powered
                                    LMS — built by KAM Global AI. Explore each product here, visit its live website, or ask
                                    us for a walkthrough.
                                </p>
                                <div className="pr-actions">
                                    <a href="#demo" className="pr-btn pr-btn--primary">
                                        Request a Product Demo <ArrowRight size={16} aria-hidden="true" />
                                    </a>
                                    <Link to="/contact?type=Product%20Demo&subject=Products#form" className="pr-btn pr-btn--ghost">
                                        Contact Us
                                    </Link>
                                </div>
                            </Reveal>
                        </div>

                        <motion.div
                            className="pr-stack"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
                        >
                            {HERO_STACK.map((p, i) => (
                                <a
                                    key={p.key}
                                    href={p.site.url}
                                    {...EXTERNAL}
                                    className={`pr-stack-card pr-theme--${p.theme} is-${i + 1}`}
                                    aria-label={`Visit ${p.name} at ${p.site.domain} (opens in a new tab)`}
                                >
                                    <span className="pr-stack-bar" aria-hidden="true">
                                        <i />
                                        <i />
                                        <i />
                                        <em>{p.site.domain}</em>
                                    </span>
                                    <span className="pr-stack-icon" aria-hidden="true">
                                        <p.icon size={20} />
                                    </span>
                                    <strong>{p.name}</strong>
                                    <small>{p.kind}</small>
                                    <span className="pr-stack-skeleton" aria-hidden="true">
                                        <i />
                                        <i />
                                        <i />
                                    </span>
                                    <span className="pr-stack-visit">
                                        Visit site <ArrowUpRight size={14} aria-hidden="true" />
                                    </span>
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Sticky product nav */}
                <nav className="pr-nav" aria-label="Product sections">
                    <div className="container pr-nav-inner">
                        {NAV_LINKS.map((l) => (
                            <a key={l.href} href={l.href} className={`pr-nav-link${l.theme ? ` pr-theme--${l.theme}` : ''}`}>
                                {l.theme && <span className="pr-nav-dot" aria-hidden="true" />}
                                {l.label}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* LearnX */}
                <ProductChapter
                    id="learnx"
                    index="01"
                    theme="learnx"
                    name="LearnX"
                    kind="School operating system"
                    site={SITES.learnx}
                    to="/products/learnx"
                    toLabel="Explore LearnX"
                    demo={{ to: '/products/learnx#demo', label: 'Book a free demo' }}
                    headline="Your whole school. In sync."
                    desc="Attendance, fees, buses, exams and parent updates — live on one platform under your school's name. LearnX combines LMS, school ERP and campus operations, so everyone sees what they need the moment it happens."
                    facts={[
                        { value: '1', label: 'login for every role' },
                        { value: '6', label: 'core school jobs' },
                        { value: '35+', label: 'modules' },
                    ]}
                    highlights={['Live in 7 days', 'Free data migration', 'Your domain, your brand', 'CBSE, ICSE, IB & State Boards']}
                    preview={<LearnXPreview />}
                >
                    <div className="pr-sub">
                        <h3 className="pr-sub-title">Built like your school actually works</h3>
                        <motion.ol className="pr-jobs" {...gridMotion(0.07)}>
                            {LX_JOBS.map((job, i) => (
                                <motion.li key={job.title} className="pr-job rv-spot" variants={fadeUpItem} onPointerMove={trackPointer}>
                                    <span className="pr-job-num">{String(i + 1).padStart(2, '0')}</span>
                                    <strong>{job.title}</strong>
                                    <p>{job.desc}</p>
                                </motion.li>
                            ))}
                        </motion.ol>
                    </div>
                    <div className="pr-sub pr-split">
                        <div>
                            <h3 className="pr-sub-title">AI that already knows your students</h3>
                            <motion.ul className="pr-ai-list" {...gridMotion(0.06)}>
                                {LX_AI.map((a) => (
                                    <motion.li key={a.title} variants={fadeUpItem}>
                                        <span className="pr-icon" aria-hidden="true">
                                            <a.icon size={17} />
                                        </span>
                                        <div>
                                            <strong>{a.title}</strong>
                                            <p>{a.desc}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                        <Reveal className="pr-panel" y={20}>
                            <h3 className="pr-sub-title">Made for people who run schools</h3>
                            <ul className="pr-chips">
                                {LX_FOR.map((who) => (
                                    <li key={who}>{who}</li>
                                ))}
                            </ul>
                            <div className="pr-whitelabel">
                                <span className="pr-whitelabel-url">
                                    https://portal.<b>yourschool.edu.in</b>
                                </span>
                                <p>
                                    White-label by default — your web address, crest, colours and sender names on every
                                    portal, receipt and message.
                                </p>
                            </div>
                            <a href={SITES.learnx.url} {...EXTERNAL} className="pr-text-link">
                                See the full platform on learnx.school <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        </Reveal>
                    </div>
                </ProductChapter>

                {/* EduAiTutors */}
                <ProductChapter
                    id="eduaitutors"
                    index="02"
                    theme="edu"
                    name="EduAiTutors"
                    kind="Online NEET & JEE coaching"
                    site={SITES.eduaitutors}
                    to="/products/eduaitutors"
                    toLabel="Explore EduAiTutors"
                    headline="A system, not just content."
                    desc="Live, mentor-led online coaching for NEET, JEE and foundation learners in India and the GCC — with AI mock analytics, 24/7 doubt support and weekly one-to-one mentor calls. Fully online, so students learn from any city."
                    facts={[
                        { value: '100+', label: 'full-length AI mock tests' },
                        { value: '24h', label: 'longest a doubt waits' },
                        { value: '1:1', label: 'weekly mentor calls' },
                    ]}
                    highlights={['Live India & GCC batches', 'NCERT mastery curriculum', 'Parent dashboard & monthly reviews', 'HD recordings available 24/7']}
                    preview={<EduPreview />}
                    reverse
                >
                    <div className="pr-sub">
                        <h3 className="pr-sub-title">How EduAiTutors works</h3>
                        <motion.ol className="pr-method" {...gridMotion(0.12)}>
                            {EDU_METHOD.map((step, i) => (
                                <motion.li key={step.title} variants={fadeUpItem}>
                                    <span className="pr-method-num">{i + 1}</span>
                                    <strong>{step.title}</strong>
                                    <p>{step.desc}</p>
                                </motion.li>
                            ))}
                        </motion.ol>
                    </div>
                    <motion.div className="pr-sub pr-pillars" {...gridMotion(0.08)}>
                        {EDU_PILLARS.map((p) => (
                            <motion.article key={p.title} className="pr-pillar rv-spot" variants={fadeUpItem} onPointerMove={trackPointer}>
                                <span className="pr-icon" aria-hidden="true">
                                    <p.icon size={18} />
                                </span>
                                <h4>{p.title}</h4>
                                <p>{p.desc}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                    <div className="pr-sub pr-split">
                        <div>
                            <h3 className="pr-sub-title">
                                <BookOpen size={18} aria-hidden="true" /> Featured programs
                            </h3>
                            <motion.ul className="pr-programs" {...gridMotion(0.07)}>
                                {EDU_PROGRAMS.map((prog) => (
                                    <motion.li key={prog.title} variants={fadeUpItem}>
                                        <strong>{prog.title}</strong>
                                        <span>{prog.desc}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                        <Reveal className="pr-panel" y={20}>
                            <h3 className="pr-sub-title">Why students &amp; parents choose EduAiTutors</h3>
                            <div className="pr-vs" role="table" aria-label="EduAiTutors compared with traditional mass coaching">
                                <div className="pr-vs-row pr-vs-row--head" role="row">
                                    <span role="columnheader" />
                                    <span role="columnheader">EduAiTutors</span>
                                    <span role="columnheader">Mass coaching</span>
                                </div>
                                {EDU_COMPARE.map((row) => (
                                    <div key={row.label} className="pr-vs-row" role="row">
                                        <span role="rowheader">{row.label}</span>
                                        <span role="cell" className="pr-vs-yes">
                                            <Check size={13} strokeWidth={3} aria-hidden="true" /> {row.edu}
                                        </span>
                                        <span role="cell" className="pr-vs-no">
                                            <Minus size={13} aria-hidden="true" /> {row.old}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <a href={SITES.eduaitutors.url} {...EXTERNAL} className="pr-text-link">
                                See programs &amp; batches on eduaitutors.com <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        </Reveal>
                    </div>
                </ProductChapter>

                {/* AI-Powered LMS */}
                <ProductChapter
                    id="ai-lms"
                    index="03"
                    theme="lms"
                    name="AI-Powered LMS"
                    kind="Learning management platform"
                    site={SITES.lms}
                    to="/products/ai-powered-lms"
                    toLabel="Explore AI-Powered LMS"
                    demo={{ to: '#demo', label: 'Request a demo' }}
                    headline="Teach, learn and grow — together."
                    desc="An all-in-one learning platform for students, educators and institutions, supporting learning from Pre-KG to Grade 12. AI recommendations, live classes, courses, assessments and certificates sit in one place, with a dashboard for every role."
                    highlights={['Adaptive, personalised learning paths', 'Live classes, chat & screen sharing', 'Certificates & badges', 'Dashboards for every role']}
                    preview={<LmsPreview />}
                >
                    <motion.div className="pr-sub pr-features" {...gridMotion(0.06)}>
                        {LMS_FEATURES.map((f) => (
                            <motion.article key={f.title} className="pr-feature rv-spot" variants={fadeUpItem} onPointerMove={trackPointer}>
                                <span className="pr-icon" aria-hidden="true">
                                    <f.icon size={18} />
                                </span>
                                <div>
                                    <h4>{f.title}</h4>
                                    <p>{f.desc}</p>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                    <div className="pr-sub pr-split">
                        <div>
                            <h3 className="pr-sub-title">One platform, four roles</h3>
                            <motion.ul className="pr-roles" {...gridMotion(0.07)}>
                                {LMS_ROLES.map((r) => (
                                    <motion.li key={r.title} variants={fadeUpItem}>
                                        <span className="pr-icon" aria-hidden="true">
                                            <r.icon size={17} />
                                        </span>
                                        <strong>{r.title}</strong>
                                        <span>{r.desc}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                        <Reveal className="pr-panel" y={20}>
                            <h3 className="pr-sub-title">Universal educational journey</h3>
                            <ol className="pr-grades">
                                {GRADE_LEVELS.map((g, i) => (
                                    <li key={g.title}>
                                        <span className="pr-grades-dot" aria-hidden="true">{i + 1}</span>
                                        <strong>{g.title}</strong>
                                        <span>{g.desc}</span>
                                    </li>
                                ))}
                            </ol>
                            <a href={SITES.lms.url} {...EXTERNAL} className="pr-text-link">
                                Open the LMS at kam.eduaitutors.online <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        </Reveal>
                    </div>
                </ProductChapter>

                {/* Which product fits */}
                <section id="compare" className="pr-section pr-section--tint">
                    <div className="container">
                        <SectionHead eyebrow="Which Fits?" title="Find the Right" accent="Product">
                            Each product solves a different problem. Pick the one closest to your need — or talk to us if
                            you need more than one.
                        </SectionHead>
                        <motion.div className="pr-fit" {...gridMotion(0.1)}>
                            {HERO_STACK.map((p, ci) => (
                                <motion.article key={p.key} className={`pr-fit-col pr-theme--${p.theme}`} variants={fadeUpItem}>
                                    <header>
                                        <span className="pr-stack-icon" aria-hidden="true">
                                            <p.icon size={20} />
                                        </span>
                                        <div>
                                            <h3>{p.name}</h3>
                                            <small>{p.kind}</small>
                                        </div>
                                    </header>
                                    <dl>
                                        {FIT_ROWS.map((row) => (
                                            <div key={row.label}>
                                                <dt>{row.label}</dt>
                                                <dd>{row.values[ci]}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <a href={p.site.url} {...EXTERNAL} className="pr-btn pr-btn--accent pr-btn--full">
                                        Visit {p.site.domain} <ArrowUpRight size={15} aria-hidden="true" />
                                    </a>
                                </motion.article>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Getting started */}
                <section id="getting-started" className="pr-section">
                    <div className="container">
                        <SectionHead eyebrow="Getting Started" title="See Whether It Fits" accent="Your Environment">
                            A product discussion can cover use case, user groups, deployment requirements, integrations,
                            data handling, and the next steps for a demonstration or evaluation.
                        </SectionHead>
                        <div className="pr-steps">
                            <motion.span
                                className="pr-steps-line"
                                aria-hidden="true"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={VIEWPORT}
                                transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.2 }}
                            />
                            <motion.ol {...gridMotion(0.15, 0.2)}>
                                {PRODUCT_GETTING_STARTED.map((s, i) => (
                                    <motion.li key={s.title} variants={fadeUpItem}>
                                        <span className="pr-steps-num">{String(i + 1).padStart(2, '0')}</span>
                                        <strong>{s.title}</strong>
                                        <p>{s.desc}</p>
                                    </motion.li>
                                ))}
                            </motion.ol>
                        </div>
                    </div>
                </section>

                {/* Demo */}
                <section id="demo" className="pr-section pr-demo">
                    <div className="container pr-demo-grid">
                        <Reveal className="pr-demo-copy" y={20}>
                            <Eyebrow>Get Started</Eyebrow>
                            <h2>
                                Request a <span>product demo</span>
                            </h2>
                            <p>
                                Interested in LearnX, EduAiTutors partnerships, or AI-Powered LMS for your school? Share your
                                details and our team will respond.
                            </p>
                            <ul className="pr-demo-links">
                                {HERO_STACK.map((p) => (
                                    <li key={p.key} className={`pr-theme--${p.theme}`}>
                                        <a href={p.site.url} {...EXTERNAL}>
                                            <span className="pr-nav-dot" aria-hidden="true" />
                                            {p.name}
                                            <em>{p.site.domain}</em>
                                            <ArrowUpRight size={14} aria-hidden="true" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="pr-demo-talk">
                                <strong>Interested in our education products?</strong>
                                <span>Speak with our team about partnerships, pilots, or enterprise licensing.</span>
                                <div>
                                    <Link to="/contact" className="pr-text-link">
                                        Contact Us <ArrowRight size={14} aria-hidden="true" />
                                    </Link>
                                    <a href="mailto:info@kamglobalai.com" className="pr-text-link">
                                        <Mail size={14} aria-hidden="true" /> info@kamglobalai.com
                                    </a>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal className="pr-demo-card" y={24} delay={0.1}>
                            <AnimatePresence>
                                {status.type !== 'idle' && (
                                    <motion.div
                                        key={status.type}
                                        className={`pr-status pr-status--${status.type}`}
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        role={status.type === 'error' ? 'alert' : 'status'}
                                    >
                                        {status.type === 'success' && <CheckCircle size={18} aria-hidden="true" />}
                                        {status.type === 'error' && <XCircle size={18} aria-hidden="true" />}
                                        {status.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <form onSubmit={handleSubmit} className="pr-form">
                                <div className="pr-form-row">
                                    <label className="pr-field">
                                        <span>Full name *</span>
                                        <input type="text" name="name" placeholder="Your name" autoComplete="name" value={formData.name} onChange={handleInputChange} required />
                                    </label>
                                    <label className="pr-field">
                                        <span>Email address *</span>
                                        <input type="email" name="email" placeholder="you@school.edu" autoComplete="email" value={formData.email} onChange={handleInputChange} required />
                                    </label>
                                </div>
                                <div className="pr-form-row">
                                    <label className="pr-field">
                                        <span>Phone (optional)</span>
                                        <input type="tel" name="phone" placeholder="+965 / +91 ..." autoComplete="tel" value={formData.phone} onChange={handleInputChange} />
                                    </label>
                                    <label className="pr-field">
                                        <span>Institution / organization</span>
                                        <input type="text" name="institution" placeholder="School or organisation" autoComplete="organization" value={formData.institution} onChange={handleInputChange} />
                                    </label>
                                </div>
                                <fieldset className="pr-choice">
                                    <legend>I am a *</legend>
                                    <div>
                                        {ROLE_OPTIONS.map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                className={`pr-choice-pill${formData.role === opt ? ' is-active' : ''}`}
                                                aria-pressed={formData.role === opt}
                                                onClick={() => pick('role', opt)}
                                            >
                                                {formData.role === opt && <Check size={13} strokeWidth={3} aria-hidden="true" />}
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </fieldset>
                                <fieldset className="pr-choice">
                                    <legend>Product interest</legend>
                                    <div>
                                        {INTEREST_OPTIONS.map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                className={`pr-choice-pill${formData.gradeRange === opt ? ' is-active' : ''}`}
                                                aria-pressed={formData.gradeRange === opt}
                                                onClick={() => pick('gradeRange', opt)}
                                            >
                                                {formData.gradeRange === opt && <Check size={13} strokeWidth={3} aria-hidden="true" />}
                                                {opt === 'Multiple' ? 'Multiple products' : opt}
                                            </button>
                                        ))}
                                    </div>
                                </fieldset>
                                <button type="submit" className="pr-btn pr-btn--primary pr-btn--full" disabled={status.type === 'loading'}>
                                    {status.type === 'loading' ? 'Submitting...' : 'Request Demo'}
                                    {status.type !== 'loading' && <ArrowRight size={16} aria-hidden="true" />}
                                </button>
                                <p className="pr-form-note">
                                    <Bell size={13} aria-hidden="true" /> Fields marked * are required.
                                </p>
                            </form>
                        </Reveal>
                    </div>
                </section>
            </div>
        </MotionConfig>
    );
};

export default Products;
