import {Token} from './Token';

/**
 * Class to encapsulte all the more complex functionalities required for the 
 * handling of tokens in Pratt Parsing.
 */
export class TokenList {
    private position:number = 0
    private list:Token[] = []

    constructor() {
        this.position = this.length
    }
    
    public get length() : number {
        return this.list.length
    }

    left() { this.position-- }

    right() { this.position++ }

    setPosition(num:number) { this.position = num }

    getPosition() { return this.position }

    clear() { this.list = [] }

    addToken(token:Token) {
        this.list.splice(this.position, 0, token)
        this.right()
    }

    peek():Token {
        return this.list[this.position]
    }

    consume():Token {
        return this.list[this.position++]
    }

    getCurrentToken():Token {
        return this.list[this.position-1]
    }

    getLeftSide(): string {
        if (this.position === 0) return ''
        if (this.list.length === 0) return ''
        return this.list
            .slice(0, this.position)
            .map((val, index, arr) => val.value.toString())
            .reduce((prev, curr, index, arr) => prev + curr)
    }

    getRightSide(): string {
        if (this.list.length === 0) return ''
        if (this.list.slice(this.position).length === 0) return ''
        return this.list
            .slice(this.position)
            .map((val, index, arr) => val.value.toString())
            .reduce( (prev, curr, index, arr) => prev + curr)
    }

    getTokens(): Token[] { 
        return this.list 
    }

    setTokens(tokens:Token[]) {
        this.list = tokens
    }
}

