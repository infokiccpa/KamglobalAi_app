const serrated = (inner, outer, teeth) => {
    const step = 20 / teeth;
    const pts = ['0,0', `${inner},0`];
    for (let i = 0; i < teeth; i++) {
        pts.push(`${outer},${step * (i + 0.5)}`, `${inner},${step * (i + 1)}`);
    }
    pts.push('0,20');
    return pts.join(' ');
};

const star = (cx, cy, r, points = 5) => {
    const pts = [];
    for (let i = 0; i < points * 2; i += 1) {
        const rad = (Math.PI / points) * i - Math.PI / 2;
        const radius = i % 2 === 0 ? r : r * 0.4;
        pts.push(`${(cx + radius * Math.cos(rad)).toFixed(2)},${(cy + radius * Math.sin(rad)).toFixed(2)}`);
    }
    return pts.join(' ');
};

const FLAGS = {
    KW: (
        <>
            <rect width="30" height="20" fill="#fff" />
            <rect width="30" height="6.67" fill="#007a3d" />
            <rect y="13.33" width="30" height="6.67" fill="#ce1126" />
            <polygon points="0,0 7.5,6.67 7.5,13.33 0,20" fill="#000" />
        </>
    ),
    SA: (
        <>
            <rect width="30" height="20" fill="#006c35" />
            <g fill="#fff">
                <rect x="8" y="6" width="14" height="1.2" rx="0.6" />
                <rect x="9.5" y="8.6" width="11" height="1.2" rx="0.6" />
                <rect x="8" y="13.4" width="13" height="0.9" rx="0.45" />
                <polygon points="21,12.9 23,13.85 21,14.8" />
            </g>
        </>
    ),
    QA: (
        <>
            <rect width="30" height="20" fill="#8a1538" />
            <polygon points={serrated(9, 12, 9)} fill="#fff" />
        </>
    ),
    BH: (
        <>
            <rect width="30" height="20" fill="#ce1126" />
            <polygon points={serrated(8, 11.5, 5)} fill="#fff" />
        </>
    ),
    AE: (
        <>
            <rect width="30" height="6.67" fill="#00732f" />
            <rect y="6.67" width="30" height="6.67" fill="#fff" />
            <rect y="13.33" width="30" height="6.67" fill="#000" />
            <rect width="7.5" height="20" fill="#ff0000" />
        </>
    ),
    US: (
        <>
            <rect width="30" height="20" fill="#fff" />
            {Array.from({ length: 7 }, (_, i) => (
                <rect key={i} y={(i * 40) / 13} width="30" height={20 / 13} fill="#b22234" />
            ))}
            <rect width="13" height={(20 / 13) * 7} fill="#3c3b6e" />
            <g fill="#fff">
                {Array.from({ length: 20 }, (_, i) => {
                    const cx = 1.2 + (i % 5) * 2.4 + (Math.floor(i / 5) % 2) * 1.2;
                    const cy = 1.3 + Math.floor(i / 5) * 2.4;
                    return <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.45" />;
                })}
            </g>
        </>
    ),
    VN: (
        <>
            <rect width="30" height="20" fill="#da251d" />
            <polygon points={star(15, 10, 5.2)} fill="#ff0" />
        </>
    ),
    ID: (
        <>
            <rect width="30" height="10" fill="#ce1126" />
            <rect y="10" width="30" height="10" fill="#fff" />
        </>
    ),
    KE: (
        <>
            <rect width="30" height="20" fill="#fff" />
            <rect width="30" height="5.6" fill="#000" />
            <rect y="7.2" width="30" height="5.6" fill="#bb0000" />
            <rect y="14.4" width="30" height="5.6" fill="#006600" />
            <ellipse cx="15" cy="10" rx="3.2" ry="4.4" fill="#fff" />
            <ellipse cx="15" cy="10" rx="2.2" ry="3.4" fill="#bb0000" />
            <ellipse cx="15" cy="10" rx="1.1" ry="2.2" fill="#000" />
        </>
    ),
    GH: (
        <>
            <rect width="30" height="6.67" fill="#ce1126" />
            <rect y="6.67" width="30" height="6.67" fill="#fcd116" />
            <rect y="13.33" width="30" height="6.67" fill="#006b3f" />
            <polygon points={star(15, 10, 2.8)} fill="#000" />
        </>
    ),
    TN: (
        <>
            <rect width="30" height="20" fill="#e70013" />
            <circle cx="15" cy="10" r="5" fill="#fff" />
            <circle cx="16.1" cy="10" r="3.7" fill="#e70013" />
            <polygon points={star(17.4, 10, 2.1)} fill="#e70013" />
        </>
    ),
    MA: (
        <>
            <rect width="30" height="20" fill="#c1272d" />
            <polygon points={star(15, 10, 4.6)} fill="none" stroke="#006233" strokeWidth="0.7" />
        </>
    ),
    IN: (
        <>
            <rect width="30" height="6.67" fill="#ff9933" />
            <rect y="6.67" width="30" height="6.67" fill="#fff" />
            <rect y="13.33" width="30" height="6.67" fill="#138808" />
            <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.55" />
            <circle cx="15" cy="10" r="0.5" fill="#000080" />
        </>
    ),
    PH: (
        <>
            <rect width="30" height="10" fill="#0038a8" />
            <rect y="10" width="30" height="10" fill="#ce1126" />
            <polygon points="0,0 17.3,10 0,20" fill="#fff" />
            <g fill="#fcd116">
                <circle cx="5.8" cy="10" r="2" />
                <circle cx="1.6" cy="2.2" r="0.7" />
                <circle cx="1.6" cy="17.8" r="0.7" />
                <circle cx="14.2" cy="10" r="0.7" />
            </g>
        </>
    ),
};

const Flag = ({ code, className = '', round = false }) => {
    const art = FLAGS[code];
    if (!art) return null;
    return (
        <svg
            className={`kx-flag${round ? ' kx-flag--round' : ''} ${className}`.trim()}
            viewBox="0 0 30 20"
            preserveAspectRatio={round ? 'xMinYMid slice' : undefined}
            aria-hidden="true"
            focusable="false"
        >
            {art}
        </svg>
    );
};

export default Flag;
