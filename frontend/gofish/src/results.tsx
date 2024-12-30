import React from "react";



function Results() {
    return (
        <>
            <Header></Header>

            <Winner></Winner>
            <PlayerTricks></PlayerTricks>
            <ComputerTricks></ComputerTricks>

            <button><a href="/">Play Again</a></button>

            <Footer></Footer>
        </>
    )
}