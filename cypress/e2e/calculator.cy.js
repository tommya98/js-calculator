const clickDigitButtons = (digits = []) => {
  digits.forEach((digit) => {
    cy.get(".digit").contains(digit).click();
  });
};

const checkDisplayValue = (value) => {
  cy.get("#total").should("have.text", value);
};

describe("계산기 앱 테스트", () => {
  beforeEach("페이지 방문", () => {
    cy.visit("../../index.html");
  });

  it("디스플레이에 기본적으로 숫자 0이 표시된다.", () => {
    checkDisplayValue(0);
  });

  it("1개의 숫자 버튼을 클릭하면 display에 숫자가 표시된다.", () => {
    clickDigitButtons([1]);
    checkDisplayValue(1);
  });

  it("2개의 숫자 버튼을 클릭하면 display에 숫자가 표시된다.", () => {
    clickDigitButtons([1, 2]);
    checkDisplayValue(12);
  });

  it("3개의 숫자 버튼을 클릭하면 display에 숫자가 표시된다.", () => {
    clickDigitButtons([1, 2, 3]);
    checkDisplayValue(123);
  });
});
