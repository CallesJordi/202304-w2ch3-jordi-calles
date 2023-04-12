const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");
const buttonsOperator = document.querySelectorAll(".buttonoperator");
const buttonEqual = document.querySelector(".buttonequal");
const buttonAc = document.querySelector(".buttonac");
const buttonDot = document.querySelector(".buttondot");

let actualNumber = "";
let previousNumber = "";
let operation = "";
let mustStop = false;
const screenMaxLength = 13;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (screen.textContent === "Error") {
      clearScreen();
      addNumbers(button.innerHTML);
    } else if (mustStop === true) {
      clearScreen();
      addNumbers(button.innerHTML);
    } else {
      addNumbers(button.innerHTML);
    }
  });
});

buttonsOperator.forEach((buttonoperator) => {
  buttonoperator.addEventListener("click", () => {
    mustStop = false;
    if (screen.textContent.includes("-")) {
      actualNumber = -actualNumber;
    }

    if (buttonoperator.id === "+/-") {
      addNegativeOrPositive();
      return;
    }

    addNumbers(buttonoperator.innerHTML);
    selectOperation(buttonoperator.innerHTML);
  });
});

buttonEqual.addEventListener("click", () => {
  calculate();
  updateScreen();
  showTotalNumbers();
  mustStop = true;
});

buttonAc.addEventListener("click", () => {
  updateScreen();
  clearScreen();
});

buttonDot.addEventListener("click", () => {
  if (screen.textContent.includes(".")) {
    return;
  }

  addNumbers(buttonDot.innerHTML);
});

const showTotalNumbers = () => {
  if (screen.textContent.length > screenMaxLength) {
    screen.textContent = screen.textContent.slice(0, screenMaxLength);
  }
};

const addNegativeOrPositive = () => {
  screen.textContent = -screen.textContent;
};

const selectOperation = (operator) => {
  if (actualNumber === "") return;

  if (previousNumber !== "") {
    calculate();
    showTotalNumbers();
  }

  operation = operator.toString();
  previousNumber = actualNumber;
  actualNumber = "";
};

const addNumbers = (number) => {
  actualNumber = actualNumber.toString() + number.toString();
  updateScreen();
  showTotalNumbers();
};

const calculate = () => {
  let calculatedOperation;
  const previous = parseFloat(previousNumber);
  const actual = parseFloat(actualNumber);

  if (isNaN(previous) || isNaN(actual)) return;

  switch (operation) {
    case "+":
      calculatedOperation = previous + actual;
      previousNumber = calculatedOperation;
      screen.textContent = previousNumber;
      break;

    case "-":
      calculatedOperation = previous - actual;
      previousNumber = calculatedOperation;
      screen.textContent = previousNumber;
      break;

    case "*":
      calculatedOperation = previous * actual;
      previousNumber = calculatedOperation;
      screen.textContent = previousNumber;
      break;

    case "/":
      if (actual === 0) {
        calculatedOperation = "Error";
      } else {
        calculatedOperation = previous / actual;
        previousNumber = calculatedOperation;
        screen.textContent = previousNumber;
      }

      break;
    default:
      return;
  }

  actualNumber = calculatedOperation;
  operation = "";
  previousNumber = "";
};

const updateScreen = () => {
  screen.textContent = actualNumber;
};

const clearScreen = () => {
  screen.textContent = "0";
  actualNumber = "";
  previousNumber = "";
  operation = undefined;
  mustStop = false;
};
