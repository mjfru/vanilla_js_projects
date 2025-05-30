//* DOM Elements
const wordElement = document.getElementById("word");
const wrongLetterElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

// Defining a word:
const words = [
	"application",
	"javascript",
	"interface",
  "node",
	"development",
	"java",
	"react",
	"algorhithm",
	"object",
	"array",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// Keeping track of guesses
const correctLetters = [];
const wrongLetters = [];

function displayWord() {
	wordElement.innerHTML = `
    ${selectedWord
			.split("")
			.map(
				(letter) => `
        <span class="letter">${
					correctLetters.includes(letter) ? letter : ""
				}</span>
        `
			)
			.join("")}
  `;
	const innerWord = wordElement.innerText.replace(/\n/g, "");
	// console.log(wordElement.innerText, innerWord);

	if (innerWord === selectedWord) {
		finalMessage.innerText = "Winner winner, chicken dinner!";
		popup.style.display = "flex";
	}
}

//* Updating the wrong letters element:
function updateWrongLettersElement() {
	// console.log("Updated wrong");
	//* Display the wrong letters guessed
	wrongLetterElement.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

	//* Drawing the figure
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;
		if (index < errors) {
			part.style.display = "block";
		} else {
			part.style.display = "none";
		}
	});

	//* Checking losing conditions
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = "Not this time. Try again!";
		popup.style.display = "flex";
	}
}

//* Showing a notification:
function showNotification() {
	notification.classList.add("show");
	setTimeout(() => {
		notification.classList.remove("show");
	}, 1500);
}

//* Keydown Event Listeners
window.addEventListener("keydown", (event) => {
	//* Checking for letters only
	// console.log(event.code);
	if (event.code >= "KeyA" && event.code <= "KeyZ") {
		// console.log('Works');
		const letter = event.key;
		if (selectedWord.includes(letter)) {
			//* Making sure the letter isn't already in the array:
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);
				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLettersElement();
			} else {
				showNotification();
			}
		}
	}
});

//* Reset / Play again
playAgainButton.addEventListener("click", () => {
	//* Empty the letter arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];
	displayWord();
	updateWrongLettersElement();
	popup.style.display = "none";
});

displayWord();
