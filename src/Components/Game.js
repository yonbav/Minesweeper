import React, { useState } from 'react';
import CreateBoardForm from './CreateBoardForm'
import './Game.css'
import Board from './Board'

function Game (props) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [mines, setMines] = useState(0);

    const handleSubmit = (width,height,mines) => {
        setWidth(width);
        setHeight(height);
        setMines(mines);
    }

    return <div>
        <h1 className="title">Minesweeper</h1>
        <CreateBoardForm onSubmit={handleSubmit}/>
        <Board width={width} height={height} mines={mines}/>
    </div>
}

export default Game;