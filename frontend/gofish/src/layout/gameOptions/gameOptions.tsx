import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewGame } from "../../apiService.ts";
import "./gameOptions.css";


/**
 * Component for creating a new game used on the home page
 * 
 * @returns {JSX.Element} GameOptions component
 */
const GameOptions: React.FC = () => {
    const [gameId, setGameId] = useState<string | null>(null);
    const navigate = useNavigate();

    /**
     * Handles the create new game button click event
     * Calls API to create a new game, create id and navigates to the new game
     * 
     * @returns {Promise<void>} resolved when the new game is created
     */
    const handleCreateNewGame = async (): Promise<void> => {
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

    // Component layout
    return (
        <div>
            <p>Här kan du spela finns i sjön mot Malmös trafikplatser</p>
            <button onClick={handleCreateNewGame}>Starta ett nytt spel</button>
            {gameId && <p>New Game Created with ID: {gameId}</p>}
        </div>
    );
};

export default GameOptions;