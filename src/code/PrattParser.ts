import { Token } from './Token';
import { TokenList } from './TokenList';

/**
 * A simple, generic, type-restricted key-value store. Map was a bit unwieldy with the possibility of undefined returns.
 */
type Dictionary<T> = { [index: string]: T }

/**
 * Generic Operator class. Allows for custom implementation of parser operator/token-handling functionality.
 */
export class Operator<T> {
    constructor(public evaluate: (parser:Parser<T>, operand:T) => T) {}
}

/**
 * Custom error extending the normal error. It stores the position of the error in the token list. 
 */
export class ParserError extends Error{
    constructor(message:string, public position:number) {
        super(message)
    }
}

/**
 * Abstract Parser class to act as a base for a concrete parser implementation.
 */
export abstract class Parser<T> {
    constructor(public tokens:TokenList = new TokenList()) {
        this.bindingPowers = {}
    }

    public bindingGroups:string[][] = [[]]
    protected bindingPowers:Dictionary<number>
    protected binaryOperators:Dictionary<Operator<T>> = {}
    protected prefixOperators:Dictionary<Operator<T>> = {}

    /**
     * Retrieves the corresponding binding power for a Token.
     * @param {Token} token The token whose binding power is to be retrieved.
     * @returns {number} The binding power of the provided Token.
     */
    bindingPower(token:Token) : number {
        if (token && this.bindingPowers[token.name] ) {
            return this.bindingPowers[token.name]
        }
        return 0
    }

    /**
     * Calculates the binding powers based on what is in the binding power groups. That way specific 
     * numbers need not be bothered with, just relative position in the order of operations.
     */
    protected calculateBindingPowers() {
        for (let index in this.bindingGroups) {
            for (let operator of this.bindingGroups[index]) {
                this.bindingPowers[operator] = 10 * Number(index) + 9
            }
        }
    }

    /**
     * Adds a prefix operator to the parser. Note: Operators' binding powers must still be added via the bp property
     * @param {string} operator The corresponding string/token corresponding to the PrefixOperator that 
     *                          will be added to the parser's dictionary
     * @param {PrefixOperator} prefix The PrefixOperator that will be added to the parser's dictionary
     */
     public addPrefixOperator(operator:string, prefix:Operator<T>) {
        this.prefixOperators[operator] = prefix
    }

    /**
     * Adds a binary operator to the parser. Note: Operators' binding powers must still be added via the bp property
     * @param {string} operator The corresponding string/token corresponding to the BinaryOperator that 
     *                          will be added to the parser's dictionary
     * @param {BinaryOperator} binary The BinaryOperator that will be added to the parser's dictionary
     */
    public addBinaryOperator(operator:string, binary:Operator<T>) {
        this.binaryOperators[operator] = binary
    }

    /**
     * Sets the value of the parser's TokenList, which is first set in the parser's constructor.
     * @param {TokenList} tokens The TokenList to set parser's TokenList to.
     */
    public setTokens(tokens: TokenList) {
        this.tokens = tokens
    }

    /**
     * Parses the token list of the parser. 
     * @param {number} bp The binding power that the parser should start at. Defaults to 0, and should be 
     *                    when being called for the first time.
     * @returns {T} The response object encapsulating the result and any errors that occurred
     */
    parse(bp:number = 0): T {
        let token = this.tokens.consume()
        let prefix = this.prefixOperators[token.name]

        if (!prefix){
            throw new ParserError(`Error: Unexpected token '${token.name}'.`, this.tokens.getPosition()-1)
        }

        let left:T = prefix.evaluate(this, token.value)

        while (bp < this.bindingPower(this.tokens.peek())) {
            token = this.tokens.consume()

            let binary = this.binaryOperators[token.name]

            if (!binary){
                throw new ParserError(`Error: Unexpected token '${token.name}'.`, this.tokens.getPosition()-1)
            }

            left = binary.evaluate(this, left)
        }
        return left
    }
}
