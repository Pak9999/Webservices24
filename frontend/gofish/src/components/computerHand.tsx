import React from "react";
import "./card.css";

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
      <h3>Datorns hand</h3>
      {computerHand.map((card, index) => (
        <img 
            key={index}
            /* src={card.imgURI.replace(/"/g, '')} 
            alt={`${card.value} of ${card.suit}`} */
            src="https://deckofcardsapi.com/static/img/back.png" 
            alt="Back of card" 
            className="card"
        />
      ))}
    </div>
  );
};



export default computerHand;