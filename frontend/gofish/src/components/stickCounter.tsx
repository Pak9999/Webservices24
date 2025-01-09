import React from 'react';
import './stickCounter.css';

interface StickCounterProps {
  count: number;
  label: string;
}

/**
 * Displays the amount of sticks
 * 
 * @param {StickCounterProps} props - properties of the stick counter
 * @returns {JSX.Element} the rendered component
 */
const StickCounter: React.FC<StickCounterProps> = ({ count, label }) => {

  // Stick counter layout
  return (
    <div className="stick-counter">
      <div className="stick-cards">
        {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
          <div key={i} className="stick-card" />
        ))}
      </div>
      <div className="stick-label">
        <span>{label}</span>
        <span className="stick-count">{count}</span>
      </div>
    </div>
  );
};

export default StickCounter;