import React from 'react'
import './style.css'

interface Ibox {
    color: string,
    id: number
    removeBox: (arg: number) => void,
    initIndex: number,
}

export const Box: React.FC<Ibox> = ({ color, id, removeBox, initIndex }) => {
    return (
    <div style={{display:'inline-block', margin:'10px 0px 5px 15px', border:'1px solid #000', }}>
        <div style={{width:'170px',height:'150px', backgroundColor:`${color}`}}></div>
        <div style={{ padding: '10px' }}>{color}
            <span style={{ float: 'right'}}><a onClick={(e) => removeBox(id)}>{ id > initIndex && 'x'}</a></span>
        </div>
    </div>
    )
}

