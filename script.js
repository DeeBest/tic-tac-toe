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
        getSquares: () => squares,
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

// Computer player logic
const ComputerPlayer = (marker) => {
    return {
        makeMove: (squares) => {
            // Simulated random move (you can replace this with more intelligent logic)
            const availableSquares = squares.filter(square => !square.classList.contains('clicked'));
            const randomIndex = Math.floor(Math.random() * availableSquares.length);
            return availableSquares[randomIndex];
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

    const difficultSelectorContainer = document.getElementById('difficulty-select-container');
    difficultSelectorContainer.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    const startGame = document.getElementById('game');
    const startGameBtnVsPlayer = document.getElementById('start-game-btn-vs-player');
    const winnerDisplay = document.getElementById('winner-display');
    const restartBtn = document.getElementById('restart-btn');
    const player1 = Player('X');
    const player2 = Player('O');

    let currentPlayer = player1;
    let gameWon = false;

    const computerPlayerBtn = document.getElementById('player-vs-computer-btn');
    computerPlayerBtn.addEventListener('click', () => {
        difficultSelectorContainer.style.display = 'flex';
        document.getElementById('opponent-selector-btns').style.display = 'none';
    });

    const startGameBtnVsComputer = document.getElementById('start-game-btn-vs-computer');
    startGameBtnVsComputer.addEventListener('click', () => {
        const player1NameInput = document.getElementById('player1-name-input');
        player1.setName(player1NameInput.value || `Player ${player1.marker}`);
        const computer = ComputerPlayer(player2.marker);
        difficultSelectorContainer.style.display = 'none';
        startGame.style.display = 'block';

        // Set up the game board click event listeners here
        const squares = gameBoard.getSquares();
        squares.forEach(square => {
            square.addEventListener('click', () => {
                if (!gameWon) {
                    const result = gameBoard.handlePlayerMove(currentPlayer.marker, square);
                    if (result === 'win' || result === 'tie') {
                        _handleGameOver(result);
                    } else {
                        _switchPlayers();
                        // After the player's move, let the computer make a move
                        const computerSquare = computer.makeMove(squares);
                        const computerResult = gameBoard.handlePlayerMove(player2.marker, computerSquare);
                        if (computerResult === 'win' || computerResult === 'tie') {
                            _handleGameOver(computerResult);
                        } else {
                            _switchPlayers();
                        }
                    }
                }
            });
        });
    });


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

    const playerVsPlayerBtn = document.getElementById('player-vs-player-btn');
    playerVsPlayerBtn.addEventListener('click', () => {
        playerNamesContainer.style.display = 'flex';
        document.getElementById('opponent-selector-btns').style.display = 'none';
    });

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
