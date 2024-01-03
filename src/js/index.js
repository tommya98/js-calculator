function App() {
  const $digits = document.querySelector(".digits");
  const $operations = document.querySelector(".operations");
  const $total = document.querySelector("#total");

  const handleDigitClick = (e) => {
    if (!e.target.classList.contains("digit")) return;
    const currentTotal = $total.innerText;
    const newDigit = e.target.innerText;
    $total.innerText =
      currentTotal === "0" ? newDigit : currentTotal + newDigit;
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
    $total.innerText = isOperationAgain
      ? currentTotal.substr(0, currentTotal.length - 1) + newOperation
      : currentTotal + newOperation;
  };

  const calculate = (expression) => {
    let result = 0;
    if (expression.includes("+")) {
      const [first, second] = expression.split("+");
      result = parseInt(first) + parseInt(second);
    } else if (expression.includes("-")) {
      const [first, second] = expression.split("-");
      result = parseInt(first) - parseInt(second);
    } else if (expression.includes("X")) {
      const [first, second] = expression.split("X");
      result = parseInt(first) * parseInt(second);
    } else if (expression.includes("/")) {
      const [first, second] = expression.split("/");
      result = Math.floor(parseInt(first) / parseInt(second));
    }
    $total.innerText = result;
  };

  $digits.addEventListener("click", handleDigitClick);
  $operations.addEventListener("click", handleOperationClick);
}

App();
