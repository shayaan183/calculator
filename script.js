let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let currentInput = "";
let isError = false;
let calculationFinished = false;

const previousDisplay = document.querySelector("#previous-display");
const currentDisplay = document.querySelector("#current-display");
const numberBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");

numberBtns.forEach(button => {
    button.addEventListener("click", () => appendNumber(button.value));
});

operatorBtns.forEach(button => {
    button.addEventListener("click", () => handleOperation(button.value));
});

deleteBtn.addEventListener("click", () => deleteNumber());
clearBtn.addEventListener("click", () => clearCalculator());

document.body.addEventListener("keydown", (e) => handleKeyboardInputs(e.key));

function appendNumber(number) {
    if (number === "." && currentInput.includes(".")) return;
    
    if (calculationFinished) {
        clearCalculator();
        calculationFinished = false;
    }

    if (currentInput.length >= 15) return;

    if (currentInput === "0" && number === "0") return;
    
    currentInput += number;
    currentDisplay.textContent = currentInput;
}

function handleOperation(operator) {
    if (isError) return;

    if (currentOperator == null) {
        if (currentInput === "" || operator === "=") return;

        firstNumber = Number(currentInput);
        currentOperator = operator;
        currentInput = "";
        previousDisplay.innerHTML = `${firstNumber} ${getOperatorSymbol(currentOperator)}`;
        currentDisplay.textContent = firstNumber;
    } else {
        if (currentInput === "") {
            if (operator != "=") {
                currentOperator = operator;
                previousDisplay.innerHTML = `${firstNumber} ${getOperatorSymbol(currentOperator)}`;
            }
            return;
        }
        secondNumber = Number(currentInput);

        let result = operate(currentOperator, firstNumber, secondNumber);

        if (typeof result === "string") {
            previousDisplay.innerHTML = `${firstNumber} ${getOperatorSymbol(currentOperator)} ${secondNumber} =`;
            currentDisplay.textContent = result;
            firstNumber = null;
            secondNumber = null;
            currentInput = "";
            isError = true;
            return;
        } else if (operator === "=") {
            previousDisplay.innerHTML = `${firstNumber} ${getOperatorSymbol(currentOperator)} ${secondNumber} =`;
            currentDisplay.textContent = result;
            currentOperator = null;
            calculationFinished = true;
        } else {
            currentOperator = operator;
            previousDisplay.innerHTML = `${result} ${getOperatorSymbol(currentOperator)}`;
            currentDisplay.textContent = result;
        }

        firstNumber = result;
        secondNumber = null;
        currentInput = "";
    }

    console.log("firstNumber: ", firstNumber);
    console.log("secondNumber: ", secondNumber);
    console.log("currentOperator: ", currentOperator);
    console.log("currentInput:", currentInput);
}

function deleteNumber() {
    currentInput = currentInput.slice(0, -1);
    currentDisplay.textContent = currentInput;
}

function clearCalculator() {
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    currentInput = "";
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
    isError = false;
}

function handleKeyboardInputs(key) {
    let isNumberOrDecimal = (!isNaN(key) || key === ".");
    let isOperator = (key === "+" || key === "-" || key === "*" || key === "/");
    let isEquals = (key === "=" || key === "Enter");
    let isDelete = (key === "Backspace" || key === "Delete");
    let isClear = (key.toLowerCase() === "c" || key === "Escape");
    
    if (isError && isNumberOrDecimal) {
        clearCalculator();
    }

    if (isNumberOrDecimal) {
        appendNumber(key);
    } else if (isOperator) { 
        handleOperation(key);
    } else if (isEquals) {
        handleOperation("=");
    } else if (isDelete) {
        deleteNumber();
    } else if (isClear) {
        clearCalculator();
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Division by zero? That's impossible!";
    }
    
    return a / b;
}

function operate(operator, a, b) {
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }

    if (typeof result === "string") {
        return result;
    }

    return parseFloat(result.toFixed(10));
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case '+':
            return "&plus;";
        case '-':
            return "&minus;";
        case '*':
            return "&times;";
        case '/':
            return "&divide;";
    }
}