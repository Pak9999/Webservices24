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

const getCardValue = (value: string): number => {
  switch (value) {
    case 'ACE': return 14;
    case 'KING': return 13;
    case 'QUEEN': return 12;
    case 'JACK': return 11;
    default: return parseInt(value) || 0;
  }
};

const PlayerHand: React.FC<PlayerHandProps> = ({ playerHand = [], handlePlayerAskFor }) => {
  const sortedHand = [...playerHand].sort((a, b) => {
    const valueA = getCardValue(a.value);
    const valueB = getCardValue(b.value);
    return valueB - valueA; // Sort descending (Ace to 2)
  });

  return (
    <div className="player-hand">
      <h3>Din hand</h3>
      {sortedHand.map((card, index) => (
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