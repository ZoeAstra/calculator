import React, { ReactElement } from 'react'
import './Button.css'

interface Props {
    name: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "+" | "-" | "*" | "/" | "=" | "." | "(" | ")" | "CE",
    primary: boolean,
    handleClick: (name: string) => undefined,
    width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export default function Button(props: Props): ReactElement {
    const handleClick = () => {
        props.handleClick(props.name)
    }
    let classes:string = props.primary? 'primary' : ''
    classes += ' col-' + props.width.toString()
    return (
        <button onClick={handleClick} className={classes} >{props.name}</button>
    )
}
