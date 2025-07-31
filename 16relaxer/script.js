// DOM Elements
const container = document.getElementById("container");
const pointerAnimation = document.querySelector(".pointer-container");
const text = document.getElementById("text");
const btn = document.getElementById("btn");

const totalTime = 8000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

let isRunning = false;
let timer;
let interval;

function breathAnimation() {
	text.innerText = "Breathe In!";
	// console.log("Breathe In");
	container.className = "container grow";

	timer = setTimeout(() => {
		text.innerText = "Hold...";

		timer = setTimeout(() => {
			text.innerText = "Breathe Out!";
			container.className = "container shrink";
			// console.log("Breathe Out!");
		}, holdTime);
	}, breatheTime);
}

// breathAnimation();
// setInterval(breathAnimation, totalTime);

// Add a start / stop button, change colors, add a background selector
function startStop() {
	if (!isRunning) {
		breathAnimation();
		pointerAnimation.classList.add("active");
		interval = setInterval(breathAnimation, totalTime);
		btn.textContent = "Stop";
		isRunning = true;
	} else {
		clearInterval(interval);
		clearTimeout(timer);
		pointerAnimation.classList.remove("active");
		container.classList.remove("shrink", "grow");
		btn.textContent = "Start";
		text.innerText = "";
		isRunning = false;
	}
}

// Event Handlers
btn.addEventListener("click", startStop);
