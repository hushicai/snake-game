// test/snake.test.js
const Snake = require('../src/snake.js');

console.log('Testing Snake class...');

// Test 1: Snake initialization
const snake = new Snake();
if (snake.body.length !== 3) {
  console.error('FAIL: Snake should have initial length of 3');
  process.exit(1);
}
console.log('PASS: Snake initialization');

// Test 2: Snake movement
const initialHead = { ...snake.body[0] };
snake.move();
if (snake.body[0].x === initialHead.x && snake.body[0].y === initialHead.y) {
  console.error('FAIL: Snake should move');
  process.exit(1);
}
console.log('PASS: Snake movement');

// Test 3: Snake growth
const initialLength = snake.body.length;
snake.grow();
// Move to apply growth
snake.move();
if (snake.body.length !== initialLength + 1) {
  console.error('FAIL: Snake should grow');
  process.exit(1);
}
console.log('PASS: Snake growth');

console.log('All tests passed!');