import React from 'react';
import './Legal.css';

const TermsOfService = () => {
    return (
        <div className="legal-container">
            <header className="legal-header">
                <h1>Terms & Conditions</h1>
                <p>Last updated: March 02, 2026</p>
            </header>

            <section className="legal-content">
                <div className="legal-section">
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing our website at www.kamglobalai.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Kamglobal AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul>
                        <li>Modify or copy the materials.</li>
                        <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
                        <li>Attempt to decompile or reverse engineer any software contained on Kamglobal AI's website.</li>
                        <li>Remove any copyright or other proprietary notations from the materials.</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>3. Disclaimer</h2>
                    <p>
                        The materials on Kamglobal AI's website are provided on an 'as is' basis. Kamglobal AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>4. Limitations</h2>
                    <p>
                        In no event shall Kamglobal AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Kamglobal AI's website, even if Kamglobal AI or a Kamglobal AI authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>5. Accuracy of Materials</h2>
                    <p>
                        The materials appearing on Kamglobal AI's website could include technical, typographical, or photographic errors. Kamglobal AI does not warrant that any of the materials on its website are accurate, complete or current. Kamglobal AI may make changes to the materials contained on its website at any time without notice. However Kamglobal AI does not make any commitment to update the materials.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>6. Links</h2>
                    <p>
                        Kamglobal AI has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Kamglobal AI of the site. Use of any such linked website is at the user's own risk.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>7. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Kuwait and India and you irrevocably submit to the exclusive jurisdiction of the courts in those locations.
                    </p>
                </div>

                <div className="legal-section">
                    <h2>8. Modifications</h2>
                    <p>
                        Kamglobal AI may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default TermsOfService;
