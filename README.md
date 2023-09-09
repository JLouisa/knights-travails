# knights-travails

# Knight Travails

Knight Travails is a JavaScript project that helps you find the shortest path for a knight on a chessboard to move from one position to another. It utilizes a Binary Search Tree (BST) structure to efficiently search for the shortest path and visualize the results.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Functionality](#functionality)
- [Contributing](#contributing)
- [License](#license)

## Installation

Clone the repository to your local machine using the following command:
git clone https://github.com/jLouisa/knight-travails.git

No additional dependencies are required for this project.

## Usage

1. Open the project in your preferred JavaScript environment (Node.js, browser console, etc.).
2. Run the code to create the chessboard and BST structure.
3. Call the `knightMoves(root, dist)` function, where `root` is the starting position and `dist` is the destination position. The function will return the shortest path and display it in the console.

Example:
knightMoves([0, 0], [4, 1]);

## Functionality

### Coordinate Comparison and Validation

- `compareCoor(coor1, coor2)`: Compares two coordinates for equality.
- `invalidInput(coord1, coord2)`: Checks if the input coordinates are valid for a chessboard.

### Binary Search Tree (BST)

- `Node` class: Represents a node in the BST with chessboard coordinates, saved piece information, and references to left and right child nodes.
- `GameBoard` class: Creates the chessboard and builds the BST structure to efficiently search for coordinates.

### Knight Moves

- `knightMoves(root, dist)`: Finds the shortest path for a knight to move from the root position to the destination position on the chessboard.

### Helper Functions

- `createGameCoord(arrXY)`: Generates an array of all possible chessboard coordinates.
- `buildTree(arr, beginIndex, lastIndex)`: Builds the BST from the array of coordinates.
- `calcNextCoord(pos, deltaXY)`: Calculates the next coordinate based on the current position and a delta array.
- `prettyPrint(node, prefix, isLeft)`: Visualizes the BST structure in the console.
- `findArray(find, list)`: Searches for an array within a list of arrays.
- `convert2Num(arr)`: Converts string-ed arrays to number arrays.

#### License

This project is licensed under the MIT License - see the LICENSE file for details.
