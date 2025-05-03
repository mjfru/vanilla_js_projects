//! DOM Elements
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = parseInt(movieSelect.value);

//! Save selected movie index & price:
const setMovieData = (movieIndex, moviePrice) => {
	localStorage.setItem("selectedMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", moviePrice);
};

//! Update Total & Count:
const updateSelectedCount = () => {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");
	// console.log(selectedSeats);

	//* Copy the selected seats into an array
	//* Map through the array, returning a new array of indexes
	const seatsIndex = [...selectedSeats].map((seat) => {
		return [...seats].indexOf(seat);
	});

	// console.log(seatsIndex);

	//* Using local storage:
	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;
	// console.log(selectedSeatsCount);

	count.innerText = selectedSeatsCount;
	total.innerText = "$" + selectedSeatsCount * ticketPrice;
};

//! Populate the UI w/ Local Storage:
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
	console.log(selectedSeats);
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

//! Movie / Ticket Select Event:
movieSelect.addEventListener("change", (e) => {
	ticketPrice = parseInt(e.target.value);
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

//! Seat Click Event:
container.addEventListener("click", (e) => {
	// console.log(e.target);
	if (
		e.target.classList.contains("seat") &&
		!e.target.classList.contains("occupied")
	) {
		// console.log(e.target);
		e.target.classList.toggle("selected");

		updateSelectedCount();
	}
});

//! Initial Count & Total:
updateSelectedCount();