const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileSize = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
  moveSnake();
  if (isGameOver()) {
    alert("Game Over! Your score was " + score);
    resetGame();
  } else {
    clearCanvas();
    drawFood();
    drawSnake();
  }
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * tileSize,
      segment.y * tileSize,
      tileSize,
      tileSize
    );
  });
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    placeFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const goingUp = direction.y === -1;
  const goingDown = direction.y === 1;
  const goingRight = direction.x === 1;
  const goingLeft = direction.x === -1;

  if (keyPressed === 37 && !goingRight) {
    direction = { x: -1, y: 0 };
  }
  if (keyPressed === 38 && !goingDown) {
    direction = { x: 0, y: -1 };
  }
  if (keyPressed === 39 && !goingLeft) {
    direction = { x: 1, y: 0 };
  }
  if (keyPressed === 40 && !goingUp) {
    direction = { x: 0, y: 1 };
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };

  if (snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

function isGameOver() {
  const head = snake[0];
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    return true;
  }

  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  placeFood();
  score = 0;
}

setInterval(gameLoop, 100);
