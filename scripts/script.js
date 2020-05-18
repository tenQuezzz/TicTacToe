// Board
// put mark at specific cell
// clean board (put '_' in all places)
const gameBoard = (function () {
  let board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_']
  ]

  function putMark(x, y, mark) {
    if (board[x][y]) {
      if (board[x][y] != '_') return;
      board[x][y] = mark;
    }
  }

  function clear() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        board[i][j] = '_';
      }
    }
  }

  function getMarkAtPos(x, y) {
    return board[x][y];
  }
  // TODO: maybe just temporary method
  function print() {
    board.forEach((row) => {
      console.log(row.join(' '));
    })
  }

  return { putMark, getMarkAtPos, clear, print };
})();


