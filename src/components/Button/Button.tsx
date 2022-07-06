import React, { ReactElement } from 'react'
import './Button.css'

interface Props {
    name: string,
    symbolClass?: string,
    colorClass: string,
    handleClick: (name: string) => undefined,
    width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export default function Button(props: Props): ReactElement {
    const handleClick = () => {
        props.handleClick(props.name)
    }
    //let buttonClass:string = props.primary? 'primary' : ''
    let widthClass = ' col-' + props.width.toString()
    let buttonInterior
    if (props.symbolClass) {
        buttonInterior = <span className={props.symbolClass} />
    } else {
        buttonInterior = <span> {props.name} </span>
    }


    return (
        <div className={widthClass + ' center'}>
            <button onClick={handleClick} className={props.colorClass}>
                {buttonInterior}
            </button>
        </div>
    )
}
