import React from "react";

import Header from "./layout/header/header.tsx";
import Footer from "./layout/footer/footer.tsx";
import Winner from "./components/winner.tsx";
import completedPlayerPairs from "./components/completedPlayerPairs.tsx";
import completedComputerPairs from "./components/completedComputerPairs.tsx";


const Results: React.FC = () => {
    return (
        <>
            <Header></Header>
            <Winner></Winner>
            <completedPlayerPairs></completedPlayerPairs>
            <completedComputerPairs></completedComputerPairs>
            <button><a href="/">Play Again</a></button>
            <Footer></Footer>
        </>
    );
}

export default Results;

