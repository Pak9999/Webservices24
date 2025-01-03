import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewGame } from "../apiService.ts";

const GameOptions: React.FC = () => {
    const [gameId, setGameId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCreateNewGame = async () => {
        console.log("Create New Game button clicked");
        try {
            const newGame = await createNewGame();
            console.log("New game created:", newGame);
            setGameId(newGame.gameId);
            navigate(`/game/${newGame.gameId}`);
        } catch (error) {
            console.error("Error creating new game:", error);
        }
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