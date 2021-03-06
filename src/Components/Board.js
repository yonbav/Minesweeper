import React, { createRef } from 'react'
import Cell from './Cell'
import './Board.css'
import { BOMB_VALUE, ZERO_VALUE } from '../constants'

function Board(props) {
    const cellsRef = {}
    let gameFinished = false
    let closedCount = props.width * props.height

    // If we don't have a valid height or width we don't draw the table
    if (props.height <= 0 || props.width <= 0)
        return <div></div>

    const getBoard = () => {
        let BoardValues = getBoardValues(props.width, props.height, props.mines)
        let Board = []

        for (let i = 0; i < props.height; i++) {
            let row = []
            for (let j = 0; j < props.width; j++) {
                let curKey = i * props.width + j
                row.push(<td key={curKey}>
                    <Cell ref={getOrCreateRef(curKey)}
                        id={curKey}
                        maxWidth={props.width}
                        value={BoardValues[i][j] === 0 ? ZERO_VALUE : BoardValues[i][j]}
                        reset={props.width * props.height * props.mines}
                        rowIndex={i} colIndex={j}
                        onGameLost={onGameLost}
                        onRightClick={onRightClick}
                        onClick={onCellClicked}
                        newBoard={props.newBoard}
                        onStateChanged={checkWinning} />
                </td>)
            }

            Board.push(<tr key={i}>{row}</tr>)
        }

        return Board
    }

    const getOrCreateRef = (id) => {
        if (!cellsRef.hasOwnProperty(id)) {
            cellsRef[id] = createRef()
        }
        return cellsRef[id]
    }

    const onRightClick = (toggleOn) => {
        if (gameFinished)
            return false;

        props.onToggleFlag(toggleOn);
        return true;
    }

    const onCellClicked = (value, row, col) => {
        if (gameFinished)
            return false;

        let pushedCell = cellsRef[row * props.width + col].current;

        if (value !== ZERO_VALUE)
        {
            openCell(pushedCell)
            return true;
        }

        const queue = []
        queue.push(pushedCell)
        const visited = {}

        while (queue.length !== 0) {
            const curCell = queue.pop()
            const rowStartIndex = Math.max(curCell.props.rowIndex - 1, 0)
            const rowEndIndex = Math.min(curCell.props.rowIndex + 2, props.height)
            const colStartIndex = Math.max(curCell.props.colIndex - 1, 0)
            const colEndIndex = Math.min(curCell.props.colIndex + 2, props.width)


            for (let i = rowStartIndex; i < rowEndIndex; i++) {
                for (let j = colStartIndex; j < colEndIndex; j++) {
                    const neighborCell = cellsRef[i * props.width + j].current
                    if (neighborCell.state.visible === false && !visited[neighborCell.props.id]) {
                        visited[neighborCell.props.id] = true
                        openCell(neighborCell)

                        if (neighborCell.props.value === ZERO_VALUE)
                            queue.push(neighborCell)
                    }
                }
            }
        }

        return true;
    }
    
    const openCell = (cell) => {
        cell.setState({ visible: true })
        closedCount--;
    }

    const getBoardValues = (width, height, mines) => {
        let cellsValues = initDefaultValues(width, height, mines)

        shuffle(cellsValues)

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                cellsValues[i][j] = countMines(cellsValues, i, j)
            }
        }

        return cellsValues
    }

    const initDefaultValues = (width, height, mines) => {
        let cellsValues = []
        let minesIndex = mines

        for (let i = 0; i < height; i++) {
            let row = []
            for (let j = 0; j < width; j++) {
                if (minesIndex > 0) {
                    row.push(BOMB_VALUE)
                    minesIndex--
                }
                else
                    row.push(0)
            }
            cellsValues.push(row)
        }

        return cellsValues
    }

    const shuffle = (cellsValues) => {
        for (let row = cellsValues.length - 1; row > 0; row--) {
            for (let col = cellsValues[0].length - 1; col > 0; col--) {
                let swapRowIndex = Math.floor(Math.random() * (row))
                let swapColIndex = Math.floor(Math.random() * (col))

                let temp = cellsValues[swapRowIndex][swapColIndex]
                cellsValues[swapRowIndex][swapColIndex] = cellsValues[row][col]
                cellsValues[row][col] = temp
            }
        }
    }
    const onGameLost = () => {
        disableBoard()
        props.onGameLost()
    }

    const checkWinning = () => {
        if (!gameFinished && closedCount === Number(props.mines)) {
            disableBoard()
            props.onGameWon()
        }
    }

    const disableBoard = () => {
        gameFinished = true;
    }

    const countMines = (values, row, column) => {
        if (values[row][column] === BOMB_VALUE)
            return BOMB_VALUE

        let counter = 0
        let rowStartIndex = Math.max(row - 1, 0)
        let rowEndIndex = Math.min(row + 2, values.length)
        let colStartIndex = Math.max(column - 1, 0)
        let colEndIndex = Math.min(column + 2, values.length)

        for (let i = rowStartIndex; i < rowEndIndex; i++) {
            for (let j = colStartIndex; j < colEndIndex; j++) {
                if (values[i][j] === BOMB_VALUE)
                    counter++
            }
        }

        return counter
    }


    const Board = getBoard()

    return <div>
        <div className='board-style'>
            <table>
                <tbody>{Board}</tbody>
            </table>
        </div>
    </div>
}

export default React.memo(Board, (prevProps, nextProps) => (prevProps.newBoard === nextProps.newBoard))