//! Compare coordinates
// Can compare string to numbers also because
// Object.key returns strings
const compareCoor = (coor1, coor2) => {
  if (+coor1[0] === +coor2[0] && +coor1[1] === +coor2[1]) {
    return true;
  } else return false;
};

//! This is to compare and traverse the tree easier (arg1 > arg2)
//Compare which coordinate is bigger to traverse the BST
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
  // Use to find coordinates in the BST and return the node
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
//Creates the board 8x8 with one array
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
// Using this algorithm to add neighbour Moves for the nodes
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
//! Initialize the tree in the console
// prettyPrint(linkedBoard.root);

//! Initialize the board Coordinates
const boardCoords = [...createGameCoord(coorXY)];

//! Initialize the BST tree
const linkedBoard = new GameBoard(boardCoords);

const list = linkedBoard.find(linkedBoard.root, [0, 0]);

//! Find Coordinates in an Array
// This will help find a coordinates (which is an array)
// in a list of arrays
function findArray(find, list) {
  const exists = list.some((item) => JSON.stringify(item) === JSON.stringify(find));
  if (exists) {
    return true;
  } else {
    return false;
  }
}

//! Converted string-ed array to number array
// Used because Object.key returns strings
// While coordinates are in numbers
function convert2Num(arr) {
  arr[0] = +arr[0];
  arr[1] = +arr[1];
  return arr;
}

//! Knight Moves
// This is the main core function for the app
const knightMoves = (root, dist) => {
  let shortArr = [];
  let visitedArr = [];
  let queue = [];
  let holderArr = [];
  let temp = {};
  let temp2 = {};

  //? Initial Setup //
  // Get MovesList from root
  let movesList = linkedBoard.find(linkedBoard.root, root);
  let theList = Object.assign(movesList.nextMoves);
  // Loop over the MoveList from root to get next moves
  // and push it to the queue
  for (const key in theList) {
    if (theList[key] !== null) {
      queue.push(theList[key]);
      holderArr.push(theList[key]);
    }
  }
  temp[movesList.coord] = [...holderArr];
  temp2 = Object.assign({}, temp);
  holderArr = [];

  // Start looping through the queue
  while (queue.length > 0) {
    // Comparing the first in queue to the dist
    let current = queue.shift();

    if (compareCoor(current, dist)) {
      // Break loop after finding the dist in queue

      visitedArr.push(current);
      break;
      // If not equal, push to visisted array
    } else {
      visitedArr.push(current);
    }
    // Refilling the queue after parent is not equal to dist
    movesList = linkedBoard.find(linkedBoard.root, current);
    theList = Object.assign(movesList.nextMoves);

    for (const key in theList) {
      // To stop infinite loop by not adding key that's already been compared
      if (theList[key] !== null && !findArray(theList[key], visitedArr)) {
        queue.push(theList[key]);
        holderArr.push(theList[key]);
      }
    }
    // Create object to hold Parent Coordinates with their moves
    temp[movesList.coord] = [...holderArr];
    holderArr = [];
  }

  // Find where the coordinates came from
  let searchPoint = visitedArr.pop();
  shortArr.push(searchPoint);
  let x = false;
  while (!compareCoor(searchPoint, root)) {
    x = false;
    for (const key in temp) {
      if (x === true) {
        break;
      }
      for (const key2 in temp2) {
        if (findArray(searchPoint, temp2[key2])) {
          searchPoint = key2.split(",");
          searchPoint = convert2Num(searchPoint);
          shortArr.push(searchPoint);
          x = true;
          break;
        }
      }
      if (findArray(searchPoint, temp[key])) {
        searchPoint = key.split(",");
        searchPoint = convert2Num(searchPoint);
        shortArr.push(searchPoint);
        x = true;
        break;
      }
    }
  }
  // Return the shortArr after the loop finishes
  return shortArr.reverse();
};

// console.log(knightMoves([0, 0], [1, 2]));
// console.log(knightMoves([0, 0], [3, 3]));
// console.log(knightMoves([0, 0], [5, 4]));
// console.log(knightMoves([0, 0], [5, 7]));
// console.log(knightMoves([0, 0], [7, 7]));
console.log(knightMoves([0, 0], [7, 6]));
// console.log(knightMoves([4, 0], [7, 4]));
// console.log(knightMoves([4, 0], [4, 7]));
