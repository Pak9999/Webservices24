import React from "react";

interface Card {
  value: string;
  suit: string;
  imgURI: string;
}

interface PlayerHandProps {
  playerHand?: Card[];
}

const PlayerHand: React.FC<PlayerHandProps> = ({ playerHand = [] }) => {
  console.log("PlayerHand component received playerHand:", playerHand);
  return (
    <div className="player-hand">
      {playerHand.map((card, index) => (
        <img key={index} src={card.imgURI.replace(/"/g, '')} alt={`${card.value} of ${card.suit}`} />
      ))}
    </div>
  );
};

export default PlayerHand;