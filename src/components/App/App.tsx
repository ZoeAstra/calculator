import React, { ReactElement, useState } from 'react';
import Display from '../Display/Display';
import './App.css';
import Button from '../Button/Button'
// import DisplayAdapter from '../../code/DisplayAdapter';
import { TokenList } from '../../code/TokenList';
import { Token } from '../../code/Token';
import { Parser, Operator, ParserError } from '../../code/PrattParser';

class CalcParser extends Parser<number> {
  constructor(tokens: TokenList) {
    super(tokens)

    this.bindingGroups = [[")"],["Number","("],["+","-"],["*","/"],["^"]]
    this.calculateBindingPowers()

    this.addPrefixOperator("Number", new Operator((parser:Parser<number>, operand:number) => { 
      return parser.tokens.getCurrentToken().value 
    }
    ))
    this.addPrefixOperator("-", new Operator((parser:Parser<number>, operand:number) => { 
      let right = parser.parse(parser.bindingPower({name:"-", value:"-"}))
      return -right 
    }
    ))
    this.addPrefixOperator("(", new Operator((parser:Parser<number>, operand:number) => { 
      let right = parser.parse(parser.bindingPower({name:"(", value:"("}))
      if (parser.tokens.peek().name !== ")") {
        throw new ParserError("Error: Expected token ')'", parser.tokens.getPosition()+1)
      }
      parser.tokens.consume()
      return right
    }
    ))
    this.addBinaryOperator("+", new Operator(
      function evaluate(parser:Parser<number>, leftOperand:number): number { 
        let rightOperand = parser.parse(parser.bindingPower({name:"+", value:"+"}))
        return leftOperand + rightOperand 
      }
    ))
    this.addBinaryOperator("-", new Operator(
      function evaluate(parser:Parser<number>, leftOperand:number): number { 
        let rightOperand = parser.parse(parser.bindingPower({name:"-", value:"-"}))
        return leftOperand - rightOperand 
      }
    ))
    this.addBinaryOperator("*", new Operator(
      function evaluate(parser:Parser<number>, leftOperand:number): number { 
        let rightOperand = parser.parse(parser.bindingPower({name:"*", value:"*"}))
        return leftOperand * rightOperand 
      }
    ))
    this.addBinaryOperator("/", new Operator(
      function evaluate(parser:Parser<number>, leftOperand:number): number { 
        let rightOperand = parser.parse(parser.bindingPower({name:"/", value:"/"}))
        return leftOperand / rightOperand 
      }
    ))
    
  }
}


function App(): ReactElement {
  const [displayLeftSide, setDisplayLeftSide] = useState("")
  const [displayRightSide, setDisplayRightSide] = useState("")
  const [tokenList, setTokenList] = useState(new TokenList())

  const collapseNumbers = (tokens:Token[]): Token[] => {
    for (let index in tokens) {
        if (tokens[index].name === "Number" || tokens[index].name === '.') {
            while (tokens[Number(index)+1] && 
                    (tokens[Number(index)+1].name === "Number" || 
                    tokens[Number(index)+1].name === '.')) {
                tokens[index].value = tokens[index].value.toString() + tokens[Number(index)+1].value.toString()
                tokens.splice(Number(index)+1,1)
            }
        }
    }
    return tokens.map((val, index, arr) => {
        if (val.name === "Number") val.value = Number(val.value)
        return val
    })
  }

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
          let prev = tokenList.getPosition()
          tokenList.setPosition(0)
          let parser = new CalcParser(tokenList)
          try {
            newTokenList.setTokens(collapseNumbers(newTokenList.getTokens()))
            let result = parser.parse(0)
            newTokenList.clear()
            newTokenList.addToken({name: "Number", value: result})
            setDisplayLeftSide(newTokenList.getLeftSide())
            setDisplayRightSide(newTokenList.getRightSide())
            setTokenList(newTokenList)
          } catch (error) {
            tokenList.setPosition(prev)
            console.error(error)
            if (error instanceof ParserError) {
              alert(error.message + ` at position ${error.position.toString()}`)
            } else if (error instanceof Error) {
              alert(error.message)
            }
            //eventual more error handling... probably a positioned non-modal popup/tooltip.
          }
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
    <div role='main' className='app'>
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