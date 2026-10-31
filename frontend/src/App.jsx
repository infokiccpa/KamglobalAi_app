import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FloatingActions from './components/FloatingActions';
import KaiChat from './components/KaiChat';
import CookieConsent from './components/CookieConsent';
import { legacyServiceTarget } from './data/services/legacyPaths';

const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDivision = lazy(() => import('./pages/ServiceDivision'));
const ServiceCategory = lazy(() => import('./pages/ServiceCategory'));
const Products = lazy(() => import('./pages/Products'));
const LearnX = lazy(() => import('./pages/LearnX'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const HRWorkforce = lazy(() => import('./pages/HRWorkforce'));
const HRTechnology = lazy(() => import('./pages/HRTechnology'));
const HRTrust = lazy(() => import('./pages/HRTrust'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const EngagementModels = lazy(() => import('./pages/EngagementModels'));
const EngagementModelDetail = lazy(() => import('./pages/EngagementModelDetail'));
const Resources = lazy(() => import('./pages/Resources'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Glossary = lazy(() => import('./pages/Glossary'));
const Article = lazy(() => import('./pages/Article'));
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
    if (!location.hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    let tries = 0;
    let timer;
    const go = () => {
      let target = null;
      try { target = document.querySelector(location.hash); } catch { target = null; }
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (tries < 15) {
        tries += 1;
        timer = window.setTimeout(go, 80);
      }
    };
    go();
    return () => window.clearTimeout(timer);
  }, [pathname, location.hash]);
  return null;
};

const LegacyPath = () => {
  const { pathname } = useLocation();
  const to = legacyServiceTarget(pathname);
  return to ? <Navigate to={to} replace /> : <NotFound />;
};

const JobToApplication = () => {
  const { id } = useParams();
  return <Navigate to={`/apply-now?job=${encodeURIComponent(id || '')}`} replace />;
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
            <Route path="/services/:divisionId/:categoryId" element={<ServiceCategory />} />
            <Route path="/services/:divisionId" element={<ServiceDivision />} />
            <Route path="/outsourcing" element={<LegacyPath />} />
            <Route path="/outsourcing/:slug" element={<LegacyPath />} />
            <Route path="/hr" element={<HRWorkforce />} />
            <Route path="/hr/services" element={<LegacyPath />} />
            <Route path="/hr/services/:slug" element={<LegacyPath />} />
            <Route path="/hr/technology" element={<HRTechnology />} />
            <Route path="/hr/technology/:slug" element={<HRTechnology />} />
            <Route path="/hr/jobs/:id" element={<JobToApplication />} />
            <Route path="/hr/jobs" element={<Navigate to="/careers#jobs" replace />} />
            <Route path="/hr/trust" element={<HRTrust />} />
            <Route path="/jobs" element={<Navigate to="/careers#jobs" replace />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/engagement-models" element={<EngagementModels />} />
            <Route path="/engagement-models/bot" element={<Navigate to="/services/it-technology/bot" replace />} />
            <Route path="/engagement-models/:slug" element={<EngagementModelDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/learnx" element={<LearnX />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/learnx" element={<Navigate to="/products/learnx" replace />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/case-studies" element={<CaseStudies />} />
            <Route path="/resources/glossary" element={<Glossary />} />
            <Route path="/resources/articles/:slug" element={<Article />} />
            <Route path="/team" element={<Navigate to="/about#leadership" replace />} />
            <Route path="/kamglobal-ai" element={<Navigate to="/about#why-us" replace />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/apply-now" element={<ApplyNow />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </main>
        <FloatingActions />
        <KaiChat />
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
