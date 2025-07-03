// DOM Elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultSelect = document.getElementById("difficulty");
const endgameElement = document.getElementById("end-game");

// Word Bank:
const words = [
	"sigh",
	"tense",
	"coffee",
	"eight",
	"quince",
	"zoology",
	"yen",
	"tension",
	"admission",
	"superficial",
	"elegy",
	"commonplace",
	"crystal",
	"frame",
	"speaker",
	"connection",
	"healthy",
	"magnesium",
	"plastic",
	"headset",
	"unapologetic",
	"renaming",
	"monkeys",
	"mansion",
	"oyster",
	"champs",
];

// Initial Word
let randomWord;

// Initial Score
let score = 0;

// Initial Time:
let time = 10;

// Generate a random word from the word bank
const getRandomWord = () => {
	return words[Math.floor(Math.random() * words.length)];
};
// console.log(getRandomWord());

// Add word to DOM
const addWordToDOM = () => {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
};

// Update Score:
const updateScore = () => {
	score++;
	scoreElement.innerHTML = score;
};

// Event Listeners:
text.addEventListener("input", (e) => {
	const insertedText = e.target.value;

	if (insertedText === randomWord) {
		addWordToDOM();
		updateScore();
		e.target.value = "";
	}
});

addWordToDOM();
