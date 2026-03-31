// src/game.js
const Snake = require('./snake.js');
const Board = require('./board.js');
const Input = require('./input.js');

class Game {
  constructor() {
    this.boardWidth = 20;
    this.boardHeight = 20;
    this.snake = new Snake();
    this.food = this.generateFood();
    this.score = 0;
    this.isRunning = true;
    this.speed = 150; // ms per frame
    this.input = new Input(this);
    this.gameLoop = null;
  }

  start() {
    this.input.setupInput();
    this.gameLoop = setInterval(() => {
      this.update();
      this.render();
    }, this.speed);
  }

  update() {
    if (!this.isRunning) {
      clearInterval(this.gameLoop);
      return;
    }
    
    // Move snake
    this.snake.move();
    
    // Check collisions
    const collision = this.snake.checkCollision(this.boardWidth, this.boardHeight);
    if (collision) {
      this.gameOver();
      return;
    }
    
    // Check food collision
    const head = this.snake.body[0];
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.snake.grow();
      this.food = this.generateFood();
      
      // Increase speed every 50 points
      if (this.score % 50 === 0 && this.speed > 50) {
        this.speed -= 10;
        clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => {
          this.update();
          this.render();
        }, this.speed);
      }
    }
  }

  render() {
    Board.render(this);
  }

  generateFood() {
    let food;
    let validPosition = false;
    
    while (!validPosition) {
      food = {
        x: Math.floor(Math.random() * this.boardWidth),
        y: Math.floor(Math.random() * this.boardHeight)
      };
      
      // Check that food doesn't spawn on snake
      validPosition = true;
      for (const segment of this.snake.body) {
        if (segment.x === food.x && segment.y === food.y) {
          validPosition = false;
          break;
        }
      }
    }
    
    return food;
  }

  gameOver() {
    this.isRunning = false;
    clearInterval(this.gameLoop);
    Board.renderGameOver(this.score);
    console.log('\nPress R to restart or Q to quit');
  }

  restart() {
    clearInterval(this.gameLoop);
    this.snake = new Snake();
    this.food = this.generateFood();
    this.score = 0;
    this.isRunning = true;
    this.speed = 150;
    this.start();
  }
}

module.exports = Game;