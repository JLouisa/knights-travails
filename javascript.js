// //! DOM Caches
// const chessboardEl = document.querySelector(".chessboard");

// //! Creae ChessBoard
// let board = [];
// for (let i = 0; i < 64; i++) {
//   board[i] = document.createElement("div");
//   board[i].classList.add(`box`);
//   board[i].classList.add(`num${i}`);

//   chessboardEl.appendChild(board[i]);
// }

// //! Create Knight
// function theKnight() {
//   const knight = document.createElement("img");
//   knight.src = "./images/knight(1).png";
//   board[35].appendChild(knight);
// }
// theKnight();

// const gameBoardDown = (x, y) => {
//   if (x < 0 || x > 7) return;
//   return gameBoard(x - 1, y - 2) + gameBoard(x - 2, y - 1);
// };
// const gameBoardUp = (x, y) => {
//   if (x > 7 || y > 7) return;
//   return gameBoard(x + 1, y + 2) + gameBoard(x + 2, y + 1);
// };

// const fastestWay = (a, b) => {
//   return Math.min(gameBoardDown(), gameBoardUp());
// };

//Create 1 tree from arrX and arrY
//Create balanced tree from arrXY

/* theArray = 
[
  [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ],
  [ 0, 5 ], [ 0, 6 ], [ 0, 7 ], [ 1, 0 ], [ 1, 1 ],
  [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 1, 6 ],
  [ 1, 7 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ],
  [ 2, 4 ], [ 2, 5 ], [ 2, 6 ], [ 2, 7 ], [ 3, 0 ],
  [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ],
  [ 3, 6 ], [ 3, 7 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ],
  [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 4, 6 ], [ 4, 7 ],
  [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ],
  [ 5, 5 ], [ 5, 6 ], [ 5, 7 ], [ 6, 0 ], [ 6, 1 ],
  [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 6, 6 ],
  [ 6, 7 ], [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ],
  [ 7, 4 ], [ 7, 5 ], [ 7, 6 ], [ 7, 7 ]
]
*/
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
  if (coor1[0] === coor2[0] && coor1[1] === coor2[1]) {
    return true;
  } else return false;
};

//! This is to compare and traverse the tree easier (arg1 > arg2)
const biggerCoord = (coor1, coor2) => {
  if (coor1[0] > coor2[0]) {
    return true;
  } else if (coor1[0] < coor2[0]) {
    return false;
  } else if (coor1[0] === coor2[0]) {
    if (coor1[1] > coor2[1]) {
      return true;
    } else {
      return false;
    }
  }
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
    this.coord = "Head";
    this.root = buildTree(arr, 0, arr.length - 1);
  }
  find(root, crd) {
    if (root === null) {
      return null;
    }
    if (compareCoor(root.coord, crd)) {
      return root;
    }
    if (biggerCoord(crd, root.coord)) {
      return this.find(root.rightNode, crd);
    } else {
      return this.find(root.leftNode, crd);
    }
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

//! Visualize the tree in the console
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.coord}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const boardCoords = [...createGameCoord(coorXY)];
const linkedBoard = new GameBoard(boardCoords);
console.log(linkedBoard);

prettyPrint(linkedBoard.root);
const list = linkedBoard.find(linkedBoard.root, [0, 0]);
console.log(list);

function findArray(find, list) {
  const exists = list.some((item) => JSON.stringify(item) === JSON.stringify(find));
  if (exists) {
    console.log("Array exists in the list.");
    return true;
  } else {
    console.log("Array does not exist in the list.");
    return false;
  }
}

//! knight Moves
const knightMoves = (root, dist) => {
  // If no path is found, return an empty array to indicate no path exists
  return [];
};

console.log(knightMoves([0, 0], [1, 2]));
