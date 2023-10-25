// Gameboard module
const gameBoard = (() => {
    // Get all the squares on the game board
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

        // Check if any of the winning combinations match the player's moves
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return squares[index].textContent === player;
            });
        });
    };

    // Private function to check for tie condition
    const _checkTieCondition = () => {
        // Check if all squares have been clicked
        return squares.every(square => {
            return square.classList.contains('clicked');
        });
    };

    // Public function to handle player move
    const handlePlayerMove = (player, square) => {
        if (!square.classList.contains('clicked')) {
            // Update the square with the player's marker
            square.textContent = player;
            square.classList.add('clicked');
            // Check if the player has won or if there is a tie
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
        // Reset all squares to their initial state
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('clicked');
        });
    };

    // Return the public functions
    return {
        handlePlayerMove,
        resetGameBoard,
    };
})();

// Player factory
const Player = (marker) => {
    let name = '';
    return {
        // Get the player's name
        getName: () => name,
        // Set the player's name
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
        // Get the winner's name
        const winner = currentPlayer.getName();
        if (result === 'win') {
            // Display the winner's name
            winnerDisplay.textContent = `${winner} wins! Restart the game to play again.`;
        } else if (result === 'tie') {
            winnerDisplay.textContent = `Tie game! Restart the game.`;
        }
        gameWon = true;
    };

    // Event listener for start game button
    startGameBtn.addEventListener('click', () => {
        // Prompt players for their names
        const player1NameInput = prompt(`Please enter your name for X`);
        const player2NameInput = prompt(`Please enter your name for O`);
        // Set the players' names
        player1.setName(player1NameInput || `Player ${player1.marker}`);
        player2.setName(player2NameInput || `Player ${player2.marker}`);
        // Show the game board and hide the start button
        startGame.style.display = 'block';
        startGameBtn.style.display = 'none';
    });

    // Event listener for game board squares
    gameBoard.resetGameBoard();
    document.querySelectorAll('#gameBoard .square').forEach(square => {
        square.addEventListener('click', () => {
            if (!gameWon) {
                // Handle the player's move
                const result = gameBoard.handlePlayerMove(currentPlayer.marker, square);
                if (result === 'win' || result === 'tie') {
                    // Handle game over
                    _handleGameOver(result);
                } else {
                    // Switch players
                    _switchPlayers();
                }
            }
        });
    });

    // Event listener for restart button
    restartBtn.addEventListener('click', () => {
        // Hide the game board and show the start button
        startGame.style.display = 'none';
        startGameBtn.style.display = 'block';
        // Reset the game board and game state
        winnerDisplay.textContent = '';
        gameBoard.resetGameBoard();
        currentPlayer = player1;
        gameWon = false;
        location.reload();
    });
})();
