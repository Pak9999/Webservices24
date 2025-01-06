import React from "react";

import "./header.css";


const Header: React.FC = () => {
    return (
        <>
            <header className="header-bg">
                <section className="header-content">
                    <h2>Finns i kanalen</h2>
                    <h5>spela kort mot Malmös trafikplatser</h5>
                </section>
            </header>
        </>
    );
}

export default Header;