import { Seo, PageHero, Section, CtaBand, Notice } from '../components/page/PageKit';
import { TrustGrid } from '../components/hr/HRKit';
import { trustPending, TRUST_UNCONFIRMED, hrContactLink } from '../data/hrWorkforce';

const confirmedDetails = trustPending.filter((p) => p.value && p.value !== TRUST_UNCONFIRMED);

const HRTrust = () => (
    <div className={`pg-page hr-page${import.meta.env.DEV ? ' hr-dev' : ''}`}>
        <Seo
            title="Trust & Security for HR Technology | KAM Global"
            description="How KAM Global protects candidate, employee and payroll data with role-based permissions, audit logs and audit-ready payroll records."
            path="/hr/trust"
            crumbs={[{ label: 'Home', to: '/' }, { label: 'HR & Workforce', to: '/hr' }, { label: 'Trust & Security', to: '/hr/trust' }]}
        />
        <PageHero
            compact
            crumbs={[{ label: 'Home', to: '/' }, { label: 'HR & Workforce', to: '/hr' }, { label: 'Trust & Security' }]}
            eyebrow="Trust & Security"
            title="Protecting People Data"
            sub="Controls built into our ATS, HRMS and payroll platforms."
            primary={{ label: 'Ask a security question', to: hrContactLink('HR Technology security') }}
        />
        <Section id="controls" tone="white" eyebrow="Controls" title="What Is in Place">
            <TrustGrid />
            <Notice title="Security documentation">
                We only list certifications and hosting details once they are confirmed. Contact our team for current
                security documentation.
            </Notice>
        </Section>
        {confirmedDetails.length > 0 && (
            <Section id="details" tone="cream" eyebrow="Details" title="Security Details">
                <ul className="hr-pending">
                    {confirmedDetails.map((p) => (
                        <li key={p.title}>
                            <strong>{p.title}</strong>
                            <span>{p.value}</span>
                        </li>
                    ))}
                </ul>
            </Section>
        )}
        <CtaBand
            title="Need more detail for your review?"
            text="Share your security questionnaire or questions and our team will respond."
            primary={{ label: 'Contact our team', to: hrContactLink('HR Technology security') }}
            secondary={{ label: 'HR technology', to: '/hr/technology' }}
        />
    </div>
);

export default HRTrust;
