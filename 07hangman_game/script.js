//* DOM Elements
const wordElement = document.getElementById("word");
const wrongLetterElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

// Defining a word:
const words = ["application", "javascript", "interface", "development", "pear"];

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

displayWord();
