import React, { useEffect, useState } from 'react';
import { getGame, playerAskFor } from '../apiService.ts';
import CardPile from './cardPile.tsx';
import ComputerHand from './computerHand.tsx';
import ComputerLatestRequest from './computerLatestRequest.tsx';
import ComputerTricks from './computerTricks.tsx';
import PlayerHand from './playerHand.tsx';
import PlayerLatestRequest from './playerLatestRequest.tsx';
import PlayerTricks from './playerTricks.tsx';

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
        const updatedGame = await playerAskFor(gameId, value);
        setGame(updatedGame);
    };

    if (!game || !game.playerHand) {
        return <p>Loading...</p>;
    }

    console.log("Game object:", game);

    return (
        <div className="play-table">
            <PlayerHand playerHand={game.playerHand} />
            <ComputerHand computerHand={game.computerHand}/>
            <CardPile remainingCards={game.remainingCards} />
            <PlayerTricks />
            <ComputerTricks />
            <PlayerLatestRequest />
            <ComputerLatestRequest />
            <button onClick={() => handlePlayerAskFor('Ace')}>Ask for Ace</button>
        </div>
    );
};

export default PlayTable;