document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    const handleCellClick = (e) => {
      const cell = e.target;
      const cellIndex = parseInt(cell.id.replace('cell-', ''));
      if (gameBoard[cellIndex] === '' && gameActive) {
        cell.textContent = currentPlayer;
        gameBoard[cellIndex] = currentPlayer;
        checkResult();
        togglePlayer();
      }
    };
  
    const togglePlayer = () => {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };
  
    const checkResult = () => {
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (
          gameBoard[a] &&
          gameBoard[a] === gameBoard[b] &&
          gameBoard[a] === gameBoard[c]
        ) {
          announceResult(`${gameBoard[a]} wins!`);
          gameActive = false;
          return;
        }
      }
  
      if (!gameBoard.includes('')) {
        announceResult("It's a tie!");
        gameActive = false;
        return;
      }
    };
  
    const announceResult = (message) => {
      const resultMessage = document.createElement('p');
      resultMessage.textContent = message;
      document.body.appendChild(resultMessage);
    };
  
    const handleRestart = () => {
      currentPlayer = 'X';
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      cells.forEach((cell) => {
        cell.textContent = '';
      });
      const resultMessage = document.querySelector('p');
      if (resultMessage) {
        resultMessage.remove();
      }
    };
  
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });
  
    restartButton.addEventListener('click', handleRestart);
  });
  