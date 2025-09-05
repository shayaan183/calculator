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
        firstNumber = Number(currentInput);
        currentOperator = operator;
        currentInput = "";
        display.textContent = "";
    } else {
        if (operator == "=") {
            secondNumber = Number(currentInput);
            let finalValue = operate(currentOperator, firstNumber, secondNumber);
            display.textContent = finalValue;
        }
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