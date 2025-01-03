import React from "react";
import Header from "./layout/header/header.tsx";
import Footer from "./layout/footer/footer.tsx";
import GameOptions from "./components/gameOptions.tsx";

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