import React, { Component } from 'react';
import CreateBoardForm from './CreateBoardForm'
import './Game.css'
import BoardBar from './BoardBar'
import Board from './Board'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0, mines: 0, flags: 0, openCells: 0 }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onToggleFlag = this.onToggleFlag.bind(this);
        this.CheckWinning = this.CheckWinning.bind(this);
        this.onGameLost = this.onGameLost.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
    }

    handleSubmit(width, height, mines) {
        this.resetBoard()
        this.setState({ width: width, height: height, mines: mines, flags: Number(mines) })
    }

    onToggleFlag(toggleOn) {
        if (toggleOn && this.state.flags === 0)
            return false;

        if (toggleOn)
            this.setState({flags:this.state.flags - 1})
        else
            this.setState({flags:this.state.flags + 1})

        return true;
    }
    
    CheckWinning() {
        let leftCells = (this.state.width * this.state.height) - (this.state.openCells + 1);
        if (leftCells === Number(this.state.mines))
        {
            alert("you won");
        }
        else
            this.setState({openCells: this.state.openCells + 1});
    }

    onGameLost() {
        alert("you lost");
    }

    resetBoard() {
        this.setState({newBoard:!this.state.newBoard});
    }

    render() {
        return <div>
            <h1 className="title">Minesweeper</h1>
            <CreateBoardForm onSubmit={this.handleSubmit} />
            <BoardBar flagsCount={this.state.flags} />
            <Board width={this.state.width} newBoard={this.state.newBoard} height={this.state.height} mines={this.state.mines} onToggleFlag={this.onToggleFlag} onGameLost={this.onGameLost}/>
        </div>
    }
}

export default Game;