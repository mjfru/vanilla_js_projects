// DOM Elements:
const msgElement = document.getElementById("msg");

const randomNumber = getRandomNumber();

console.log(`Number: ${randomNumber}`);

function getRandomNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

window.SpeechRecognition = window.SpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start capturing recognition and game:
recognition.start();

// Capture User Speech:
function onSpeak(e) {
	const msg = e.results[0][0].transcript;
	console.log(msg);
  // writeMessage(msg);
  // checkNumber(msg);
}

recognition.addEventListener("result", onSpeak);
