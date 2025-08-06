
// Import game logic
const { isValidUsername, getEggScore, getEggSpeed } = require('./eggCatcherGame');

// Test: Egg Catcher game - username validation
function testUsernameValidation() {
    const usernames = ['bob', 'alice', 'superlongusername123456', 'bob', ''];
    const taken = new Set(['bob']);
    const results = usernames.map(name => isValidUsername(name, taken));
    if (results[0] === false && results[1] === true && results[2] === false && results[3] === false && results[4] === false) {
        console.log('Test passed: Username validation works');
    } else {
        console.error('Test failed: Username validation incorrect', results);
    }
}

testUsernameValidation();

// Test: Egg scoring logic (normal, silver, golden)
function testEggScoring() {
    let score = 0;
    score += getEggScore('normal');
    score += getEggScore('silver');
    score += getEggScore('golden');
    if (score === 17) {
        console.log('Test passed: Egg scoring works');
    } else {
        console.error('Test failed: Egg scoring incorrect');
    }
}

testEggScoring();

// Test: Double Trouble mode
function testDoubleTrouble() {
    let score = 0;
    let doubleTrouble = true;
    score += getEggScore('normal', doubleTrouble);
    score += getEggScore('silver', doubleTrouble);
    score += getEggScore('golden', doubleTrouble);
    if (score === 34) {
        console.log('Test passed: Double Trouble scoring works');
    } else {
        console.error('Test failed: Double Trouble scoring incorrect');
    }
}

testDoubleTrouble();

// Test: Egg speed logic
function testEggSpeed() {
    let baseSpeed = 5;
    let elapsedTime = 30;
    let speed = getEggSpeed(baseSpeed, elapsedTime);
    let speedDoubleTrouble = getEggSpeed(baseSpeed, elapsedTime, true);
    if (speed === 8 && speedDoubleTrouble === 16) {
        console.log('Test passed: Egg speed logic works');
    } else {
        console.error('Test failed: Egg speed logic incorrect', speed, speedDoubleTrouble);
    }
}

testEggSpeed();
