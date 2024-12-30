
import React from "react";

import Header from "./layout/header/header.tsx";
import Footer from "./layout/footer/footer.tsx";
import GameOptions from "./layout/gameOptions/gameOptions.tsx";



const Home: React.FC = () => {
    return (
        <>
            <Header></Header>
            <GameOptions></GameOptions>
            <Footer></Footer>
        </>
    );
}


export default Home;