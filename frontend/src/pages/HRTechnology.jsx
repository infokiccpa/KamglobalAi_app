import { useParams } from 'react-router-dom';
import { Seo, PageHero, Section, CardGrid, CtaBand, RelatedLinks, Notice } from '../components/page/PageKit';
import { softwareSchema } from '../lib/schema';
import { TechEcosystem } from '../components/hr/HRKit';
import { getHrTech, hrTechnology, hrDemoLink } from '../data/hrWorkforce';
import NotFound from './NotFound';

const Overview = () => (
    <div className={`pg-page hr-page${import.meta.env.DEV ? ' hr-dev' : ''}`}>
        <Seo
            title="HR Technology: ATS, HRMS & Payroll | KAM Global"
            description="One connected HR stack: an applicant tracking system, HRMS and payroll platform that share data from hiring to payslip."
            path="/hr/technology"
            crumbs={[{ label: 'Home', to: '/' }, { label: 'HR & Workforce', to: '/hr' }, { label: 'HR Technology', to: '/hr/technology' }]}
        />
        <PageHero
            crumbs={[{ label: 'Home', to: '/' }, { label: 'HR & Workforce', to: '/hr' }, { label: 'HR Technology' }]}
            eyebrow="HR Technology"
            title="ATS, HRMS and Payroll, Connected."
            sub="Hiring data flows into employee records, and attendance flows into payroll."
            body="Our platforms support our own recruitment and payroll delivery, and can be demonstrated for your team."
            primary={{ label: 'Book a Demo', to: hrDemoLink('HR Technology') }}
            secondary={{ label: 'HR services', to: '/hr#services' }}
            image="/images/hr/hr-technology.jpg"
            imageAlt="Applicant tracking pipeline and payroll dashboards on a laptop and monitor"
        />
        <section className="hr-section" aria-label="Connected stack">
            <div className="container">
                <TechEcosystem />
            </div>
        </section>
        <Section id="platforms" tone="white" eyebrow="Platforms" title="Explore Each Platform">
            <CardGrid
                cols={3}
                items={hrTechnology.map((t) => ({ icon: t.icon, title: t.full, desc: t.desc, to: `/hr/technology/${t.slug}`, cta: `Explore ${t.name}`, tag: t.name }))}
            />
        </Section>
        <CtaBand
            title="See the platforms in action"
            text="Book a demo and we will walk you through the workflows that matter to your team."
            primary={{ label: 'Book a Demo', to: hrDemoLink('HR Technology') }}
            secondary={{ label: 'Trust & security', to: '/hr/trust' }}
        />
    </div>
);

const Detail = ({ tech }) => {
    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'HR & Workforce', to: '/hr' },
        { label: 'HR Technology', to: '/hr/technology' },
        { label: tech.name, to: `/hr/technology/${tech.slug}` },
    ];
    const confirmed = tech.features.filter((f) => !f.roadmap);
    const roadmap = tech.features.filter((f) => f.roadmap);
    const Icon = tech.icon;

    return (
        <div className={`pg-page hr-page${import.meta.env.DEV ? ' hr-dev' : ''}`}>
            <Seo title={`${tech.full} (${tech.name}) | KAM Global`} description={tech.desc} path={`/hr/technology/${tech.slug}`} crumbs={crumbs} schema={softwareSchema({ name: tech.full, description: tech.desc, path: `/hr/technology/${tech.slug}` })} />
            <PageHero
                crumbs={[crumbs[0], crumbs[1], crumbs[2], { label: tech.name }]}
                eyebrow={tech.full}
                title={tech.tagline}
                body={tech.desc}
                primary={{ label: `Book a ${tech.name} demo`, to: hrDemoLink(`HR ${tech.name}`) }}
                secondary={{ label: 'All HR technology', to: '/hr/technology' }}
                image="/images/hr/hr-technology.jpg"
                imageAlt={`${tech.full} dashboard on a laptop and monitor`}
            />
            <Section id="features" tone="cream" eyebrow="Features" title={`What the ${tech.name} Covers`}>
                <CardGrid cols={4} variant="compact" items={confirmed.map((f) => ({ ...f, icon: Icon }))} />
            </Section>
            {roadmap.length > 0 && (
                <Section id="roadmap" tone="white" eyebrow="Roadmap" title="Planned Capabilities" intro="These capabilities are planned and not yet confirmed as available.">
                    <div data-todo>
                        <CardGrid cols={3} variant="compact" items={roadmap.map((f) => ({ ...f, icon: Icon, tag: 'Roadmap' }))} />
                    </div>
                </Section>
            )}
            <Section id="more" tone="white" align="left" title="Related">
                <RelatedLinks
                    title="Other platforms"
                    links={[
                        ...hrTechnology.filter((t) => t.slug !== tech.slug).map((t) => ({ label: t.full, to: `/hr/technology/${t.slug}` })),
                        { label: 'Trust & security', to: '/hr/trust' },
                    ]}
                />
                <Notice title="Demonstrations">Features shown are discussed and confirmed during a demo for your use case.</Notice>
            </Section>
            <CtaBand
                title={`See the ${tech.name} live`}
                text="Book a demo and we will show the workflows that matter to your team."
                primary={{ label: 'Book a Demo', to: hrDemoLink(`HR ${tech.name}`) }}
                secondary={{ label: 'HR services', to: '/hr#services' }}
            />
        </div>
    );
};

const HRTechnology = () => {
    const { slug } = useParams();
    if (!slug) return <Overview />;
    const tech = getHrTech(slug);
    return tech ? <Detail key={slug} tech={tech} /> : <NotFound />;
};

export default HRTechnology;
