// DOM Elements:
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`Janaury 01 ${currentYear + 1} 00:00:00`);

function updateCountdown() {
	const currentTime = new Date();
	const difference = newYearTime - currentTime;

	// Days
	const d = Math.floor(difference / 1000 / 60 / 60 / 24);
	days.innerHTML = d;
	// Hours
	const h = Math.floor(difference / 1000 / 60 / 60) % 24;
	hours.innerHTML = h < 10 ? "0" + h : h;
	// Minutes
	const m = Math.floor(difference / 1000 / 60) % 60;
	minutes.innerHTML = m < 10 ? "0" + m : m;
	// Seconds
	const s = Math.floor(difference / 1000) % 60;
	seconds.innerHTML = s < 10 ? "0" + s : s;

	console.log(s);
}

setInterval(updateCountdown, 1000);
