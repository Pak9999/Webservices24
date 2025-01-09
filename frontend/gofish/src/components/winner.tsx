import React from 'react';
import { useNavigate } from 'react-router-dom';
import './winner.css';
import { createNewGame, deleteGame as deleteGameApi} from '../apiService.ts';


interface WinnerProps {
  playerScore: number;
  computerScore: number;
  gameId: string;
}

/**
 * Displays who won the game and the scores
 * navigates to either the start page or a new game 
 * 
 * @param {WinnerProps} props - the properties used by the winner component
 * @returns {JSX.Element} the rendered winner component
 */
const Winner: React.FC<WinnerProps> = ({ playerScore, computerScore, gameId }) => {
  const navigate = useNavigate();
  const isWinner = playerScore > computerScore;

  /**
   * Handles the play again button click event
   * Deletes the old game, creates a new game and navigates to it
   * 
   * @returns {Promise<void>} resolved when the new game is created and the old game is deleted
   */
  const handlePlayAgain = async (): Promise<void> => {
      try {
        // First delete the old game
        const deleteGame = await deleteGameApi(gameId);
        console.log("Old game deleted:", deleteGame);
        // Create new game
        const newGame = await createNewGame();
        console.log("New game created:", newGame);        
        navigate(`/game/${newGame.gameId}`);
      } catch (error) {
        console.error("Error handling play again:", error);
      }
    };




  // Winner screen layout
  return (
    <div className="win-screen-overlay">
      <div className="win-screen-content">
        <h2>{isWinner ? 'Du vann!' : 'Datorn vann!'}</h2>
        <div className="scores">
          <p>Dina stick: {playerScore}</p>
          <p>Datorns stick: {computerScore}</p>
        </div>
        <div className="buttons">
          <button onClick={handlePlayAgain}>Spela igen</button>
          <button onClick={() => navigate('/')}>Tillbaka till start</button>
        </div>
      </div>
    </div>
  );
};

export default Winner;