export const EASE_OUT = [0.16, 1, 0.3, 1];

export const VIEWPORT = { once: true, amount: 0.25 };

export const staggerParent = (stagger = 0.08, delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const fadeUpItem = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const popItem = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } },
};

/** Writes a small 3D tilt (in degrees) into --rx / --ry based on the pointer position. */
export const trackTilt = (event, max = 6) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--ry', `${(px * max * 2).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-py * max * 2).toFixed(2)}deg`);
};

export const resetTilt = (event) => {
    event.currentTarget.style.setProperty('--rx', '0deg');
    event.currentTarget.style.setProperty('--ry', '0deg');
};

/** Writes the pointer position into --mx / --my so CSS can draw a cursor spotlight. */
export const trackPointer = (event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
};
