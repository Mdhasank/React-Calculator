import { useState } from 'react';
import './App.css';

function App() {
  const [displayData, setDisplayData] = useState('');
  const trouble =()=>{
    setDisplayData('Error');
        setTimeout(() => {
          setDisplayData('');
        }, 700);
  }

  const handleClick = (value) => {
    if (value === 'C') {
      setDisplayData('');
    } else if (value === '←') {
      setDisplayData(displayData.slice(0, -1));
    } else if (value === '+' || value === '-' || value === '*' || value === '/' || value === '%') {
      setDisplayData(displayData + value);
    } else if (value === '=') {
      if (isDigitsOnly(displayData)) {
        // If displayData contains only digits, do nothing
        return;
      } else if (containsOnlyOperators(displayData) || displayData === '') {
        // If displayData contains only operators or is empty, do nothing
        return;
      } 
      try {
        const result = evaluateExpression(displayData);
        setDisplayData(result.toString());
      }catch (error) {
        trouble();
      }
    } else {
      setDisplayData(displayData + value);
    }
  }
  const isDigitsOnly = (expression) => {
    return /^[0-9.]+$/.test(expression);
  }

  const containsOnlyOperators = (expression) => {
    return /^[+\-*/%]+$/.test(expression);
  }
  const evaluateExpression = (expression) => {
    try {
      const operators = ['+', '-', '*', '/', '%'];
      let operator = null;
      let num1 = '';
      let num2 = '';
      let result = '';

      for (let i = 0; i < expression.length; i++) {
        if (operators.includes(expression[i])) {
          operator = expression[i];
          num1 = expression.slice(0, i);
          num2 = expression.slice(i + 1);
          break;
        }
      }

      if (!num1 || !num2 || !operator) {
        return trouble();
      }

      num1 = parseFloat(num1);
      num2 = parseFloat(num2);

      if (isNaN(num1) || isNaN(num2)) {
        return trouble();
      }

      switch (operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num1 / num2;
          break;
        case '%':
          result = (num1 * num2) / 100;
          break;
        default:
          return trouble();
      }

      return result;
    } catch (error) {
      return trouble();
    }
  }

  return (
    <div className="calculator">
      <div className="display" id="display" style={{ color: displayData === 'Error' ? 'rgb(255, 56, 56)' : 'white' }}>
        {displayData}
      </div>
      <div className="buttons">
        <button className="topBtn" onClick={() => handleClick('C')}>C</button>
        <button className="topBtn" onClick={() => handleClick('←')}>←</button>
        <button className="topBtn" onClick={() => handleClick('%')}>%</button>
        <button className="btn operator" onClick={() => handleClick('/')}>/</button>
        <button className="btn" onClick={() => handleClick('7')}>7</button>
        <button className="btn" onClick={() => handleClick('8')}>8</button>
        <button className="btn" onClick={() => handleClick('9')}>9</button>
        <button className="btn operator" onClick={() => handleClick('*')}>*</button>
        <button className="btn" onClick={() => handleClick('4')}>4</button>
        <button className="btn" onClick={() => handleClick('5')}>5</button>
        <button className="btn" onClick={() => handleClick('6')}>6</button>
        <button className="btn operator" onClick={() => handleClick('-')}>-</button>
        <button className="btn" onClick={() => handleClick('1')}>1</button>
        <button className="btn" onClick={() => handleClick('2')}>2</button>
        <button className="btn" onClick={() => handleClick('3')}>3</button>
        <button className="btn operator" onClick={() => handleClick('+')}>+</button>
        <button className="btn zero" onClick={() => handleClick('0')}>0</button>
        <button className="btn" onClick={() => handleClick('.')}>.</button>
        <button className="btn equals" onClick={() => handleClick('=')}>=</button>
      </div>
    </div>
  );
}

export default App;
