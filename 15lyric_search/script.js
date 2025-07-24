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
	let output = "";
	data.data.forEach((song) => {
		output += `
      <li>
        <span>
          <strong>${song.artist.name}</strong> - ${song.title}
        </span>
        <button class="btn" data-artist=${song.artist.name} data-songtitle=${song.title}>Get Lyrics</button>
      </li>
    `;
	});
	result.innerHTML = `
    <ul class="songs">
      ${output}
    </ul>
  `;

	if (data.prev || data.next) {
		more.innerHTML = `
      ${
				data.prev
					? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>`
					: ""
			}
      ${
				data.next
					? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>`
					: ""
			}
    `;
	} else {
		more.innerHTML = "";
	}
}

// Get Prev / Next Results:
async function getMoreSongs(url) {
	const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
	const data = await res.json();
	// console.log(data);
	showData(data);
}

// Get Lyrics for a song:
async function getLyrics(artist, songTitle) {
	const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
	const data = await res.json();
	// console.log(data);
	const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
	result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;
	more.innerHTML = "";
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

// Get Lyrics on Button Click
result.addEventListener("click", (e) => {
	const clickedButton = e.target;
	if (clickedButton.tagName === "BUTTON") {
		const artist = clickedButton.getAttribute("data-artist");
		const songTitle = clickedButton.getAttribute("data-songtitle");
	}
	getLyrics(artist, songTitle);
});
