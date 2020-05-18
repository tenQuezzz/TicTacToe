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

const createPlayer = (name, mark) => {
  return { name, mark };
}

const gameController = (function () {
  const playerOne = createPlayer('Artyom', 'X');
  const playerTwo = createPlayer('Cooler Artyom', 'O');
  let currentPlayer = playerOne;

  function renderGrid() {
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const boardItem = document.createElement('div');
        boardItem.setAttribute('id', `"${i} ${j}"`);
        boardItem.setAttribute('class', 'item');
        boardItem.textContent = gameBoard.getMarkAtPos(i, j);
        container.appendChild(boardItem);
      }
    }
    document.body.appendChild(container);
    document.querySelectorAll('div .item').forEach(button => {
      button.addEventListener('click', handleUserMove);
    });
  }

  function toggleCurrentPlayer() {
    if (currentPlayer.mark == playerOne.mark) {
      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    }
  }

  function handleUserMove() {
    let [x, y] = this.id.replace(/"/g, "").split(' ');
    x = Number(x);
    y = Number(y);
    gameBoard.putMark(x, y, currentPlayer.mark);
    this.textContent = currentPlayer.mark;
    toggleCurrentPlayer();
  }
  return { renderGrid };
})();

gameController.renderGrid();