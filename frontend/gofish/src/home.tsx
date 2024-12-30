
import React from "react";

import Header from "./layout/header/header.tsx";
import Footer from "/layout/footer";
import EnterName from "/layout/enterName";
import ChooseOpponent from "/layout/chooseOpponent";



function Home() {
    return (
        <>
            <Header></Header>
            <EnterName></EnterName>
            <ChooseOpponent></ChooseOpponent>
            <Footer></Footer>
        </>
    )
}