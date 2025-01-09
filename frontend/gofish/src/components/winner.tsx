import React from 'react';
import { useNavigate } from 'react-router-dom';
import './winner.css';

interface WinnerProps {
  playerScore: number;
  computerScore: number;
  onPlayAgain: () => void;
}

/**
 * Displays who won the game and the scores
 * navigates to either the start page or a new game 
 * 
 * @param {WinnerProps} props - the properties used by the winner component
 * @returns {JSX.Element} the rendered winner component
 */
const Winner: React.FC<WinnerProps> = ({ playerScore, computerScore, onPlayAgain }) => {
  const navigate = useNavigate();
  const isWinner = playerScore > computerScore;


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
          <button onClick={onPlayAgain}>Spela igen</button>
          <button onClick={() => navigate('/')}>Tillbaka till start</button>
        </div>
      </div>
    </div>
  );
};

export default Winner;