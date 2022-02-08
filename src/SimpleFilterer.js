const { isEqual, uniqBy } = require('lodash')

class SimpleFilterer {
  constructor(ast) {
    this.node = ast
    this.data = []
  }

  /**
   * @private
   */
  visit(node) {
    const type = node.op
    
    switch(type) {
      case '=': {
        return this.data.filter(element => element[node.left] == node.right) 
      }

      case '>': {
        return this.data.filter(element => { 
          return element[node.left] > Number(node.right)
        }) 
      }

      case '<': {
        return this.data.filter(element => element[node.left] < Number(node.right)) 
      }

      case 'AND': {
        const left = this.visit(node.left)
        const right = this.visit(node.right)

        return left.filter(el => right.some(el2 => isEqual(el, el2)))
      }

      case 'OR': {
        const left = this.visit(node.left)
        const right = this.visit(node.right)

        return uniqBy([...left, ...right], 'name')
      }
    }
  }

  filter(data = []) {
    this.data = data

    return this.visit(this.node)
  }
}

module.exports = { SimpleFilterer }