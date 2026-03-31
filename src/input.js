// src/input.js
const readline = require('readline');

class Input {
  constructor(game) {
    this.game = game;
    this.rl = null;
  }

  setupInput() {
    // Configure terminal for raw input
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    
    process.stdin.on('keypress', (str, key) => {
      this.handleKeyPress(key);
    });
    
    // Store readline instance for cleanup
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // Handle process exit
    process.on('SIGINT', () => {
      this.cleanup();
      process.exit(0);
    });
  }

  handleKeyPress(key) {
    if (!key) return;
    
    const { name, ctrl } = key;
    
    // Ctrl+C or Q to quit
    if ((ctrl && name === 'c') || name === 'q') {
      this.game.isRunning = false;
      this.cleanup();
      process.exit(0);
    }
    
    // R to restart
    if (name === 'r') {
      this.game.restart();
      return;
    }
    
    // Movement keys
    const directionMap = {
      'up': 'up',
      'w': 'up',
      'down': 'down',
      's': 'down',
      'left': 'left',
      'a': 'left',
      'right': 'right',
      'd': 'right'
    };
    
    if (directionMap[name]) {
      this.game.snake.changeDirection(directionMap[name]);
    }
  }

  cleanup() {
    if (this.rl) {
      this.rl.close();
    }
    process.stdin.setRawMode(false);
  }
}

module.exports = Input;