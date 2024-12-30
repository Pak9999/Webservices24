import React from "react";
import Header from "./layout/header/header";
import PlayTable from "./layout/playTable/playTable";
import Footer from "./layout/footer/footer";




const Game: React.FC = () => {
    return (
        <>
            <Header></Header>
            <PlayTable></PlayTable>
            <Footer></Footer>
        </>
    );
}

export default Game;