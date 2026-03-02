import React from 'react';
import './Legal.css';

const PrivacyPolicy = () => {
    return (
        <div className="legal-container">
            <header className="legal-header">
                <h1>Privacy Policy</h1>
                <p>Last updated: March 02, 2026</p>
            </header>

            <section className="legal-content">
                <div className="legal-section">
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to Kamglobal AI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>2. The Data We Collect About You</h2>
                    <p>
                        Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
                    </p>
                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                    <ul>
                        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                        <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                        <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>3. How We Use Your Personal Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal obligation.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>4. Cookies</h2>
                    <p>
                        Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. For detailed information on the cookies we use and the purposes for which we use them see our Cookie policy.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>5. Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>6. Your Legal Rights</h2>
                    <p>
                        Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>7. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                    </p>
                    <p><strong>Email:</strong> info@kamglobalai.com</p>
                    <p><strong>Phone (India):</strong> +91 80507 66363</p>
                    <p><strong>Phone (Kuwait):</strong> +965 2434 5650</p>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
