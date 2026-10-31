import { Navigate, useParams } from 'react-router-dom';
import { findDivision } from '../data/services/catalog';
import { legacyServiceTarget } from '../data/services/legacyPaths';
import { contactLink } from '../data/links';
import { products } from '../data/products';
import {
    CardGrid,
    CtaBand,
    Notice,
    PageHero,
    RelatedLinks,
    Section,
    Seo,
} from '../components/page/PageKit';
import NotFound from './NotFound';
import AudiencePaths from '../components/page/AudiencePaths';
import './ServicePages.css';

const ServiceDivision = () => {
    const { divisionId } = useParams();
    const legacy = legacyServiceTarget(`/services/${divisionId}`);
    if (legacy) return <Navigate to={legacy} replace />;
    const division = findDivision(divisionId);
    if (!division) return <NotFound />;

    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'Services', to: '/services' },
        { label: division.title },
    ];
    const featuredProducts = division.id === 'edtech'
        ? products.filter((product) => product.slug === 'learnx' || product.slug === 'eduaitutors')
        : [];

    return (
        <div className="pg-page">
            <Seo
                title={`${division.title} | KAM Global AI`}
                description={division.summary}
                path={`/services/${division.id}`}
                crumbs={crumbs}
            />
            <PageHero
                crumbs={crumbs}
                eyebrow={division.title}
                title={division.title}
                sub={division.intro}
                primary={{ label: 'Enquire about this division', to: contactLink(division.title, division.enquiryType) }}
                secondary={{ label: 'All services', to: '/services' }}
            />
            <AudiencePaths subject={division.title} enquiryType={division.enquiryType} work={division.title} />
            {featuredProducts.length > 0 && (
                <Section id="products" tone="white" eyebrow="Our products" title="Education products we operate" align="left">
                    <CardGrid
                        cols={2}
                        items={featuredProducts.map((product) => ({
                            title: product.slug === 'learnx' ? 'LearnX.school' : product.name,
                            desc: product.cardDesc,
                            image: product.image,
                            alt: product.alt,
                            tag: 'Product',
                            to: product.to,
                            cta: 'View product',
                        }))}
                    />
                </Section>
            )}
            <Section
                id="categories"
                tone={featuredProducts.length ? 'soft' : 'white'}
                eyebrow="Categories"
                title="Services in this division"
                intro={division.summary}
                align="left"
            >
                <CardGrid
                    cols={3}
                    items={division.categories.map((category) => ({
                        title: category.title,
                        desc: category.summary,
                        icon: category.icon || division.icon,
                        to: `/services/${division.id}/${category.id}`,
                        cta: 'View service',
                        points: (category.groups?.flatMap((group) => group.items) || category.capabilities).slice(0, 3),
                    }))}
                />
            </Section>
            <Section id="related" tone="soft" eyebrow="Also" title="Other divisions" align="left">
                <RelatedLinks
                    links={[
                        { label: 'All services', to: '/services' },
                        { label: 'Contact', to: contactLink(division.title, division.enquiryType) },
                        { label: 'Careers', to: '/careers' },
                    ]}
                />
            </Section>
            <CtaBand
                title={`Discuss ${division.title}`}
                text="Use the contact form and name this division. A person reviews the enquiry before anyone replies."
                primary={{ label: 'Request a consultation', to: contactLink(division.title, division.enquiryType) }}
            />
            {division.id === 'hr-solutions' && (
                <Section tone="white" align="left">
                    <Notice title="Looking for a job?">
                        Open roles are on the Careers page. This division is for employers.
                    </Notice>
                </Section>
            )}
        </div>
    );
};

export default ServiceDivision;
