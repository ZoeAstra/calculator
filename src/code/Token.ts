/**
 * Represents a token in terms of Pratt Parsing. While a normal array of strings would also work, 
 * it requires inelegant special handling of number literals in the parser implementation, due 
 * to having infinite variations of things that can be called a "number."
 */
export interface Token {
    name: string,
    value: any
}