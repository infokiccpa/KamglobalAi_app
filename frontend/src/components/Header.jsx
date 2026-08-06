import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
  Globe,
  Laptop,
  Cloud,
  Users,
  TrendingUp,
  Wrench,
  Handshake,
  GraduationCap,
  BookOpen,
  Brain,
  ArrowUpRight,
} from 'lucide-react';
import './Header.css';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  {
    name: 'Services',
    path: '/services',
    dropdownLabel: 'Our Services',
    dropdownHint: 'Enterprise IT & digital delivery',
    dropdownWide: true,
    dropdown: [
      { name: 'All Services', desc: 'Full service overview', path: '/services', icon: LayoutGrid },
      { name: 'BOT Model', desc: 'Build-Operate-Transfer teams', path: '/services#bot-model', icon: Globe },
      { name: 'IT Development', desc: 'Custom enterprise platforms', path: '/services#it-dev', icon: Laptop },
      { name: 'Cloud & DevOps', desc: 'Migration and CI/CD', path: '/services#cloud', icon: Cloud },
      { name: 'IT Staffing', desc: 'Vetted engineering talent', path: '/services#staffing', icon: Users },
      { name: 'Digital Marketing', desc: 'AI-driven growth', path: '/services#marketing', icon: TrendingUp },
      { name: 'Managed IT', desc: 'Operations & support', path: '/services#managed-it', icon: Wrench },
      { name: 'KAM Partnership', desc: 'Kuwait–India bridge', path: '/services#partnership', icon: Handshake },
    ],
  },
  {
    name: 'Products',
    path: '/products',
    dropdownLabel: 'Our Products',
    dropdownHint: 'Education platforms by KamGlobal AI',
    dropdownWide: false,
    dropdownAlign: 'right',
    dropdown: [
      { name: 'All Products', desc: 'Browse every platform', path: '/products', icon: LayoutGrid },
      { name: 'LearnX', desc: 'School ERP + LMS + AI Studio', path: '/products/learnx', icon: GraduationCap, badge: 'Flagship' },
      { name: 'EduAiTutors', desc: 'NEET & JEE coaching', path: '/products#eduaitutors', icon: BookOpen },
      { name: 'AI-Powered LMS', desc: 'Pre-KG to Grade 12', path: '/products#ai-lms', icon: Brain, badge: 'Live' },
    ],
  },
  { name: 'KamGlobalAI', path: '/kamglobal-ai' },
  { name: 'Careers', path: '/careers' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpand, setMobileExpand] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setMobileExpand(null);
  }, [location.pathname, location.hash]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const closeAll = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setMobileExpand(null);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-main-wrapper">
          <Link to="/" className="header-logo" aria-label="KamGlobal AI home">
            <img
              src="/logo.png?v=5"
              alt="Kam Global for Digital AI — Media Solutions"
              className="logo-img"
              width={200}
              height={140}
            />
          </Link>

          <div className="header-nav-center">
            <div className="desktop-nav-container">
              <nav className="desktop-nav" aria-label="Primary">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    className={`nav-item-wrapper${openDropdown === link.name ? ' is-open' : ''}`}
                    onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                    onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
                  >
                    <Link
                      to={link.path}
                      className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                      aria-expanded={link.dropdown ? openDropdown === link.name : undefined}
                      aria-haspopup={link.dropdown ? 'menu' : undefined}
                    >
                      {link.name}
                      {link.dropdown && (
                        <ChevronDown
                          size={14}
                          className={`dropdown-icon${openDropdown === link.name ? ' rotate' : ''}`}
                          aria-hidden="true"
                        />
                      )}
                    </Link>

                    {link.dropdown && (
                      <div
                        className={[
                          'nav-dropdown',
                          link.dropdownWide ? 'nav-dropdown--wide' : '',
                          link.dropdownAlign === 'right' ? 'nav-dropdown--right' : '',
                          openDropdown === link.name ? 'nav-dropdown--open' : '',
                        ].filter(Boolean).join(' ')}
                        role="menu"
                      >
                        <div className="nav-dropdown-inner">
                          <div className="nav-dropdown-head">
                            <span className="nav-dropdown-label">{link.dropdownLabel}</span>
                            <span className="nav-dropdown-hint">{link.dropdownHint}</span>
                          </div>
                          <div className={`nav-dropdown-grid${link.dropdownWide ? ' nav-dropdown-grid--2' : ''}`}>
                            {link.dropdown.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="nav-dropdown-item"
                                  role="menuitem"
                                  onClick={closeAll}
                                >
                                  <span className="nav-dropdown-icon" aria-hidden="true">
                                    <Icon size={16} strokeWidth={1.75} />
                                  </span>
                                  <span className="nav-dropdown-text">
                                    <span className="nav-dropdown-title">
                                      {item.name}
                                      {item.badge && (
                                        <span className={`nav-dropdown-badge${item.badge === 'Soon' ? ' nav-dropdown-badge--soon' : ''}`}>
                                          {item.badge}
                                        </span>
                                      )}
                                    </span>
                                    <span className="nav-dropdown-desc">{item.desc}</span>
                                  </span>
                                  <ArrowUpRight size={14} className="nav-dropdown-arrow" aria-hidden="true" />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="nav-divider" aria-hidden="true" />

            <Link to="/contact" className="nav-contact-btn">
              Contact us
            </Link>
          </div>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div className={`mobile-nav${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
        <div className="mobile-nav-panel">
          <div className="mobile-nav-top">
            <span className="mobile-nav-brand">Menu</span>
            <button type="button" className="mobile-nav-close" onClick={closeAll} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>

          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <div key={link.name} className="mobile-nav-group">
                {link.dropdown ? (
                  <>
                    <button
                      type="button"
                      className={`mobile-link mobile-link--toggle${isActive(link.path) ? ' active' : ''}`}
                      onClick={() => setMobileExpand(mobileExpand === link.name ? null : link.name)}
                      aria-expanded={mobileExpand === link.name}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={18}
                        className={mobileExpand === link.name ? 'rotate' : ''}
                        aria-hidden="true"
                      />
                    </button>
                    <div className={`mobile-dropdown${mobileExpand === link.name ? ' open' : ''}`}>
                      <Link to={link.path} className="mobile-dropdown-overview" onClick={closeAll}>
                        View all {link.name.toLowerCase()}
                      </Link>
                      {link.dropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="mobile-dropdown-item"
                            onClick={closeAll}
                          >
                            <Icon size={15} aria-hidden="true" />
                            <span>
                              <strong>{item.name}</strong>
                              <em>{item.desc}</em>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
                    onClick={closeAll}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <Link to="/contact" className="mobile-contact-btn" onClick={closeAll}>
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
