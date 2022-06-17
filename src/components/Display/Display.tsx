import React, { ReactElement } from 'react'
import './Display.css';

interface Props {
    value: string,
    disable: boolean,
    handleChange: (e: any) => undefined
}

export default function Display(props: Props): ReactElement {
    const handleKeypress = (e: any) => {
        //Exclude disallowed characters via any input method (keyboard, copy & paste, etc.)
        let cursorPosition = e.target.selectionStart,
            regex = /[^0-9^*-+()]/gi,
            value = e.target.value
        if(regex.test(value)) {
            e.target.value = value.replace(regex, '')
            cursorPosition--
        }
        e.target.setSelectionRange(cursorPosition, cursorPosition)
    };
    return (
        <div className='display'>
            <input type='text' disabled={props.disable} value={props.value} onChange={props.handleChange} onInput={handleKeypress} ></input>
        </div>
    )
}

