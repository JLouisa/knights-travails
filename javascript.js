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

//! Create Class
class Pieces {
  constructor(name) {
    this.name = name;
    this.position = position;
  }
}

class chessBoard {
  constructor(arrXY) {
    this.root = "Head";
  }
  createBoard(arrX, arrY) {
    arrX.array.forEach((elementX) => {
      arrY.forEach((elementY) => {
        let node = [elementX, elementY];
        this.root = node;
      });
    });
  }
}

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

const positionX = [0, 1, 2, 3, 4, 5, 6, 7];
const positionY = [0, 1, 2, 3, 4, 5, 6, 7];

let theArray = [];
for (let x of positionX) {
  for (let y of positionY) {
    theArray.push([x, y]);
  }
}

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

class Pieces {
  constructor(name) {
    this.pieceName = name;
    this.position = null;
  }
}
class Node {
  constructor(data) {
    this.data = data;
    this.leftNode = null;
    this.rightNode = null;
    this.piece = null;
  }
}
class GameBoard {
  constructor(_arr, _beginIndex, _lastIndex) {
    this.root = buildTree(_arr, _beginIndex, _lastIndex);
    this.piece = null;
  }
}

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

const knight = new Pieces("Knight");
const chessBoard = new GameBoard(theArray, 0, theArray.length - 1);

//! Visualize the tree in the console
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(chessBoard.root);

// Starting point and Destination Input
// All stops to and including Starting point & Destination Output
// Every node === a position on the board
// Every child node === a valid move for the Knight
// Valid moves === 1 + 2 <= 7,7 || 2 + 1 <= 7,7 || 2 - 1 >= 0,0 || 1 - 2 >= 0,0
// Root of tree is starting point of Knight
// Legal moves: 0.0 <= 1.2 + 2.1 + 0.8 + 1.9 >= 7.7
// 6 branches, but need to avoid infinite
