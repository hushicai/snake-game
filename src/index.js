#!/usr/bin/env node

const Game = require('./game.js');

console.log('Starting Snake Game...');
console.log('Controls: WASD/Arrow keys to move, Q to quit, R to restart');
console.log('Press any key to start...');

// Wait for key press to start
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.once('data', () => {
  process.stdin.setRawMode(false);
  
  const game = new Game();
  game.start();
  
  console.log('Game started!');
});