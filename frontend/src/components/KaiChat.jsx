import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, Sparkles } from 'lucide-react';
import { whatsappLink } from '../data/company';
import { contactLink } from '../data/links';
import './KaiChat.css';

const CLIENTS = {
    it: {
        label: 'Software and IT',
        text: 'Software and IT services are delivered from India. You can review the services, or send an enquiry.',
        page: 'View software and IT',
        to: '/services',
        enquiry: contactLink('India Technology Delivery', 'Technology Services'),
        wa: 'Hello, I would like to discuss software and IT services from India.',
    },
    outsourcing: {
        label: 'Outsourcing',
        text: 'Business operations are delivered from the Philippines. You can review the work, or send an enquiry.',
        page: 'View outsourcing',
        to: '/outsourcing',
        enquiry: contactLink('Philippines Operations', 'Global Outsourcing'),
        wa: 'Hello, I would like to discuss outsourcing and business operations from the Philippines.',
    },
    hr: {
        label: 'Recruitment, staffing and payroll',
        text: 'Recruitment, staffing and payroll. You can review HR services, or tell the team what you need to hire.',
        page: 'View HR services',
        to: '/hr',
        enquiry: contactLink('Recruitment', 'Request Talent'),
        wa: 'Hello, I would like to discuss recruitment, staffing or payroll.',
    },
    media: {
        label: 'AI & media',
        text: 'AI video, design and content. You can review this work, or send an enquiry.',
        page: 'View AI & media',
        to: '/outsourcing/digital-marketing-creative',
        enquiry: contactLink('Digital Marketing & Creative', 'Global Outsourcing'),
        wa: 'Hello, I would like to discuss AI and media services, including video, design and content.',
    },
};

const scene = (step, memory) => {
    if (step === 'start') {
        return {
            text: 'What are you looking for today?',
            choices: [
                { label: 'A job', next: 'job' },
                { label: 'A partnership', next: 'partner' },
                { label: 'Hiring or a client project', next: 'client' },
                { label: "I'm not sure", next: 'unsure' },
            ],
        };
    }

    if (step === 'unsure') {
        return {
            text: 'People usually come here for a job, a partnership, or a service. Which is closest?',
            choices: [
                { label: 'A job', next: 'job' },
                { label: 'A partnership', next: 'partner' },
                { label: 'Show the services', next: 'client' },
            ],
        };
    }

    if (step === 'job') {
        return {
            text: 'Which kind of role are you looking for?',
            choices: [
                { label: 'Technology', next: 'job-where', memory: { role: 'technology' } },
                { label: 'Operations', next: 'job-where', memory: { role: 'operations' } },
                { label: 'HR', next: 'job-where', memory: { role: 'HR' } },
                { label: 'AI & media', next: 'job-where', memory: { role: 'AI and media' } },
                { label: 'Something else', next: 'job-where', memory: { role: 'a role' } },
            ],
        };
    }

    if (step === 'job-where') {
        return {
            text: 'Where would you like to work?',
            choices: [
                { label: 'India', next: 'job-done', memory: { place: 'India' } },
                { label: 'The GCC', next: 'job-done', memory: { place: 'the GCC' } },
                { label: 'The USA', next: 'job-done', memory: { place: 'the USA' } },
                { label: 'More than one country', next: 'job-done', memory: { place: 'more than one country' } },
            ],
        };
    }

    if (step === 'job-done') {
        const place = memory.place ? ` in ${memory.place}` : '';
        const phrase = {
            technology: 'a technology role',
            operations: 'an operations role',
            HR: 'an HR role',
            'AI and media': 'an AI and media role',
        }[memory.role] || 'a role';
        return {
            text: `Open roles are on the jobs page. You can also message the team on WhatsApp about ${phrase}${place}.`,
            links: [
                { label: 'Browse job openings', to: '/hr/jobs' },
                { label: 'WhatsApp the team', href: whatsappLink(`Hello, I am looking for ${phrase}${place}. I am contacting KAM Global AI from the website.`) },
            ],
        };
    }

    if (step === 'partner') {
        return {
            text: 'What would you like to work on together?',
            choices: [
                { label: 'Technology', next: 'partner-done', memory: { topic: 'technology' } },
                { label: 'Operations', next: 'partner-done', memory: { topic: 'operations' } },
                { label: 'HR', next: 'partner-done', memory: { topic: 'HR' } },
                { label: 'AI & media', next: 'partner-done', memory: { topic: 'AI and media' } },
                { label: 'Not sure yet', next: 'partner-done', memory: { topic: 'a partnership' } },
            ],
        };
    }

    if (step === 'partner-done') {
        const topic = memory.topic || 'a partnership';
        const subject = {
            technology: 'India Technology Delivery',
            operations: 'Philippines Operations',
            HR: 'HR Partnership',
            'AI and media': 'Digital Marketing & Creative',
        }[topic] || 'Partnership';
        return {
            text: `Send an enquiry about ${topic}. Include your market and what you want to work on, or message the team on WhatsApp.`,
            links: [
                { label: 'Send an enquiry', to: contactLink(subject, 'Partnership') },
                { label: 'WhatsApp the team', href: whatsappLink(`Hello, I would like to discuss a partnership around ${topic}. I am contacting KAM Global AI from the website.`) },
            ],
        };
    }

    if (step === 'client') {
        return {
            text: 'Which service do you need?',
            choices: Object.entries(CLIENTS).map(([key, item]) => ({
                label: item.label,
                next: 'client-done',
                memory: { service: key },
            })),
        };
    }

    if (step === 'client-done') {
        const item = CLIENTS[memory.service] || CLIENTS.it;
        return {
            text: item.text,
            links: [
                { label: item.page, to: item.to },
                { label: 'Send an enquiry', to: item.enquiry },
                { label: 'WhatsApp the team', href: whatsappLink(`${item.wa} I am contacting KAM Global AI from the website.`) },
            ],
        };
    }

    return scene('start', {});
};

const normalise = (value) => value.toLowerCase().replace(/[^a-z0-9& ]/g, ' ').replace(/\s+/g, ' ').trim();

const matchChoice = (text, choices = []) => {
    const query = normalise(text);
    if (query.length < 2) return null;
    return choices.find((choice) => {
        const label = normalise(choice.label);
        return query === label || query.includes(label) || (label.includes(query) && query.length > 2);
    }) || null;
};

const matchIntent = (text) => {
    const query = normalise(text);
    const has = (...words) => words.some((word) => query.includes(word));
    if (has('job', 'career', 'vacancy', 'opening', 'apply')) return { next: 'job' };
    if (has('partner', 'collaborat')) return { next: 'partner' };
    if (has('not sure', 'dont know', "don't know")) return { next: 'unsure' };
    if (has('ai media', 'ai & media', 'video', 'creative', 'motion')) {
        return { next: 'client-done', memory: { service: 'media' } };
    }
    if (has('outsourc', 'bpo', 'philippines', 'back office')) {
        return { next: 'client-done', memory: { service: 'outsourcing' } };
    }
    if (has('software', 'develop', 'application', 'it service')) {
        return { next: 'client-done', memory: { service: 'it' } };
    }
    if (has('payroll', 'recruit', 'staffing', 'hiring')) {
        return { next: 'client-done', memory: { service: 'hr' } };
    }
    if (has('client', 'employer', 'project', 'service')) return { next: 'client' };
    return null;
};

const KaiChat = () => {
    const panelRef = useRef(null);
    const launcherRef = useRef(null);
    const logRef = useRef(null);
    const openedByUser = useRef(false);
    const returnFocus = useRef(false);
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState('start');
    const [memory, setMemory] = useState({});
    const [turns, setTurns] = useState(() => [{ role: 'kai', text: scene('start', {}).text }]);
    const [draft, setDraft] = useState('');

    const current = scene(step, memory);

    const close = () => {
        sessionStorage.setItem('kai-dismissed', '1');
        returnFocus.current = true;
        setOpen(false);
    };

    const openFromUser = () => {
        openedByUser.current = true;
        setOpen(true);
    };

    const restart = () => {
        const start = scene('start', {});
        setMemory({});
        setStep('start');
        setDraft('');
        setTurns([{ role: 'kai', text: start.text }]);
    };

    const choose = (choice, shown) => {
        const nextMemory = { ...memory, ...(choice.memory || {}) };
        const next = scene(choice.next, nextMemory);
        setMemory(nextMemory);
        setStep(choice.next);
        setDraft('');
        setTurns((existing) => [
            ...existing,
            { role: 'user', text: shown || choice.label },
            { role: 'kai', text: next.text },
        ]);
    };

    const sendDraft = (event) => {
        event.preventDefault();
        const text = draft.trim().slice(0, 400);
        if (!text) return;
        const choice = matchChoice(text, current.choices);
        if (choice) {
            choose(choice, text);
            return;
        }
        const intent = matchIntent(text);
        if (intent) {
            choose(intent, text);
            return;
        }
        setMemory({});
        setStep('start');
        setDraft('');
        setTurns((existing) => [
            ...existing,
            { role: 'user', text },
            {
                role: 'kai',
                text: 'I can help with a job, a partnership, or a service, including AI & media. Choose one below, or type which of those you need.',
            },
        ]);
    };

    useEffect(() => {
        if (sessionStorage.getItem('kai-dismissed')) return undefined;
        let openTimer;
        const arm = () => {
            openTimer = window.setTimeout(() => setOpen(true), 800);
        };
        if (localStorage.getItem('kamglobal_cookie_consent')) {
            arm();
            return () => window.clearTimeout(openTimer);
        }
        const wait = window.setInterval(() => {
            if (!localStorage.getItem('kamglobal_cookie_consent')) return;
            window.clearInterval(wait);
            arm();
        }, 400);
        return () => {
            window.clearInterval(wait);
            window.clearTimeout(openTimer);
        };
    }, []);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (event) => {
            if (event.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    useEffect(() => {
        if (open && openedByUser.current) panelRef.current?.focus();
        if (!open && returnFocus.current) {
            returnFocus.current = false;
            launcherRef.current?.focus();
        }
    }, [open]);

    useEffect(() => {
        const log = logRef.current;
        if (!open || !log) return;
        log.scrollTop = log.scrollHeight;
    }, [open, turns, step]);

    return (
        <>
            {open && (
                <section
                    className="kai-panel"
                    role="dialog"
                    aria-labelledby="kai-title"
                    aria-describedby="kai-tag"
                    ref={panelRef}
                    tabIndex={-1}
                >
                    <header className="kai-head">
                        <div className="kai-id">
                            <span className="kai-orb" aria-hidden="true"><Sparkles size={16} /></span>
                            <div>
                                <p id="kai-title" className="kai-name">KAI</p>
                                <p id="kai-tag" className="kai-tag">Shared understanding. Needs kept updated.</p>
                            </div>
                        </div>
                        <button type="button" className="kai-close" onClick={close} aria-label="Close KAI">
                            <X size={18} aria-hidden="true" />
                        </button>
                    </header>
                    <div className="kai-log" ref={logRef}>
                        {turns.map((turn, index) => (
                            <p
                                key={`${turn.role}-${index}`}
                                className={`kai-msg kai-msg--${turn.role}`}
                                aria-live={index === turns.length - 1 ? 'polite' : undefined}
                            >
                                {turn.text}
                            </p>
                        ))}
                        {current.choices && (
                            <div className="kai-choices" role="group" aria-label="Choices">
                                {current.choices.map((choice) => (
                                    <button key={choice.label} type="button" onClick={() => choose(choice)}>
                                        {choice.label}
                                    </button>
                                ))}
                            </div>
                        )}
                        {current.links && (
                            <div className="kai-links">
                                {current.links.map((item) => (
                                    item.href ? (
                                        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                                            {item.label}
                                        </a>
                                    ) : (
                                        <Link key={item.label} to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>
                                    )
                                ))}
                            </div>
                        )}
                        {step !== 'start' && (
                            <button type="button" className="kai-restart" onClick={restart}>
                                Start again
                            </button>
                        )}
                    </div>
                    <form className="kai-compose" onSubmit={sendDraft}>
                        <input
                            type="text"
                            value={draft}
                            maxLength={400}
                            placeholder="Or type what you need"
                            aria-label="Message KAI"
                            onChange={(event) => setDraft(event.target.value)}
                        />
                        <button type="submit" aria-label="Send message" disabled={!draft.trim()}>
                            <Send size={16} aria-hidden="true" />
                        </button>
                    </form>
                </section>
            )}
            <button
                type="button"
                className="kai-launcher"
                ref={launcherRef}
                aria-expanded={open}
                onClick={() => (open ? close() : openFromUser())}
                hidden={open}
            >
                <span className="kai-launcher-mark" aria-hidden="true"><Sparkles size={18} /></span>
                <span className="kai-launcher-label">Ask KAI</span>
            </button>
        </>
    );
};

export default KaiChat;
