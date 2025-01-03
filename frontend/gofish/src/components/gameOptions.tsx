import React, { useState } from "react";
import { createNewGame } from "../../apiService";

const GameOptions: React.FC = () => {
    const [gameId, setGameId] = useState<string | null>(null);

    const handleCreateNewGame = async () => {
        const newGame = await createNewGame();
        setGameId(newGame.gameId);
        // Redirect to the game page or update the UI accordingly
    };

    return (
        <div>
            <p>Game Options</p>
            <button onClick={handleCreateNewGame}>Create New Game</button>
            {gameId && <p>New Game Created with ID: {gameId}</p>}
        </div>
    );
};

export default GameOptions;