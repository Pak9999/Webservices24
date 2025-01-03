import React from "react";

interface Card {
    value: string,
    suit: string,
    imgURI: string,
}

interface Pair {
    completeComputerPair?: Card[],
}

interface completedComputerPairsProps {
    completedComputerPairs?: Pair[] ,
}

const completedComputerPairs: React.FC<completedComputerPairsProps> = ({ completedComputerPairs }) => {
    console.log("Spelarstick: ", completedComputerPairs);
    return (
        <>
            <div className="completedComputerPairs">
                <p>Datorns stick: {completedComputerPairs ? completedComputerPairs.length : 0}</p>
            </div>
        </>
    );
}

export default completedComputerPairs;