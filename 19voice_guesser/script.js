// DOM Elements:
const msgElement = document.getElementById("msg");

const randomNumber = getRandomNumber();

console.log(`Number: ${randomNumber}`);

function getRandomNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

// window.SpeechRecognition = window.SpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start capturing recognition and game:
recognition.start();

// Capture User Speech:
function onSpeak(e) {
	const msg = e.results[0][0].transcript;
	console.log(msg);
	writeMessage(msg);
	checkNumber(msg);
}

// Display user's speech:
function writeMessage(msg) {
	msgElement.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

// Check the message against the number
function checkNumber(msg) {
	// const num = +msg;
	let cleanedNumber = msg.toLowerCase().trim();
	let num;

	switch (cleanedNumber) {
		case "one":
			num = 1;
			break;
		case "two":
			num = 2;
			break;
		case "three":
			num = 3;
			break;
		case "four":
			num = 4;
			break;
		case "five":
			num = 5;
			break;
		case "six":
			num = 6;
			break;
		case "seven":
			num = 7;
			break;
		case "eight":
			num = 8;
			break;
		case "nine":
			num = 9;
			break;
		default:
			num = parseInt(cleanedNumber, 10);
	}

	// Make sure it's a valid number:
	if (Number.isNaN(num)) {
		msgElement.innerHTML += "<div>Not a number, try again.</div>";
		return;
	}

	// Check if number is in valid range:
	if (num > 100 || num < 1) {
		msgElement.innerHTML = "<div>Number must be between 1 and 100.</div>";
		return;
	}

	// Check number
	if (num === randomNumber) {
		document.body.innerHTML = `
      <h2>Congratulations! You guessed the number! <br><br>
      The number was ${num}.</h2>
      <button class="play-again" id="play-again">Play Again?</button>
    `;
	} else if (num > randomNumber) {
		msgElement.innerHTML += "<div>Lower...</div>";
	} else {
		msgElement.innerHTML += "<div>Higher...</div>";
	}
}

recognition.addEventListener("result", onSpeak);

// End Speech Recognition
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
	if (e.target.id === "play-again") {
		window.location.reload();
	}
});

//TODO - Fix bug where numbers less than ten are not recognized unless prefacing them with an 'oh-' or 'zero-'.
