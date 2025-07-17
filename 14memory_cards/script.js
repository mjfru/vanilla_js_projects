// DOM Elements
const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card:
let currentActiveCard = 0;

// Store DOM cards:
const cardsEl = [];

// Store card data:
// Using localStorage:
const cardsData = getCardsData();

// const cardsData = [
// 	{
// 		question: "What must a variable begin with?",
// 		answer: "A letter, $, or _",
// 	},
// 	{
// 		question: "What is a variable?",
// 		answer: "Container for a piece of data",
// 	},
// 	{
// 		question: "Example of a case sensitive varible...",
// 		answer: "thisIsAVariable",
// 	},
// ];

// Create all cards
function createCardDeck() {
	cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single flashcard in the DOM:
function createCard(data, index) {
	const card = document.createElement("div");
	card.classList.add("card");
	if (index === 0) {
		card.classList.add("active");
	}
	card.innerHTML = `
    <div class="inner-card">
			<div class="inner-card-front">
				<p>${data.question}</p>
			</div>
			<div class="inner-card-back">
				<p>${data.answer}</p>
			</div>
		</div>
  `;

	// Listening to a click to flip the card:
	card.addEventListener("click", () => card.classList.toggle("show-answer"));

	// Add to DOM card deck
	cardsEl.push(card);
	cardsContainer.appendChild(card);
	updateCurrentText();
}

// Update the card tracker / show number of cards
function updateCurrentText() {
	currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage:
function getCardsData() {
	const cards = JSON.parse(localStorage.getItem("cards"));
	return cards === null ? [] : cards;
}

// Setting an initial deck of cards or setting new cards to a deck:
function setCardsData(cards) {
	localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

// Calling the function:
createCardDeck();

//! Event Listeners
// Next button:
nextBtn.addEventListener("click", () => {
	cardsEl[currentActiveCard].className = "card left";

	// Get new card index:
	currentActiveCard = currentActiveCard + 1;

	// Keep it within the range / length of the array:
	if (currentActiveCard > cardsEl.length - 1) {
		currentActiveCard = cardsEl.length - 1;
	}
	cardsEl[currentActiveCard].className = "card active";
	updateCurrentText();
});

// Previous button:
prevBtn.addEventListener("click", () => {
	cardsEl[currentActiveCard].className = "card right";

	currentActiveCard = currentActiveCard - 1;

	if (currentActiveCard < 0) {
		currentActiveCard = 0;
	}
	cardsEl[currentActiveCard].className = "card active";
	updateCurrentText();
});

// Show add container:
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
// Hide add container:
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new card
addCardBtn.addEventListener("click", () => {
	const question = questionEl.value;
	const answer = answerEl.value;
	if (question.trim() && answer.trim()) {
		const newCard = { question, answer };
		createCard(newCard);
		questionEl.value = "";
		answerEl.value = "";

		addContainer.classList.remove("show");
		cardsData.push(newCard);
		setCardsData(cardsData);
	}
});

// Clear cards button:
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
})