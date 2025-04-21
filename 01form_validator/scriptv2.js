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
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(email.value.trim())) {
		showSuccess(email);
	} else {
		showError(email, "Email is not in a valid format.");
	}
}

function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check Required Fields
function checkRequired(inputArray) {
	inputArray.forEach(function (input) {
		// console.log(input);
		if (input.value.trim() === "") {
			// showError(input, `${input.id.toUpperCase()} is required.`);
			showError(input, `${getFieldName(input)} is required.`);
		} else {
			showSuccess(input);
		}
	});
}

// Check Length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters.`
		);
	} else if (input.value.length > max) {
		showError(input, `${getFieldName(input)} must be less than ${max}.`);
	} else {
		showSuccess(input);
	}
}

// Check Passwords
function checkPasswords(password1, password2) {
	if (password1.value !== password2.value) {
		showError(password2, "Passwords do not match.");
	}
}

// Event Listeners:
form.addEventListener("submit", function (e) {
	e.preventDefault();
	checkRequired([username, email, password, confirmPass]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	isValidEmail(email);
	checkPasswords(password, confirmPass);
});
