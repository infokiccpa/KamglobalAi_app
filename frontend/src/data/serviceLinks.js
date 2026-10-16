import { itServices } from './itServices';
import { outsourcingServices } from './outsourcingServices';

/** Resolve a service slug from either the IT or the outsourcing catalogue. */
export const findService = (slug) => {
    const it = itServices.find((s) => s.slug === slug);
    if (it) return { slug, name: it.name, short: it.short, to: `/services/${slug}` };
    const out = outsourcingServices.find((s) => s.slug === slug);
    if (out) return { slug, name: out.name, short: out.short, to: `/outsourcing/${slug}` };
    return null;
};
