// src/snake.js
class Snake {
  constructor() {
    this.body = [
      { x: 10, y: 10 }, // head
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    this.direction = 'right';
    this.length = 3;
  }

  move() {
    // Create new head based on direction
    const head = { ...this.body[0] };
    
    switch (this.direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }
    
    // Add new head to front
    this.body.unshift(head);
    
    // Remove tail if not growing
    if (this.body.length > this.length) {
      this.body.pop();
    }
  }

  grow() {
    // When growing, we don't remove the tail in the move method
    // So we just need to increase the length
    this.length += 1;
  }

  checkCollision(boardWidth, boardHeight) {
    const head = this.body[0];
    
    // Check wall collision
    if (head.x < 0 || head.x >= boardWidth || 
        head.y < 0 || head.y >= boardHeight) {
      return 'wall';
    }
    
    // Check self collision (skip head)
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return 'self';
      }
    }
    
    return null;
  }

  changeDirection(newDirection) {
    // Prevent 180-degree turns
    const opposites = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    };
    
    if (newDirection !== opposites[this.direction]) {
      this.direction = newDirection;
    }
  }
}

module.exports = Snake;