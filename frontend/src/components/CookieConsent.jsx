import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const STORAGE_KEY = 'kamglobal_cookie_consent';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(STORAGE_KEY)) return undefined;
        const timer = window.setTimeout(() => setIsVisible(true), 800);
        return () => window.clearTimeout(timer);
    }, []);

    const save = (value) => {
        localStorage.setItem(STORAGE_KEY, value);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-container">
            <div className="cookie-consent-card" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-text">
                <div className="cookie-content">
                    <div className="cookie-text">
                        <p id="cookie-title" className="cookie-title">Cookies</p>
                        <p id="cookie-text">
                            We use necessary cookies so the site can run and remember this choice. We do not use advertising or analytics cookies.
                            Rejecting keeps only those necessary cookies. This choice does not sign you up for email updates.{' '}
                            <Link to="/privacy">Privacy policy</Link>
                        </p>
                    </div>
                </div>
                <div className="cookie-actions">
                    <button type="button" className="cookie-btn decline" onClick={() => save('necessary')}>
                        Necessary only
                    </button>
                    <button type="button" className="cookie-btn accept" onClick={() => save('accepted')}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
