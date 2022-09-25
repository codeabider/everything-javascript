class Calculator {
  constructor(prevElemRef, currElemRef) {
    this.prevElemRef = prevElemRef;
    this.currElemRef = currElemRef;
    this.operator = '';
    this.currOperand = '';
    this.prevOperand = '';
    this.result = '';
  }

  toggleSign() {
    this.currOperand *= -1;
  }

  appendNumber(currString) {
    if (currString === '.' && this.currOperand.includes(currString)) return;
    this.currOperand = `${this.currOperand}${currString}`;
  }

  selectOperator(operator) {
    if (this.currOperand === '') return;
    if (this.prevOperand !== '') {
      this.evaluateResult();
    }

    this.operator = operator;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  evaluateResult() {
    const prevNum = parseFloat(this.prevOperand);
    const currNum = parseFloat(this.currOperand);

    if (isNaN(prevNum) || isNaN(currNum)) return;

    switch (this.operator) {
      case '+':
        this.result = prevNum + currNum;
        break;
      case '-':
        this.result = prevNum - currNum;
        break;
      case '*':
        this.result = prevNum * currNum;
        break;
      case '/':
        this.result = prevNum / currNum;
        break;
      case '%':
        this.result = prevNum % currNum;
        break;
      default:
        return;
    }

    this.currOperand = this.result;
    this.prevOperand = '';
    this.operator = '';
  }

  formatNumberString(str) {
    return Intl.NumberFormat('en-IN').format(str);
  }

  deleteLastChar() {
    this.currOperand = this.currOperand.slice(0, -1);
  }

  clearAll() {
    this.currOperand = '';
    this.prevOperand = '';
    this.operator = '';
    this.result = '';
  }

  renderUpdates() {
    this.currElemRef.innerText = `${this.formatNumberString(this.currOperand)}`;
    this.prevElemRef.innerText = `${this.formatNumberString(
      this.prevOperand
    )} ${this.operator}`;
  }
}

const currInputElem = document.querySelector('[data-input]');
const prevInputElem = document.querySelector('[data-previous]');
const calc = new Calculator(prevInputElem, currInputElem);

const calcContainerElem = document.getElementById('calc');
calcContainerElem.addEventListener('click', (e) => {
  if (e.target.dataset.sign === '') {
    calc.toggleSign();
  }
  if (e.target.dataset.number === '') {
    calc.appendNumber(e.target.innerText);
  }
  if (e.target.dataset.operation === '') {
    calc.selectOperator(e.target.innerText);
  }
  if (e.target.dataset.allClear === '') {
    calc.clearAll();
  }
  if (e.target.dataset.delete === '') {
    calc.deleteLastChar();
  }
  if (e.target.dataset.equal === '') {
    calc.evaluateResult();
  }
  if (e.target.dataset) {
    calc.renderUpdates();
  }
});
