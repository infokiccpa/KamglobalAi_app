import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FloatingActions from './components/FloatingActions';
import CookieConsent from './components/CookieConsent';

const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ITServiceDetail = lazy(() => import('./pages/ITServiceDetail'));
const ITDevelopment = lazy(() => import('./pages/ITDevelopment'));
const BOTModel = lazy(() => import('./pages/BOTModel'));
const ITStaffing = lazy(() => import('./pages/ITStaffing'));
const Products = lazy(() => import('./pages/Products'));
const LearnX = lazy(() => import('./pages/LearnX'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Outsourcing = lazy(() => import('./pages/Outsourcing'));
const OutsourcingDetail = lazy(() => import('./pages/OutsourcingDetail'));
const HRWorkforce = lazy(() => import('./pages/HRWorkforce'));
const HRServiceDetail = lazy(() => import('./pages/HRServiceDetail'));
const HRTechnology = lazy(() => import('./pages/HRTechnology'));
const HRJobs = lazy(() => import('./pages/HRJobs'));
const HRTrust = lazy(() => import('./pages/HRTrust'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const EngagementModels = lazy(() => import('./pages/EngagementModels'));
const EngagementModelDetail = lazy(() => import('./pages/EngagementModelDetail'));
const Resources = lazy(() => import('./pages/Resources'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Glossary = lazy(() => import('./pages/Glossary'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const ApplyNow = lazy(() => import('./pages/ApplyNow'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Support = lazy(() => import('./pages/Support'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

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

const Site = () => {
  const { pathname } = useLocation();
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    );
  }
  return (
      <div className="app">
        <Header />
        <main>
          <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/custom-development" element={<ITDevelopment />} />
            <Route path="/services/bot-model" element={<BOTModel />} />
            <Route path="/services/it-staffing" element={<ITStaffing />} />
            <Route path="/services/digital-marketing" element={<Navigate to="/outsourcing/digital-marketing-creative" replace />} />
            <Route path="/services/kam-group-partnership" element={<Navigate to="/about" replace />} />
            <Route path="/services/:slug" element={<ITServiceDetail />} />
            <Route path="/outsourcing" element={<Outsourcing />} />
            <Route path="/outsourcing/software-development" element={<Navigate to="/services/custom-development" replace />} />
            <Route path="/outsourcing/ai-data-automation" element={<Navigate to="/services/ai-automation" replace />} />
            <Route path="/outsourcing/cloud-managed-it" element={<Navigate to="/services/cloud-devops" replace />} />
            <Route path="/outsourcing/:slug" element={<OutsourcingDetail />} />
            <Route path="/hr" element={<HRWorkforce />} />
            <Route path="/hr/services" element={<Navigate to="/hr#services" replace />} />
            <Route path="/hr/services/:slug" element={<HRServiceDetail />} />
            <Route path="/hr/technology" element={<HRTechnology />} />
            <Route path="/hr/technology/:slug" element={<HRTechnology />} />
            <Route path="/hr/jobs" element={<HRJobs />} />
            <Route path="/hr/jobs/:id" element={<HRJobs />} />
            <Route path="/hr/trust" element={<HRTrust />} />
            <Route path="/jobs" element={<Navigate to="/hr/jobs" replace />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/engagement-models" element={<EngagementModels />} />
            <Route path="/engagement-models/bot" element={<Navigate to="/services/bot-model" replace />} />
            <Route path="/engagement-models/:slug" element={<EngagementModelDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/learnx" element={<LearnX />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/learnx" element={<Navigate to="/products/learnx" replace />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/case-studies" element={<CaseStudies />} />
            <Route path="/resources/glossary" element={<Glossary />} />
            <Route path="/team" element={<Navigate to="/about#leadership" replace />} />
            <Route path="/kamglobal-ai" element={<Navigate to="/about#why-us" replace />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/apply-now" element={<ApplyNow />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </main>
        <FloatingActions />
        <CookieConsent />
        <Footer />
      </div>
  );
};

export const AppShell = () => (
  <>
    <ScrollToTop />
    <Site />
  </>
);

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
