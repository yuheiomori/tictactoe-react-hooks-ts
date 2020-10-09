import React, { useState, FC } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type SquareValue = "X" | "◯" | null;

const calculateWinner = (squares: SquareValue[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Game: FC = () => {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<{ squares: SquareValue[] }[]>([
    {
      squares: Array(9).fill(null)
    }
  ]);
  const [stepNumber, setStepNumber] = useState<number>(0);


  const handleClick = (i: number): void => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = history[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : '◯'
    setHistory(newHistory.concat([{ 'squares': squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);

  }


  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0)

  }

  ///////////////////////

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)

  const moves = history.map((_squares, idx) => {
    const desc = idx ?
      'Go to move #' + idx :
      'Go to game start';
    return (
      <li key={idx}>
        <button onClick={() => jumpTo(idx)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

type BoardProps = {
  squares: SquareValue[],
  onClick: (i: number) => void
}

const Board: FC<BoardProps> = (props) => {

  // 1マス描画
  const renderSquare = (i: number) => {
    return (
      <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
    );
  };


  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )

}

type SquareProps = {
  value: SquareValue
  onClick(): void
  //onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLInputElement, MouseEvent>) => void;
};

const Square: FC<SquareProps> = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);