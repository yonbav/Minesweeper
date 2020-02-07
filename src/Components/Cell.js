import React, {Component} from 'react'
import './Cell.css'
import Flag from '../assets/Flag.gif'
import {BOMB_VALUE} from '../constants'

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {visible:false, flagged:false}
        this.handleClick = this.handleClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    componentDidUpdate(prevProps){
        if (prevProps.newBoard !== this.props.newBoard)
            this.setState({visible:false, flagged:false})
    }
    
    handleClick = () => {
        if (this.state.flagged || this.state.visible)
            return;
        
        this.setState({visible:true});

        if(this.props.value === BOMB_VALUE)
            this.props.onGameLost();
        else    
            this.props.onClick(this.props.value, this.props.rowIndex, this.props.colIndex)
    }

    handleRightClick = (evt) => {
        evt.preventDefault();
        if (this.state.visible)
            return;

        if (this.props.onRightClick(!this.state.flagged))
            this.setState({flagged:!this.state.flagged});
    }

    render() {
        return <div className={this.state.visible ? "visible-cell-style" : "not-visible-cell-style"} onClick={this.handleClick} onContextMenu={this.handleRightClick} >
            {this.state.visible ? this.props.value : this.state.flagged ? <img className="flag-image" src={Flag} alt="F" /> : ''}
        </div>
    }
}

export default Cell