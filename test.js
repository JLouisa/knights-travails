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
    nextPosX1: 1.2,  (+2, +1)
    nextPosX2: null, (+2, -1)
    nextPosY1: 2.1,  (+1, +2)
    nextPosY2: null, (-1, +2)
    nextNegY1: null, (+1, -2)
    nextNegX1: null, (-2, +1)
    nextNegX2: null, (-2, -1)
    nextNegY2: null, (-1, -2)
    previous: 0.0,
}
*/

//! Compare coordinates
const compareCoor = (coor1, coor2) => {
  return coor1[0] === coor2[0] && coor1[1] === coor2[1];
};

//! Create gameBoard Coordinate
class Node {
  constructor(coord) {
    this.coord = coord;
    this.savedPiece = null;
    this.leftNode = null;
    this.rightNode = null;
    this.prevNode = null;
    this.nextMoves = {
      nextPosX1: calcNextCoord(coord, posX1),
      nextPosX2: calcNextCoord(coord, posX2),
      nextPosY1: calcNextCoord(coord, posY1),
      nextPosY2: calcNextCoord(coord, posY2),
      nextNegX1: calcNextCoord(coord, negX1),
      nextNegX2: calcNextCoord(coord, negX2),
      nextNegY1: calcNextCoord(coord, negY1),
      nextNegY2: calcNextCoord(coord, negY2),
    };
  }
}

//! Create gameBoard
class GameBoard {
  constructor(arr) {
    this.root = "Head";
    this.leftNode = null;
    this.rightNode = null;
    this.prevNode = null;
    this.coor = this.createChessBlocks(arr);
  }
}

//! Create coordinate Array
const createGameCoord = (arrXY) => {
  let newArr = [];
  arrXY.forEach((coordX) => {
    arrXY.forEach((coordY) => {
      let nodeXY = [coordX, coordY];
      newArr.push(nodeXY);
    });
  });
  return newArr;
};

//! Build BST
function buildTree(arr, beginIndex, lastIndex) {
  if (beginIndex > lastIndex) {
    return null;
  } else {
    const mid = Number(Math.floor((beginIndex + lastIndex) / 2));
    const node = new Node(arr[mid]);
    node.leftNode = buildTree(arr, beginIndex, mid - 1);
    node.rightNode = buildTree(arr, mid + 1, lastIndex);
    return node;
  }
}

//! Gameboard Coordinates
const coorXY = [0, 1, 2, 3, 4, 5, 6, 7];

//! Delta neighbour Coordinates
const posX1 = [2, 1];
const posX2 = [2, -1];
const posY1 = [1, 2];
const posY2 = [-1, 2];
const negX1 = [-2, 1];
const negY1 = [1, -2];
const negX2 = [-2, -1];
const negY2 = [-1, -2];

//! Calculate Next Coordinate
function calcNextCoord(pos, deltaXY) {
  const newPos = [pos[0] + deltaXY[0], pos[1] + deltaXY[1]];
  return newPos[0] < 0 || newPos[0] > 7 || newPos[1] < 0 || newPos[1] > 7 ? null : newPos;
}

const boardCoords = [...createGameCoord(coorXY)];
// const linkedBoard = buildTree(boardCoords, 0, boardCoords.length - 1);
// console.log(linkedBoard);

const headNode = new Node(boardCoords[27]);
console.log(headNode);

// console.log((test = new Node([2, 1])));
