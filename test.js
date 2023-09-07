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

// Starting point and Destination Input
// All stops to and including Starting point & Destination Output
// Every node === a position on the board
// Every child node === a valid move for the Knight
// Valid moves === 1 + 2 <= 7,7 || 2 + 1 <= 7,7 || 2 - 1 >= 0,0 || 1 - 2 >= 0,0
// Root of tree is starting point of Knight
// Legal moves: 0.0 <= 1.2 + 2.1 + 0.8 + 1.9 >= 7.7
// 6 branches, but need to avoid infinite

/*
x = +2x / +1y
y = +1x / +2y

Node = {
    coor: 1.2,
    savedPiece: none,
    nextPosX1: 1.2,  (+2.1)
    nextPosX2: null, (+1.9)
    nextNegX1: null, (-1.9)
    nextNegX2: null, (-2.1)
    nextPosY1: 2.1,  (+1.2)
    nextPosY2: null, (-0.8)
    nextNegY1: null, (+0.8)
    nextNegY2: null, (-1.2)
    previous: 0.0,
}
*/

const coorXY = [0, 1, 2, 3, 4, 5, 6, 7];

const nextPosX1Func = (pos) => {
  pos;
};

//! Compare coordinates
const coor1 = [0, 0];
const coor2 = [0, 1];
console.log(coor1[0] === coor2[0] && coor1[1] === coor2[1]);

//! Create gameBoard
const createBoard = (arrXY) => {
  let newArr = [];
  arrXY.forEach((elementX) => {
    arrXY.forEach((elementY) => {
      let node = [elementX, elementY];
      newArr.push(node);
    });
  });
  return newArr;
};

const board = createBoard(coorXY);
console.log(board);
