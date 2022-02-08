# query-language-parser

This library can be used to build an Abstract Syntax Tree from query language. This AST can then be used to 
filter a collection of data using either the `SimpleFilterer` interpreter built into the package OR through 
implementation of your own interpreter!

## Example Query

```
(type:=fruit AND weight:=0.75) OR (type:=meat AND weight:>1) OR name:=tilapia
```

## Grammar

```
query: predicate ((T_AND | T_OR) predicate)*
predicate: T_ID ':' T_OPERATOR T_ID | '(' query ')'
```