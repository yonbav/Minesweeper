import React, { Component } from 'react'
import CreateBoardForm from './CreateBoardForm'
import './Game.css'
import BoardBar from './BoardBar'
import Board from './Board'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {label:"Enjoy", width: 0, height: 0, mines: 0, flags: 0, openCells: 0 }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onToggleFlag = this.onToggleFlag.bind(this)
        this.resetBoard = this.resetBoard.bind(this)
        this.onGameWon = this.onGameWon.bind(this)
        this.onGameLost = this.onGameLost.bind(this)
    }

    onGameWon() {
        this.setState({label:"You Win!"})   
    }

    onGameLost() {
        this.setState({label:"You Lose!"})   
    }

    handleSubmit(width, height, mines) {
        this.resetBoard()
        this.setState({ label:"Good Luck", width: width, height: height, mines: mines, flags: Number(mines) })
    }

    onToggleFlag(toggleOn) {
        if (toggleOn && this.state.flags === 0)
            return false

        if (toggleOn)
            this.setState({flags:this.state.flags - 1})
        else
            this.setState({flags:this.state.flags + 1})

        return true
    }

    resetBoard() {
        this.setState({newBoard:!this.state.newBoard})
    }

    render() {
        return <div>
            <h1 className="title">Minesweeper</h1>
            <CreateBoardForm onSubmit={this.handleSubmit} />
            <BoardBar flagsCount={this.state.flags} />

            <div className="label-style">
                <h1>{this.state.label}</h1>
            </div>

            <Board width={this.state.width} 
                    newBoard={this.state.newBoard} 
                    height={this.state.height} 
                    mines={this.state.mines} 
                    onToggleFlag={this.onToggleFlag}
                    onGameLost={this.onGameLost}
                    onGameWon={this.onGameWon}/>
        </div>
    }
}

export default Game