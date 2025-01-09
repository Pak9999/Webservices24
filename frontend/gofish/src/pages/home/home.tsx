import React from "react";
import Header from "../../layout/header/header.tsx";
import Footer from "../../layout/footer/footer.tsx";
import GameOptions from "../../layout/gameOptions/gameOptions.tsx";

/**
 * Starting page
 * @returns {JSX.Element} Home component
 */

const Home: React.FC = () => {
    return (
        <>
            <Header />
            <GameOptions />
            <Footer />
        </>
    );
}

export default Home;