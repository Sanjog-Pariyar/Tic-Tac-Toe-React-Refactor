import './MainSection.css'
import Modal from '../Modal/Modal'
import Footer from '../Footer/Footer'
import Menu from '../Menu/Menu'
import { useState } from 'react'
import { deriveGame, deriveStats } from '../utils/utils'


function MainSection() {

    const [state, setState] = useState({
        CurrentGameMoves: [],
        history: {
            currentRoundGames: [],
            allGames: [],
            },
        })

    const game = deriveGame(state)
    const stats = deriveStats(state)


    const handlePlayerMove = (squareId, currentPlayer) => {

        setState((prev) => {
            const stateClone = structuredClone(prev);

            stateClone.CurrentGameMoves.push({
                squareId,
                currentPlayer,
            });
            return stateClone
        })
    }

    const resetGame = (isNewRound) => {

        setState((prev) => {
            const stateClone = structuredClone(prev)

            const { gameStatus, moves, winner } = game

            if (game.gameStatus === 'win' || game.gameStatus === 'draw') {
                stateClone.history.currentRoundGames.push({
                    gameStatus,
                    moves,
                    winner
                })
            }

            stateClone.CurrentGameMoves = [];

            if (isNewRound) {
                stateClone.history.allGames.push(...stateClone.history.currentRoundGames)
                stateClone.history.currentRoundGames = []
            }

            return stateClone;
        })
    }


    return(
        <>
        <main>
            <div className="grid">

                <div className={`turn ${game.currentPlayer.colorClass}`}>
                    <p>{game.currentPlayer.icon}</p>
                    <i>{game.currentPlayer.name}, you're up</i>
                </div>

                <Menu 
                    reset = {() =>  resetGame(false)}
                    newRound={() => resetGame(true)}
                />

                {[1,2,3,4,5,6,7,8,9].map((squareId) => {


                    const existingMove = game.moves.find((move) => move.squareId === squareId)


                    return(
                        <div key={squareId} className="square shadow" onClick={() => {
                            if (existingMove) return

                            handlePlayerMove(squareId, game.currentPlayer)
                        }}>

                            { existingMove && <i className={existingMove.currentPlayer.colorClass}>{existingMove.currentPlayer.icon}</i>}

                        </div>
                    )
                })}

                <div className="score shadow" style={{ backgroundColor: "#35a7ff" }}>
                    <p>Player 1:</p>
                    <span id="text">{stats.p1Wins} Wins</span>
                </div>
                <div className="score shadow" style={{ backgroundColor: "#e7cee3" }}>
                    <p>Ties:</p>
                    <span>{stats.draws}</span>
                </div>
                <div className="score shadow" style={{ backgroundColor: "#ffe74c" }}>
                    <p>Player 2:</p>
                    <span id="text">{stats.p2Wins} Wins</span>
                </div>
            </div>
    </main>

    <Footer />
    
    {game.gameStatus !== 'in-progress' && <Modal 
            message={
                    game.winner ? `Player ${game.winner} Wins!` : 'Game is draw!'
                }
            onClick={() => resetGame(false)}
    />}

    </>

    )
}

export default MainSection;