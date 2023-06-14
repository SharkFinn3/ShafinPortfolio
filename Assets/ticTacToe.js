// Global Variables
let board;
let currentPlayer;
let isGameOver;

// Initialize the board
function initializeBoard() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  isGameOver = false;
}

// Check if the current player has won
function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    return true;
  }

  return false;
}

// Check if the board is full
function isBoardFull() {
  for (let row of board) {
    if (row.includes('')) {
      return false;
    }
  }
  return true;
}

// Make a move
function makeMove(row, col) {
  if (board[row][col] === '' && !isGameOver) {
    board[row][col] = currentPlayer;
    if (checkWin(currentPlayer)) {
      isGameOver = true;
      alert(`Player ${currentPlayer} wins!`);
    } else if (isBoardFull()) {
      isGameOver = true;
      alert("It's a tie!");
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O') {
        makeAIMove();
      }
    }
    renderBoard();
  }
}

// AI makes a move
function makeAIMove() {
  // Find available empty cells
  const emptyCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  // Choose a random empty cell
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const randomCell = emptyCells[randomIndex];
  board[randomCell.row][randomCell.col] = currentPlayer;

  if (checkWin(currentPlayer)) {
    isGameOver = true;
    alert(`Player ${currentPlayer} wins!`);
  } else if (isBoardFull()) {
    isGameOver = true;
    alert("It's a tie!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  renderBoard();
}

// Render the board
function renderBoard() {
  const boardContainer = document.getElementById('board-container');
  boardContainer.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = board[i][j];
      cell.addEventListener('click', () => makeMove(i, j));
      boardContainer.appendChild(cell);
    }
  }
}

// Initialize the game
function init() {
  initializeBoard();
  renderBoard();
}

// Start the game
init();
