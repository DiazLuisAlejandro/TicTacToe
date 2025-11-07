import React from "react";

import { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";

function Square({ value, onSquareClick }) {
  return (
    <TouchableOpacity style={{ width: 100, height: 100, fontSize: 30, backgroundColor: "cyan", borderColor: "black", borderWidth: 2, }} className="square" onPress={onSquareClick}>
      <Text style={{ fontSize: 70, textAlign: "center" }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

function Board({ xIsNext, squares, onPlay, victoriasX,victoriasY}) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }


  
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
    if(xIsNext=='O'){
      victoriasX=victoriasX+1;
    }else{
      victoriasY=victoriasY+1
    }

  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  
  
  return (
    <>
      <View style={{ marginTop: 150, alignItems: "center" }}>
        <View>
          <Text>
            {status} 
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </View>
        
      </View>
    </>
  );
}



export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  var victoriasX=0;
  var victoriasY=0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
     
    } else {
      description = 'Restart game';
      return (
        <View>
          
          <TouchableOpacity onPress={() => jumpTo(move)} style={{ borderWidth: 2, borderColor: "lightsteelblue", backgroundColor: "coral" }}>{description}</TouchableOpacity>
          <Text>
            Victorias X:{victoriasX} Victorias O:{victoriasY}
          </Text>
        </View>
      );
    }

  });

  return (
    <View style={{ alignItems: "center" }}>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} victoriasX={victoriasX} victoriasY={victoriasY} />

      <ol>{moves}</ol>
    </View>
  );
}

function calculateWinner(squares) {
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
