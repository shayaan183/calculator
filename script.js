let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let currentInput = "";

const display = document.querySelector("#display");
const numberBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const clearBtn = document.querySelector(".clear-btn");

numberBtns.forEach(button => {
    button.addEventListener('click', () => appendValue(button.value));
});

operatorBtns.forEach(button => {
    button.addEventListener('click', () => handleOperation(button.value));
});

clearBtn.addEventListener('click', () => clearCalculator());

function appendValue(number) {
    currentInput += number;
    display.textContent = currentInput;
}

function handleOperation(operator) {
    if (currentOperator == null) {
        if (currentInput === "") return;

        firstNumber = Number(currentInput);
        currentOperator = operator;
        currentInput = "";
        display.textContent = "";
    } else {
        if (currentInput === "") {
            if (operator != "=") {
                currentOperator = operator;
            }
            return;
        }
        secondNumber = Number(currentInput);

        let result = operate(currentOperator, firstNumber, secondNumber);
        display.textContent = result;

        firstNumber = result;
        secondNumber = null;
        currentInput = "";

        if (operator === "=") {
            currentOperator = null;
        } else {
            currentOperator = operator;
        }
    }

    console.log("firstNumber: ", firstNumber);
    console.log("secondNumber: ", secondNumber);
    console.log("currentOperator: ", currentOperator);
    console.log("currentInput:", currentInput);
}

function clearCalculator() {
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    currentInput = "";
    display.textContent = "";
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