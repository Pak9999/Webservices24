document.addEventListener("DOMContentLoaded", () => {
    class SmartComputerPlayer {
        constructor() {
            this.memory = new Map();
            this.memoryElement = document.getElementById("computer-memory");
        }

        chooseCardToAsk(computerHand) {
            const strategies = [
                this.askForSetCompletion.bind(this),
                this.askFromMemory.bind(this),
                this.askRandomCard.bind(this),
            ];

            for (let strategy of strategies) {
                const choice = strategy(computerHand);
                if (choice) return choice;
            }
        }

        askForSetCompletion(computerHand) {
            const cardCounts = {};
            computerHand.forEach((card) => {
                cardCounts[card.value] = (cardCounts[card.value] || 0) + 1;
            });

            for (let [value, count] of Object.entries(cardCounts)) {
                if (count === 3) return value;
            }
            return null;
        }

        askFromMemory(computerHand) {
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

        askRandomCard(computerHand) {
            if (computerHand.length === 0) return null;
            const randomCard =
                computerHand[Math.floor(Math.random() * computerHand.length)];
            return randomCard.value;
        }

        updateMemory(askedValue, wasSuccessful) {
            if (!this.memory.has(askedValue)) {
                this.memory.set(askedValue, {
                    confidence: 0.5,
                    attempts: 0,
                    successes: 0,
                });
            }

            const memoryEntry = this.memory.get(askedValue);
            memoryEntry.attempts++;
            if (wasSuccessful) memoryEntry.successes++;

            memoryEntry.confidence = memoryEntry.successes / memoryEntry.attempts;

            this.renderMemory();
        }

        renderMemory() {
            this.memoryElement.innerHTML = "";
            for (let [value, info] of this.memory.entries()) {
                const memoryCard = document.createElement("span");
                memoryCard.className = "memory-card";
                memoryCard.textContent = `${value}: ${(info.confidence * 100).toFixed(
                    0
                )}%`;
                this.memoryElement.appendChild(memoryCard);
            }
        }
    }

    class FishCardGame {
        constructor() {
            this.computerPlayer = new SmartComputerPlayer();
            this.gameStatusElement = document.getElementById("game-status");
            this.playerHandElement = document.getElementById("player-hand");
            this.playerSetsElement = document.getElementById("player-sets");
            this.computerSetsElement = document.getElementById("computer-sets");
            this.loadingScreen = document.getElementById("loading-screen");
            this.winScreen = document.getElementById("win-screen");
            this.winMessage = document.getElementById("win-message");
            this.newGameButton = document.getElementById("new-game-button");
            this.currentTurn = "player";
            this.playerCollectedSets = [];
            this.computerCollectedSets = [];

            this.newGameButton.addEventListener("click", () => this.startNewGame());

            this.initGame();
        }

        async initGame() {
            try {
                const response = await fetch(
                    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
                );
                const data = await response.json();
                this.deck = data.deck_id;

                await this.drawInitialCards();
                this.loadingScreen.style.display = "none";

                this.updateStatus("Spelet har börjat!");
                this.renderPlayerHand();

                setTimeout(() => this.computerTurn(), 1500);
            } catch (error) {
                this.updateStatus(
                    "Kunde inte starta spelet. Kontrollera din internetanslutning."
                );
                console.error("Initialiseringsfel:", error);
            }
        }

        async drawInitialCards() {
            const [playerResponse, computerResponse] = await Promise.all([
                fetch(`https://deckofcardsapi.com/api/deck/${this.deck}/draw/?count=7`),
                fetch(`https://deckofcardsapi.com/api/deck/${this.deck}/draw/?count=7`),
            ]);

            const playerData = await playerResponse.json();
            const computerData = await computerResponse.json();

            this.playerHand = playerData.cards;
            this.computerHand = computerData.cards;
        }

        renderPlayerHand() {
            this.playerHandElement.innerHTML = "";
            this.playerHand.forEach((card) => {
                const cardElement = document.createElement("img");
                cardElement.src = card.image;
                cardElement.className = "card";
                cardElement.addEventListener("click", () => this.askForCard(card.value));
                this.playerHandElement.appendChild(cardElement);
            });
        }

        renderCollectedSets() {
            this.playerSetsElement.innerHTML = this.playerCollectedSets
                .map(
                    (set) =>
                        `<span style="background-color: green; color: white; padding: 5px; margin: 5px;">${set}</span>`
                )
                .join("");

            this.computerSetsElement.innerHTML = this.computerCollectedSets
                .map(
                    (set) =>
                        `<span style="background-color: red; color: white; padding: 5px; margin: 5px;">${set}</span>`
                )
                .join("");
        }

        updateStatus(message) {
            this.gameStatusElement.textContent = message;
        }

        async computerTurn() {
            if (this.currentTurn !== "computer") return;

            const cardToAsk = this.computerPlayer.chooseCardToAsk(this.computerHand);

            if (!cardToAsk) {
                this.updateStatus("Datorn kunde inte välja något kort");
                return;
            }

            this.updateStatus(`Datorn frågar efter ${cardToAsk}`);

            const playerHasCard = this.playerHand.some(
                (card) => card.value === cardToAsk
            );

            if (playerHasCard) {
                const transferCards = this.playerHand.filter(
                    (card) => card.value === cardToAsk
                );
                this.computerHand.push(...transferCards);
                this.playerHand = this.playerHand.filter(
                    (card) => card.value !== cardToAsk
                );
                this.updateStatus(
                    `Datorn fick ${transferCards.length} kort med värde ${cardToAsk}!`
                );

                this.computerPlayer.updateMemory(cardToAsk, true);
            } else {
                const response = await fetch(
                    `https://deckofcardsapi.com/api/deck/${this.deck}/draw/?count=1`
                );
                const data = await response.json();
                this.computerHand.push(data.cards[0]);

                this.updateStatus("Datorn drar ett kort.");
                this.computerPlayer.updateMemory(cardToAsk, false);
            }

            this.checkForSets();
            this.renderPlayerHand();
            this.renderCollectedSets();
            this.currentTurn = "player";

            this.checkForWin();
        }

        async askForCard(value) {
            if (this.currentTurn !== "player") return;

            this.updateStatus(`Du frågar efter ${value}`);

            const computerHasCard = this.computerHand.some(
                (card) => card.value === value
            );

            if (computerHasCard) {
                const transferCards = this.computerHand.filter(
                    (card) => card.value === value
                );
                this.playerHand.push(...transferCards);
                this.computerHand = this.computerHand.filter(
                    (card) => card.value !== value
                );

                this.updateStatus(
                    `Du fick ${transferCards.length} kort med värde ${value}!`
                );
            } else {
                const response = await fetch(
                    `https://deckofcardsapi.com/api/deck/${this.deck}/draw/?count=1`
                );
                const data = await response.json();
                this.playerHand.push(data.cards[0]);

                this.updateStatus("Du fick inget och drar ett kort från högen.");
            }

            this.checkForSets();
            this.renderPlayerHand();
            this.renderCollectedSets();
            this.currentTurn = "computer";

            setTimeout(() => this.computerTurn(), 1000);

            this.checkForWin();
        }

        checkForSets() {
            const playerSets = this.findSets(this.playerHand);
            const computerSets = this.findSets(this.computerHand);

            this.playerCollectedSets.push(...playerSets);
            this.computerCollectedSets.push(...computerSets);

            this.playerHand = this.playerHand.filter(
                (card) => !playerSets.includes(card.value)
            );
            this.computerHand = this.computerHand.filter(
                (card) => !computerSets.includes(card.value)
            );

            this.renderCollectedSets();
        }

        findSets(hand) {
            const counts = {};
            hand.forEach((card) => {
                counts[card.value] = (counts[card.value] || 0) + 1;
            });

            return Object.keys(counts).filter((value) => counts[value] === 4);
        }

        checkForWin() {
            if (this.playerCollectedSets.length + this.computerCollectedSets.length >= 13) {
                this.winScreen.classList.remove("hidden");
                if (this.playerCollectedSets.length > this.computerCollectedSets.length) {
                    this.winMessage.textContent = "Grattis! Du vann!";
                } else if (this.playerCollectedSets.length < this.computerCollectedSets.length) {
                    this.winMessage.textContent = "Datorn vann. Försök igen!";
                } else {
                    this.winMessage.textContent = "Det blev oavgjort!";
                }
            }
        }

        startNewGame() {
            this.winScreen.classList.add("hidden");
            this.playerCollectedSets = [];
            this.computerCollectedSets = [];
            this.initGame();
        }
    }

    new FishCardGame();
});