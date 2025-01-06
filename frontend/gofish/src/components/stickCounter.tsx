import React from 'react';
import './stickCounter.css';

interface StickCounterProps {
  count: number;
  label: string;
}

const StickCounter: React.FC<StickCounterProps> = ({ count, label }) => {
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