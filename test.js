const arrX = [0, 1, 2];
const arrY = [0, 1, 2];

const visualize = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

/*
Question:
Hey i'm asking about the knight travails project, 
do we need to implement a graph? Because the lesson 
just gave a single article on the data structure and 
i don't think I can implement it with that little info, 
or should I just do my own research on graphs?

Answer:
There's more than one way to represent a graph, 
you don't need your graph to be real `nodes` and `vertices`, 
you just need a way to treat your data in such a way that it's `nodes` and `vertices`.
For example a 2X2 array can represent the following graph:
```js
0---0
| X |
0---0
```
a graph where every square is connected, 
for example [0][0] is a node that's connected to those nodes (and vice versa):
```js
[0][0] -> [0][1]
 |     \
 V      V
[1][0]   [1][1]
```

In the end is all about how **you** work with your data.
*/
