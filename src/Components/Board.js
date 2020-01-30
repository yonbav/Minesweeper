import React from 'react'
import Cell from './Cell'
import './Board.css'
import {BOMB_VALUE} from '../constants'

function Board(props) {
    // If we don't have a valid height or width we don't draw the table
    if (props.height <= 0 || props.width <= 0)
        return <div></div>;

    const Board = getBoard(props.width, props.height, props.mines, props.onToggleFlag)

    return <div>
        <div className='board-style'>
            <table>
                <tbody>{Board}</tbody>
            </table>
        </div>
    </div>
}

function getBoard(width, height, mines, onToggleFlag) {
    let BoardValues = getBoardValues(width, height, mines);
    let Board = [];
    for (let i = 0; i < width; i++) {
        let row = [];
        for (let j = 0; j < height; j++) {
            let number = BoardValues[i][j];
            row.push(<td key={i * j + j}><Cell value={number === 0 ? '' : number} reset={width * height * mines} rowIndex={i} colIndex={j} onRightClick={onToggleFlag} onClick={onCellClicked}/></td>)
        }

        Board.push(<tr key={i}>{row}</tr>)
    }

    return Board;
}

function onCellClicked(value,row,col) {

}

function getBoardValues(width, height, mines) {
    let cellsValues = initDefaultValues(width,height,mines)

    shuffle(cellsValues)
    
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            cellsValues[i][j] = countMines(cellsValues, i, j);
        }
    }

    return cellsValues;
}

function initDefaultValues(width,height,mines){
    let cellsValues = [];
    let minesIndex = mines;
    
    for (let i = 0; i < height; i++) {
        let row = []
        for (let j = 0; j < width; j++) {
            if (minesIndex>0)
            {
                row.push(BOMB_VALUE);
                minesIndex--;
            }
            else
                row.push(0);
        }
        cellsValues.push(row);
    }

    return cellsValues;
}

function shuffle(cellsValues) {
    for (let row = 0; row < cellsValues.length; row++) {     
        for (let col = 0; col < cellsValues[row].length; col++) {
            let swapRowIndex = Math.floor(Math.random() * (cellsValues[row].length - 1))
            let swapColIndex = Math.floor(Math.random() * (cellsValues[col].length - 1))

            let temp = cellsValues[swapRowIndex][swapColIndex]
            cellsValues[swapRowIndex][swapColIndex] = cellsValues[row][col]
            cellsValues[row][col] = temp
        }   
    }
}
function countMines(values, row, column) {
    if (values[row][column] === BOMB_VALUE)
        return BOMB_VALUE;

    let counter = 0;
    for (let i = Math.max(row-1,0); i < Math.min(row+2,values.length); i++) {
        for (let j = Math.max(column-1,0); j < Math.min(column+2,values[i].length); j++) {
            if (values[i][j] === BOMB_VALUE)
                counter++;
        }        
    }

    return counter;
}

export default React.memo(Board, (prevProps, nextProps) => (prevProps.width === nextProps.width && prevProps.height === nextProps.height && prevProps.mines === nextProps.mines))