import React from "react";
import "./card.css";

interface Card {
  value: string;
  suit: string;
  imgURI: string;
}

interface PlayerHandProps {
  playerHand?: Card[];
  handlePlayerAskFor: (value: string) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ playerHand = [], handlePlayerAskFor }) => {
  console.log("PlayerHand component received playerHand:", playerHand);
  return (
    <div className="player-hand">
      <h3>Your Hand</h3>
      {playerHand.map((card, index) => (
        <img 
          key={index} 
          src={card.imgURI.replace(/"/g, '')} 
          alt={`${card.value} of ${card.suit}`} 
          onClick={() => handlePlayerAskFor(card.value)}
          className="card"
        />
      ))}
    </div>
  );
};

export default PlayerHand;