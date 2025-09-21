let firstNumber;
let secondNumber;
let currentOperator;
let currentInput = "";

const display = document.querySelector("#display");
const numberBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn")

numberBtns.forEach(button => {
    button.addEventListener('click', () => appendValue(button.value));
});

operatorBtns.forEach(button => {
    button.addEventListener('click', () => handleOperation(button.value));
})

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

        let result = parseFloat(operate(currentOperator, firstNumber, secondNumber).toFixed(10));
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
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}