//! DOM Caches
const chessboardEl = document.querySelector(".chessboard");
console.log(chessboardEl);

//! Creae ChessBoard
let board = [];
for (let i = 0; i < 64; i++) {
  board[i] = document.createElement("div");
  chessboardEl.appendChild(board[i]);
}
