//your code here
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');
const gridWidth = 40;
const gridHeight = 40;
let score = 0;
let snake = [{ x: 20, y: 19 }];
let food = { x: 10, y: 10 };
let direction = 'right';
let gameLoop;

function createPixel(x, y, className) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel', className);
  pixel.style.gridColumn = x + 1;
  pixel.style.gridRow = y + 1;
  gameContainer.appendChild(pixel);
}

function createSnake() {
  snake.forEach((pixel, index) => {
    const className = index === 0 ? 'snakeBodyPixel' : 'snakeBodyPixel';
    createPixel(pixel.x, pixel.y, className);
  });
}

function createFood() {
  createPixel(food.x, food.y, 'food');
}

function clearBoard() {
  gameContainer.innerHTML = '';
}

function updateScore() {
  scoreElement.textContent = score;
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    generateFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function generateFood() {
  food.x = Math.floor(Math.random() * gridWidth);
  food.y = Math.floor(Math.random() * gridHeight);

  if (snake.some(pixel => pixel.x === food.x && pixel.y === food.y)) {
    generateFood();
  } else {
    createFood();
  }
}

function checkGameOver() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= gridWidth ||
    snake[0].y < 0 ||
    snake[0].y >= gridHeight ||
    snake.slice(1).some(pixel => pixel.x === snake[0].x && pixel.y === snake[0].y)
  ) {
    clearInterval(gameLoop);
    alert('Game Over! Your score is: ' + score);
  }
}

function gameLoopFunction() {
  clearBoard();
  moveSnake();
  createSnake();
  checkGameOver();
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowRight':
      direction = 'right';
      break;
  }
});

generateFood();
updateScore();
createSnake();
gameLoop = setInterval(gameLoopFunction, 100);
