import React from "react";

import "./footer.css";

/**
 * The main footer component
 * 
 * @returns {JSX.Element} Footer component
 */
const Footer: React.FC = () => {
    return (
        <>
            <footer className="footer-bg">
                <section className="footer-content">
                    <p>Webbtjänster 2024-25 Grupp 7</p>
                </section>
            </footer>
        </>
    );
}

export default Footer;