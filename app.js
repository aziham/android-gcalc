const btnsContainer = document.querySelector(".controls");

/* Functions for basic math operations */

// Addition function
const add = (num1, num2) => num1 + num2;

// Subtraction function
const subtract = (num1, num2) => num1 - num2;

// Multiplication function
const multiply = (num1, num2) => num1 * num2;












// Handling buttons animation
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
