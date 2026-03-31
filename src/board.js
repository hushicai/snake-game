// src/board.js
class Board {
  static clearScreen() {
    // ANSI escape code to clear screen and move cursor to top-left
    process.stdout.write('\x1Bc');
  }

  static render(game) {
    const { snake, food, boardWidth, boardHeight, score } = game;
    
    // Create empty board
    const board = Array(boardHeight).fill().map(() => 
      Array(boardWidth).fill(' ')
    );
    
    // Draw snake
    snake.body.forEach((segment, index) => {
      if (index === 0) {
        // Head
        board[segment.y][segment.x] = '●';
      } else {
        // Body
        board[segment.y][segment.x] = '█';
      }
    });
    
    // Draw food
    board[food.y][food.x] = '★';
    
    // Clear screen and render
    this.clearScreen();
    
    // Draw top border
    console.log('┌' + '─'.repeat(boardWidth) + '┐');
    
    // Draw board with side borders
    for (let y = 0; y < boardHeight; y++) {
      let row = '│';
      for (let x = 0; x < boardWidth; x++) {
        row += board[y][x];
      }
      row += '│';
      console.log(row);
    }
    
    // Draw bottom border
    console.log('└' + '─'.repeat(boardWidth) + '┘');
    
    // Draw score
    console.log(`\nScore: ${score}`);
    console.log('Controls: WASD/Arrow keys | Q: Quit | R: Restart');
  }

  static renderGameOver(score) {
    this.clearScreen();
    console.log('╔' + '═'.repeat(30) + '╗');
    console.log('║' + ' '.repeat(30) + '║');
    console.log('║      GAME OVER!       ║');
    console.log('║' + ' '.repeat(30) + '║');
    console.log(`║     Score: ${score.toString().padStart(4)}      ║`);
    console.log('║' + ' '.repeat(30) + '║');
    console.log('║   Press R to restart  ║');
    console.log('║' + ' '.repeat(30) + '║');
    console.log('╚' + '═'.repeat(30) + '╝');
  }
}

module.exports = Board;