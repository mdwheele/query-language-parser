function Token(type, value) {
  return { type, value }
}

class Lexer {
  constructor(source = '') {
    this.source = source
    this.position = 0
    this.current = this.source[this.position]
  }

  tokens() {
    let token
    const tokens = []

    while (token = this.next()) {
      if (token.type === 'EOF') {
        tokens.push(token)
        break
      }

      tokens.push(token)
    }

    return tokens
  }

  next() {
    while (this.current != null) {
      if (this.isWhitespace()) {
        this.skipWhitespace()
        continue
      }

      if (this.peek(3) === 'AND') {
        this.advance(3)
        return Token('AND')
      }

      if (this.peek(2) === 'OR') {
        this.advance(2)
        return Token('OR')
      }

      if (this.current === ':') {
        this.advance()
        return Token('SEPARATOR', ':')
      }

      if (this.current === '=') {
        this.advance()
        return Token('OP', '=')
      }

      if (this.peek(2) === '!=') {
        this.advance(2)
        return Token('OP', '!=')
      }

      if (this.current === '(') {
        this.advance()
        return Token('LPAREN')
      }

      if (this.current === ')') {
        this.advance()
        return Token('RPAREN')
      }

      if (this.isIdCharacter()) {
        return Token('ID', this.id())
      }

      break
    }

    return Token('EOF')
  }
  
  /**
   * @private
   */
  advance(num = 1) {
    this.position += num
    
    if (this.position > this.source.length) {
      this.current = null
    } else {
      this.current = this.source[this.position]
    }
  }

  /**
   * @private
   */
  isWhitespace() {
    return this.current && this.current.match(/[\n\r\t\s]/) != null
  }

  /**
   * @private
   */
  skipWhitespace() {
    while (this.current !== null && this.isWhitespace()) {
      this.advance()
    }
  }

  /**
   * @private
   */
  isIdCharacter() {
    return this.current && this.current.match(/[a-zA-Z0-9\.]/) != null
  }

  /**
   * @private
   */
  id() {
    let result = ''

    while(this.current !== null) {
      if (!this.isIdCharacter()) {
        break
      }

      result = result + this.current
      this.advance()
    }
    
    return result
  }

  /**
   * @private
   */
  peek(lookahead) {
    if (this.position + lookahead > this.source.length) {
      return null
    }

    return this.source.slice(this.position, this.position + lookahead)
  }
}

module.exports = { Lexer, Token }