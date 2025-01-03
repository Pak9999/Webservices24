import React, { useEffect, useState } from 'react';
import { getGame, playerAskFor } from '../../apiService';
import CardPile from '../../components/cardPile';
import ComputerHand from '../../components/computerHand';
import ComputerLatestRequest from '../../components/computerLatestRequest';
import ComputerTricks from '../../components/computerTricks';
import PlayerHand from '../../components/playerHand';
import PlayerLatestRequest from '../../components/playerLatestRequest';
import PlayerTricks from '../../components/playerTricks';

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
        const updatedGame = await playerAskFor(gameId, value);
        setGame(updatedGame);
    };

    if (!game) {
        return <p>Loading...</p>;
    }

    return (
        <div className="play-table">
            <PlayerHand />
            <ComputerHand />
            <CardPile />
            <PlayerTricks />
            <ComputerTricks />
            <PlayerLatestRequest />
            <ComputerLatestRequest />
            <button onClick={() => handlePlayerAskFor('Ace')}>Ask for Ace</button>
        </div>
    );
};

export default PlayTable;