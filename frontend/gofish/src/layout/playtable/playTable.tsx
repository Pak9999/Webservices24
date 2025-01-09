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
	moves?: string[]
	computerID?: string
	decisionBasedOnPicture?: string
}

interface PlayTableProps {
	gameId: string
}

const PlayTable: React.FC<PlayTableProps> = ({ gameId }) => {
	const [game, setGame] = useState<Game | null>(null)
	const [showWinScreen, setShowWinScreen] = useState(false)
	const [showImage, setShowImage] = useState(false)

	useEffect(() => {
		const fetchGame = async () => {
			const gameData = await getGame(gameId)
			setGame(gameData)
		}

		fetchGame()
	}, [gameId])

	useEffect(() => {
		if (game && game.remainingCards === 0 && game.playerHand.length === 0 && game.computerHand.length === 0) {
			setShowWinScreen(true)
		}
	}, [game])

	const handlePlayerAskFor = async (value: string) => {
		try {
			const updatedGame = await playerAskFor(gameId, value)
			setGame(updatedGame)
		} catch (error) {
			console.error("Error asking for card:", error)
		}
	}

	const handlePlayAgain = async () => {
		try {
			const newGame = await createNewGame()
			setGame(newGame)
			setShowWinScreen(false)
		} catch (error) {
			console.error("Error creating new game:", error)
		}
	}

	if (!game) {
		return <p>Spelet kunde inte hittas.</p>
	}

	return (
		<main className="play-table-container">
			<div className="play-table">
				<div className="game-row computer-row">
					<div className="stick-section">
						<StickCounter
							count={game.completedComputerPairs?.length || 0}
							label="Datorns stick"
						/>
					</div>
					<div className="hand-section">
						<ComputerHand computerHand={game.computerHand} />
					</div>
				</div>

				<div className="game-row middle-row">
					<LatestComputerRequest
						latestComputerRequest={game.latestComputerRequest}
					/>
					<div className="kanalen">
						<div className="card-stack">
							{Array.from({ length: Math.min(game.remainingCards, 5) }).map((_, i) => (
								<div key={i} className="card-visual" />
							))}
						</div>
						<div className="card-counter">{game.remainingCards} kort</div>
					</div>
					<LatestPlayerRequest latestPlayerRequest={game.latestPlayerRequest} />
				</div>

				<div className="game-row player-row">
					<div className="hand-section">
						<PlayerHand
							playerHand={game.playerHand}
							handlePlayerAskFor={handlePlayerAskFor}
						/>
					</div>
					<div className="stick-section">
						<StickCounter
							count={game.completedPlayerPairs?.length || 0}
							label="Dina stick"
						/>
					</div>
				</div>
				<div className="image-section">
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
