import React, { ReactElement, useEffect } from 'react'
import './Display.css';

interface Props {
    leftSide: string,
    rightSide: string
}

export default function Display(props: Props): ReactElement {
    useEffect(() => {
        let curosr = document.querySelector(".cursor")
        if (curosr) { curosr.scrollIntoView() }
    })
    return (
        <div className='display'>
            {props.leftSide}
            <span className='cursor' >&nbsp;</span>
            {props.rightSide}
        </div>
    )
}

