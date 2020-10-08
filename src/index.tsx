import React, { useState, FC } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Game: FC = () => {

   
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

const Board: FC = () => {
  // 次がX
  const [xIsNext, setXIsNext] = useState(true);
  // マス状態管理
  const [squares, setSquares] = useState(Array(9).fill(null));

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

  // ステータスラインを返す
  const create_status = () => {
    const winner = calculateWinner(squares);
    let status;

    if (winner) {
      status = 'Winner:' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    return status

  }

  // クリック
  const handleClick = (i: number) => {
    const tmp_squares = squares.slice();

    // 勝者が決まった。またはすでにクリックされている場合はreturn
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const value = xIsNext ? 'X' : '◯'
    tmp_squares[i] = value;
    setSquares(tmp_squares);
    setXIsNext(!xIsNext);

  }

  // 1マス描画
  const renderSquare = (i: number) => {
    return (
      <Square value={squares[i]} onClick={() => handleClick(i)} />
    )
  };


  return (
    <div>
      <div className="status">{create_status()}</div>
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