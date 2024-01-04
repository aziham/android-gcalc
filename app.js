const btnsContainer = document.querySelector(".controls");

/* Functions for basic math operations */

// Addition function
const add = (num1, num2) => num1 + num2;

// Subtraction function
const subtract = (num1, num2) => num1 - num2;

// Multiplication function
const multiply = (num1, num2) => num1 * num2;

// Division function
const divide = (num1, num2) => num1 / num2;

// Remainder (Modulo) function
const remainder = (num1, num2) => num1 % num2;


/* Operate function: Performs a mathematical operation on two numbers based on the given operator */
const operate = (operator, num1, num2) => {
	let result;

	switch (operator) {
		case "+":
			result = add(num1, num2);
			break;
		case "-":
			result = subtract(num1, num2);
			break;
		case "×":
			result = multiply(num1, num2);
			break;
		case "÷":
			result = divide(num1, num2);
			break;
		case "%":
			result = remainder(num1, num2);
			break;
		default:
			result = "Invalid Operation!";
			break;
	}

	return result;
}





/* Handling buttons animation */
const handleMouseUp = event => {
	event.target.classList.remove("btn-radius");
	setTimeout(() => {
		event.target.classList.remove("btn-overlay");
	}, 100);
}

const handleMouseDown = event => {
	let btn = event.target;
	btn.classList.add("btn-radius");
	btn.classList.add("btn-overlay");
	btn.addEventListener("mouseup", handleMouseUp);
}

btnsContainer.addEventListener("mousedown", handleMouseDown);
