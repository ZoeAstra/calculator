import React, { ReactElement, useEffect } from 'react'
import './Display.css';

interface Props {
    leftSide: string,
    rightSide: string
}

export default function Display(props: Props): ReactElement {
    useEffect(() => {
        //below line added due to bug in react testig library/jest where scrollIntoView is not in jsdom.
        window.HTMLElement.prototype.scrollIntoView = function() {}
        let curosr = document.querySelector(".cursor")
        if (curosr) { curosr.scrollIntoView() }
    })
    return ( 
        <output role={'math'} name={'display'} className='display'>
            {props.leftSide}
            <span className='cursor' >&nbsp;</span>
            {props.rightSide}
        </output>
    )
}

