import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Types
interface Card {
  value: string;
  image: string;
}

interface MemoryEntry {
  confidence: number;
  attempts: number;
  successes: number;
}

// Smart Computer Player Logic
class SmartComputerPlayer {
  memory: Map<string, MemoryEntry>;

  constructor() {
    this.memory = new Map();
  }

  chooseCardToAsk(computerHand: Card[]): string | null {
    const strategies = [
      this.askForSetCompletion.bind(this),
      this.askFromMemory.bind(this),
      this.askRandomCard.bind(this),
    ];

    for (let strategy of strategies) {
      const choice = strategy(computerHand);
      if (choice) return choice;
    }
    return null;
  }

  askForSetCompletion(computerHand: Card[]): string | null {
    const cardCounts: { [key: string]: number } = {};
    computerHand.forEach((card) => {
      cardCounts[card.value] = (cardCounts[card.value] || 0) + 1;
    });

    for (let [value, count] of Object.entries(cardCounts)) {
      if (count === 3) return value;
    }
    return null;
  }

  askFromMemory(computerHand: Card[]): string | null {
    const sortedMemory = [...this.memory.entries()].sort(
      (a, b) => b[1].confidence - a[1].confidence
    );

    for (let [cardValue, info] of sortedMemory) {
      if (
        info.confidence > 0.5 &&
        !computerHand.some((card) => card.value === cardValue)
      ) {
        return cardValue;
      }
    }
    return null;
  }

  askRandomCard(computerHand: Card[]): string | null {
    if (computerHand.length === 0) return null;
    const randomCard =
      computerHand[Math.floor(Math.random() * computerHand.length)];
    return randomCard.value;
  }

  updateMemory(askedValue: string, wasSuccessful: boolean) {
    if (!this.memory.has(askedValue)) {
      this.memory.set(askedValue, {
        confidence: 0.5,
        attempts: 0,
        successes: 0,
      });
    }

    const memoryEntry = this.memory.get(askedValue)!;
    memoryEntry.attempts++;
    if (wasSuccessful) memoryEntry.successes++;

    memoryEntry.confidence = memoryEntry.successes / memoryEntry.attempts;
  }
}

// Main Game Component
const FishCardGame: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [gameStatus, setGameStatus] = useState("Laddar spel...");
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [computerHand, setComputerHand] = useState<Card[]>([]);
  const [playerSets, setPlayerSets] = useState<string[]>([]);
  const [computerSets, setComputerSets] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState<"player" | "computer">("player");
  const [deck, setDeck] = useState<string | null>(null);
  const [computerMemory, setComputerMemory] = useState<Map<string, MemoryEntry>>(new Map());
  const [winMessage, setWinMessage] = useState<string | null>(null);
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [historyVisible, setHistoryVisible] = useState<boolean>(true);

  const computerPlayer = useMemo(() => new SmartComputerPlayer(), []);

  // Initialize the game
  const initGame = async () => {
    try {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const deckId = response.data.deck_id;
      setDeck(deckId);

      const [playerResponse, computerResponse] = await Promise.all([
        axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=7`),
        axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=7`),
      ]);

      setPlayerHand(playerResponse.data.cards);
      setComputerHand(computerResponse.data.cards);
      setGameStatus("Spelet har börjat!");
      setLoading(false);
    } catch (error) {
      console.error("Failed to initialize game", error);
      setGameStatus("Kunde inte starta spelet. Kontrollera din internetanslutning.");
    }
  };

  useEffect(() => {
    initGame();
  }, []);

  // Computer Turn Effect
  useEffect(() => {
    if (currentTurn === "computer" && !winMessage) {
      setTimeout(() => computerTurn(), 1000);
    }
  }, [currentTurn, winMessage]);

  // Check for Win Effect
  useEffect(() => {
    checkForWin();
  }, [playerSets, computerSets]);

  const addToHistory = (message: string) => {
    setGameHistory((prev) => [message, ...prev]);
  };

  const updateMemory = (askedValue: string, wasSuccessful: boolean) => {
    setComputerMemory((prevMemory) => {
      const updatedMemory = new Map(prevMemory);
      if (!updatedMemory.has(askedValue)) {
        updatedMemory.set(askedValue, { confidence: 0.5, attempts: 0, successes: 0 });
      }

      const memoryEntry = updatedMemory.get(askedValue)!;
      memoryEntry.attempts++;
      if (wasSuccessful) memoryEntry.successes++;
      memoryEntry.confidence = memoryEntry.successes / memoryEntry.attempts;
      return updatedMemory;
    });
  };

  const askForCard = async (value: string) => {
    if (currentTurn !== "player") return;

    const actionMessage = `Du frågar efter ${value}`;
    setGameStatus(actionMessage);
    addToHistory(actionMessage);

    const computerHasCard = computerHand.some((card) => card.value === value);

    if (computerHasCard) {
      const transferCards = computerHand.filter((card) => card.value === value);
      setPlayerHand((prev) => [...prev, ...transferCards]);
      setComputerHand((prev) => prev.filter((card) => card.value !== value));
      const successMessage = `Du fick ${transferCards.length} kort med värde ${value}!`;
      setGameStatus(successMessage);
      addToHistory(successMessage);
      updateMemory(value, true);
    } else {
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
      );
      setPlayerHand((prev) => [...prev, response.data.cards[0]]);
      const drawMessage = "Du fick inget och drar ett kort från högen.";
      setGameStatus(drawMessage);
      addToHistory(drawMessage);
      updateMemory(value, false);
    }

    checkForSets();
    setCurrentTurn("computer");
  };

  const computerTurn = async () => {
    if (currentTurn !== "computer") return;
  
    const cardToAsk = computerPlayer.chooseCardToAsk(computerHand);
    if (!cardToAsk) {
      const noChoiceMessage = "Datorn kunde inte välja något kort";
      setGameStatus(noChoiceMessage);
      addToHistory(noChoiceMessage);
      setCurrentTurn("player"); // Important - return control to player
      return;
    }

    const actionMessage = `Datorn frågar efter ${cardToAsk}`;
    setGameStatus(actionMessage);
    addToHistory(actionMessage);
  
    const playerHasCard = playerHand.some((card) => card.value === cardToAsk);
    if (playerHasCard) {
      const transferCards = playerHand.filter((card) => card.value === cardToAsk);
      setComputerHand((prev) => [...prev, ...transferCards]);
      setPlayerHand((prev) => prev.filter((card) => card.value !== cardToAsk));
      const successMessage = `Datorn fick ${transferCards.length} kort med värde ${cardToAsk}!`;
      setGameStatus(successMessage);
      addToHistory(successMessage);
      computerPlayer.updateMemory(cardToAsk, true);
    } else {
      try {
        const response = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
        );
        if (response.data.cards && response.data.cards.length > 0) {
          setComputerHand((prev) => [...prev, response.data.cards[0]]);
          const drawMessage = "Datorn drar ett kort.";
          setGameStatus(drawMessage);
          addToHistory(drawMessage);
          computerPlayer.updateMemory(cardToAsk, false);
        }
      } catch (error) {
        console.error("Failed to draw card:", error);
      }
    }
  
    await checkForSets();
    setCurrentTurn("player");
  };

  const checkForSets = () => {
    const findSets = (hand: Card[]) => {
      const counts: { [key: string]: number } = {};
      hand.forEach((card) => {
        counts[card.value] = (counts[card.value] || 0) + 1;
      });
      return Object.entries(counts)
        .filter(([_, count]) => count === 4)
        .map(([value]) => value);
    };
  
    // Process player sets
    const newPlayerSets = findSets(playerHand);
    if (newPlayerSets.length > 0) {
      // Only add sets that aren't already collected
      const uniqueNewPlayerSets = newPlayerSets.filter(set => !playerSets.includes(set));
      if (uniqueNewPlayerSets.length > 0) {
        setPlayerSets(prev => [...new Set([...prev, ...uniqueNewPlayerSets])]);
        setPlayerHand(prevHand => 
          prevHand.filter(card => !uniqueNewPlayerSets.includes(card.value))
        );
      }
    }
  
    // Process computer sets
    const newComputerSets = findSets(computerHand);
    if (newComputerSets.length > 0) {
      // Only add sets that aren't already collected
      const uniqueNewComputerSets = newComputerSets.filter(set => !computerSets.includes(set));
      if (uniqueNewComputerSets.length > 0) {
        setComputerSets(prev => [...new Set([...prev, ...uniqueNewComputerSets])]);
        setComputerHand(prevHand => 
          prevHand.filter(card => !uniqueNewComputerSets.includes(card.value))
        );
      }
    }

    checkForWin();
  };

  const checkForWin = () => {
    const totalSets = playerSets.length + computerSets.length;
    if (totalSets >= 13) {
      if (playerSets.length > computerSets.length) {
        setWinMessage("Grattis! Du vann!");
      } else if (playerSets.length < computerSets.length) {
        setWinMessage("Datorn vann. Försök igen!");
      } else {
        setWinMessage("Det blev oavgjort!");
      }
    }
  };

  const resetGame = () => {
    setPlayerHand([]);
    setComputerHand([]);
    setPlayerSets([]);
    setComputerSets([]);
    setCurrentTurn("player");
    setGameStatus("Laddar spel...");
    setWinMessage(null);
    setLoading(true);
    setDeck(null);
    setComputerMemory(new Map());
    setGameHistory([]);
    initGame();
  };

  return (
    <div className="playtable">
      {loading && <div className="loading-screen">Laddar...</div>}
      {!loading && (
        <>
          {/* Computer's Hand */}
          <div className="computer-hand">
            {computerHand.map((_, index) => (
              <div key={index} className="computer-card" />
            ))}
          </div>
  
          {/* Game Status */}
          <div className="game-status">{gameStatus}</div>
  
          {/* Sets Display */}
          <div className="sets-display">
            <h2>Dina set:</h2>
            <div>{playerSets.join(", ")}</div>
            <h2>Datorns set:</h2>
            <div>{computerSets.join(", ")}</div>
          </div>
  
          {/* Toggle History Button */}
          <button onClick={() => setHistoryVisible(!historyVisible)}>
            {historyVisible ? "Dölj historik" : "Visa historik"}
          </button>
  
          {/* Game History */}
          {historyVisible && (
            <div className="game-history">
              <h3>Historik:</h3>
              <ul>
                {gameHistory.map((entry, index) => (
                  <li key={index}>{entry}</li>
                ))}
              </ul>
            </div>
          )}
  
          {/* Player's Hand */}
          <div className="card-hand">
            {playerHand.map((card, index) => (
              <motion.img
                key={index}
                src={card.image}
                alt={card.value}
                className="card"
                whileHover={{ scale: 1.2, y: -20 }}
                onClick={() => askForCard(card.value)}
              />
            ))}
          </div>
  
          {/* Win Screen */}
          {winMessage && (
            <div className="win-screen">
              <h2>{winMessage}</h2>
              <button onClick={resetGame} className="btn">
                Starta nytt spel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FishCardGame;