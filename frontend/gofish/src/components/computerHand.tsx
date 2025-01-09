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

/**
 * Component for the computer's hand
 * The computer's hand is displayed as a row of cards faced down
 * 
 * @param {computerHandProps} props - Properties of the computer hand
 * @returns {JSX.Element} the rendered component
 */
const computerHand: React.FC<computerHandProps> = ({ computerHand = [] }) => {
  console.log("computerHand component received computerHand:", computerHand);

  // Computer hand layout
  return (
    <div className="computer-hand">
      <h3>Datorns hand</h3>
      {computerHand.map((card, index) => (
        <img 
            key={index}
            //CHEAT! Commented out line below can be used to display the face of the computers cards
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