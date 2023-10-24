function game() {
    const startGame = document.getElementById('game');
    const startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', () => {
        startGame.style.display = 'block';
        startGameBtn.style.display = 'none';
    });
    let currentPlayer = 'X';
    let gameWon = false;

    // An array of all possible winning combinations for the game board
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

    // A function that checks if a player has won the game
    function checkWinningCombination(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoardArray[index].textContent === player;
            });
        });
    }

    const gameBoard = document.querySelectorAll('#gameBoard .square');
    const gameBoardArray = Array.from(gameBoard);
    //checking clicked boxes
    gameBoardArray.forEach((item) => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('clicked') && !gameWon) {
                item.textContent = currentPlayer;
                item.classList.add('clicked');
                if (checkWinningCombination(currentPlayer)) {
                    console.log(`${currentPlayer} wins!`);
                    gameWon = true;
                } else {

                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                };
            };
        });
    });
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', () => {
        startGame.style.display = 'none';
        startGameBtn.style.display = 'block';
        gameBoardArray.forEach((item) => {
            item.textContent = '';
            item.classList.remove('clicked');
            location.reload();
        });
        gameWon = false;
    });
}
game();