import React, {useState, useEffect} from 'react'
import './Cell.css'
import Flag from '../assets/Flag.gif'

function Cell(props){
    const [visible, setVisible] = useState();
    const [flagged, setFlagged] = useState();
    useEffect(()=> setVisible(false),[props.reset]);
    useEffect(()=> setFlagged(false),[props.reset]);
    
    const handleClick = () => {
        if (flagged)
            return;
        
        setVisible(true);
        props.onClick(props.value,props.rowIndex, props.colIndex)
    }

    const handleRightClick = (evt) => {
        evt.preventDefault();
        if (visible)
            return;

        if (props.onRightClick(!flagged))
            setFlagged(!flagged);
    }

    
    return <div className={visible ? "visible-cell-style" : "not-visible-cell-style"} onClick={handleClick} onContextMenu={handleRightClick} >
        {visible ? props.value : flagged ? <img className="flag-image" src={Flag} alt="F" /> : ''}
    </div>
}

export default Cell