import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Building2, Globe2, Award } from 'lucide-react';
import { discoveryLink } from '../data/links';
import './HeroShowcase.css';

const NUM_SLICES = 14;
const SWEEP_MS = 1250;
const AUTO_MS = 4500;
const TYPE_MS = 18;
const SLIT_RADIUS = 2.5;
const SLIT_FADE_MS = 320;
const EASE_OUT = [0.16, 1, 0.3, 1];

const SLIDES = [
    {
        image: '/images/hero/hero-two-engines.webp',
        alt: 'Team reviewing a delivery roadmap on a wall screen in a bright meeting room',
        kicker: 'Technology · Outsourcing · HR & Workforce · Products',
        label: 'Two Delivery Engines',
        caption: 'India technology · Philippines operations',
        to: '/about',
        segments: [
            { text: 'Build in India. ', tone: 'muted' },
            { text: 'Scale from the Philippines. ' },
            { text: 'Grow with one partner.', tone: 'accent' },
        ],
    },
    {
        image: '/images/hero/hero-tech-india.webp',
        alt: 'Two software engineers reviewing code and a cloud architecture diagram on dual monitors',
        kicker: 'India Engine · Enterprise Technology',
        label: 'Enterprise Technology',
        caption: 'Software, cloud, AI & data delivery',
        to: '/services',
        segments: [
            { text: 'Software, cloud & AI ', tone: 'muted' },
            { text: 'delivered by a dedicated ' },
            { text: 'India technology team.', tone: 'accent' },
        ],
    },
    {
        image: '/images/hero/hero-cx-philippines.webp',
        alt: 'Customer support specialist wearing a headset, assisted by a team lead in a bright operations office',
        kicker: 'Philippines Engine · Global Outsourcing',
        label: 'Global Outsourcing',
        caption: 'CX, BPO, sales support & RPO',
        to: '/outsourcing',
        segments: [
            { text: 'Customer experience & BPO ', tone: 'muted' },
            { text: 'run by operations teams ' },
            { text: 'in the Philippines.', tone: 'accent' },
        ],
    },
    {
        image: '/images/hr/hr-hero.jpg',
        alt: 'Recruiter shaking hands with a candidate while the HR team reviews profiles',
        kicker: 'HR & Workforce · India, GCC & USA',
        label: 'HR & Workforce',
        caption: 'Recruitment, staffing & payroll',
        to: '/hr',
        segments: [
            { text: 'Hire smarter, ', tone: 'muted' },
            { text: 'pay accurately and ' },
            { text: 'grow your workforce globally.', tone: 'accent' },
        ],
    },
    {
        image: '/images/hero/hero-digital-learning.webp',
        alt: 'Teacher guiding students using tablets and laptops in a bright classroom',
        kicker: 'Digital Products · LearnX & EduAiTutors',
        label: 'Digital Products',
        caption: 'School ERP, LMS & coaching platforms',
        to: '/products/learnx',
        segments: [
            { text: 'School ERP, LMS & coaching ', tone: 'muted' },
            { text: 'platforms built for ' },
            { text: 'modern education.', tone: 'accent' },
        ],
    },
];

const TRUST = [
    { icon: Building2, title: 'Backed by KAM Group', sub: 'Kuwait' },
    { icon: Globe2, title: 'Two delivery engines', sub: 'India · Philippines' },
    { icon: Award, title: '10+ years legacy', sub: 'Group experience' },
];

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
function paintSlits(slices, x, amp) {
    for (let k = 0; k < NUM_SLICES; k++) {
        const el = slices[k] && slices[k].slit;
        if (!el) continue;
        const d = Math.abs(k + 0.5 - x);
        const v = d < SLIT_RADIUS ? 0.5 * (1 + Math.cos((Math.PI * d) / SLIT_RADIUS)) * amp : 0;
        el.style.transform = 'scaleX(' + v.toFixed(3) + ')';
    }
}

const TypedHeadline = ({ segments, instant }) => {
    const total = useMemo(() => segments.reduce((n, s) => n + s.text.length, 0), [segments]);
    const [typed, setTyped] = useState(instant ? total : 0);
    const done = typed >= total;

    useEffect(() => {
        if (done) return undefined;
        const id = setTimeout(() => setTyped((t) => t + 1), TYPE_MS);
        return () => clearTimeout(id);
    }, [typed, done]);

    const parts = useMemo(() => {
        const out = [];
        let left = typed;
        let cursorPlaced = false;
        segments.forEach((s, i) => {
            const shown = Math.max(0, Math.min(s.text.length, left));
            left -= s.text.length;
            const withCursor = !cursorPlaced && (shown < s.text.length || i === segments.length - 1);
            if (withCursor) cursorPlaced = true;
            out.push({ key: i, tone: s.tone, shown: s.text.slice(0, shown), rest: s.text.slice(shown), withCursor });
        });
        return out;
    }, [segments, typed]);

    return (
        <span className="kx-typed" aria-hidden="true">
            {parts.map((p) => (
                <span key={p.key} className={p.tone ? 'kx-seg kx-seg--' + p.tone : 'kx-seg'}>
                    {p.shown}
                    {p.withCursor && <span className={'kx-cursor' + (done ? ' is-done' : '')} />}
                    <span className="kx-untyped">{p.rest}</span>
                </span>
            ))}
        </span>
    );
};

const HeroButton = ({ to, label, variant }) => (
    <Link to={to} className={'kx-btn kx-btn--' + variant} aria-label={label}>
        <span className="kx-btn-label" aria-hidden="true">
            {label.split('').map((ch, i) => (
                <span key={i} className="kx-btn-char" style={{ '--i': i }}>
                    {ch === ' ' ? '\u00A0' : ch}
                </span>
            ))}
        </span>
        <span className="kx-btn-arrow" aria-hidden="true">
            <ArrowRight size={20} className="kx-btn-arrow-a" />
            <ArrowRight size={20} className="kx-btn-arrow-b" />
        </span>
    </Link>
);

const HeroShowcase = () => {
    const [reduced] = useState(prefersReducedMotion);
    const [index, setIndex] = useState(0);
    const [incoming, setIncoming] = useState(null);
    const [pageHidden, setPageHidden] = useState(false);

    const slicesRef = useRef([]);
    const panelRef = useRef(null);
    const slitRef = useRef({ x: -10, amp: 0, frame: 0, fade: 0 });

    const active = incoming ?? index;
    const slide = SLIDES[active];
    const fullTitle = slide.segments.map((s) => s.text).join('');

    const setSliceEl = (k, part) => (el) => {
        if (!slicesRef.current[k]) slicesRef.current[k] = {};
        slicesRef.current[k][part] = el;
    };

    const goTo = useCallback(
        (target) => {
            if (incoming !== null || target === index) return;
            if (reduced) {
                setIndex(target);
                return;
            }
            setIncoming(target);
        },
        [incoming, index, reduced],
    );

    // Slice sweep: each slice starts (k / 14) * 0.5 into the run and finishes inside a 0.5 window.
    useEffect(() => {
        if (incoming === null) return undefined;
        let raf = 0;
        const start = performance.now();
        const step = (now) => {
            const p = clamp01((now - start) / SWEEP_MS);
            for (let k = 0; k < NUM_SLICES; k++) {
                const s = slicesRef.current[k];
                if (!s) continue;
                const t = clamp01((p - (k / NUM_SLICES) * 0.5) / 0.5);
                const e = 1 - Math.pow(1 - t, 3);
                if (s.base) s.base.style.clipPath = 'inset(0 0 0 ' + (e * 100).toFixed(2) + '%)';
                if (s.next) s.next.style.clipPath = 'inset(0 ' + ((1 - e) * 100).toFixed(2) + '% 0 0)';
                if (s.seam) {
                    s.seam.style.left = (e * 100).toFixed(2) + '%';
                    s.seam.style.opacity = t > 0 && t < 1 ? '1' : '0';
                }
            }
            if (p < 1) {
                raf = requestAnimationFrame(step);
            } else {
                setIndex(incoming);
                setIncoming(null);
            }
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [incoming]);

    // The base layer now shows the new slide; clear sweep clipping before paint.
    useLayoutEffect(() => {
        slicesRef.current.forEach((s) => {
            if (s?.base) s.base.style.clipPath = '';
            if (s?.seam) s.seam.style.opacity = '0';
        });
    }, [index]);

    useEffect(() => {
        const next = SLIDES[(index + 1) % SLIDES.length];
        const img = new Image();
        img.src = next.image;
    }, [index]);

    useEffect(() => {
        const onVis = () => setPageHidden(document.hidden);
        document.addEventListener('visibilitychange', onVis);
        return () => document.removeEventListener('visibilitychange', onVis);
    }, []);

    useEffect(() => {
        if (reduced || pageHidden || incoming !== null) return undefined;
        const id = setTimeout(() => goTo((index + 1) % SLIDES.length), AUTO_MS);
        return () => clearTimeout(id);
    }, [index, incoming, pageHidden, reduced, goTo]);

    // Hover lens: a cream slit opens across the slices nearest the cursor with a cosine falloff.
    const onPointerMove = (e) => {
        if (reduced || e.pointerType !== 'mouse' || !panelRef.current) return;
        const rect = panelRef.current.getBoundingClientRect();
        const s = slitRef.current;
        s.x = ((e.clientX - rect.left) / rect.width) * NUM_SLICES;
        s.amp = 1;
        cancelAnimationFrame(s.fade);
        if (!s.frame) {
            s.frame = requestAnimationFrame(() => {
                s.frame = 0;
                paintSlits(slicesRef.current, s.x, s.amp);
            });
        }
    };

    const onPointerLeave = () => {
        const s = slitRef.current;
        if (s.amp === 0) return;
        const from = s.amp;
        const start = performance.now();
        const fade = (now) => {
            s.amp = from * (1 - clamp01((now - start) / SLIT_FADE_MS));
            paintSlits(slicesRef.current, s.x, s.amp);
            if (s.amp > 0) s.fade = requestAnimationFrame(fade);
        };
        cancelAnimationFrame(s.fade);
        s.fade = requestAnimationFrame(fade);
    };

    useEffect(() => {
        const s = slitRef.current;
        return () => {
            cancelAnimationFrame(s.frame);
            cancelAnimationFrame(s.fade);
        };
    }, []);

    const sliceStyle = (k) => ({ width: NUM_SLICES * 100 + '%', left: -(k * 100) + '%' });

    return (
        <section className="kx" aria-labelledby="kx-title">
            <div className="container kx-inner">
                <motion.div
                    className="kx-copy"
                    initial={reduced ? false : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
                >
                    <div className="kx-kicker-row">
                        <div className="kx-kicker-wrap">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.p
                                    key={active}
                                    className="kx-kicker"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 8 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                >
                                    {slide.kicker}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    <h1 id="kx-title" className="kx-title">
                        <span className="sr-only">{fullTitle}</span>
                        <span className="kx-title-stack" aria-hidden="true">
                            {SLIDES.map((s) => (
                                <span key={s.label} className="kx-title-ghost">
                                    {s.segments.map((x) => x.text).join('')}
                                </span>
                            ))}
                            <TypedHeadline key={active} segments={slide.segments} instant={reduced} />
                        </span>
                    </h1>

                    <p className="kx-lead">
                        IT &amp; technology delivery, global outsourcing, HR &amp; workforce solutions, education
                        products, and flexible engagement models — shaped around what you need next.
                    </p>

                    <div className="kx-actions">
                        <HeroButton to={discoveryLink('Home Hero')} label="Discuss Your Needs" variant="primary" />
                        <HeroButton to="/services" label="Explore Services" variant="ghost" />
                    </div>

                    <ul className="kx-trust">
                        {TRUST.map(({ icon: Icon, title, sub }) => (
                            <li key={title}>
                                <span className="kx-trust-icon" aria-hidden="true"><Icon size={16} /></span>
                                <span>
                                    <strong>{title}</strong>
                                    <small>{sub}</small>
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="kx-stage"
                    initial={reduced ? false : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
                >
                    <div
                        ref={panelRef}
                        className="kx-panel"
                        onPointerMove={onPointerMove}
                        onPointerLeave={onPointerLeave}
                    >
                        <div className="kx-slices" role="img" aria-label={slide.alt}>
                            {Array.from({ length: NUM_SLICES }, (_, k) => (
                                <div key={k} className="kx-slice">
                                    <img
                                        ref={setSliceEl(k, 'base')}
                                        src={SLIDES[index].image}
                                        alt=""
                                        style={sliceStyle(k)}
                                        fetchpriority={k === 0 && index === 0 ? 'high' : undefined}
                                        decoding="async"
                                        draggable="false"
                                    />
                                    {incoming !== null && (
                                        <img
                                            ref={setSliceEl(k, 'next')}
                                            src={SLIDES[incoming].image}
                                            alt=""
                                            className="kx-slice-next"
                                            style={sliceStyle(k)}
                                            decoding="async"
                                            draggable="false"
                                        />
                                    )}
                                    <span ref={setSliceEl(k, 'seam')} className="kx-seam" />
                                    <span ref={setSliceEl(k, 'slit')} className="kx-slit" />
                                </div>
                            ))}
                        </div>
                        <div className="kx-scrim" aria-hidden="true" />

                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={active}
                                className="kx-caption"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                            >
                                <span className="kx-caption-dot" aria-hidden="true" />
                                <span className="kx-caption-text">
                                    <strong>{slide.label}</strong>
                                    <small>{slide.caption}</small>
                                </span>
                                <Link
                                    to={slide.to}
                                    className="kx-caption-link"
                                    aria-label={'Explore ' + slide.label}
                                >
                                    <ArrowUpRight size={16} aria-hidden="true" />
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroShowcase;
