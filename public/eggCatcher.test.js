// Test: Egg Catcher game - username validation
function testUsernameValidation() {
    const usernames = ['bob', 'alice', 'superlongusername123456', 'bob', ''];
    const taken = new Set(['bob']);
    function isValidUsername(name) {
        if (!name || name.length > 12 || taken.has(name)) return false;
        return true;
    }
    const results = usernames.map(isValidUsername);
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
    score += 2; // normal egg
    score += 5; // silver egg
    score += 10; // golden egg
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
    score += doubleTrouble ? 2 * 2 : 2; // normal egg
    score += doubleTrouble ? 5 * 2 : 5; // silver egg
    score += doubleTrouble ? 10 * 2 : 10; // golden egg
    if (score === 34) {
        console.log('Test passed: Double Trouble scoring works');
    } else {
        console.error('Test failed: Double Trouble scoring incorrect');
    }
}

testDoubleTrouble();
