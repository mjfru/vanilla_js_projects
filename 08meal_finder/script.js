// DOM Elements
const search = document.getElementById("search"),
	submit = document.getElementById("submit"),
	random = document.getElementById("random"),
	mealsElement = document.getElementById("meals"),
	resultHeading = document.getElementById("result-heading"),
	singleMealElement = document.getElementById("single-meal");

// Search Meals & Fetch from API
function searchMeal(e) {
	e.preventDefault();

	// Clear single meal
	singleMealElement.innerHTML = "";

	// Get the search term
	const term = search.value;
	// console.log(term);

	// Check for empty search
	if (term.trim()) {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

				if (data.meals === null) {
					resultHeading.innerHTML = `<p>There are no search results. Try again.</p>`;
				} else {
					mealsElement.innerHTML = data.meals
						.map((meal) => {
							return `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>`;
						})
						.join("");
				}
			});

		// Clear search text
		search.value = "";
	} else {
		alert("Please enter a search term.");
	}
}

// Event Listeners
submit.addEventListener("submit", searchMeal);
mealsElement.addEventListener("click", (e) => {
	const mealInfo = e.composedPath().find((item) => {
		if (item.classList) {
			return item.classList.contains("meal-info");
		} else {
			return false;
		}
	});

	console.log(mealInfo);
});
