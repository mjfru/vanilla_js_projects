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
const cardsData = [
	{
		question: "What must a variable begin with?",
		answer: "A letter, $, or _",
	},
	{
		question: "Whati s a variable?",
		answer: "Container for a piece of data",
	},
	{
		question: "Example of a case sensitive varible...",
		answer: "thisIsAVariable",
	},
];

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

  
  // Update the card tracker / show number of cards
  function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
  }

  // Listening to a click to flip the card:
  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM card deck
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

createCardDeck();
