// import {TokenList} from './TokenList';

// class DisplayAdapter{

//     private tokens:TokenList = new TokenList([])
//     private cursorPosition: number = 0

//     contstructor(token: string) {
//         this.tokens
//     }

//     addToken(token: string) {
//         this.tokens.splice(this.cursorPosition, 0, token)
//         this.cursorPosition++
//     }

//     backspace() {
//         if (this.cursorPosition > 0) {
//             this.tokens.splice(this.cursorPosition-1, 1)
//         }
//     }

//     delete() {
//         if (this.cursorPosition < this.tokens.length) {
//             this.tokens.splice(this.cursorPosition, 1)
//         }
//     }

//     left() { this.cursorPosition-- }

//     right() { this.cursorPosition++ }

//     clear() { this.tokens = [] }

//     getLeftSide(): string {
//         if (this.tokens.length === 0) return ''
//         return this.tokens.slice(0, this.cursorPosition).reduce((prev, curr, index, arr) => prev + curr)
//     }

//     getRightSide(): string {
//         if (this.tokens.length === 0) return ''
//         if (this.tokens.slice(this.cursorPosition).length === 0) return ''
//         return this.tokens.slice(this.cursorPosition).reduce((prev, curr, index, arr) => prev + curr)
//     }

//     getTokens(): string[] { 
//         //must collapse all adjacent literals/numbers into one token
//         for (let index in this.tokens) {
//             if (!isNaN(Number(this.tokens[index])) || this.tokens[index] === '.') {
//                 while (!isNaN(Number(this.tokens[Number(index)+1])) || this.tokens[index] === '.') {
//                     this.tokens[index] += this.tokens[Number(index)+1]
//                     this.tokens.splice(Number(index)+1,1)
//                 }
//             }
//         }
//         return this.tokens 
//     }

//     setTokens(tokens:string[]) {
//         this.tokens = tokens
//     }
// }

// export default DisplayAdapter
export {}