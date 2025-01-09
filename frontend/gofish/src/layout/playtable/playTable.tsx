import React, { useEffect, useState } from "react"
import { getGame, playerAskFor, createNewGame } from "../../apiService.ts"
import ComputerHand from "../../components/computerHand.tsx"
import LatestComputerRequest from "../../components/latestComputerRequest.tsx"
import PlayerHand from "../../components/playerHand.tsx"
import LatestPlayerRequest from "../../components/latestPlayerRequest.tsx"
import StickCounter from "../../components/stickCounter.tsx"
import "./playTable.css"
import WinScreen from "../../components/winner.tsx"



interface Card {
	value: string
	suit: string
	imgURI: string
}

interface Game {
	computerHand: Card[]
	playerHand: Card[]
	remainingCards: number
	latestPlayerRequest: string
	latestComputerRequest: string
	completedPlayerPairs: string[]
	completedComputerPairs: string[]
	computerID?: string
	decisionBasedOnPicture?: string
}

interface PlayTableProps {
	gameId: string
}


/**
 * The main component for the game table
 * @param {PlayTableProps} props - the properties used by the play table component 
 * @returns {JSX.Element} the redered play table component
 */
const PlayTable: React.FC<PlayTableProps> = ({ gameId }) => {
	const [game, setGame] = useState<Game | null>(null)
	const [showWinScreen, setShowWinScreen] = useState(false)
	const [showImage, setShowImage] = useState(false)

	/**
	 * Fetches the game from the API
	 * 
	 * @returns {Promise<void>} resolved when the game is fetched
	 */
	useEffect(() => {
		const fetchGame = async () => {
			const gameData = await getGame(gameId)
			setGame(gameData)
		}

		fetchGame()
	}, [gameId])

	// Checks if the game is over and displays the win screen
	useEffect(() => {
		if (game && game.remainingCards === 0 && game.playerHand.length === 0 && game.computerHand.length === 0) {
			setShowWinScreen(true)
		}
	}, [game])

	/**
	 * Sends a request to update the game when the player asks for a card
	 * Updates the game state with the new game data
	 * 
	 * @param {string} value - the value of the card the player is asking for
	 * @returns {Promise<void>} resolved when the game is updated
	 */
	const handlePlayerAskFor = async (value: string) => {
		try {
			const updatedGame = await playerAskFor(gameId, value)
			setGame(updatedGame)
		} catch (error) {
			console.error("Error asking for card:", error)
		}
	}

	// WIP WIP WIP WIP Creates a new game if the player wants to play again #TODO ALSO INCLUDES PROMISE VOID
	const handlePlayAgain = async () => {
		try {
			const newGame = await createNewGame()
			setGame(newGame)
			setShowWinScreen(false)
		} catch (error) {
			console.error("Error creating new game:", error)
		}
	}

	// Displays an error message when the game is not found
	if (!game) {
		return <p>Spelet kunde inte hittas.</p>
	}

	// Component layout 
	return (
		<main className="play-table-container">
			<div className="play-table">
				<div className="game-row computer-row">
					<div className="stick-section">
						{/* Display amount of sticks the computer has */}
						<StickCounter
							count={game.completedComputerPairs?.length || 0}
							label="Datorns stick"
						/>
					</div>
					<div className="hand-section">
						{/* Display the computer's hand, face down */}
						<ComputerHand computerHand={game.computerHand} />
					</div>
				</div>

				<div className="game-row middle-row">
					{/* Display the computers latest request */}
					<LatestComputerRequest
						latestComputerRequest={game.latestComputerRequest}
					/>
					<div className="kanalen">
						<div className="card-stack">
							{/* Display the amount of remaining cards in the deck */}
							{Array.from({ length: Math.min(game.remainingCards, 5) }).map((_, i) => (
								<div key={i} className="card-visual" />
							))}
						</div>
						<div className="card-counter">{game.remainingCards} kort</div>
					</div>
					{/* Display the players latest request */}
					<LatestPlayerRequest latestPlayerRequest={game.latestPlayerRequest} />
				</div>

				<div className="game-row player-row">
					<div className="hand-section">
						{/* Display the players hand, face up */}
						<PlayerHand
							playerHand={game.playerHand}
							handlePlayerAskFor={handlePlayerAskFor}
						/>
					</div>
					<div className="stick-section">
						{/* Display the amount of sticks the player has */}
						<StickCounter
							count={game.completedPlayerPairs?.length || 0}
							label="Dina stick"
						/>
					</div>
				</div>
				<div className="image-section">
					{/* Display the image which is the basis of the computer's choice for the current round */}
					<button
						className="show-image-button"
						onClick={() => setShowImage(!showImage)}
					>
						Visa motståndare (trafikplats)
					</button>

					{showImage && game?.computerID && (
						<div className="modal-overlay">
							<div className="modal-content">
								<h3>Trafikplats: {game.computerID}</h3>
								<img
									src={game.decisionBasedOnPicture}
									alt={game.computerID}
									className="place-image"
								/>
                <h5>Källa: Trafikverket</h5>
								<button className="close-button" onClick={() => setShowImage(false)}>
									Stäng
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			
			{/* Display the win screen when the game is over, showing who won and opportunity to play again */}
			{showWinScreen && (
				<WinScreen
					playerScore={game.completedPlayerPairs?.length || 0}
					computerScore={game.completedComputerPairs?.length || 0}
					onPlayAgain={handlePlayAgain}
				/>
			)}
		</main>
	)
}

export default PlayTable
