import React from "react";

interface Card {
  value: string;
  suit: string;
  imgURI: string;
}

interface computerHandProps {
  computerHand?: Card[];
}

const computerHand: React.FC<computerHandProps> = ({ computerHand = [] }) => {
  console.log("computerHand component received computerHand:", computerHand);
  return (
    <div className="computer-hand">
      {computerHand.map((card, index) => (
        <img key={index} src={card.imgURI.replace(/"/g, '')} alt={`${card.value} of ${card.suit}`} />
      ))}
    </div>
  );
};

export default computerHand;