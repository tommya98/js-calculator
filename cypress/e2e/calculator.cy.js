const clickDigitButtons = (digits = []) => {
  digits.forEach((digit) => {
    cy.get(".digit").contains(digit).click();
  });
};

const clickOperationButton = (operation) => {
  cy.get(".operation").contains(operation).click();
};

const clickACButton = () => {
  cy.get(".modifier").click();
};

const checkDisplayValue = (value) => {
  cy.get("#total").should("have.text", value);
};

const calculate = (first, operation, second, result) => {
  clickDigitButtons(first);
  clickOperationButton(operation);
  clickDigitButtons(second);
  clickOperationButton("=");
  checkDisplayValue(result);
};

describe("계산기 앱 테스트", () => {
  beforeEach("페이지 방문", () => {
    cy.visit("../../index.html");
  });

  it("디스플레이에 기본적으로 숫자 0이 표시된다.", () => {
    checkDisplayValue("0");
  });

  it("1개의 숫자 버튼을 클릭하면 display에 숫자가 표시된다.", () => {
    clickDigitButtons([1]);
    checkDisplayValue("1");
  });

  it("2개의 숫자 버튼을 클릭하면 display에 숫자가 표시된다.", () => {
    clickDigitButtons([1, 2]);
    checkDisplayValue("12");
  });

  it("3개의 숫자 버튼을 클릭하면 display에 숫자가 표시된다.", () => {
    clickDigitButtons([1, 2, 3]);
    checkDisplayValue("123");
  });

  it("1번째 숫자를 입력하고 연산자 버튼을 누르면 display에 연산자가 표시된다.", () => {
    clickDigitButtons([1, 2, 3]);
    clickOperationButton("+");
    checkDisplayValue("123+");
  });

  it("연산자 버튼을 여러 번 누르면 display에 마지막 연산자만 표시된다.", () => {
    clickDigitButtons([1, 2, 3]);
    clickOperationButton("+");
    clickOperationButton("-");
    checkDisplayValue("123-");
  });

  it("2번째 숫자를 입력하면 display에 2번째 숫자를 누적하여 표시한다.", () => {
    clickDigitButtons([1, 2, 3]);
    clickOperationButton("+");
    clickDigitButtons([4, 5, 6]);
    checkDisplayValue("123+456");
  });

  it("덧셈: 두 숫자를 입력하고 =버튼을 클릭하면 display에 연산의 결과값이 표시된다.", () => {
    calculate([1, 2, 3], "+", [4, 5, 6], "579");
  });

  it("뺄셈: 두 숫자를 입력하고 =버튼을 클릭하면 display에 연산의 결과값이 표시된다.", () => {
    calculate([1, 2, 3], "-", [4, 5, 6], "-333");
  });

  it("곱셈: 두 숫자를 입력하고 =버튼을 클릭하면 display에 연산의 결과값이 표시된다.", () => {
    calculate([1, 2, 3], "X", [4, 5, 6], "56088");
  });

  it("나눗셈: 두 숫자를 입력하고 =버튼을 클릭하면 display에 연산의 결과값이 표시된다.", () => {
    calculate([1, 2, 3], "/", [4, 5, 6], "0");
  });

  xit("AC버튼을 클릭하면 display에 0이 표시된다.", () => {
    clickDigitButtons([1, 2, 3]);
    clickACButton();
    checkDisplayValue("0");
  });
});
