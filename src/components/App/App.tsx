import React, { ReactElement, useState } from 'react';
import Display from '../Display/Display';
import './App.css';
import Button from '../Button/Button'

function App(): ReactElement {
  const [disableDisplay, setDisableDisplay] = useState(false);
  const [display, setDisplay] = useState("");
  const [displayPosition, setDisplayPosition] = useState(0);
  const handleDisplayChange = (e: any) => {
    setDisplay((e.target as HTMLInputElement).value);
    return undefined;
  };
  const handleButtonClick = (name: string) => {
    switch(name) {
      case '1': {
        break;
      }
      default: {
        setDisplay('ERROR! Invalid button!')
        setDisableDisplay(true);
        break;
      }
    }
    return undefined
  }
  const addNameToDisplay = (name: string) => {
    let beginning:string = display.slice(0,displayPosition)
    console.log('display '+ display)
    console.log('displayPosition '+ displayPosition)
    let end:string = display.slice(displayPosition)
    console.log('beginning '+ beginning)
    console.log('end '+ end)
    console.log('new '+ beginning+name+end)
    setDisplay(beginning+name+end)
    setDisplayPosition(beginning.length+name.length)
    return undefined
  }
  return (
    <div className='app'>
      <Display value={display} disable={disableDisplay} handleChange={handleDisplayChange} />
      <div className='button-panel'>
        <div>
          <Button width={3} name='CE' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='(' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name=')' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='/' primary={false} handleClick={addNameToDisplay} />
        </div>
        <div>
          <Button width={3} name='7' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='8' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='9' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='*' primary={false} handleClick={addNameToDisplay} />
        </div>
        <div>
          <Button width={3} name='4' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='5' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='6' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='-' primary={false} handleClick={addNameToDisplay} />
        </div>
        <div>
          <Button width={3} name='1' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='2' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='3' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='+' primary={false} handleClick={addNameToDisplay} />
        </div>
        <div>
          <Button width={6} name='0' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='.' primary={false} handleClick={addNameToDisplay} />
          <Button width={3} name='=' primary={false} handleClick={addNameToDisplay} />
        </div>
      </div>
    </div>
  );
}

export default App;


/* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.tsx</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header> */