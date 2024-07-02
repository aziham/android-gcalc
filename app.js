/* Functions for basic math operations */

// Addition function
const add = (num1, num2) => num1 + num2;

// Subtraction function
const subtract = (num1, num2) => num1 - num2;

// Multiplication function
const multiply = (num1, num2) => num1 * num2;

// Division function
const divide = (num1, num2) => num1 / num2;


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
		{symbol: "+", precedence: 1, associativity: "left"},
		{symbol: "-", precedence: 1, associativity: "left"},
		{symbol: "×", precedence: 2, associativity: "left"},
		{symbol: "÷", precedence: 2, associativity: "left"},
		{symbol: "%", precedence: 3, associativity: "right"},
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
				const currentOperatorObj = operators.find(op => op.symbol === token);
        		while (operatorsStack.length > 0) {
          			const lastOperator = operatorsStack[operatorsStack.length - 1];
          			const lastOperatorObj = operators.find(op => op.symbol === lastOperator);
          			if ( lastOperator !== "(" && (lastOperatorObj.precedence > currentOperatorObj.precedence || (lastOperatorObj.precedence === currentOperatorObj.precedence && currentOperatorObj.associativity === "left")))
            			postfixNotation.push(operatorsStack.pop());
 					else
            			break;
				}
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

/* RpnEvaluation function: Takes an array representing a mathematical expression in postfix notation and evaluates it using the Reverse Polish Notation (RPN) algorithm.

	Parameters:
	- postfixNotation: An array representing the mathematical expression in postfix notation.

	Returns:
	- The result of the evaluated mathematical expression. */
const rpnEvaluation = postfixNotation => {
	// Operand stack for RPN evaluation
	const operandsStack = [];

	postfixNotation.forEach((token, index) => {
		// If the token is an operator
		if (typeof token !== "number") {
			// Pop the required operands from the stack
			const secondOperand = operandsStack.pop();
			const firstOperand = operandsStack.pop();
			// If the operator is a % sign
			// https://devblogs.microsoft.com/oldnewthing/20080110-00/?p=23853
			if (token === "%") {
				if (firstOperand !== undefined) {
					// Push the first operand back to the operands stack
					operandsStack.push(firstOperand);
					// If the next operator is (× || ÷) we need to change the behavior of the % sign to not use the 1st operand in the calculation
					const nextToken = postfixNotation[index + 1];
					if (nextToken === "×" || nextToken === "÷")
						operandsStack.push(secondOperand / 100);
					// Calculate the percentage using the 1st and 2nd operands and push back the result to the operands stack, when the next operator is (+ || -)
					else
						operandsStack.push(firstOperand * secondOperand / 100);
				}
				else
					operandsStack.push(secondOperand / 100);
			}
			// If the operator is (+ || - || × || ÷), apply the operator and push the result back onto the stack
			else
				operandsStack.push(operate(token,firstOperand,secondOperand));
		}

		// If the token is an operand, push it onto the stack
		else
			operandsStack.push(token);
	});

	// The final result of the RPN evaluation, rounded to avoid floating-point precision issues
    return Math.round(operandsStack.pop() * 100) / 100;
}

/* Handling UI Interactions */
const btnsContainer = document.querySelector(".controls");
const expressionField = document.querySelector("#expressionField");
const operators = ["%", "÷", "×", "-", "+"];
const parentheses = ["(", ")"];
const openParenthesis = "(";
const closeParenthesis = ")";
const decimalPoint = ".";
let openParenthesisCounter = 0;

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
	addToInputField(btn);
}

btnsContainer.addEventListener("mousedown", handleMouseDown);

expressionField.addEventListener("blur", event => event.target.focus());

const addToInputField = btn => {
	if (btn.classList.contains("clear"))
		handleClearBtnClick(expressionField);
	else if(btn.classList.contains("delete"))
		handleDeleteBtnClick(expressionField);
	else if (btn.classList.contains("digit"))
		handleDigitBtnClick(btn.textContent, expressionField);
	else if (btn.classList.contains("operator"))
		handleOperatorBtnClick(btn.textContent, expressionField);
	else if (btn.classList.contains("dicimal-point"))
		handleDicimalBtnClick(decimalPoint, expressionField);
	else if(btn.classList.contains("parentheses"))
		handleParenthesesBtnClick(expressionField);
	else if(btn.classList.contains("equals"))
		handleEqualsBtnClick(expressionField);
}

// Helper Functions
function handleClearBtnClick(expressionField) {
	expressionField.value = '';
}

function handleDeleteBtnClick(expressionField) {
	expressionField.value = expressionField.value.slice(0, -1);
}

function handleDigitBtnClick(digit, expressionField) {
	expressionField.value += digit;
}

function handleOperatorBtnClick(operator, expressionField) {
	const lastCharacter = expressionField.value.slice(-1);

	if (lastCharacter === decimalPoint)
		return;
	else if (expressionField.value === '' || lastCharacter === openParenthesis)
		return;
	else if ((operators.includes(lastCharacter) && lastCharacter !== '%') || (lastCharacter === '%' && operator === '%')) {
		expressionField.value = expressionField.value.slice(0, -1); // Pop
		expressionField.value += operator; // Push
	}
	else
		expressionField.value += operator;
}

function handleDicimalBtnClick(dicimalPoint, expressionField) {
	const tokenizedExp = expressionField.value.split(/[\+\-\÷\×]/);
	const lastToken = tokenizedExp.pop();
	const lastCharacter = lastToken.slice(-1);

	if (lastToken.includes(dicimalPoint) || lastCharacter === closeParenthesis)
		return;
	else
		expressionField.value += dicimalPoint;
}

function handleParenthesesBtnClick(expressionField) {
	const lastCharacter = expressionField.value.slice(-1);
	
	if (expressionField.value === '' || operators.includes(lastCharacter) || lastCharacter === openParenthesis) {
		expressionField.value += openParenthesis;
		++openParenthesisCounter;
	}
	else if (openParenthesisCounter > 0) {
		expressionField.value += closeParenthesis;
		--openParenthesisCounter;
	}
}

function handleEqualsBtnClick(expressionField) {
	const expression = expressionField.value;
	const infixNotation = tokenize(expression);
	const postfixNotation = shuntingYardConversion(infixNotation);
	const result = rpnEvaluation(postfixNotation);

	expressionField.value = result;
}
