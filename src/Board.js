import React, { useState } from 'react'

export const Board = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xNext, setXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    function handleClick (index) {
            if (winner || board[index])
                return;
            const newBoard = [...board];
            if(!newBoard[index]){
                newBoard[index]= xNext ? 'X' : 'O';
                setBoard(newBoard);
                const winningPlayer = checkWinner(newBoard);
                if (winningPlayer) {
                    setWinner(winningPlayer);
                    return;
                }
                if (newBoard.every(square => square !== null)) {
                    setWinner('Draw');
                    return;
                }
                setXNext(!xNext);
        }
    }
    function checkWinner(board){
        const winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let [a,b,c] of winners) {
            if (board[a] && board[a] === board[b] && board[a]===board[c])
                return board[a];
        }
        return null;
    }

  return (
    <div>
        {!winner ? <h2 className='statusBar'>Next Player {xNext ? 'X' : 'O'}</h2> : winner==='Draw'? <h2 className='statusBar'>It's a Draw!</h2> : <h2 className='statusBar'>Winner is {winner}</h2>}
        <div className='board'>
            {board.map((value, i) => (
                <button
                key={i}
                className={`square ${value ? 'filled' : ''}`}
                onClick={()=> handleClick(i)}
                >{value}</button>
            ))}
        </div>
    </div>
  )
}

export default Board;