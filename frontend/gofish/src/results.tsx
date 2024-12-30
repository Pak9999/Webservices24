import React from "react";

import Header from "./layout/header/header.tsx";
import Footer from "./layout/footer/footer.tsx";
import Winner from "./components/winner.tsx";
import PlayerTricks from "./components/playerTricks.tsx";
import ComputerTricks from "./components/computerTricks.tsx";





const Results: React.FC = () => {
    return (
        <>
            <Header></Header>
            <Winner></Winner>
            <PlayerTricks></PlayerTricks>
            <ComputerTricks></ComputerTricks>
            <button><a href="/">Play Again</a></button>
            <Footer></Footer>
        </>
    );
}

export default Results;

