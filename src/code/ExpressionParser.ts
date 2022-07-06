
// const tokenize = (tokens:string[]) => {
//     let tokenized:Token[] = []
//     for (let token of tokens) {
//         //Simple check to see if it's a number. If so, it is a LiteralToken.
//         if (!isNaN(Number(token))) {
//             tokenized.push(new LiteralToken(Number(token)))
//         } else {
//             //NaN so check everything else...
//             switch (token) {
//                 case "":
                    
//                     break;
            
//                 default:
//                     break;
//             }
//         }
//     }
// }

export function parse(tokens:string[]): {result:number, error:string} {
    const parser = new Parser()
    let result = parser.parse(tokens, 0)
    let error =  ""
    return {result, error}
}

// export interface Node {
//     name(): string
//     parse(): Node
//     evaluate(): number
// }

// export class LiteralNode implements Node {
//     constructor(private value:number) { }
//     name(): string {
//         return 'number'
//     }
//     evaluate(): number {
//         return this.value
//     }
// }

// export class OperatorNode implements Node {
//     constructor(private operator:string, 
//                 private leftNode:Node, 
//                 private rightNode:Node,
//                 private associativity: "left" | "right" ) { }
//     name(): string {
//         return this.operator
//     }
//     parse(parser:Parser, ): Node {
        
//     }
//     evaluate(): number {
//         // if (typeof this.leftNode === "Node" )
//         return 0
//     }
// }
type Dictionary = { [index: string]: any }
type FunctionDictionary = { [index: string]: Function }

export class Parser {
    constructor() {
    }
    private lbp:Dictionary = {
        "+": 10,
        "-": 10,
        "*": 20,
        "/": 20
    }
    private evaluate:Dictionary = {
        "+": (left:number,right:number) => { return left + right },
        "-": (left:number,right:number) => { return left - right },
        "*": (left:number,right:number) => { return left * right },
        "/": (left:number,right:number) => { return left / right }
    }
    isNumber(token:string): boolean {
        return !isNaN(Number(token))
    }
    parse(tokens:string[], bp:number): number {
        let token = tokens.splice(0,1)
        //replace later with number checking logic, etc.
        let result = Number(token)
        while (true) {
            let lookahead = tokens[0]
            if (!lookahead) {
                break
            }
            if (bp >= this.lbp[lookahead]) {
                break
            }
            tokens.splice(0,1)
            let rhs = this.parse(tokens, this.lbp[lookahead])
            result = this.evaluate[lookahead](result,rhs)
        }
        return result
    }
}
