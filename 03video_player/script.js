const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const time = document.getElementById("time");

// Functions:
// Play & Pause
function toggleVideoStatus() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

// Stop Video
function stopVideo() {
	video.currentTime = 0;
	video.pause();
}

// Update Icons
function updatePlayIcon() {
	if (video.paused) {
		play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
	} else {
		play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
	}
}

// Update Progress & Timestamp
function updateProgress() {
	// console.log(video.currentTime);
	progress.value = (video.currentTime / video.duration) * 100;

	// Getting the minutes:
	let minutes = Math.floor(video.currentTime / 60);
	if (minutes < 10) {
		minutes = "0" + String(minutes);
	}

	// Getting the seconds
	let seconds = Math.floor(video.currentTime % 60);
	if (seconds < 10) {
		seconds = "0" + String(seconds);
	}

	timestamp.innerHTML = `${minutes}:${seconds}`;
}

// Set Video Progress / Time
function setVideoProgress() {
	video.currentTime = (+progress.value * video.duration) / 100;
}

// Event Listeners:
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
