const postsContainer = document.getElementById("posts-container");
const filter = document.getElementById("filter");

const loading = document.querySelector(".loader");

// Globals
let limit = 5;
let page = 1;
let isLoading = false;

// Fetch Posts from API
const getPosts = async () => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
	);

	const data = await response.json();
	return data;
};

// Show Posts in DOM
const showPosts = async () => {
	const posts = await getPosts();
	// console.log(posts);
	posts.forEach((post) => {
		const postElement = document.createElement("div");
		postElement.classList.add("post");
		postElement.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
		postsContainer.appendChild(postElement);
	});
};



// Show Loader & Fetch More Posts:
const showLoading = () => {
	if (isLoading) {
		return;
	}

	page++;
	isLoading = true;
	loading.classList.add("show");

	setTimeout(() => {
		showPosts();
		isLoading = false;
		loading.classList.remove("show");
	}, 1000);
};

// Infinite Scrolling:
window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	if (scrollTop + clientHeight >= scrollHeight) {
		console.log("Big scroll detected");
		showLoading();
	}
});

// Filtering Posts
// Filtering By Input:
function filterPosts(e) {
	const term = e.target.value.toUpperCase();
	const posts = document.querySelectorAll(".post");

	posts.forEach((post) => {
		const title = post.querySelector(".post-title").innerText.toUpperCase();
		const body = post.querySelector(".post-body").innerText.toUpperCase();

		if (title.indexOf(term) > 1 || body.indexOf(term) > -1) {
			post.style.display = "flex";
		} else {
			post.style.display = "none";
		}
	});
}

filter.addEventListener("input", filterPosts);

// Show Initial Posts:
showPosts();