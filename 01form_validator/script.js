const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm-password");

// Functions
function showError(input, message) {
	// The parent element is the form control for each label / input
	const formControl = input.parentElement;
	formControl.className = "form-control error";
	const small = formControl.querySelector("small");
	small.innerText = message;
}

function isValidEmail(email) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
}

function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

// Event Listeners:
form.addEventListener("submit", function (e) {
	e.preventDefault();
	// console.log("submit");
	// console.log(username.value);
	if (username.value === "") {
		showError(username, "Username is required.");
	} else {
		showSuccess(username);
	}

	if (email.value === "") {
		showError(email, "Email is required");
	} else if (!isValidEmail(email.value)) {
		showError(email, "Email is not valid.");
	} else {
		showSuccess(email);
	}
});
