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
  let playerOne = null;
  let playerTwo = null;
  let currentPlayer = null;

  function initGame() {
    name = prompt('Player1, please your name: ');
    playerOne = createPlayer(name, 'X');
    name = prompt('Player2, please your name: ')
    playerTwo = createPlayer(name, 'O');
    currentPlayer = playerOne;
  }

  function renderCell(x, y) {
    const cell = document.createElement('div');
    cell.setAttribute('id', `"${x} ${y}"`);
    cell.setAttribute('class', 'item');
    cell.textContent = gameBoard.getMarkAtPos(x, y);
    return cell;
  }

  function renderGrid() {
    initGame();
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cell = renderCell(i, j);
        container.appendChild(cell);
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
    gameBoard.putMark(Number(x), Number(y), currentPlayer.mark);
    this.textContent = currentPlayer.mark;
    toggleCurrentPlayer();
  }

  function clearUI() {
    gameBoard.clear();
    const board = document.querySelector('.container');
    board.parentElement.removeChild(board);
  }

  function resetGame() {
    currentPlayer = null;
    playerOne = null;
    playerTwo = null;
    clearUI();
    renderGrid();
  }


  return { renderGrid, resetGame };
})();

gameController.renderGrid();