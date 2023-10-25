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
    const playerNamesContainer = document.getElementById('players-names-container');
    playerNamesContainer.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    const startGame = document.getElementById('game');
    const startGameBtnVsPlayer = document.getElementById('start-game-btn-vs-player');
    const winnerDisplay = document.getElementById('winner-display');
    const restartBtn = document.getElementById('restart-btn');
    const player1 = Player('X');
    const player2 = Player('O');
    const playerVsPlayerBtn = document.getElementById("player-vs-player-btn");
    const playerVsComputerBtn = document.getElementById("player-vs-computer-btn");
    const OpponentSelectorBtnsContainer = document.getElementById("opponent-selector-btns");
    const difficultSelectorContainer = document.getElementById('difficulty-select-container');
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
    //event listener for the player vs player button
    playerVsPlayerBtn.addEventListener('click', () => {
        playerNamesContainer.style.display = 'flex';
        OpponentSelectorBtnsContainer.style.display = 'none';
    });
    playerVsComputerBtn.addEventListener('click', () => {
        difficultSelectorContainer.style.display = 'flex';
        OpponentSelectorBtnsContainer.style.display = 'none';
    });

    // Event listener for start game button
    startGameBtnVsPlayer.addEventListener('click', () => {
        const player1NameInput = document.getElementById('player1-name-input');
        const player2NameInput = document.getElementById('player2-name-input');
        player1.setName(player1NameInput.value || `Player ${player1.marker}`);
        player2.setName(player2NameInput.value || `Player ${player2.marker}`);
        startGame.style.display = 'block';
        playerNamesContainer.style.display = 'none';

        // Set up the game board click event listeners here
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
    });


    // Event listener for restart button
    restartBtn.addEventListener('click', () => {
        startGame.style.display = 'none';
        playerNamesContainer.style.display = 'block';
        winnerDisplay.textContent = '';
        gameBoard.resetGameBoard();
        currentPlayer = player1;
        gameWon = false;
        location.reload();
    });
})();