import React, { useEffect, useState } from 'react';
import { getGame, playerAskFor } from '../apiService.ts';
import CardPile from './cardPile.tsx';
import ComputerHand from './computerHand.tsx';
import LatestComputerRequest from './latestComputerRequest.tsx';
import CompletedComputerPairs from './completedComputerPairs.tsx';
import PlayerHand from './playerHand.tsx';
import LatestPlayerRequest from './latestPlayerRequest.tsx';
import CompletedPlayerPairs from './completedPlayerPairs.tsx';

import './playTable.css';

const PlayTable: React.FC<{ gameId: string }> = ({ gameId }) => {
    const [game, setGame] = useState<any>(null);

    useEffect(() => {
        const fetchGame = async () => {
            const gameData = await getGame(gameId);
            console.log("Fetched game data:", gameData);
            setGame(gameData);
        };

        fetchGame();
    }, [gameId]);

    const handlePlayerAskFor = async (value: string) => {
        try {
            console.log(`Player asked for: ${value}`);
            const updatedGame = await playerAskFor(gameId, value);
            console.log("Updated game data:", updatedGame);
            setGame(updatedGame);
        } catch (error) {
            console.error("Error asking for card:", error);
        }
    };

    if (!game) {
        return <p>Loading...</p>;
    }

    console.log("Game object:", game);

    return (
        <main className="play-table-container">
            <div className="play-table">
                <PlayerHand playerHand={game.playerHand} handlePlayerAskFor={handlePlayerAskFor} />
                <ComputerHand computerHand={game.computerHand}/>
                <CardPile remainingCards={game.remainingCards} />
                <CompletedPlayerPairs completedPlayerPairs={game.completedPlayerPairs} />
                <CompletedComputerPairs completedComputerPairs={game.completedComputerPairs} />
                <LatestPlayerRequest latestPlayerRequest={game.latestPlayerRequest}/>
                <LatestComputerRequest latestComputerRequest={game.latestComputerRequest}/>
            </div>
        </main>
    );
};

export default PlayTable;