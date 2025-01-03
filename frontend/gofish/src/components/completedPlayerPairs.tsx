import React from "react";

interface Card {
    value: string,
    suit: string,
    imgURI: string,
}

interface Pair {
    completePlayerPair?: Card[],
}

interface completedPlayerPairsProps {
    completedPlayerPairs?: Pair[] ,
}

const completedPlayerPairs: React.FC<completedPlayerPairsProps> = ({ completedPlayerPairs }) => {
    console.log("Spelarstick: ", completedPlayerPairs);
    return (
        <>
            <div className="completedPlayerPairs">
                <p>Dina stick: {completedPlayerPairs ? completedPlayerPairs.length : 0}</p>
            </div>
        </>
    );
}

export default completedPlayerPairs;