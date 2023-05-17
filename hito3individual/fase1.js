// Obtenemos los elementos de la calculadora
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

// Escuchamos los clics en las teclas
keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    // Obtenemos el tipo de tecla (número, operador, etc.)
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    // Si la tecla es un número
    if (!action) {
      // Si el display muestra 0 o ya hay un resultado, mostramos el número pulsado
      if (displayedNum === '0' || calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'calculate') {
        display.textContent = keyContent;
        // Si no, concatenamos el número pulsado al número mostrado en pantalla
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    // Si la tecla es un operador
    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide' || action === 'percentage') {
      // Guardamos el primer número introducido y el operador
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
      calculator.dataset.previousKeyType = 'operator';
    }

   // Si la tecla pulsada es el botón "√"
if (action === 'square-root') {
  const num = parseFloat(displayedNum);
  // Verificamos si el número es válido antes de calcular la raíz cuadrada
  if (!isNaN(num)) {
    const calcValue = Math.sqrt(num);
    display.textContent = calcValue;
    calculator.dataset.previousKeyType = 'unary';
  }
}

// Si la tecla pulsada es el botón "x²"
if (action === 'square') {
  const num = parseFloat(displayedNum);
  // Verificamos si el número es válido antes de calcular el cuadrado
  if (!isNaN(num)) {
    const calcValue = Math.pow(num, 2);
    display.textContent = calcValue;
    calculator.dataset.previousKeyType = 'unary';
  }
}

    // Si la tecla pulsada es el botón "="
    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      // Realizamos la operación y mostramos el resultado
      display.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.previousKeyType = 'calculate';
    }

    // Si la tecla pulsada es el botón "AC"
    if (action === 'clear') {
      // Reiniciamos los valores de la calculadora
      delete calculator.dataset.firstValue;
      delete calculator.dataset.operator;
      delete calculator.dataset.previousKeyType;
      display.textContent = 0;
    }
  }
});

// Función que realiza las operaciones
function calculate(n1, operator, n2) {
  const num1 = parseFloat(n1);
  const num2 = parseFloat(n2);
  if (operator === 'add') return num1 + num2;
  if (operator === 'subtract') return num1 - num2;
  if (operator === 'multiply') return num1 * num2;
  if (operator === 'divide') return num1 / num2;
  if (operator === 'percentage') return num1 * (num2 / 100);
}




