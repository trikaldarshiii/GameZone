// Egg Catcher Game Logic

// Username validation
function isValidUsername(name, takenUsernames) {
    if (!name || name.length > 12 || takenUsernames.has(name)) return false;
    return true;
}

// Scoring logic
function getEggScore(type, doubleTrouble = false) {
    const scores = { normal: 2, silver: 5, golden: 10 };
    let score = scores[type] || 0;
    return doubleTrouble ? score * 2 : score;
}

// Egg speed logic
function getEggSpeed(baseSpeed, elapsedTime, doubleTrouble = false) {
    let speed = baseSpeed + Math.floor(elapsedTime / 10);
    if (doubleTrouble) speed *= 2;
    return speed;
}

module.exports = { isValidUsername, getEggScore, getEggSpeed };
