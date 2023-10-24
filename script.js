function game() {
    const startGame = document.getElementById('game');
    const startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', () => {
        startGame.style.display = 'block';
        startGameBtn.style.display = 'none';
    });
    let currentPlayer = 'X';
    const gameBoard = document.querySelectorAll('#gameBoard .square');
    const gameBoardArray = Array.from(gameBoard);
    gameBoardArray.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`clicked item ${index}`)
            item.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        });
    });
    
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', () => {
        startGame.style.display = 'none';
        startGameBtn.style.display = 'block';
        console.log(' restart button clicked');
    });
}
game();