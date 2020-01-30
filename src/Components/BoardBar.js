import React from 'react'
import './BoardBar.css'

function BoardBar(props) {
    return <div className='bar-style row'>
        <h3 className="col-md-6">flags count : {props.flagsCount}</h3>
        <label className='col-md-6'>
            <input className='form-check-input' type="checkbox" />
            Superman
        </label>
    </div>

}

export default BoardBar;