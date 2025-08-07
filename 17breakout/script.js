const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

let score = 0;

// Canvas:
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Brick Pattern:
const brickRowCount = 9;
const brickColumnCount = 5;

// Creating a brick:
const brickInfo = {
	w: 70,
	h: 20,
	padding: 10,
	offsetX: 45,
	offsetY: 60,
	visible: true,
};

// Create bricks:
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
	bricks[i] = [];
	for (let j = 0; j < brickColumnCount; j++) {
		const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
		const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
		bricks[i][j] = { x, y, ...brickInfo };
	}
}
// console.log(bricks);

// Draw bricks on the canvas:
function drawBricks() {
	bricks.forEach((column) => {
		column.forEach((brick) => {
			ctx.beginPath();
			ctx.rect(brick.x, brick.y, brick.w, brick.h);
			ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
			ctx.fill();
			ctx.closePath();
		});
	});
}

// Create the ball
const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 10,
	speed: 2,
	// Direction / direction speed
	dx: 2,
	dy: -2,
};

// Drawing the ball on the canvas:
function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
}

// Create the paddle:
const paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	w: 80,
	h: 10,
	speed: 8,
	dx: 0,
};

// Drawing the paddle on the canvas:
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
}

// Drawing the score on the canvas:
function drawScore() {
	ctx.font = '20px Arial';
	ctx.fillStyle = '#0095dd';
	ctx.fillText(`Score: ${score}`, 20, 30);
}

// Move paddle on canvas
function movePaddle() {
	paddle.x += paddle.dx;

	// Wall detection:
	if (paddle.x + paddle.w > canvas.width) {
		paddle.x = canvas.width - paddle.w;
	}

	if (paddle.x < 0) {
		paddle.x = 0;
	}
}

// Move ball:
function moveBall() {
	ball.x += ball.dx;
	ball.y += ball.dy;
	// Collision Detection on walls (x)
	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
		ball.dx *= -1;
	}
	// Collision Dection on walls (y)
	if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
		ball.dy *= -1;
	}

	// Paddle Collision:
	if (
		ball.x - ball.size > paddle.x &&
		ball.x + ball.size < paddle.x + paddle.w &&
		ball.y + ball.size > paddle.y
	) {
		ball.dy = -ball.speed;
	}
	// Brick Collision:
	bricks.forEach((column) => {
		column.forEach((brick) => {
			if (brick.visible) {
				if (
					ball.x + ball.size > brick.x && // right edge of ball past left edge of brick
					ball.x - ball.size < brick.x + brick.w && // left edge of ball before right edge of brick
					ball.y + ball.size > brick.y && // bottom edge of ball past top of brick
					ball.y - ball.size < brick.y + brick.h // top edge of ball before bottom of brick
				) {
					// Bounce off the brick
					ball.dy *= -1;
					brick.visible = false;
					increaseScore();
				}
			}
		});
	});

	// Hit bottom wall - Game over
	if (ball.y + ball.size > canvas.height) {
		showAllBricks();
		score = 0;
	}
}

// Increase Score:
function increaseScore() {
	score++;
	// Check if all bricks are hidden
	const allBricksGone = bricks.every((column) =>
		column.every((brick) => !brick.visible)
	);

	if (allBricksGone) {
		showAllBricks();
	}
}

// Make all bricks reappear
function showAllBricks() {
	bricks.forEach((column) => {
		column.forEach((brick) => (brick.visible = true));
	});
}

// Start / Reset game
function drawGame() {
	// Clear everything first:
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawScore();
	drawBall();
	drawPaddle();
	drawBricks();
}

// Update canvas drawing and animation
function update() {
	movePaddle();
	moveBall();
	// Draw everything:
	drawGame();
	requestAnimationFrame(update);
}

update();

// Keydown Events:
function keyDown(e) {
	// console.log(e.key);
	if (e.key === "Right" || e.key === "ArrowRight") {
		paddle.dx = paddle.speed;
	} else if (e.key === "Left" || e.key === "ArrowLeft") {
		paddle.dx = -paddle.speed;
	}
}

function keyUp(e) {
	if (
		e.key === "Right" ||
		e.key === "ArrowRight" ||
		e.key === "Left" ||
		e.key === "ArrowLeft"
	) {
		paddle.dx = 0;
	}
}

// Event Listeners:
rulesBtn.addEventListener("click", () => {
	rules.classList.add("show");
});
closeBtn.addEventListener("click", () => {
	rules.classList.remove("show");
});

// Keyboard Event:
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
