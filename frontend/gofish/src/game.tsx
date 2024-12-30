import React from "react";



function Game() {
    return (
        <>
            <Header></Header>

            <PlayerHand></PlayerHand>
            <ComputerHand></ComputerHand>
            <CardPile></CardPile>
            <PlayerTricks></PlayerTricks>
            <ComputerTricks></ComputerTricks>
            <PlayerLatestRequest></PlayerLatestRequest>
            <ComputerLatestRequest></ComputerLatestRequest>
            
            <Footer></Footer>
        </>
    )
}