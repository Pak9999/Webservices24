import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home.tsx';
import Game from './pages/game/game.tsx';



/**
 * Main app component which contains the routes for the app
 * 
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<Game />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;