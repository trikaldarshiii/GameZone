
// Import game logic
// For browser, reimplement functions here

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

// UI Elements
const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game-container');
const settingsContainer = document.getElementById('settings-container');
const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('start-btn');
const loginError = document.getElementById('login-error');
const scoreBoard = document.getElementById('score-board');
const settingsBtn = document.getElementById('settings-btn');
const closeSettingsBtn = document.getElementById('close-settings');
const backgroundSelect = document.getElementById('background-select');
const henSelect = document.getElementById('hen-select');
const basketSelect = document.getElementById('basket-select');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Game State
let username = '';
let takenUsernames = new Set();
let score = 0;
let eggs = [];
let basket = { x: 200, y: 600, width: 80, height: 40, type: 'funny' };
let hen = { x: Math.random() * 400, y: 20, width: 80, height: 40, type: 'funny' };
let gameRunning = false;
let doubleTrouble = false;
let doubleTroubleTimer = 0;
let baseEggSpeed = 1.5;
let elapsedTime = 0;

// Funny icons (placeholder)
function drawHen() {
    // Draw a cartoon hen (simple SVG-like)
    ctx.save();
    ctx.translate(hen.x + hen.width / 2, hen.y + hen.height / 2);
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2); // body
    ctx.fillStyle = '#ffecb3';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-15, -15, 10, 0, Math.PI * 2); // head
    ctx.fillStyle = '#fff176';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-20, -20, 3, 0, Math.PI * 2); // eye
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-25, -10);
    ctx.lineTo(-30, -15);
    ctx.lineTo(-25, -20);
    ctx.fillStyle = '#d84315'; // beak
    ctx.fill();
    ctx.restore();
}
function drawBasket() {
    // Draw a cartoon basket
    ctx.save();
    ctx.translate(basket.x + basket.width / 2, basket.y + basket.height / 2);
    ctx.beginPath();
    ctx.ellipse(0, 0, 35, 15, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#a1887f';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, 30, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = '#6d4c41';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
}
function drawEgg(egg) {
    // Draw a cartoon egg
    ctx.save();
    ctx.translate(egg.x, egg.y);
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = egg.type === 'normal' ? '#fffde7' : egg.type === 'silver' ? '#cfd8dc' : '#ffd700';
    ctx.fill();
    ctx.strokeStyle = '#bdbdbd';
    ctx.stroke();
    if (egg.type === 'silver') {
        ctx.beginPath();
        ctx.arc(0, -5, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#eceff1';
        ctx.fill();
    }
    if (egg.type === 'golden') {
        ctx.beginPath();
        ctx.arc(0, -5, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fffde7';
        ctx.fill();
    }
    ctx.restore();
}

// Username validation and game start
startBtn.onclick = function() {
    const name = usernameInput.value.trim();
    if (!isValidUsername(name, takenUsernames)) {
        loginError.textContent = 'Invalid or taken username!';
        return;
    }
    username = name;
    takenUsernames.add(username);
    loginContainer.style.display = 'none';
    gameContainer.style.display = '';
    score = 0;
    eggs = [];
    elapsedTime = 0;
    gameRunning = true;
    doubleTrouble = false;
    doubleTroubleTimer = 0;
    scoreBoard.textContent = 'Score: 0';
    requestAnimationFrame(gameLoop);
};

// Settings UI
settingsBtn.onclick = function() {
    settingsContainer.style.display = '';
};
closeSettingsBtn.onclick = function() {
    settingsContainer.style.display = 'none';
};
backgroundSelect.onchange = function() {
    document.body.style.background = backgroundSelect.value === 'farm' ? '#c8e6c9' : backgroundSelect.value === 'night' ? '#263238' : '#e0f7fa';
};
henSelect.onchange = function() {
    hen.type = henSelect.value;
};
basketSelect.onchange = function() {
    basket.type = basketSelect.value;
};

// Basket movement
document.addEventListener('keydown', function(e) {
    if (!gameRunning) return;
    if (e.key === 'ArrowLeft') basket.x = Math.max(0, basket.x - 30);
    if (e.key === 'ArrowRight') basket.x = Math.min(canvas.width - basket.width, basket.x + 30);
});

// Responsive canvas
function resizeCanvas() {
    let w = Math.min(window.innerWidth, 480);
    let h = Math.min(window.innerHeight, 640);
    canvas.width = w;
    canvas.height = h;
    gameContainer.style.width = w + 'px';
    gameContainer.style.height = h + 'px';
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Game loop
function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHen();
    drawBasket();
    // Drop eggs
    if (Math.random() < 0.02) {
        // Hen appears at random position
        hen.x = Math.random() * (canvas.width - hen.width);
        const types = ['normal', 'silver', 'golden'];
        const type = Math.random() < 0.8 ? 'normal' : (Math.random() < 0.5 ? 'silver' : 'golden');
        eggs.push({ x: hen.x + hen.width / 2, y: hen.y + hen.height, radius: 16, type });
    }
    // Move eggs
    for (let egg of eggs) {
        let speed = getEggSpeed(baseEggSpeed, elapsedTime, doubleTrouble);
        egg.y += speed;
        drawEgg(egg);
    }
    // Check catch
    for (let i = eggs.length - 1; i >= 0; i--) {
        let egg = eggs[i];
        if (
            egg.y + egg.radius > basket.y &&
            egg.x > basket.x && egg.x < basket.x + basket.width
        ) {
            score += getEggScore(egg.type, doubleTrouble);
            scoreBoard.textContent = 'Score: ' + score;
            eggs.splice(i, 1);
        } else if (egg.y > canvas.height) {
            eggs.splice(i, 1);
        }
    }
    // Double Trouble mode
    if (!doubleTrouble && Math.random() < 0.001) {
        doubleTrouble = true;
        doubleTroubleTimer = 180; // ~3 seconds
        scoreBoard.style.background = '#ffd600';
    }
    if (doubleTrouble) {
        doubleTroubleTimer--;
        if (doubleTroubleTimer <= 0) {
            doubleTrouble = false;
            scoreBoard.style.background = 'rgba(255,255,255,0.7)';
        }
    }
    elapsedTime++;
    requestAnimationFrame(gameLoop);
}
