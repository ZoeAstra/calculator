import React, { ReactElement, useState } from 'react';
import Display from '../Display/Display';
import './App.css';
import Button from '../Button/Button'
// import DisplayAdapter from '../../code/DisplayAdapter';
import {TokenList} from '../../code/TokenList';
import { Parser } from '../../code/ExpressionParser';

class CalcParser extends Parser {
  constructor() {
    super()
    this.bindingGroups = [["Number"],["+","-"],["*","/"]]
    this.calculateBindingPowers()
    this.addPrefixOperator("Number", {
      parseFurther: false,
      evaluate: (operand:number) => { return operand }
    })
    this.addPrefixOperator("-", {
      parseFurther: true,
      evaluate: (operand:number) => { return -operand }
    })
    this.addBinaryOperator("+", {
      associativity: "left",
      evaluate: (leftOperand:number, rightOperand:number) => { return leftOperand + rightOperand }
    })
    this.addBinaryOperator("-", {
      associativity: "left",
      evaluate: (leftOperand:number, rightOperand:number) => { return leftOperand - rightOperand }
    })
    this.addBinaryOperator("*", {
      associativity: "left",
      evaluate: (leftOperand:number, rightOperand:number) => { return leftOperand * rightOperand }
    })
    this.addBinaryOperator("/", {
      associativity: "left",
      evaluate: (leftOperand:number, rightOperand:number) => { return leftOperand / rightOperand }
    })
  }
}

function App(): ReactElement {
  const [displayLeftSide, setDisplayLeftSide] = useState("")
  const [displayRightSide, setDisplayRightSide] = useState("")
  const [tokenList, setTokenList] = useState(new TokenList())

  const processButtonClick = (name: string) => {
    let newTokenList = tokenList

    if (!isNaN(Number(name))) {
      newTokenList.addToken({name: "Number", value: Number(name)})
      setDisplayLeftSide(newTokenList.getLeftSide())
      setDisplayRightSide(newTokenList.getRightSide())
      setTokenList(newTokenList)

    } else {
      switch (name) {

        case "=":
          let parser = new CalcParser()
          tokenList.setPosition(0)
          let result = parser.parse(tokenList,0)
          newTokenList.clear()
          newTokenList.addToken({name: "Number", value: result})
          setDisplayLeftSide(newTokenList.getLeftSide())
          setDisplayRightSide(newTokenList.getRightSide())
          setTokenList(newTokenList)
          break

        case "CLR":
          newTokenList.clear()
          setDisplayLeftSide(newTokenList.getLeftSide())
          setDisplayRightSide(newTokenList.getRightSide())
          setTokenList(newTokenList)
          break
          
        default:
          newTokenList.addToken({name: name, value: name})
          setDisplayLeftSide(newTokenList.getLeftSide())
          setDisplayRightSide(newTokenList.getRightSide())
          setTokenList(newTokenList)
          break
      }
      
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