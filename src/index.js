const { Lexer } = require('./Lexer')
const { Parser } = require('./Parser')
const { SimpleFilterer } = require('./SimpleFilterer')

function ast(source) {
  const parser = new Parser(new Lexer(source))

  return parser.parse()
}

function filter(query, data = []) {
  if (data.length === 0) {
    return []
  }

  const filterer = new SimpleFilterer(ast(query))

  return filterer.filter(data)
}

module.exports = {
  Lexer,
  Parser,
  ast,
  filter
}