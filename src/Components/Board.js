import React, {setState} from 'react'
import Cell from './Cell'
import './Board.css'

function Board(props) {

    // If we don't have a valid height or width we don't draw the table
    if (props.height <= 0 || props.width <= 0)
        return <div></div>;

    // If we do have height and width creating the board 
    let Board = [];
    for (let i = 0; i < props.width; i++) {

        let row = [];
        for (let j = 0; j < props.height; j++) {
            row.push(<td><Cell/></td>)
        }    

        Board.push(<tr>{row}</tr>)
    }

    return <div className='board-style'><table>{Board}</table></div>;
}

export default Board