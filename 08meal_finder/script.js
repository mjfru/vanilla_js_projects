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

// Fetch Meal by ID
function getMealById(mealID) {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			const meal = data.meals[0];
			addMealToDOM(meal);
		});
}

// Fetch Random Meal
function getRandomMeal() {
	// Clear meals and heading
	meals.innerHTML = "";
	resultHeading.innerHTML = "";
	fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
		.then((response) => response.json())
		.then((data) => {
			const meal = data.meals[0];
			addMealToDOM(meal);
		});
}

// Add Meal to DOM
function addMealToDOM(meal) {
	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
			);
		} else {
			break;
		}
	}

	singleMealElement.innerHTML = `
  <div class="single-meal">
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h3>Ingredients</h3>
      <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
    </div>
  </div>
  `;
}

// Event Listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsElement.addEventListener("click", (e) => {
	const mealInfo = e.composedPath().find((item) => {
		if (item.classList) {
			return item.classList.contains("meal-info");
		} else {
			return false;
		}
	});

	if (mealInfo) {
		const mealID = mealInfo.getAttribute("data-mealid");
		console.log(mealID);
		getMealById(mealID);
	}
});
