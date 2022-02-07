# query-language-parser

## Example Query

```
author:=dustin.wheeler OR assignee:=dustin.wheeler
```

## Grammar

```
query: predicate ((T_AND | T_OR) predicate)*
predicate: T_ID ':' T_OPERATOR T_ID | '(' query ')'
```