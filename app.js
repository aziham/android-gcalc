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

/* ShuntingYardConversion function: Takes an array representing a mathematical expression in infix notation and converts it to postfix notation using the Shunting Yard Algorithm. It uses a stack to manage operators and applies precedence rules to create the postfix expression.

	Parameters:
	- infixNotation: An array representing the mathematical expression in infix notation.

	Returns:
	- An array representing the mathematical expression in postfix notation. */
const shuntingYardConversion = infixNotation => {
	// Result array for postfix notation
	const postfixNotation = [];
	// Stack to manage operators during conversion
	const operatorsStack = [];
	// Precedence rules for different operators
	const operators = [
		{symbol: "+", precedence: 1},
		{symbol: "-", precedence: 1},
		{symbol: "×", precedence: 2},
		{symbol: "÷", precedence: 2},
		{symbol: "%", precedence: 2},
	]

	for (const token of infixNotation) {
		if (typeof token === "number")
			postfixNotation.push(token);
		// If the token is an operator or parenthesis
		else if (/[\+\-×÷%()]/.test(token)) {
			// If the operators stack is empty or the operator is open parenthesis
			if (operatorsStack.length === 0 || token === "(")
				operatorsStack.push(token);

			else if (token === ")")
				// Pop operators from the stack and push them to the postfixNotation array until an opening parenthesis is encountered
				while (true) {
					const lastOperator = operatorsStack.pop();
					if (lastOperator === "(")
						break;
					postfixNotation.push(lastOperator);
				}

			else {
				// Handling precedence rules for operators
				const lastOperator = operatorsStack[operatorsStack.length - 1];
				const currentOperatorObj = operators.find(operator => operator.symbol === token);
				const lastOperatorObj = operators.find(operator => operator.symbol === lastOperator);

				if (lastOperator !== "(" && lastOperatorObj.precedence >= currentOperatorObj.precedence) {
					postfixNotation.push(operatorsStack.pop());
					operatorsStack.push(token);
				}
				else
					operatorsStack.push(token);
			}
		}
	}

	// Pop any remaining operators from the stack and push them to the postfix notation array
	while (operatorsStack.length !== 0)
		postfixNotation.push(operatorsStack.pop());

	// Return the final postfix notation array
	return postfixNotation;
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
