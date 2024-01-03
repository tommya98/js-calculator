function App() {
  const $digits = document.querySelector(".digits");
  const $operations = document.querySelector(".operations");
  const $total = document.querySelector("#total");

  const operators = {
    "+": (first, second) => first + second,
    "-": (first, second) => first - second,
    X: (first, second) => first * second,
    "/": (first, second) => Math.floor(first / second),
  };

  const handleDigitClick = (e) => {
    if (!e.target.classList.contains("digit")) return;
    const currentTotal = $total.innerText;
    const newDigit = e.target.innerText;
    updateDisplay(currentTotal === "0" ? newDigit : currentTotal + newDigit);
  };

  const handleOperationClick = (e) => {
    if (!e.target.classList.contains("operation")) return;
    const currentTotal = $total.innerText;
    const newOperation = e.target.innerText;
    const isOperationAgain = isNaN(
      parseInt(currentTotal[currentTotal.length - 1])
    );
    if (newOperation === "=") {
      calculate(currentTotal);
      return;
    }
    updateDisplay(
      isOperationAgain
        ? currentTotal.substr(0, currentTotal.length - 1) + newOperation
        : currentTotal + newOperation
    );
  };

  const calculate = (expression) => {
    let result = 0;
    for (const operator in operators) {
      if (expression.includes(operator)) {
        const [first, second] = expression.split(operator);
        result = operators[operator](parseInt(first), parseInt(second));
      }
    }
    $total.innerText = result;
  };

  const updateDisplay = (value) => ($total.innerText = value);

  $digits.addEventListener("click", handleDigitClick);
  $operations.addEventListener("click", handleOperationClick);
}

App();
