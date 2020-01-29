import React, {useState} from 'react'


function Cell(props){
    const [visible, setVisible] = useState(false);
    const [flagged, setFlagged] = useState(false);
    const handleClick = () => {
        if (flagged)
            return;
        
        setVisible(true);
    }

    const handleRightClick = (evt) => {
        evt.preventDefault();
        if (visible)
            return;

        setFlagged(!flagged);
        alert("flagged")
    }

    return <div onClick={handleClick} onContextMenu={handleRightClick} >{visible ? props.value : '*'}</div>
}

export default Cell