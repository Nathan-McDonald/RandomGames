const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const ball = document.getElementById('ball');
const scoreboard = document.getElementById('scoreboard');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');

let ballX = 295;
let ballY = 195;
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddle1Y = 150;
let paddle2Y = 150;
let score1Value = 0;
let score2Value = 0;

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowUp') {
		paddle2Y -= 20;
	} else if (event.key === 'ArrowDown') {
		paddle2Y += 20;
	}
});

document.addEventListener('keyup', (event) => {
	if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
		paddle2Y = Math.max(10, Math.min(paddle2Y, 290));
	}
});

function updateBall() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballY < 0 || ballY > 390) {
		ballSpeedY *= -1;
	}

	if (ballX < 20 && ballY > paddle1Y && ballY < paddle1Y + 100) {
		ballSpeedX *= -1;
	} else if (ballX < 0) {
		score2Value++;
		updateScoreboard();
		resetBall();
	}

	if (ballX > 580 && ballY > paddle2Y && ballY < paddle2Y + 100) {
		ballSpeedX *= -1;
	} else if (ballX > 600) {
		score1Value++;
		updateScoreboard();
		resetBall();
	}
}

function updatePaddles() {
	if (paddle1Y + 100 < ballY && paddle1Y < 290) {
		paddle1Y += 5;
	} else if (paddle1Y > 10) {
		paddle1Y -= 5;
	}
}

function updateScoreboard() {
	score1.textContent = score1Value;
	score2.textContent = score2Value;
}

function resetBall() {
	ballX = 295;
	ballY = 195;
	ballSpeedX *= -1;
}

setInterval(() => {
	updateBall();
	updatePaddles();
	paddle1.style.top = paddle1Y + 'px';
	paddle2.style.top = paddle2Y + 'px';
	ball.style.top = ballY + 'px';
	ball.style.left = ballX + 'px';
}, 16);