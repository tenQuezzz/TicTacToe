const gameBoard = (function () {
  let board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_']
  ]
  let moveCount = 0;
  const n = board.length;

  function putMark(x, y, mark) {
    if (board[x][y]) {
      if (board[x][y] != '_') return false;
      board[x][y] = mark;
      moveCount++;
      return true;
    }
  }

  function clear() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        board[i][j] = '_';
      }
    }
    moveCount = 0;
  }

  function getMarkAtPos(x, y) {
    return board[x][y];
  }

  function gameState(x, y, mark) {
    // x and y are positions of our last move, mark is X or O
    // returns X wins or O wins or DRAW or CONTINUE
    console.log(`x: ${x}`);
    console.log(`y: ${y}`);
    console.log(`mark: ${mark}`);
    console.log(`moveCount: ${moveCount}`);
    // check row
    for (let i = 0; i < n; i++) {
      if (board[x][i] != mark) break;
      if (i == n - 1) return `${mark} WINS`;
    }
    // check col
    for (let i = 0; i < n; i++) {
      if (board[i][y] != mark) break;
      if (i == n - 1) return `${mark} WINS`
    }
    // check diag
    if (x == y) {
      for (let i = 0; i < n; i++) {
        if (board[i][i] != mark) break;
        if (i == n - 1) return `{mark} WINS`
      }
    }
    // check anti diag
    if (x + y == n - 1) {
      for (let i = 0; i < n; i++) {
        if (board[i][n - i - 1] != mark) break;
        if (i == n - 1) return `{mark WINS}`
      }
    }
    if (moveCount == n * n) {
      return 'DRAW';
    }
    return 'CONTINUE';
  }

  // TODO: maybe just temporary method
  function print() {
    board.forEach((row) => {
      console.log(row.join(' '));
    })
  }

  return { putMark, getMarkAtPos, clear, print, gameState };
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
    let moveResult = gameBoard.putMark(Number(x), Number(y), currentPlayer.mark);
    if (moveResult) {
      this.textContent = currentPlayer.mark;
      const state = gameBoard.gameState(Number(x), Number(y), currentPlayer.mark);

      if (state === 'DRAW') {
        alert("It's DRAW!");
        resetGame();
      } else if (state === 'CONTINUE') {
        toggleCurrentPlayer();
      } else if (state === `${playerOne.mark} WINS`) {
        alert(`${playerOne.name} WINS!`);
        resetGame();
      } else {
        alert(`${playerTwo.name} WINS!`);
        resetGame();
      }
    }
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