import React from 'react'
import './CreateBoardForm.css'
import { MAX_BOARD_SIZE } from '../constants'

function InputField(props) {
    return (
        <div className="form-group row input-group">
            <label className="col-sm-1 col-form-label"> {props.label}: </label>
            <input className="col-sm-4 form-control" onChange={props.onChange} type="number" name={props.label} min={props.minSize} max={props.maxSize} placeholder={`Enter number between ${props.minSize} - ${props.maxSize <= 0 ? MAX_BOARD_SIZE : props.maxSize}`} required/>
        </div>
    )
}

export default InputField