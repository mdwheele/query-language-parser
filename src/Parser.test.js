const { Lexer, Token } = require('./Lexer')
const { Parser } = require('./Parser')
const treeify = require('treeify')

describe('Parser', () => {
  test('A parser creates an AST from an array of Tokens produced by the Lexer', () => {
    const lexer = new Lexer('author:=banana OR assignee:=orange')
    const parser = new Parser(lexer)

    const ast = parser.parse()

    expect(ast.op).toBe('OR')

    expect(ast.left.left).toBe('author')
    expect(ast.left.op).toBe('=')
    expect(ast.left.right).toBe('banana')
    
    expect(ast.right.left).toBe('assignee')
    expect(ast.right.op).toBe('=')
    expect(ast.right.right).toBe('orange')
  })

  test('The parser correctly places groupings lower in the AST', () => {
    const lexer = new Lexer('field:=foo OR (field:=bar AND field:=baz)')
    const parser = new Parser(lexer)

    const ast = parser.parse()

    expect(ast.op).toBe('OR')
    expect(ast.right.op).toBe('AND')
  })
})