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

/* Tokenize function: Takes a mathematical expression as a string and tokenizes it, breaking it down into individual elements such as numbers, operators, and parentheses. The resulting array represents the expression in infix notation */
const tokenize = expression => {
	const infixNotation = [];
	let currentToken = "";

	for (const char of expression) {
		// Check if the character is a digit or decimal point
		if (/\d|\./.test(char)) {
			currentToken += char;
		}
		// Check if the character is an operator or parenthesis
		else if (/[\+\-×÷%()]/.test(char)) {
			// If there's a current token, push it to infixNotation[]
			if (currentToken !== "") {
				infixNotation.push(parseFloat(currentToken));
				// Preparing the currentToken for the next iteration
				currentToken = "";
			}
			// Push the operator or parenthesis after the currentToken is pushed
			infixNotation.push(char);
		}
	}

	// Push the last token in the input expression if it's not an empty string
	if (currentToken !== "")
		infixNotation.push(parseFloat(currentToken));

	return infixNotation;
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
