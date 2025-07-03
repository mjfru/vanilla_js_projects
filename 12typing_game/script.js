// DOM Elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const endgameElement = document.getElementById("end-game-container");

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

// Initial score
let score = 0;

// Initial time:
let time = 10;

// Set difficulty:
let difficulty =
	localStorage.getItem("difficulty") !== null
		? localStorage.getItem("difficulty")
		: "medium";

// Set difficulty select value:
difficultySelect.value = difficulty;

// Focus text on start:
text.focus();

// Start timer:
const timeInterval = setInterval(updateTime, 1000);

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

// Update time:
function updateTime() {
	time--;
	timeElement.innerHTML = time + "s";

	if (time === 0) {
		clearInterval(timeInterval);
		// End Game:
		gameOver();
	}
}

// End game, show end screen
const gameOver = () => {
	endgameElement.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is: ${score}.</p>
    <button onClick={location.reload()}>Reload</button>
  `;

	endgameElement.style.display = "flex";
};

addWordToDOM();
// Event Listeners:

// Typing:
text.addEventListener("input", (e) => {
	const insertedText = e.target.value;

	if (insertedText === randomWord) {
		addWordToDOM();
		updateScore();
		e.target.value = "";
		if (difficulty === "hard") {
			time += 2;
		} else if (difficulty === "medium") {
			time += 3;
		} else {
			time += 4;
		}
		updateTime();
	}
});

// Settings button:
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select (difficulty)
settingsForm.addEventListener("change", (e) => {
	difficulty = e.target.value;
	localStorage.setItem("difficulty", difficulty);
});
