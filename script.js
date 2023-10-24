// function game() {
//     const startGame = document.getElementById('game');
//     const startGameBtn = document.getElementById('start-game-btn');
//     const winnerDisplay = document.getElementById('winner-display');
//     startGameBtn.addEventListener('click', () => {
//         startGame.style.display = 'block';
//         startGameBtn.style.display = 'none';
//     });
//     let currentPlayer = 'X';
//     let gameWon = false;

//     // An array of all possible winning combinations for the game board
//     const winningCombinations = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];

//     // A function that checks if a player has won the game
//     function checkWinningCombination(player) {
//         return winningCombinations.some(combination => {
//             return combination.every(index => {
//                 return gameBoardArray[index].textContent === player;
//             });
//         });
//     }
//     function checkTieCondition() {
//         return gameBoardArray.every(item => {
//             return item.classList.contains('clicked');
//         });
//     }

//     const gameBoard = document.querySelectorAll('#gameBoard .square');
//     const gameBoardArray = Array.from(gameBoard);
//     //checking clicked boxes
//     gameBoardArray.forEach((item) => {
//         item.addEventListener('click', () => {
//             if (!item.classList.contains('clicked') && !gameWon) {
//                 item.textContent = currentPlayer;
//                 item.classList.add('clicked');
//                 if (checkWinningCombination(currentPlayer)) {
//                     winnerDisplay.textContent = `${currentPlayer} wins! Restart the game to play again.`;
//                     gameWon = true;
//                 } else if (checkTieCondition()) {
//                     winnerDisplay.textContent = `Tie game! Restart the game.`;
//                 } else {

//                     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//                 };
//             };
//         });
//     });
//     const restartBtn = document.getElementById('restart-btn');
//     restartBtn.addEventListener('click', () => {
//         startGame.style.display = 'none';
//         startGameBtn.style.display = 'block';
//         gameBoardArray.forEach((item) => {
//             item.textContent = '';
//             item.classList.remove('clicked');
//             location.reload();
//         });
//         gameWon = false;
//     });
// }
// game();






////////////////////////////////////////////////////////////////





// Gameboard module
const gameBoard = (() => {
    const squares = Array.from(document.querySelectorAll('#gameBoard .square'));

    // Private function to check for winning combinations
    const _checkWinningCombination = (player) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => {
                return squares[index].textContent === player;
            });
        });
    };

    // Private function to check for tie condition
    const _checkTieCondition = () => {
        return squares.every(square => {
            return square.classList.contains('clicked');
        });
    };

    // Public function to handle player move
    const handlePlayerMove = (player, square) => {
        if (!square.classList.contains('clicked')) {
            square.textContent = player;
            square.classList.add('clicked');
            if (_checkWinningCombination(player)) {
                return 'win';
            } else if (_checkTieCondition()) {
                return 'tie';
            } else {
                return 'continue';
            }
        }
    };

    // Public function to reset game board
    const resetGameBoard = () => {
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('clicked');
        });
    };

    return {
        handlePlayerMove,
        resetGameBoard,
    };
})();

// Player factory
const Player = (marker) => {
    let name = '';
    return {
      getName: () => name,
      setName: (newName) => {
        name = newName;
      },
      marker,
    };
  };
  
  // Game module
  const game = (() => {
    const startGame = document.getElementById('game');
    const startGameBtn = document.getElementById('start-game-btn');
    const winnerDisplay = document.getElementById('winner-display');
    const restartBtn = document.getElementById('restart-btn');
    const player1 = Player('X');
    const player2 = Player('O');
    let currentPlayer = player1;
    let gameWon = false;
  
    // Private function to switch players
    const _switchPlayers = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    // Private function to handle game over
    const _handleGameOver = (result) => {
      if (result === 'win') {
        winnerDisplay.textContent = `${currentPlayer.getName()} wins! Restart the game to play again.`;
      } else if (result === 'tie') {
        winnerDisplay.textContent = `Tie game! Restart the game.`;
      }
      gameWon = true;
    };
  
    // Event listener for start game button
    startGameBtn.addEventListener('click', () => {
      const player1NameInput = prompt(`Please enter your name for X`);
      const player2NameInput = prompt(`Please enter your name for O`);
      player1.setName(player1NameInput.value || `Player ${player1.marker}`);
      player2.setName(player2NameInput.value || `Player ${player2.marker}`);
      startGame.style.display = 'block';
      startGameBtn.style.display = 'none';
    });
  
    // Event listener for game board squares
    gameBoard.resetGameBoard();
    document.querySelectorAll('#gameBoard .square').forEach(square => {
      square.addEventListener('click', () => {
        if (!gameWon) {
          const result = gameBoard.handlePlayerMove(currentPlayer.marker, square);
          if (result === 'win' || result === 'tie') {
            _handleGameOver(result);
          } else {
            _switchPlayers();
          }
        }
      });
    });
  
    // Event listener for restart button
    restartBtn.addEventListener('click', () => {
      startGame.style.display = 'none';
      startGameBtn.style.display = 'block';
      winnerDisplay.textContent = '';
      gameBoard.resetGameBoard();
      currentPlayer = player1;
      gameWon = false;
    });
  })();
  