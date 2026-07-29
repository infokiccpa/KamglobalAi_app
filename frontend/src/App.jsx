import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import WhyKamGlobalAI from './pages/WhyKamGlobalAI';
import LMS from './pages/LMS';
import LearnX from './pages/LearnX';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import ApplyNow from './pages/ApplyNow';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Support from './pages/Support';
import FloatingActions from './components/FloatingActions';
import CookieConsent from './components/CookieConsent';

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, location.hash]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<LMS />} />
            <Route path="/products/learnx" element={<LearnX />} />
            <Route path="/learnx" element={<Navigate to="/products/learnx" replace />} />
            <Route path="/team" element={<Navigate to="/about#leadership" replace />} />
            <Route path="/kamglobal-ai" element={<WhyKamGlobalAI />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/apply-now" element={<ApplyNow />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
        <FloatingActions />
        <CookieConsent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
