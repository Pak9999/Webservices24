import React, { useEffect, useState } from "react";
import { getGame, playerAskFor } from "../apiService.ts";
import CardPile from "./cardPile.tsx";
import ComputerHand from "./computerHand.tsx";
import LatestComputerRequest from "./latestComputerRequest.tsx";
import CompletedComputerPairs from "./completedComputerPairs.tsx";
import PlayerHand from "./playerHand.tsx";
import LatestPlayerRequest from "./latestPlayerRequest.tsx";
import CompletedPlayerPairs from "./completedPlayerPairs.tsx";
import StickCounter from "./stickCounter.tsx";
import "./playTable.css";

const PlayTable: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    const fetchGame = async () => {
      const gameData = await getGame(gameId);
      setGame(gameData);
    };

    fetchGame();
  }, [gameId]);

  const handlePlayerAskFor = async (value: string) => {
    try {
      const updatedGame = await playerAskFor(gameId, value);
      setGame(updatedGame);
    } catch (error) {
      console.error("Error asking for card:", error);
    }
  };

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <main className="play-table-container">
      <div className="play-table">
        <div className="game-row computer-row">
          <div className="stick-section">
            <StickCounter
              count={game.completedComputerPairs ? game.completedComputerPairs.length : 0}
              label="Computer Sticks"
            />
          </div>
          <div className="hand-section">
            <ComputerHand computerHand={game.computerHand} />
          </div>
        </div>

        <div className="game-row middle-row">
          <LatestComputerRequest latestComputerRequest={game.latestComputerRequest} />
          <div className="kanalen">
            <div className="card-stack">
              {Array.from({ length: Math.min(game.remainingCards, 5) }).map((_, i) => (
                <div key={i} className="card-visual" />
              ))}
            </div>
            <div className="card-counter">{game.remainingCards} kort</div>
          </div>
          <LatestPlayerRequest latestPlayerRequest={game.latestPlayerRequest} />
        </div>

        <div className="game-row player-row">
          <div className="hand-section">
            <PlayerHand
              playerHand={game.playerHand}
              handlePlayerAskFor={handlePlayerAskFor}
            />
          </div>
          <div className="stick-section">
            <StickCounter
              count={game.completedPlayerPairs ? game.completedPlayerPairs.length : 0}
              label="Your Sticks"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlayTable;