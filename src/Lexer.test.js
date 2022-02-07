const { Lexer, Token } = require('./Lexer')

describe('Lexer', () => {
  test('Empty source produces a single EOF token', () => {
    const lexer = new Lexer('')

    const tokens = lexer.tokens()

    expect(tokens.map(token => token.type)).toEqual(['EOF'])
  })

  test('A lexer processes source code to produce a set of tokens', () => {
    const lexer = new Lexer('author:=dustin.wheeler OR assignee:=dustin.wheeler')

    const tokens = lexer.tokens()

    expect(tokens).toEqual([
      Token('ID', 'author'),
      Token('SEPARATOR', ':'),
      Token('OP', '='),
      Token('ID', 'dustin.wheeler'),
      Token('OR'),
      Token('ID', 'assignee'),
      Token('SEPARATOR', ':'),
      Token('OP', '='),
      Token('ID', 'dustin.wheeler'),
      Token('EOF')
    ])
  })

  test('The lexer supports grouping operations', () => {
    const lexer = new Lexer('a:=foo OR (b:!=bar AND c:=baz)')

    const tokens = lexer.tokens()

    expect(tokens).toEqual([
      Token('ID', 'a'),
      Token('SEPARATOR', ':'),
      Token('OP', '='),
      Token('ID', 'foo'),
      Token('OR'),
      Token('LPAREN'),
      Token('ID', 'b'),
      Token('SEPARATOR', ':'),
      Token('OP', '!='),
      Token('ID', 'bar'),
      Token('AND'),
      Token('ID', 'c'),
      Token('SEPARATOR', ':'),
      Token('OP', '='),
      Token('ID', 'baz'),
      Token('RPAREN'),
      Token('EOF')
    ])
  })
})