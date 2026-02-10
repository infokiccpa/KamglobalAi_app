import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Brain } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'All Services', path: '/services' },
        { name: 'BOT Model', path: '/services#bot-model' },
        { name: 'IT Development', path: '/services#it-dev' },
        { name: 'Cloud Development', path: '/services#cloud' },
        { name: 'IT Staffing & Recruitment', path: '/services#staffing' },
        { name: 'Digital Marketing', path: '/services#marketing' },
        { name: 'Managed IT Services', path: '/services#managed-it' },
        { name: 'Strategic Partnership with KAMGROUPS Kuwait', path: '/services#partnership' },
      ]
    },
    { name: 'Products', path: '/products' },
    { name: 'Team', path: '/team' },
    { name: 'KamGlobalAI', path: '/kamglobal-ai' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <>
      <Link to="/" className={`logo-fixed ${scrolled ? 'scrolled' : ''}`}>
        <img src="/logo.png" alt="KAM Global AI Logo" className="logo-img" />
      </Link>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <div className="header-left-spacer"></div>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="nav-item-wrapper"
                onMouseEnter={() => link.dropdown && setServicesDropdown(true)}
                onMouseLeave={() => link.dropdown && setServicesDropdown(false)}
              >
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setServicesDropdown(false)}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className={`dropdown-icon ${servicesDropdown ? 'rotate' : ''}`} />}
                </Link>

                {link.dropdown && servicesDropdown && (
                  <div className="dropdown-menu glass">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="dropdown-item"
                        onClick={() => setServicesDropdown(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                <Link
                  to={link.path}
                  className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="mobile-dropdown">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="mobile-dropdown-item"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            <Link to="/contact" className="btn btn-primary" onClick={() => setIsOpen(false)}>Contact us</Link>
          </div>
        </div>
      </header>



      <Link to="/contact" className={`contact-btn-fixed ${scrolled ? 'scrolled' : ''}`}>
        Contact us
      </Link>
    </>
  );
};

export default Header;
