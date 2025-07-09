// DOM Elements
const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readButton = document.getElementById("read");
const toggle = document.getElementById("toggle");
const closeButton = document.getElementById("close");

const data = [
	{
		image: "./imgs/drink.jpg",
		text: "I'm thirsty",
	},
	{
		image: "./imgs/food.jpg",
		text: "I'm hungry",
	},
	{
		image: "./imgs/tired.jpg",
		text: "I'm tired",
	},
	{
		image: "./imgs/hurt.jpg",
		text: "I'm hurt",
	},
	{
		image: "./imgs/happy.jpg",
		text: "I'm happy",
	},
	{
		image: "./imgs/angry.jpg",
		text: "I'm angry",
	},
	{
		image: "./imgs/sad.jpg",
		text: "I'm sad",
	},
	{
		image: "./imgs/scared.jpg",
		text: "I'm scared",
	},
	{
		image: "./imgs/outside.jpg",
		text: "I want to go outside",
	},
	{
		image: "./imgs/home.jpg",
		text: "I want to go home",
	},
	{
		image: "./imgs/school.jpg",
		text: "I want to go to school",
	},
	{
		image: "./imgs/grandma.jpg",
		text: "I want to go to grandma's",
	},
];

data.forEach(createBox);

// Create speech boxes:
function createBox(item) {
	// console.log(item);
	const box = document.createElement("div");
	const { image, text } = item;
	box.classList.add("box");
	box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  //TODO Speak event listener

  // Add to main div:
  main.appendChild(box);
}
