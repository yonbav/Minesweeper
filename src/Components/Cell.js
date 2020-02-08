import React, {Component} from 'react'
import './Cell.css'
import Flag from '../assets/Flag.gif'
import Mine from '../assets/mine.jpg'
import {BOMB_VALUE} from '../constants'

class Cell extends Component {
    constructor(props) {
        super(props)
        this.state = {visible:false, flagged:false}
        this.handleClick = this.handleClick.bind(this)
        this.handleRightClick = this.handleRightClick.bind(this)
        this.getDisplayFromValue = this.getDisplayFromValue.bind(this)
    }

    componentDidUpdate(prevProps){
        if (prevProps.newBoard !== this.props.newBoard)
            this.setState({visible:false, flagged:false})
        else
            this.props.onStateChanged()
    }
    
    handleClick () {
        if (this.state.flagged || this.state.visible)
            return
        
        if (!this.props.onClick(this.props.value, this.props.rowIndex, this.props.colIndex))
            return
   
        if(this.props.value === BOMB_VALUE)
            this.props.onGameLost()            
    }

    handleRightClick(evt) {
        evt.preventDefault()
        if (this.state.visible)
            return

        if (this.props.onRightClick(!this.state.flagged))
            this.setState({flagged:!this.state.flagged})
    }
    getDisplayFromValue() {        
        if (!this.state.visible && this.state.flagged)
            return <img className="icon-image" src={Flag} alt="F" />


        if(!this.state.visible)
            return ''
        
        if (this.state.visible && this.props.value === BOMB_VALUE)
            return <img className="icon-image" src={Mine} alt="F" />

        return this.props.value;    
    }

    render() {
        return <div className={this.state.visible ? "visible-cell-style" : "not-visible-cell-style"} onClick={this.handleClick} onContextMenu={this.handleRightClick} >
            {this.getDisplayFromValue()}
        </div>
    }
}

export default Cell