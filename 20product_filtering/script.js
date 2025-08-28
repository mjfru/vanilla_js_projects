const products = [
	{
		name: "Sony Playstation 5",
		url: "images/playstation_5.png",
		type: "games",
		price: 499.99,
	},
	{
		name: "Samsung Galaxy",
		url: "images/samsung_galaxy.png",
		type: "smartphones",
		price: 399.99,
	},
	{
		name: "Cannon EOS Camera",
		url: "images/cannon_eos_camera.png",
		type: "cameras",
		price: 749.99,
	},
	{
		name: "Sony A7 Camera",
		url: "images/sony_a7_camera.png",
		type: "cameras",
		price: 1999.99,
	},
	{
		name: "LG TV",
		url: "images/lg_tv.png",
		type: "televisions",
		price: 799.99,
	},
	{
		name: "Nintendo Switch",
		url: "images/nintendo_switch.png",
		type: "games",
		price: 299.99,
	},
	{
		name: "Xbox Series X",
		url: "images/xbox_series_x.png",
		type: "games",
		price: 499.99,
	},
	{
		name: "Samsung TV",
		url: "images/samsung_tv.png",
		type: "televisions",
		price: 1099.99,
	},
	{
		name: "Google Pixel",
		url: "images/google_pixel.png",
		type: "smartphones",
		price: 499.99,
	},
	{
		name: "Sony ZV1F Camera",
		url: "images/sony_zv1f_camera.png",
		type: "cameras",
		price: 799.99,
	},
	{
		name: "Toshiba TV",
		url: "images/toshiba_tv.png",
		type: "televisions",
		price: 499.99,
	},
	{
		name: "iPhone 14",
		url: "images/iphone_14.png",
		type: "smartphones",
		price: 999.99,
	},
];

// DOM Elements
const productsWrapper = document.getElementById("products-wrapper");
const checkEls = document.querySelectorAll(".check");
const filtersContainer = document.getElementById("filters-container");
const searchInput = document.getElementById("search");
const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");

// Initializing the cart item count:
let cartItemCount = 0;

// Initializing the products:
const productElements = [];

// Toggle add/remove from cart:
const addToCart = (e) => {
	const statusElement = e.target;
	console.log(statusElement);
	if (statusElement.classList.contains("added")) {
		// Remove from cart:
		statusElement.classList.remove("added");
		statusElement.innerText = "Add to Cart";
		statusElement.classList.add("bg-gray-800");
		statusElement.classList.remove("bg-red-600");
		cartItemCount--;
	} else {
		// Add to cart:
		statusElement.classList.add("added");
		statusElement.innerText = "Remove from Cart";
		statusElement.classList.remove("bg-gray-800");
		statusElement.classList.add("bg-red-600");
		cartItemCount++;
	}
	// Update the cart item count:
	cartCount.innerText = cartItemCount.toString();
};

// Creating a product element:
const createProductElement = (product) => {
	const productElement = document.createElement("div");
	productElement.className = "item space-y-2";
	productElement.innerHTML = `
          <div
						class="bg-gray-100 flex-justify-center relative overflow-hidden group cursor-pointer border"
					>
						<img
							src="${product.url}"
							alt="${product.name}"
							class="w-full h-full object-cover"
						/>
						<span
							class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
							>Add To Cart</span
						>
					</div>
					<p class="text-xl">${product.name}</p>
					<strong>$${product.price.toLocaleString()}</strong>`;

	productElement.querySelector(".status").addEventListener("click", addToCart);
	return productElement;
};

// Looping over the products and creating the individual elements:
products.forEach((product) => {
	const productElement = createProductElement(product);
	productElements.push(productElement);
	productsWrapper.appendChild(productElement);
});

// Filter Products Function (Search or checkbox):
const filterProducts = () => {
	// Get the search term:
	const searchTerm = searchInput.value.trim().toLowerCase();
	// Get checked categories:
	const checkedCategories = Array.from(checkEls)
		.filter((check) => check.checked)
		.map((check) => check.id);

	// console.log(checkedCategories);

	// Loop over products and check for matches:
	productElements.forEach((productEl, index) => {
		const filteredProduct = products[index];
		// Check to see if product matches the search / checked categories:
		const matchesSearchTerm = filteredProduct.name
			.toLowerCase()
			.includes(searchTerm);
		const isInCheckedCategory =
			checkedCategories.length === 0 ||
			checkedCategories.includes(filteredProduct.type);

		// Show or hide product based on matches:
		if (matchesSearchTerm && isInCheckedCategory) {
			productEl.classList.remove("hidden");
		} else {
			productEl.classList.add("hidden");
		}
	});
};

// Add filter event listener:
filtersContainer.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);
