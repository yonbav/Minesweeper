import React, { useState } from 'react';
import CreateBoardForm from './CreateBoardForm'
import './Game.css'
import BoardBar from './BoardBar'
import Board from './Board'

function Game () {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [mines, setMines] = useState(0);
    const [flags, setFlags] = useState(0);
    
    const handleSubmit = (width,height,mines) => {
        setWidth(width);
        setHeight(height);
        setMines(mines);
        setFlags(Number(mines));
    }
    
    const onToggleFlag = (toggleOn) => {
        if (toggleOn && flags === 0)
            return false;

        if (toggleOn)
            setFlags(Number(flags - 1))
        else
            setFlags(Number(flags + 1))

        return true;
    }

    return <div>
        <h1 className="title">Minesweeper</h1>
        <CreateBoardForm onSubmit={handleSubmit}/>
        <BoardBar flagsCount={flags}/>
        <Board width={width} height={height} mines={mines} onToggleFlag={onToggleFlag}/>
    </div>
}

export default Game;