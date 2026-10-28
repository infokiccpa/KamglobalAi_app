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
  Clapperboard,
  PenTool,
  Search,
  Video,
  Megaphone,
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

const mediaFeatured = [
  { name: 'Content and creative', desc: 'Brand assets from an agreed brief', path: '/outsourcing/digital-marketing-creative#content-creative', icon: PenTool },
  { name: 'Video and motion', desc: 'Edits, motion and short-form video', path: '/outsourcing/digital-marketing-creative#video-motion', icon: Video },
  { name: 'SEO and campaign support', desc: 'On-page content, setup and reporting', path: '/outsourcing/digital-marketing-creative#seo-campaign', icon: Search },
  { name: 'Marketing operations', desc: 'Calendars, approvals and assets', path: '/outsourcing/digital-marketing-creative#marketing-operations', icon: Megaphone },
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
        id: 'media',
        label: 'AI media',
        short: 'Video, design and content from India',
        icon: Clapperboard,
        intro: {
          eyebrow: 'AI media',
          title: 'Video, design and content',
          text: 'Content, creative, video, SEO and campaign support delivered from India.',
          cta: { label: 'Explore AI media', to: '/outsourcing/digital-marketing-creative' },
        },
        feature: {
          title: 'Need campaign support?',
          text: 'Share the brief and we will confirm the fit.',
          cta: { label: 'Discuss AI media', to: '/contact?subject=Digital%20Marketing%20%26%20Creative#form' },
          image: '/images/hero/ai-media-studio.webp',
          imageAlt: 'Creative studio producing video and design work',
        },
        items: mediaFeatured,
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

const DropLinks = ({ items, onNavigate }) => (
  <ul className="sh-drop-list">
    {items.map((item) => {
      const Icon = item.icon;
      return (
        <li key={item.name}>
          <Link to={item.path} className="sh-drop-link" onClick={onNavigate}>
            <span className="sh-drop-icon" aria-hidden="true"><Icon size={16} strokeWidth={1.75} /></span>
            <span>
              <strong>
                {item.name}
                {item.badge && <span className="sh-badge">{item.badge}</span>}
              </strong>
              <small>{item.desc}</small>
            </span>
          </Link>
        </li>
      );
    })}
  </ul>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
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
                          {link.groups ? (
                            <div className="sh-container sh-drop">
                              <div className="sh-drop-cols">
                                {link.groups.map((g) => (
                                  <section key={g.id} className="sh-drop-col">
                                    <Link to={g.intro.cta.to} className="sh-drop-col-title" onClick={closeAll}>
                                      <g.icon size={16} aria-hidden="true" />
                                      {g.label}
                                      <ArrowUpRight size={14} aria-hidden="true" />
                                    </Link>
                                    <p>{g.short}</p>
                                    <DropLinks items={g.items} onNavigate={closeAll} />
                                  </section>
                                ))}
                              </div>
                            </div>
                          ) : link.products ? (
                            <div className="sh-container sh-drop">
                              <div className="sh-drop-bar">
                                <p>{link.intro.title}</p>
                                <Link to={link.intro.cta.to} onClick={closeAll}>
                                  {link.intro.cta.label} <ArrowRight size={14} aria-hidden="true" />
                                </Link>
                              </div>
                              <ul className="sh-drop-products">
                                {link.items.map((item) => {
                                  const Icon = item.icon;
                                  return (
                                    <li key={item.path}>
                                      <Link to={item.path} className="sh-drop-product" onClick={closeAll}>
                                        <span className="sh-drop-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.75} /></span>
                                        <span>
                                          <strong>
                                            {item.name}
                                            {item.badge && <span className="sh-badge">{item.badge}</span>}
                                          </strong>
                                          <small>{item.desc}</small>
                                        </span>
                                      </Link>
                                      <a href={item.site} target="_blank" rel="noopener noreferrer" className="sh-drop-domain">
                                        {item.domain} <ArrowUpRight size={13} aria-hidden="true" />
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ) : (
                            <div className="sh-container sh-drop">
                              <div className="sh-drop-bar">
                                <p>{link.intro.title}</p>
                                <Link to={link.intro.cta.to} onClick={closeAll}>
                                  {link.intro.cta.label} <ArrowRight size={14} aria-hidden="true" />
                                </Link>
                              </div>
                              <DropLinks items={link.items} onNavigate={closeAll} />
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
              <Link to="/contact" className={`sh-cta sh-cta--bar${isActive('/contact') ? ' is-active' : ''}`}>
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
