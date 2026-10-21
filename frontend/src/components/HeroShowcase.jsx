import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Brain, Code2, Globe, Users } from 'lucide-react';
import { discoveryLink } from '../data/links';
import './HeroShowcase.css';

const NUM_SLICES = 14;
const SWEEP_MS = 1250;
const AUTO_MS = 4500;
const SLIT_RADIUS = 2.5;
const SLIT_FADE_MS = 320;
const EASE_OUT = [0.16, 1, 0.3, 1];

const SLIDES = [
    {
        image: '/images/hero/hero-two-engines.webp',
        alt: 'Team reviewing a delivery roadmap on a wall screen in a bright meeting room',
        kicker: 'India technology · Philippines operations',
        label: 'Two Delivery Engines',
        caption: 'Technology and operations, one relationship',
        to: '/#delivery-engines',
        segments: [
            { text: 'One Global Partner. ', tone: 'muted' },
            { text: 'Two Powerful Talent Engines.', tone: 'accent' },
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

const FEATURES = [
    { icon: Brain, title: 'AI-Powered Digital Solutions' },
    { icon: Code2, title: 'Product Development' },
    { icon: Users, title: 'Scalable Talent & Operations' },
    { icon: Globe, title: 'Global Delivery Model' },
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
                    <p className="kx-eyebrow">
                        <span className="kx-eyebrow-rule" aria-hidden="true" />
                        <span>Technology · AI · Digital Delivery · Workforce Solutions</span>
                    </p>

                    <h1 id="kx-title" className="kx-title">
                        <span className="kx-seg kx-seg--navy">One Global Partner.</span>
                        <span className="kx-seg kx-seg--accent">Two Powerful Talent Engines.</span>
                    </h1>

                    <p className="kx-lead">
                        Build digital products, leverage AI, and scale your operations with technology expertise from
                        India and business operations and workforce capabilities from the Philippines.
                    </p>

                    <div className="kx-actions">
                        <HeroButton to={discoveryLink('Home Hero')} label="Let's Discuss Your Project" variant="primary" />
                        <HeroButton to="/services" label="Explore Our Services" variant="ghost" />
                    </div>

                    <ul className="kx-features">
                        {FEATURES.map(({ icon: Icon, title }) => (
                            <li key={title}>
                                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                                <span>{title}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="kx-stage kx-depth"
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
