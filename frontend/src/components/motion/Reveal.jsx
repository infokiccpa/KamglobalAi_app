import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT, VIEWPORT } from './motionPresets';
import './Reveal.css';

const wordsVariants = {
    hidden: {},
    show: (delay) => ({ transition: { staggerChildren: 0.055, delayChildren: delay } }),
};

const wordVariants = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 0.75, ease: EASE_OUT } },
};

const toWords = (text, accent) => [
    ...text.split(' ').filter(Boolean).map((w) => ({ w, accent: false })),
    ...(accent ? accent.split(' ').filter(Boolean).map((w) => ({ w, accent: true })) : []),
];

/** Heading whose words slide up from a mask when scrolled into view. */
export const SplitText = ({ as: Tag = 'h2', text, accent, className, delay = 0, breakBeforeAccent = false }) => {
    const words = toWords(text, accent);

    return (
        <Tag className={className}>
            <motion.span
                className="rv-words"
                variants={wordsVariants}
                custom={delay}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
            >
                {words.map(({ w, accent: isAccent }, i) => (
                    <Fragment key={`${w}-${i}`}>
                        {breakBeforeAccent && isAccent && !words[i - 1]?.accent && <br />}
                        <span className="rv-word">
                            <motion.span
                                className={'rv-word-inner' + (isAccent ? ' rv-accent' : '')}
                                variants={wordVariants}
                            >
                                {w}
                            </motion.span>
                        </span>
                        {i < words.length - 1 ? ' ' : null}
                    </Fragment>
                ))}
            </motion.span>
        </Tag>
    );
};

/** Fades and lifts its children into place once they enter the viewport. */
export const Reveal = ({ children, className, delay = 0, y = 24, x = 0 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y, x }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.75, delay, ease: EASE_OUT }}
    >
        {children}
    </motion.div>
);
