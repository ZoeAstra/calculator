import { Token } from './Token';
import {TokenList} from './TokenList';

type Dictionary<T> = { [index: string]: T }
type Associativity =
| 'left'
| 'right'

export interface BinaryOperator {
    associativity:Associativity,
    evaluate:(leftOperand:number,rightOperand:number) => number
}

export interface PrefixOperator {
    parseFurther:boolean,
    evaluate:(operand:number) => number
}

export interface ParseResponse {
    result: number,
    error: string,
    errorPosition: number
}

export abstract class Parser {
    constructor() {
        this.bindingPowers = {}
    }
    public bindingGroups:string[][] = [[]]
    protected bindingPowers:Dictionary<number>
    protected binaryOperators:Dictionary<BinaryOperator> = {}
    protected prefixOperators:Dictionary<PrefixOperator> = {}

    bindingPower(token:Token) : number {
        if (token && this.bindingPowers[token.name] ) {
            return this.bindingPowers[token.name]
        }
        return 0
    }

    protected calculateBindingPowers() {
        for (let index in this.bindingGroups) {
            for (let operator of this.bindingGroups[index]) {
                this.bindingPowers[operator] = 10 * Number(index) + 9;
            }
        }
    }
    protected isNumber(token:string): boolean {
        return !isNaN(Number(token))
    }
    // protected bindingPower(token:string): number {
    //     return 
    // }
    /**
     * Adds a prefix operator to the parser. Note: Operators' binding powers must still be added via the bp property
     * @param {string} operator The corresponding string/token corresponding to the PrefixOperator that 
     *                          will be added to the parser's dictionary
     * @param {PrefixOperator} prefix The PrefixOperator that will be added to the parser's dictionary
     */
     public addPrefixOperator(operator:string, prefix:PrefixOperator) {
        this.prefixOperators[operator] = prefix
    }
    /**
     * Adds a binary operator to the parser. Note: Operators' binding powers must still be added via the bp property
     * @param {string} operator The corresponding string/token corresponding to the BinaryOperator that 
     *                          will be added to the parser's dictionary
     * @param {BinaryOperator} binary The BinaryOperator that will be added to the parser's dictionary
     */
    public addBinaryOperator(operator:string, binary:BinaryOperator) {
        this.binaryOperators[operator] = binary
    }

    parse(tokens:TokenList, bp:number = 0): number {
        let token = tokens.consume()
        let left:number
        let prefix = this.prefixOperators[token.name]
        if (!prefix){
            //error handling, eventually
        }
        if (prefix.parseFurther) {
            let right = this.parse(tokens,this.bindingPowers[token.name])
            left = prefix.evaluate(right)
        } else {
            left = prefix.evaluate(token.value)
        }
        
        while (bp < this.bindingPower(tokens.peek())) {
            token = tokens.consume()
            let binary = this.binaryOperators[token.name]
            left = binary.evaluate(left, this.parse(tokens, this.bindingPowers[token.name] - (binary.associativity === "left" ? 0 : 1) ) )
        }
        return left
    }
}
