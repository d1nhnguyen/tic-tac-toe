import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    // Called when a player makes a move
    function handlePlay(nextSquares, location) {
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    // Jump to a specific move in the game history
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    // Toggle sorting order of the move list
    function toggleSort() {
        setIsAscending(!isAscending);
    }

    // Generate list of past moves
    const moves = history.map((step, move) => {
    const row = Math.floor(step.location / 3) + 1;
    const col = (step.location % 3) + 1;
    const location = step.location !== null ? ` (${row}, ${col})` : "";

    if (move === currentMove) {
        return (
        <li key={move}>
        <span className="current-move">
        {move ? `You are at move #${move}` : "You are at game start"}
        </span>
        {location}
        </li>
        );
    } 
    else {
        return (
            <li key={move}>
            <button onClick={() => jumpTo(move)}>
            {move ? `Go to move #${move}` : "Go to game start"}
            </button>
            {location}
            </li>
            );
    }
    });

    const sortedMoves = isAscending ? moves : [...moves].reverse();

    return (
        <div className="game">
        <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
        <button onClick={toggleSort} className="sort-button">
        Sort: {isAscending ? "Ascending" : "Descending"}
        </button>
        <ol start={isAscending ? 0 : history.length - 1} reversed={!isAscending}>
        {sortedMoves}
        </ol>
        </div>
        </div>
    );
}
