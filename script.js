const game = document.getElementById('game');
const startGameBtn = document.getElementById('start-game-btn');
      startGameBtn.addEventListener('click', () => {
              game.style.display = 'block';
              startGameBtn.style.display = 'none';
      });

const restartBtn = document.getElementById('restart-btn');
      restartBtn.addEventListener('click', () => {
            game.style.display = 'none';
            startGameBtn.style.display = 'block';
      });