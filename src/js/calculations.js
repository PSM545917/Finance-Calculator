// Global state to store the last calculation for history
// Feature: Simple Interest - Enhanced validation added
let currentCalculation = null;

// Helper to update result
function updateResult(value, type, details) {
    const resultDisplay = document.getElementById('result-display');
    const formattedValue = parseFloat(value).toFixed(2);
    resultDisplay.textContent = formattedValue;

    // Store for history
    currentCalculation = {
        type: type,
        details: details,
        result: formattedValue,
        date: new Date().toLocaleString()
    };
}

// --- Basic Calculator Logic ---

function getBasicInputs() {
    const num1 = parseFloat(document.getElementById('basic-num1').value);
    const num2 = parseFloat(document.getElementById('basic-num2').value);

    if (isNaN(num1) || isNaN(num2)) {
        alert('Por favor ingresa números válidos');
        return null;
    }
    return { num1, num2 };
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) {
        alert('No se puede dividir por cero');
        return null;
    }
    return a / b;
}

function handleBasicCalculation(operation, symbol) {
    const inputs = getBasicInputs();
    if (!inputs) return;

    const { num1, num2 } = inputs;
    let result;

    switch (operation) {
        case 'add': result = add(num1, num2); break;
        case 'subtract': result = subtract(num1, num2); break;
        case 'multiply': result = multiply(num1, num2); break;
        case 'divide': result = divide(num1, num2); break;
    }

    if (result !== null) {
        updateResult(result, 'Básica', `${num1} ${symbol} ${num2}`);
    }
}

// --- Simple Interest Logic ---

function computeSimpleInterest(principal, rate, time) {
    // Formula: I = P * r * t (rate in decimal)
    // Total Amount = P + I
    const interest = principal * (rate / 100) * time;
    return principal + interest;
}

function handleSimpleInterest() {
    const principal = parseFloat(document.getElementById('simple-principal').value);
    const rate = parseFloat(document.getElementById('simple-rate').value);
    const time = parseFloat(document.getElementById('simple-time').value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert('Por favor ingresa valores numéricos válidos');
        return;
    }

    if (principal < 0 || rate < 0 || time < 0) {
        alert('Los valores no pueden ser negativos');
        return;
    }

    const total = computeSimpleInterest(principal, rate, time);
    updateResult(total, 'Interés Simple', `P: ${principal}, r: ${rate}%, t: ${time} años`);
}

// --- Compound Interest Logic (Legacy/Global for now) ---
function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('compound-principal').value);
    const rate = parseFloat(document.getElementById('compound-rate').value);
    const time = parseFloat(document.getElementById('compound-time').value);
    const n = parseInt(document.getElementById('compound-frequency').value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal < 0 || rate < 0 || time < 0) {
        alert('Por favor ingresa valores válidos y positivos');
        return;
    }

    // Formula: A = P * (1 + r/n)^(n*t)
    const amount = principal * Math.pow((1 + (rate / 100) / n), n * time);

    updateResult(amount, 'Interés Compuesto', `P: ${principal}, r: ${rate}%, t: ${time} años, n: ${n}`);
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Basic Calculator Buttons
    const btnAdd = document.getElementById('btn-add');
    const btnSubtract = document.getElementById('btn-subtract');
    const btnMultiply = document.getElementById('btn-multiply');
    const btnDivide = document.getElementById('btn-divide');

    if (btnAdd) btnAdd.addEventListener('click', () => handleBasicCalculation('add', '+'));
    if (btnSubtract) btnSubtract.addEventListener('click', () => handleBasicCalculation('subtract', '-'));
    if (btnMultiply) btnMultiply.addEventListener('click', () => handleBasicCalculation('multiply', '×'));
    if (btnDivide) btnDivide.addEventListener('click', () => handleBasicCalculation('divide', '÷'));

    // Simple Interest Button
    const btnSimple = document.getElementById('btn-simple-interest');
    if (btnSimple) btnSimple.addEventListener('click', handleSimpleInterest);
});

// Expose for HTML onclicks (Compound only now)
window.calculateCompoundInterest = calculateCompoundInterest;
