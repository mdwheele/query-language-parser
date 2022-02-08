# query-language-parser

This library can be used to build an Abstract Syntax Tree from query language. This AST can then be used to 
filter a collection of data using either the `SimpleFilterer` interpreter built into the package OR through 
implementation of your own interpreter!

### Query Language

```js
const query = '(type:=fruit AND weight:=0.75) OR (type:=meat AND weight:>1) OR name:=tilapia'
```

**Grammar**

```
query: predicate ((T_AND | T_OR) predicate)*
predicate: T_ID ':' T_OPERATOR T_ID | '(' query ')'
```

### Generating an AST 

```js
const { ast } = require('query-language-parser')

const root = ast(query)
```

```
  ├─ left
  │  ├─ left
  │  │  ├─ left
  │  │  │  ├─ left: type
  │  │  │  ├─ op: =
  │  │  │  └─ right: fruit
  │  │  ├─ op: AND
  │  │  └─ right
  │  │     ├─ left: weight
  │  │     ├─ op: =
  │  │     └─ right: 0.75
  │  ├─ op: OR
  │  └─ right
  │     ├─ left
  │     │  ├─ left: type
  │     │  ├─ op: =
  │     │  └─ right: meat
  │     ├─ op: AND
  │     └─ right
  │        ├─ left: weight
  │        ├─ op: >
  │        └─ right: 1
  ├─ op: OR
  └─ right
      ├─ left: name
      ├─ op: =
      └─ right: tilapia
```

### Filtering Data

```js
const { filter } = require('query-language-parser')

const groceries = [
  { type: 'fruit', weight: 0.75, name: 'grapefruit' },
  { type: 'fruit', weight: 0.5, name: 'apple' },
  { type: 'vegetable', weight: 1.5, name: 'cucumber' },
  { type: 'vegetable', weight: 0.74, name: 'squash' },
  { type: 'meat', weight: 0.5, name: 'hamburger' },
  { type: 'meat', weight: 1.1, name: 'chicken' },
  { type: 'fish', weight: 2.1, name: 'tilapia' },
]

filter(query, groceries)
```

```
[
  { type: 'fruit', weight: 0.75, name: 'grapefruit' },
  { type: 'meat', weight: 1.1, name: 'chicken' },
  { type: 'fish', weight: 2.1, name: 'tilapia' }
]
```