import React, { ReactElement, useState } from 'react';
import Display from '../Display/Display';
import './App.css';
import Button from '../Button/Button'
import DisplayAdapter from '../../code/DisplayAdapter';
import { parse } from '../../code/ExpressionParser';

function App(): ReactElement {
  const [displayLeftSide, setDisplayLeftSide] = useState("")
  const [displayRightSide, setDisplayRightSide] = useState("")
  const [adapter, setAdapter] = useState(new DisplayAdapter())

  const processButtonClick = (name: string) => {
    let newAdapter = adapter
    switch (name) {
      case "=":
        let tokens = adapter.getTokens()
        let {result, error} = parse(tokens)
        newAdapter.clear()
        newAdapter.addToken(String(result))
        setDisplayLeftSide(newAdapter.getLeftSide())
        setDisplayRightSide(newAdapter.getRightSide())
        setAdapter(newAdapter)
        break
      case "CLR":
        newAdapter.clear()
        setDisplayLeftSide(newAdapter.getLeftSide())
        setDisplayRightSide(newAdapter.getRightSide())
        setAdapter(newAdapter)
        break
        
      default:
        newAdapter.addToken(name)
        setDisplayLeftSide(newAdapter.getLeftSide())
        setDisplayRightSide(newAdapter.getRightSide())
        setAdapter(newAdapter)
        break
    }
    return undefined
  }

  return (
    <div className='app'>
      <Display leftSide={displayLeftSide} rightSide={displayRightSide} />
      <div className='button-panel'>
        <div className='button-row'>
          <Button width={3} name='CLR' colorClass='black-button' handleClick={processButtonClick} />
          <Button width={3} name='(' colorClass='black-button' handleClick={processButtonClick} />
          <Button width={3} name=')' colorClass='black-button' handleClick={processButtonClick} />
          <Button width={3} name='/' colorClass='grey-button' handleClick={processButtonClick} />
        </div>
        <div className='button-row'>
          <Button width={3} name='7' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='8' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='9' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='*' colorClass='grey-button' handleClick={processButtonClick} />
        </div>
        <div className='button-row'>
          <Button width={3} name='4' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='5' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='6' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='-' colorClass='grey-button' handleClick={processButtonClick} />
        </div>
        <div className='button-row'>
          <Button width={3} name='1' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='2' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='3' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='+' colorClass='grey-button' handleClick={processButtonClick} />
        </div>
        <div className='button-row'>
          <Button width={6} name='0' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='.' colorClass='white-button' handleClick={processButtonClick} />
          <Button width={3} name='=' colorClass='grey-button' handleClick={processButtonClick} />
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