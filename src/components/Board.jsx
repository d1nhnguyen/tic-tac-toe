// This component renders the 3x3 grid of squares and handles all game board logic.

import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {

    // Check if there is a winner or a winning line
    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo?.winner;
    const winningLine = winnerInfo?.line || [];

    // Display different status based on game state
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (squares.every(square => square !== null)) {
        status = "Draw! No one wins.";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
        const nextSquares = squares.slice(); // Create a new array (immutability)
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares, i);
    }

    // Generate the 3x3 board dynamically using two loops
    const rows = [];
    for (let row = 0; row < 3; row++) {
        const cols = [];
        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            cols.push(
            <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
                isWinning={winningLine.includes(index)}
            />
            );
        }
        rows.push(
            <div key={row} className="board-row">
            {cols}
            </div>
        );
    }

    return (
    <>
        <div className="status">{status}</div>
        {rows}
    </>
    );
}

// Function that checks if someone has won
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Return both the winner and the winning line
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
}
