import React from "react";

import "./header.css";


/**
 * The main header component
 * @returns {JSX.Element} Header component
 */
const Header: React.FC = () => {
    return (
        <>
            <header className="header-bg">
                <section className="header-content">
                    <a href="/"><h2>Finns i kanalen</h2></a>
                    <h5>spela kort mot Malmös trafikplatser</h5>
                </section>
            </header>
        </>
    );
}

export default Header;