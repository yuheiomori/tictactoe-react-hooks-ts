import React, { useState, FC } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 勝者判定
const calculateWinner = (squares: Array<number>) => {
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
  // 次がX
  const [xIsNext, setXIsNext] = useState(true);
  // マス状態管理
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);

  const current = history[history.length - 1]
  const winner = calculateWinner(current.squares)

  // クリック
  const handleClick = (i: number) => {
    const tmp_squares = current.squares.slice();

    // 勝者が決まった。またはすでにクリックされている場合はreturn
    if (winner || current.squares[i]) {
      return;
    }
    tmp_squares[i] = xIsNext ? 'X' : '◯'


    setHistory(history.concat([{'squares': tmp_squares}]));
    setXIsNext(!xIsNext);

  }


  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

type BoardProps = {
  squares: Array<number>,
  onClick: (i: number) => void
}

const Board: FC<BoardProps> = (props) => {
 
  // 1マス描画
  const renderSquare = (i: number) => {
    return (
      <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
    )
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
  value: number
  onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLInputElement, MouseEvent>) => void;
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