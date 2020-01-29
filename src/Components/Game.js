import React, { Component } from 'react';
import CreateBoardForm from './CreateBoardForm'
import './Game.css'

class Game extends Component {
    render() {
        return <div>
            <h1 className="title">Minesweeper</h1>
            <CreateBoardForm/>
        </div>
    }
}

export default Game;