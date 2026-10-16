import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Laptop,
  Cloud,
  Users,
  GraduationCap,
  BookOpen,
  Brain,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Headset,
  FolderKanban,
  Rocket,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  UserSearch,
  Wallet,
  Crown,
  KanbanSquare,
  Bot,
} from 'lucide-react';
import { discoveryLink, proposalLink, talentLink, demoLink } from '../data/links';
import { COMPANY } from '../data/company';
import './Header.css';

// Menus show a few featured links; the rest are summarised in a "View all" tile.
// The full lists are kept here (not imported from data/) so the large data files stay out of the main bundle —
// keep them in sync with itServices, outsourcingServices, hrServices and industries.
const moreTile = (all, featured, label, to) => {
  const rest = all.filter((a) => !featured.some((f) => f.path === a.path));
  return { label, to, total: all.length, count: rest.length, names: rest.map((r) => r.name) };
};

const list = (base, entries) => entries.map(([slug, name]) => ({ name, path: `${base}/${slug}` }));

const itAll = list('/services', [
  ['bot-model', 'BOT Model'],
  ['custom-development', 'IT & Development'],
  ['cloud-devops', 'Cloud & DevOps'],
  ['it-staffing', 'IT Staffing'],
  ['managed-it', 'Managed IT'],
  ['mobile-app-development', 'Mobile Apps'],
  ['ui-ux-design', 'UI/UX Design'],
  ['qa-testing', 'QA & Testing'],
  ['ai-automation', 'AI & Automation'],
  ['data-analytics', 'Data & Analytics'],
  ['erp-crm', 'ERP & CRM'],
  ['it-consulting', 'IT Consulting'],
]);

const outsourcingAll = list('/outsourcing', [
  ['sales-lead-generation', 'Sales & Lead Generation'],
  ['customer-experience', 'Customer Experience'],
  ['business-process-outsourcing', 'BPO & Back Office'],
  ['recruitment-rpo', 'Recruitment (RPO)'],
  ['virtual-assistance', 'Virtual Assistance'],
  ['digital-marketing-creative', 'Digital Marketing & Creative'],
  ['industry-operations', 'Industry Operations'],
]);

const hrAll = list('/hr/services', [
  ['recruitment', 'Recruitment'],
  ['contract-staffing', 'Contract Staffing'],
  ['payroll-outsourcing', 'Payroll Outsourcing'],
  ['hr-advisory', 'HR Advisory'],
  ['executive-search', 'Executive Search'],
  ['background-verification', 'Background Verification'],
]);

const industriesAll = list('/industries', [
  ['education', 'Education & EdTech'],
  ['healthcare', 'Healthcare'],
  ['fintech', 'FinTech'],
  ['retail-ecommerce', 'Retail & E-commerce'],
  ['real-estate', 'Real Estate'],
  ['hospitality-travel', 'Hospitality & Travel'],
  ['manufacturing', 'Manufacturing'],
  ['logistics', 'Logistics'],
  ['technology-saas', 'Technology & SaaS'],
  ['professional-services', 'Professional Services'],
]);

const itFeatured = [
  { name: 'IT & Development', desc: 'Websites, apps & business software', path: '/services/custom-development', icon: Laptop },
  { name: 'AI & Automation', desc: 'Chatbots, documents & workflows', path: '/services/ai-automation', icon: Bot },
  { name: 'Cloud & DevOps', desc: 'Hosting, migration & CI/CD', path: '/services/cloud-devops', icon: Cloud },
  { name: 'IT Staffing', desc: 'Screened engineering talent', path: '/services/it-staffing', icon: Users },
  { name: 'BOT Model', desc: 'Build-Operate-Transfer teams', path: '/services/bot-model', icon: Globe },
];

const outsourcingFeatured = [
  { name: 'India Engine', desc: 'Technology & digital delivery', path: '/outsourcing/india-engine', icon: Code2 },
  { name: 'Philippines Engine', desc: 'Business operations & CX', path: '/outsourcing/philippines-engine', icon: Headset },
  { name: 'Customer Experience', desc: 'Support & success workflows', path: '/outsourcing/customer-experience', icon: Headset },
  { name: 'BPO & Back Office', desc: 'Repeatable process support', path: '/outsourcing/business-process-outsourcing', icon: FolderKanban },
  { name: 'Sales & Lead Generation', desc: 'Prospecting & appointments', path: '/outsourcing/sales-lead-generation', icon: Rocket },
];

const hrFeatured = [
  { name: 'Recruitment', desc: 'Permanent hiring, end to end', path: '/hr/services/recruitment', icon: UserSearch },
  { name: 'Contract Staffing', desc: 'Flexible, compliant workforce', path: '/hr/services/contract-staffing', icon: Users },
  { name: 'Payroll Outsourcing', desc: 'Accurate, audit-ready pay runs', path: '/hr/services/payroll-outsourcing', icon: Wallet },
  { name: 'Executive Search', desc: 'Confidential leadership hiring', path: '/hr/services/executive-search', icon: Crown },
  { name: 'HR Technology', desc: 'ATS, HRMS & Payroll', path: '/hr/technology', icon: KanbanSquare },
];

const industriesFeatured = [
  { name: 'Education & EdTech', desc: 'Learning platforms & school ops', path: '/industries/education', icon: GraduationCap },
  { name: 'Healthcare', desc: 'Non-clinical tech & admin', path: '/industries/healthcare', icon: HeartPulse },
  { name: 'FinTech', desc: 'Secure digital workflows', path: '/industries/fintech', icon: Landmark },
  { name: 'Retail & E-commerce', desc: 'Commerce & fulfilment ops', path: '/industries/retail-ecommerce', icon: ShoppingCart },
  { name: 'Technology & SaaS', desc: 'Product delivery & CX', path: '/industries/technology-saas', icon: Rocket },
];

const navLinks = [
  { name: 'Home', path: '/', mobileOnly: true },
  { name: 'About', path: '/about' },
  {
    name: 'Services',
    path: '/services',
    match: ['/services', '/outsourcing', '/engagement-models', '/hr'],
    groups: [
      {
        id: 'it',
        label: 'IT & Technology',
        short: 'Build, AI, cloud, managed IT & teams',
        icon: Laptop,
        intro: {
          eyebrow: 'Enterprise Technology',
          title: 'Technology built around your business',
          text: 'Development, design, AI, data, cloud, managed IT and engineering teams — scoped to the outcome you need.',
          cta: { label: 'View all services', to: '/services' },
        },
        feature: {
          title: 'Not sure where to start?',
          text: 'Share your goals — we’ll suggest the right fit.',
          cta: { label: 'Book a discovery call', to: discoveryLink('Technology Services') },
          image: '/images/nav-it-discovery.jpg',
          imageAlt: 'KAM Global AI consultant discussing a project roadmap with clients',
          imagePosition: 'center 35%',
        },
        items: itFeatured,
        more: moreTile(itAll, itFeatured, 'View all IT services', '/services'),
      },
      {
        id: 'outsourcing',
        label: 'Global Outsourcing',
        short: 'India & Philippines delivery engines',
        icon: Globe,
        intro: {
          eyebrow: 'Global Outsourcing',
          title: 'Two delivery engines, one partner',
          text: 'Technology delivery from India and business operations from the Philippines, under one accountable team.',
          cta: { label: 'Outsourcing overview', to: '/outsourcing' },
        },
        feature: {
          title: 'Need people fast?',
          text: 'Tell us the roles — we’ll shape the team.',
          cta: { label: 'Request talent', to: talentLink('Outsourcing') },
          image: '/images/nav-outsourcing-team.jpg',
          imageAlt: 'Software engineers and customer experience agents working in a delivery centre',
          imagePosition: 'center 30%',
        },
        items: outsourcingFeatured,
        more: moreTile(outsourcingAll, outsourcingFeatured, 'View all outsourcing services', '/outsourcing'),
      },
      {
        id: 'hr',
        label: 'HR & Workforce',
        short: 'Recruitment, staffing & payroll',
        icon: Users,
        intro: {
          eyebrow: 'HR & Workforce',
          title: 'Hire, pay and grow your workforce',
          text: 'Recruitment, staffing and payroll backed by our own ATS, HRMS and payroll platforms.',
          cta: { label: 'HR & Workforce overview', to: '/hr' },
        },
        feature: {
          title: 'Looking for a job?',
          text: 'Domestic and overseas openings.',
          cta: { label: 'Explore jobs', to: '/hr/jobs' },
          image: '/images/hr/hr-hero.jpg',
          imageAlt: 'Recruiter welcoming a candidate in a modern office',
          imagePosition: 'center 30%',
        },
        items: hrFeatured,
        more: moreTile(hrAll, hrFeatured, 'View all HR services', '/hr#services'),
      },
    ],
  },
  {
    name: 'Industries',
    path: '/industries',
    intro: {
      eyebrow: 'Industries',
      title: 'Shaped for how your sector works',
      text: 'Technology and operations support adapted to the workflows, rules and customers of each industry.',
      cta: { label: 'Browse all industries', to: '/industries' },
    },
    feature: {
      title: 'Proof, not promises',
      text: 'How we deliver — and case studies we share.',
      cta: { label: 'Case studies', to: '/resources/case-studies' },
      image: '/images/pages/pg-case-studies-hero.jpg',
      imageAlt: 'Team reviewing a client delivery case study',
    },
    items: industriesFeatured,
    more: moreTile(industriesAll, industriesFeatured, 'View all industries', '/industries'),
  },
  {
    name: 'Products',
    path: '/products',
    intro: {
      eyebrow: 'Digital Products',
      title: 'Education platforms by KAM Global AI',
      text: 'Live products for schools, coaching institutes and learners — from school ERP to adaptive learning.',
      cta: { label: 'All products', to: '/products' },
    },
    products: true,
    feature: {
      title: 'See LearnX in action',
      text: 'School ERP, LMS & AI Studio — one platform.',
      cta: { label: 'Book a demo', to: demoLink('LearnX') },
    },
    items: [
      { name: 'LearnX', desc: 'School ERP + LMS + AI Studio', path: '/products/learnx', icon: GraduationCap, badge: 'Live', theme: 'learnx', site: 'https://learnx.school', domain: 'learnx.school' },
      { name: 'EduAiTutors', desc: 'NEET & JEE coaching', path: '/products/eduaitutors', icon: BookOpen, theme: 'edu', site: 'https://eduaitutors.com', domain: 'eduaitutors.com' },
      { name: 'AI-Powered LMS', desc: 'Pre-KG to Grade 12', path: '/products/ai-powered-lms', icon: Brain, badge: 'Live', theme: 'lms', site: 'https://kam.eduaitutors.online', domain: 'kam.eduaitutors.online' },
    ],
  },
  { name: 'Resources', path: '/resources', mobileOnly: true },
  { name: 'Careers', path: '/careers', mobileOnly: true },
];

const MegaGrid = ({ items, more, onNavigate }) => {
  if (items.some((item) => item.image)) {
    return (
      <ul className="sh-mega-cards">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <li key={item.name} style={{ '--i': i }}>
              <Link to={item.path} className="sh-mega-card" onClick={onNavigate}>
                <span className="sh-mega-card-media">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                  />
                  {item.badge && <span className="sh-badge sh-mega-card-badge">{item.badge}</span>}
                </span>
                <span className="sh-mega-card-body">
                  <span className="sh-mega-card-title">
                    <Icon size={15} strokeWidth={2} aria-hidden="true" />
                    {item.name}
                  </span>
                  <span className="sh-mega-link-desc">{item.desc}</span>
                </span>
                <ArrowUpRight size={14} className="sh-mega-card-arrow" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
  <ul className={`sh-mega-grid${items.length <= 3 && !more ? ' sh-mega-grid--single' : ''}`}>
    {items.map((item, i) => {
      const Icon = item.icon;
      return (
        <li key={item.name} style={{ '--i': i }}>
          <Link to={item.path} className="sh-mega-link" onClick={onNavigate}>
            <span className="sh-mega-icon" aria-hidden="true">
              <Icon size={18} strokeWidth={1.75} />
            </span>
            <span className="sh-mega-link-text">
              <span className="sh-mega-link-title">
                {item.name}
                {item.badge && <span className="sh-badge">{item.badge}</span>}
              </span>
              <span className="sh-mega-link-desc">{item.desc}</span>
            </span>
            <ArrowUpRight size={14} className="sh-mega-arrow" aria-hidden="true" />
          </Link>
        </li>
      );
    })}
    {more && (
      <li style={{ '--i': items.length }}>
        <Link to={more.to} className="sh-mega-all" onClick={onNavigate}>
          {more.label}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </li>
    )}
  </ul>
  );
};

const ProductPreview = ({ theme }) => {
  if (theme === 'learnx') {
    return (
      <span className="sh-pv sh-pv--learnx" aria-hidden="true">
        <span className="sh-pv-tabs">
          <i>Principal</i>
          <i className="is-on">Parent</i>
          <i>Finance</i>
        </span>
        <span className="sh-pv-stats">
          <span><b>96%</b><small>Attendance</small></span>
          <span><b>2</b><small>Homework</small></span>
          <span><b>Fri</b><small>PTM</small></span>
        </span>
      </span>
    );
  }
  if (theme === 'edu') {
    return (
      <span className="sh-pv sh-pv--edu" aria-hidden="true">
        <span className="sh-pv-head"><b>Mock test 12</b><small>Rank trend</small></span>
        <svg viewBox="0 0 120 34" className="sh-pv-spark" preserveAspectRatio="none">
          <path d="M2 30 L20 26 L36 28 L54 18 L72 20 L90 10 L118 5" pathLength="1" />
          <circle cx="118" cy="5" r="3" />
        </svg>
        <span className="sh-pv-bars">
          <i style={{ '--w': '42%' }} />
          <i style={{ '--w': '78%' }} />
        </span>
      </span>
    );
  }
  return (
    <span className="sh-pv sh-pv--lms" aria-hidden="true">
      <svg viewBox="0 0 36 36" className="sh-pv-ring">
        <circle cx="18" cy="18" r="15" className="sh-pv-ring-bg" />
        <circle cx="18" cy="18" r="15" className="sh-pv-ring-fg" pathLength="1" />
      </svg>
      <span className="sh-pv-ring-label"><b>86%</b><small>Progress</small></span>
      <span className="sh-pv-tasks">
        <i className="is-done" />
        <i className="is-done" />
        <i />
      </span>
    </span>
  );
};

const ProductsMega = ({ link, onNavigate }) => (
  <div className="sh-container sh-mega-inner sh-mega-inner--products">
    <div className="sh-mega-intro">
      <span className="sh-mega-eyebrow">{link.intro.eyebrow}</span>
      <p className="sh-mega-title">{link.intro.title}</p>
      <Link to={link.intro.cta.to} className="sh-mega-intro-cta" onClick={onNavigate}>
        {link.intro.cta.label} <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>

    <ul className="sh-prod-cards">
      {link.items.map((item, i) => {
        const Icon = item.icon;
        return (
          <li key={item.name} className={`sh-prod-card sh-prod--${item.theme}`} style={{ '--i': i }}>
            <span className="sh-prod-window">
              <span className="sh-prod-bar" aria-hidden="true">
                <i /><i /><i />
                <em>{item.domain}</em>
                {item.badge && <span className="sh-prod-live">{item.badge}</span>}
              </span>
              <ProductPreview theme={item.theme} />
            </span>
            <span className="sh-prod-body">
              <span className="sh-prod-icon" aria-hidden="true">
                <Icon size={16} strokeWidth={2} />
              </span>
              <span className="sh-prod-text">
                <Link to={item.path} className="sh-prod-name" onClick={onNavigate}>
                  {item.name}
                </Link>
                <span className="sh-prod-desc">{item.desc}</span>
              </span>
            </span>
            <span className="sh-prod-actions">
              <span className="sh-prod-explore" aria-hidden="true">
                Explore <ArrowRight size={13} />
              </span>
              <a
                href={item.site}
                target="_blank"
                rel="noopener noreferrer"
                className="sh-prod-site"
                aria-label={`Visit ${item.domain} (opens in a new tab)`}
              >
                Visit site <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </span>
          </li>
        );
      })}
    </ul>

    <div className="sh-prod-feature">
      <span className="sh-prod-feature-visual" aria-hidden="true">
        <span className="sh-prod-feature-row"><i /><b>Fee paid · receipt sent</b></span>
        <span className="sh-prod-feature-row"><i /><b>Bus ETA 6 min</b></span>
        <span className="sh-prod-feature-row"><i /><b>Report card published</b></span>
      </span>
      <p className="sh-mega-feature-title">{link.feature.title}</p>
      <p className="sh-mega-feature-text">{link.feature.text}</p>
      <Link to={link.feature.cta.to} className="sh-mega-feature-cta" onClick={onNavigate}>
        {link.feature.cta.label} <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  </div>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [megaTab, setMegaTab] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileExpand, setMobileExpand] = useState(null);
  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional reset on route change
    setIsOpen(false);
    setOpenMenu(null);
    setMobileExpand(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path.includes('#')) return `${location.pathname}${location.hash}` === path;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  const isLinkActive = (link) => (link.match || [link.path]).some(isActive);
  const setTab = (name, index) => setMegaTab((prev) => ({ ...prev, [name]: index }));

  const openNow = (name) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const closeAll = () => {
    clearTimeout(closeTimer.current);
    setIsOpen(false);
    setOpenMenu(null);
    setMobileExpand(null);
  };

  const desktopLinks = navLinks.filter((l) => !l.mobileOnly);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}${openMenu ? ' has-menu' : ''}`}>
        <div className="sh-topbar">
          <div className="sh-container sh-topbar-inner">
            <p className="sh-legal">
              <span className="sh-legal-name">{COMPANY.legalName}</span>
              <span className="sh-legal-sep" aria-hidden="true" />
              <span className="sh-legal-backing">
                <MapPin size={12} aria-hidden="true" /> {COMPANY.backing}
              </span>
            </p>
            <nav className="sh-toplinks" aria-label="Utility">
              <Link to="/resources">Resources</Link>
              <Link to="/careers">Careers</Link>
              <a href={`mailto:${COMPANY.email}`}>
                <Mail size={12} aria-hidden="true" /> {COMPANY.email}
              </a>
              <a href={`tel:${COMPANY.tel}`}>
                <Phone size={12} aria-hidden="true" /> {COMPANY.phone}
              </a>
            </nav>
          </div>
        </div>

        <div className="sh-main">
          <div className="sh-container sh-main-inner">
            <Link to="/" className="sh-brand" aria-label={`${COMPANY.brand} — home`}>
              <img
                src="/logo.png?v=8"
                alt=""
                className="sh-brand-mark"
                width={173}
                height={104}
                fetchpriority="high"
              />
            </Link>

            <nav className="sh-nav" aria-label="Primary">
              <ul className="sh-nav-list">
                {desktopLinks.map((link) => {
                  const hasMenu = Boolean(link.items || link.groups);
                  const open = openMenu === link.name;
                  const tabIndex = megaTab[link.name] ?? 0;
                  const group = link.groups?.[tabIndex];
                  return (
                    <li
                      key={link.name}
                      className={`sh-nav-item${open ? ' is-open' : ''}`}
                      onMouseEnter={hasMenu ? () => openNow(link.name) : undefined}
                      onMouseLeave={hasMenu ? closeSoon : undefined}
                    >
                      <Link
                        to={link.path}
                        className={`sh-nav-link${isLinkActive(link) ? ' is-active' : ''}`}
                        onFocus={hasMenu ? () => openNow(link.name) : undefined}
                      >
                        {link.name}
                        {hasMenu && <ChevronDown size={14} className="sh-caret" aria-hidden="true" />}
                      </Link>

                      {hasMenu && (
                        <div
                          className="sh-mega"
                          role="region"
                          aria-label={`${link.name} menu`}
                          onMouseEnter={() => openNow(link.name)}
                          onMouseLeave={closeSoon}
                          onBlur={(e) => {
                            if (!e.currentTarget.parentElement.contains(e.relatedTarget)) setOpenMenu(null);
                          }}
                        >
                          {group ? (
                            <div className="sh-container sh-mega-inner sh-mega-inner--tabs">
                              <div className="sh-mega-tabs">
                                <div className="sh-mega-tablist" role="tablist" aria-label={`${link.name} types`}>
                                  {link.groups.map((g, gi) => (
                                    <button
                                      key={g.id}
                                      type="button"
                                      role="tab"
                                      id={`mega-tab-${g.id}`}
                                      aria-selected={gi === tabIndex}
                                      aria-controls={`mega-panel-${link.name}`}
                                      className={`sh-mega-tab${gi === tabIndex ? ' is-active' : ''}`}
                                      onMouseEnter={() => setTab(link.name, gi)}
                                      onFocus={() => setTab(link.name, gi)}
                                      onClick={() => setTab(link.name, gi)}
                                    >
                                      <span className="sh-mega-tab-icon" aria-hidden="true">
                                        <g.icon size={18} strokeWidth={1.75} />
                                      </span>
                                      <span className="sh-mega-tab-text">
                                        <strong>{g.label}</strong>
                                        {g.more && <span className="sh-mega-tab-count">{g.more.total}</span>}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div
                                key={group.id}
                                className="sh-mega-panel"
                                id={`mega-panel-${link.name}`}
                                role="tabpanel"
                                aria-labelledby={`mega-tab-${group.id}`}
                              >
                                <MegaGrid items={group.items} onNavigate={closeAll} />
                                <div className="sh-mega-actions">
                                  {group.more && (
                                    <Link to={group.more.to} className="sh-mega-all" onClick={closeAll}>
                                      {group.more.label} <ArrowRight size={15} aria-hidden="true" />
                                    </Link>
                                  )}
                                  <Link to={group.feature.cta.to} className="sh-mega-aside-cta" onClick={closeAll}>
                                    {group.feature.cta.label} <ArrowRight size={14} aria-hidden="true" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ) : link.products ? (
                            <ProductsMega link={link} onNavigate={closeAll} />
                          ) : (
                            <div className="sh-container sh-mega-inner sh-mega-inner--plain">
                              <MegaGrid items={link.items} more={link.more} onNavigate={closeAll} />
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="sh-actions">
              <Link to="/contact" className={`sh-contact-link${isActive('/contact') ? ' is-active' : ''}`}>
                Contact
              </Link>
              <button
                type="button"
                className="sh-burger"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                aria-expanded={isOpen}
                aria-controls="sh-drawer"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`sh-overlay${openMenu ? ' is-visible' : ''}`} aria-hidden="true" />

      <div
        className={`sh-drawer-backdrop${isOpen ? ' is-open' : ''}`}
        onClick={closeAll}
        aria-hidden="true"
      />
      <aside
        id="sh-drawer"
        className={`sh-drawer${isOpen ? ' is-open' : ''}`}
        aria-hidden={!isOpen}
        aria-label="Site menu"
        inert={isOpen ? undefined : ''}
      >
        <div className="sh-drawer-head">
          <Link to="/" className="sh-brand sh-brand--drawer" onClick={closeAll} aria-label={`${COMPANY.brand} — home`}>
            <img src="/logo.png?v=8" alt="" className="sh-brand-mark" width={173} height={104} />
          </Link>
          <button type="button" className="sh-drawer-close" onClick={closeAll} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        <nav className="sh-drawer-nav" aria-label="Mobile">
          {navLinks.map((link) =>
            link.items || link.groups ? (
              <div key={link.name} className={`sh-drawer-group${mobileExpand === link.name ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className={`sh-drawer-link${isLinkActive(link) ? ' is-active' : ''}`}
                  onClick={() => setMobileExpand(mobileExpand === link.name ? null : link.name)}
                  aria-expanded={mobileExpand === link.name}
                >
                  <span>{link.name}</span>
                  <ChevronDown size={18} className="sh-caret" aria-hidden="true" />
                </button>
                <div className="sh-drawer-sub">
                  <div className="sh-drawer-sub-inner">
                    {(link.groups || [{ id: link.name, intro: link.intro, items: link.items, more: link.more }]).map((g) => (
                      <div key={g.id} className={link.groups ? 'sh-drawer-subgroup' : undefined}>
                        {link.groups && (
                          <span className="sh-drawer-subgroup-label">
                            <g.icon size={15} aria-hidden="true" /> {g.label}
                          </span>
                        )}
                        {g.more?.to !== g.intro.cta.to && (
                          <Link to={g.intro.cta.to} className="sh-drawer-overview" onClick={closeAll}>
                            {g.intro.cta.label} <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        )}
                        {g.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link key={item.name} to={item.path} className="sh-drawer-item" onClick={closeAll}>
                              <Icon size={16} aria-hidden="true" />
                              <span>
                                <strong>
                                  {item.name}
                                  {item.badge && <span className="sh-badge">{item.badge}</span>}
                                </strong>
                                <em>{item.desc}</em>
                              </span>
                            </Link>
                          );
                        })}
                        {g.more && (
                          <Link to={g.more.to} className="sh-drawer-more" onClick={closeAll}>
                            <span>{g.more.label}</span>
                            <b>{g.more.total}</b>
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        )}
                        {g.items.some((item) => item.site) && (
                          <div className="sh-drawer-sites">
                            {g.items.filter((item) => item.site).map((item) => (
                              <a key={item.site} href={item.site} target="_blank" rel="noopener noreferrer" className={`sh-drawer-site sh-prod--${item.theme}`}>
                                {item.domain} <ArrowUpRight size={12} aria-hidden="true" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`sh-drawer-link${isActive(link.path) ? ' is-active' : ''}`}
                onClick={closeAll}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        <div className="sh-drawer-foot">
          <Link to={proposalLink()} className="sh-cta sh-cta--block" onClick={closeAll}>
            Get a Proposal <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link to="/contact" className="sh-drawer-secondary" onClick={closeAll}>
            Contact us
          </Link>
          <div className="sh-drawer-contact">
            <a href={`mailto:${COMPANY.email}`}><Mail size={14} aria-hidden="true" /> {COMPANY.email}</a>
            <a href={`tel:${COMPANY.tel}`}><Phone size={14} aria-hidden="true" /> {COMPANY.phone}</a>
          </div>
          <p className="sh-drawer-legal">
            {COMPANY.legalName}
            <span>{COMPANY.backing}</span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Header;
