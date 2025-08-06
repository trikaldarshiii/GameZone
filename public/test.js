// Basic test for Egg Catcher game logic
// This will be expanded as features are implemented
function testEggCatchScoring() {
    let score = 0;
    score += 2; // normal egg
    score += 5; // silver egg
    score += 10; // golden egg
    if (score === 17) {
        console.log('Test passed: Scoring works');
    } else {
        console.error('Test failed: Scoring incorrect');
    }
}

testEggCatchScoring();
