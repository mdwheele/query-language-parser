const { Lexer, Token } = require('./Lexer')
const { Parser } = require('./Parser')
const { SimpleFilterer } = require('./SimpleFilterer')
const treeify = require('treeify')

describe('SimpleFilter', () => {
  test('An interpreter can be used to filter an array of objects given an AST', () => {
    const ast = getAstFrom('(type:=fruit AND weight:=0.75) OR (type:=meat AND weight:>1) OR name:=tilapia')
    const filterer = new SimpleFilterer(ast)

    const groceries = [
      { type: 'fruit', weight: 0.75, name: 'grapefruit' },
      { type: 'fruit', weight: 0.5, name: 'apple' },
      { type: 'vegetable', weight: 1.5, name: 'cucumber' },
      { type: 'vegetable', weight: 0.74, name: 'squash' },
      { type: 'meat', weight: 0.5, name: 'hamburger' },
      { type: 'meat', weight: 1.1, name: 'chicken' },
      { type: 'fish', weight: 2.1, name: 'tilapia' },
    ]

    expect(filterer.filter(groceries)).toEqual([
      { type: 'fruit', weight: 0.75, name: 'grapefruit' },
      { type: 'meat', weight: 1.1, name: 'chicken' },
      { type: 'fish', weight: 2.1, name: 'tilapia' },
    ])
  })
})

function getAstFrom(source) {
  const parser = new Parser(
    new Lexer(source)
  )

  return parser.parse()
}