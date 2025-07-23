const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh/";

// Search by song or artist
async function searchSongs(searchTerm) {
	const res = await fetch(`${apiURL}/suggest/${searchTerm}}`);
	const data = await res.json();
	// console.log(data);
  showData(data);
}

// Show Song & Artist
function showData(data) {
  return;
}

// Event Listeners:
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const searchTerm = search.value.trim();

	if (!searchTerm) {
		alert("Please type in a search term.");
	} else {
		searchSongs(searchTerm);
	}
});
