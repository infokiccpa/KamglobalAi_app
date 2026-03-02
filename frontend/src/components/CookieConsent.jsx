import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('kamglobal_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('kamglobal_cookie_consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('kamglobal_cookie_consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-container">
            <div className="cookie-consent-card">
                <div className="cookie-content">
                    <div className="cookie-icon">🍪</div>
                    <div className="cookie-text">
                        <p>
                            We use cookies to improve your experience and analyze traffic. By clicking "Accept All", you consent to our use of cookies. <a href="/privacy">View Policy</a>
                        </p>
                    </div>
                </div>
                <div className="cookie-actions">
                    <button className="cookie-btn decline" onClick={handleDecline}>
                        Decline
                    </button>
                    <button className="cookie-btn accept" onClick={handleAccept}>
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
