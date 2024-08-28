const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const gameArea = document.getElementById('gameArea');

let paddleX = gameArea.offsetWidth / 2 - paddle.offsetWidth / 2;
let ballX = gameArea.offsetWidth / 2 - ball.offsetWidth / 2;
let ballY = gameArea.offsetHeight / 2 - ball.offsetHeight / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;

document.addEventListener('mousemove', (e) => {
    const gameAreaRect = gameArea.getBoundingClientRect();
    paddleX = e.clientX - gameAreaRect.left - paddle.offsetWidth / 2;
    paddleX = Math.max(0, Math.min(gameArea.offsetWidth - paddle.offsetWidth, paddleX));
    paddle.style.left = paddleX + 'px';
});

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX <= 0 || ballX + ball.offsetWidth >= gameArea.offsetWidth) {
        ballSpeedX *= -1;
    }

    if (ballY <= 0) {
        ballSpeedY *= -1;
    }

    if (ballY + ball.offsetHeight >= gameArea.offsetHeight) {
        if (ballX + ball.offsetWidth > paddleX && ballX < paddleX + paddle.offsetWidth) {
            ballSpeedY *= -1;
        } else {
            resetBall();
        }
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

function resetBall() {
    ballX = gameArea.offsetWidth / 2 - ball.offsetWidth / 2;
    ballY = gameArea.offsetHeight / 2 - ball.offsetHeight / 2;
    ballSpeedX = 3;
    ballSpeedY = 3;
}

function gameLoop() {
    moveBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();
