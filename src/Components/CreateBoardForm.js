import React, { useState } from 'react'
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '../constants'
import './CreateBoardForm.css'
import './InputField'
import InputField from './InputField'

function CreateBoardForm() {

    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [mines, setMines] = useState("");
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Width: ${width} Height: ${height} Mines: ${mines}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputField label='Width' minSize={MIN_BOARD_SIZE} maxSize={MAX_BOARD_SIZE} onChange={e => setWidth(e.target.value)} />
            <InputField label='Height' minSize={MIN_BOARD_SIZE} maxSize={MAX_BOARD_SIZE} onChange={e => setHeight(e.target.value)} />
            <InputField label='Mines' minSize={1} maxSize={width * height} onChange={e => setMines(e.target.value)} />
            <div className="submit-button">
                <button>Create Board</button>
            </div>
        </form>
    );
}

export default CreateBoardForm;