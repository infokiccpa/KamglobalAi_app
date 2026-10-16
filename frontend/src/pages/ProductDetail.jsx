import { useParams } from 'react-router-dom';
import {
    Seo,
    PageHero,
    Section,
    Split,
    CardGrid,
    Steps,
    ChipList,
    CtaBand,
    RelatedLinks
} from '../components/page/PageKit';
import { softwareSchema } from '../lib/schema';
import { getProduct, products, PRODUCT_GETTING_STARTED } from '../data/products';
import { demoLink, contactLink } from '../data/links';
import NotFound from './NotFound';

const ProductDetail = () => {
    const { slug } = useParams();
    const product = getProduct(slug);
    if (!product?.hero) return <NotFound />;

    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
        { label: product.name, to: product.to },
    ];
    const others = products.filter((p) => p.slug !== product.slug);

    return (
        <div className="pg-page">
            <Seo title={product.seo.title} description={product.seo.description} path={product.to} crumbs={crumbs} schema={softwareSchema({ name: product.name, description: product.seo.description, path: product.to })} />

            <PageHero
                crumbs={[crumbs[0], crumbs[1], { label: product.name }]}
                eyebrow={`${product.name} · ${product.status}`}
                title={product.hero.title}
                sub={product.hero.sub}
                body={product.hero.body}
                primary={{ label: 'Request a Product Demo', to: demoLink(product.name) }}
                secondary={product.external ? { label: `Visit ${product.name}`, to: product.external } : { label: 'All Products', to: '/products' }}
                image={product.image}
                imageAlt={product.alt}
            />

            <Split
                id="overview"
                tone="cream"
                eyebrow="Overview"
                title="What the Product Helps You Do"
                image={product.image}
                imageAlt=""
                cta={{ label: 'Explore Product Details', to: '#capabilities' }}
            >
                <p>{product.overview.text}</p>
                {product.overview.method && (
                    <ol className="pg-method" aria-label={`${product.name} learning cycle`}>
                        {product.overview.method.map((m, i) => (
                            <li key={m}>
                                <span>{i + 1}</span>
                                {m}
                            </li>
                        ))}
                    </ol>
                )}
                {product.overview.grades && (
                    <ul className="pg-grades" aria-label="Grade coverage">
                        {product.overview.grades.map((g) => (
                            <li key={g.title}>
                                <strong>{g.title}</strong>
                                <span>{g.desc}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </Split>

            <Section
                id="capabilities"
                tone="white"
                eyebrow="Key Capabilities"
                title="Explore the Core Workflows"
                intro="Each capability below describes the user it supports and the task it helps with. We confirm the modules enabled for your deployment during a walkthrough."
                cta={{ label: 'Request a Demo', to: demoLink(product.name) }}
            >
                <CardGrid cols={4} items={product.capabilities} />
                {product.programs && (
                    <div className="pg-stack-top pg-center">
                        <ChipList items={product.programs} label="Programmes" />
                    </div>
                )}
            </Section>

            <Section
                id="who-it-is-for"
                tone="cream"
                eyebrow="Who It Is For"
                title="Designed Around the Users It Serves"
                intro="The product supports the roles below. Specific role features and integrations are confirmed for your setup."
                cta={{ label: 'Discuss Your Requirements', to: contactLink(product.name, 'Product Demo') }}
            >
                <CardGrid cols={4} variant="compact" items={product.audience} />
            </Section>

            <Section
                id="getting-started"
                tone="white"
                eyebrow="Getting Started"
                title="See Whether It Fits Your Environment"
                intro="A product discussion can cover use case, user groups, deployment requirements, integrations, data handling, and the next steps for a demonstration or evaluation."
                cta={{ label: 'Request a Product Demo', to: demoLink(product.name) }}
            >
                <Steps steps={PRODUCT_GETTING_STARTED} label="Getting started" />
                <RelatedLinks
                    title="Other products"
                    links={[...others.map((p) => ({ label: p.name, to: p.to })), { label: 'All products', to: '/products' }]}
                />
            </Section>

            <CtaBand
                title="Explore the Product with Our Team"
                text="Contact us to discuss your requirements and arrange a product conversation."
                primary={{ label: 'Contact Us', to: contactLink(product.name, 'Product Demo') }}
                secondary={product.external ? { label: `Visit ${product.name}`, to: product.external } : undefined}
            />
        </div>
    );
};

export default ProductDetail;
