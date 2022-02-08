class Node {
  constructor(op, left, right) {
    this.left = left
    this.op = op
    this.right = right
  }
}

class Parser {
  /**
   * @param {import('./Lexer').Lexer} lexer 
   */
  constructor(lexer) {
    this.lexer = lexer
    this.current = this.lexer.next()
  }

  eat(type) {
    if (this.current.type == type) {
      this.current = this.lexer.next()
    } else {
      throw new Error(`ParseException: Unexpected token ${type}.`)
    }
  }

  parse() {
    return this.query()
  }

  query() {
    // predicate ((T_AND | T_OR) predicate)*
    let node = this.predicate()

    while (['AND', 'OR'].includes(this.current.type)) {
      const op = this.current.type
      this.eat(this.current.type)
      node = new Node(op, node, this.predicate())
    }

    return node
  }

  predicate() {
    // T_ID ':' T_OPERATOR T_ID | '(' query ')'
    if (this.current.type === 'ID') {
      const left = this.current.value
      this.eat('ID')
      this.eat('SEPARATOR')
      const op = this.current.value
      this.eat('OP')
      const right = this.current.value
      this.eat('ID')

      return new Node(op, left, right)
    } else if (this.current.type === 'LPAREN') {
      this.eat('LPAREN')
      const node = this.query()
      this.eat('RPAREN')
      return node
    }
  }
}

module.exports = { Parser }