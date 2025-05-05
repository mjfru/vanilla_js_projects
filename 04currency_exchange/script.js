//* Fetch Demo:
// function calculate() {
// 	fetch("items.json")
// 		.then((response) => response.json())
// 		// .then((data) => console.log(data))
// 		.then((data) => (document.body.innerHTML = data[0].text));
// }

// calculate();

//* DOM Elements:
const currencyElementOne = document.getElementById("currency-one");
const currencyElementTwo = document.getElementById("currency-two");
const amountElementOne = document.getElementById("amount-one");
const amountElementTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swapBtn = document.getElementById("swap");

//* Fetch the Exchange Rates & Update DOM
const calculate = () => {
	const currencyOne = currencyElementOne.value;
	const currencyTwo = currencyElementTwo.value;

	fetch(`https://open.exchangerate-api.com/v6/latest/${currencyOne}`)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
			const selectedRate = data.rates[currencyTwo];
			// console.log(rate);
			rate.innerText = `1 ${currencyOne} = ${selectedRate} ${currencyTwo}`;
			amountElementTwo.value = (amountElementOne.value * selectedRate).toFixed(
				2
			);
		});
};

//* Event Listeners:
currencyElementOne.addEventListener("change", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
amountElementTwo.addEventListener("input", calculate);

swapBtn.addEventListener("click", () => {
	const tempVariable = currencyElementOne.value;
	currencyElementOne.value = currencyElementTwo.value;
	currencyElementTwo.value = tempVariable;
	calculate();
});

calculate();
