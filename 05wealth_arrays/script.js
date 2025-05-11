//* DOM Elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showBtn = document.getElementById("show-millionaires");
const calculateBtn = document.getElementById("calculate-wealth");

// The people we generate will be here:
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//* Fetching a random user, adding wealth
async function getRandomUser() {
	const res = await fetch("https://randomuser.me/api");
	const data = await res.json();
	// console.log(data);

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		wealth: Math.floor(Math.random() * 1000000),
	};

	// console.log(newUser);
	addData(newUser);
}

//* Double All Users' Money
function doubleMoney() {
	data = data.map((user) => {
		return { ...user, wealth: user.wealth * 2 };
	});
	updateDOM();
}

//* Adding our new object / user to the data array:
function addData(object) {
	data.push(object);
	updateDOM();
}

//* Updating the DOM:
function updateDOM(providedData = data) {
	// Clearing the main div:
	main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

	providedData.forEach((item) => {
		const element = document.createElement("div");
		element.classList.add("person");
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
			item.wealth
		)}`;
		main.appendChild(element);
	});
}

//* Formating Number as Money
function formatMoney(number) {
	return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//* Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
