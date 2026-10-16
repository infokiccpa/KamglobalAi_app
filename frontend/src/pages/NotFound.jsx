import { Helmet } from 'react-helmet-async';
import { PageHero, Section, CardGrid } from '../components/page/PageKit';
import { Globe2, Layers, GraduationCap, Mail } from 'lucide-react';

const NotFound = () => (
    <div className="pg-page">
        <Helmet>
            <title>Page Not Found | KAM Global AI</title>
            <meta name="robots" content="noindex" />
        </Helmet>
        <PageHero
            compact
            eyebrow="404"
            title="We Couldn't Find That Page"
            sub="The page may have moved, or the link may be out of date."
            primary={{ label: 'Go to Homepage', to: '/' }}
            secondary={{ label: 'Contact Us', to: '/contact' }}
        />
        <Section tone="cream" eyebrow="Popular Pages" title="Where Would You Like to Go?">
            <CardGrid
                cols={4}
                variant="compact"
                items={[
                    { icon: Layers, title: 'Services', desc: 'Technology and outsourcing services.', to: '/services' },
                    { icon: Globe2, title: 'Global Outsourcing', desc: 'India and Philippines delivery engines.', to: '/outsourcing' },
                    { icon: GraduationCap, title: 'Products', desc: 'Education technology products.', to: '/products' },
                    { icon: Mail, title: 'Contact', desc: 'Tell us what you need.', to: '/contact' },
                ]}
            />
        </Section>
    </div>
);

export default NotFound;
