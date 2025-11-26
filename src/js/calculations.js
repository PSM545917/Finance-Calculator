// Global state to store the last calculation for history
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
});


// --- Financial Calculations (Legacy / Global for now if needed, but better to attach events too) ---
// Keeping these as global functions for now if they are called from HTML onclicks in other sections,
// or we can refactor them to event listeners as well. 
// The prompt specifically asked for Basic Calculator refactor, but good practice to keep consistency.
// However, to strictly follow "Basic Calculator" request, I will leave others as is but ensure they work.
// Wait, the previous file had them as global window functions.
// The other sections in index.html still use onclick="calculateSimpleInterest()", etc.
// I should preserve those or refactor them.
// The prompt only explicitly asked to refactor Basic Calculator. I will leave the others as global functions for compatibility 
// with the existing HTML for those sections, unless I change them too. 
// To be safe and minimize scope creep, I'll keep them but ensure they are exported or attached to window.

function calculateSimpleInterest() {
    const principal = parseFloat(document.getElementById('simple-principal').value);
    const rate = parseFloat(document.getElementById('simple-rate').value);
    const time = parseFloat(document.getElementById('simple-time').value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal < 0 || rate < 0 || time < 0) {
        alert('Por favor ingresa valores válidos y positivos');
        return;
    }

    const interest = principal * (rate / 100) * time;
    const total = principal + interest;

    updateResult(total, 'Interés Simple', `P: ${principal}, r: ${rate}%, t: ${time} años`);
}

function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('compound-principal').value);
    const rate = parseFloat(document.getElementById('compound-rate').value);
    const time = parseFloat(document.getElementById('compound-time').value);
    const n = parseInt(document.getElementById('compound-frequency').value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal < 0 || rate < 0 || time < 0) {
        alert('Por favor ingresa valores válidos y positivos');
        return;
    }

    const amount = principal * Math.pow((1 + (rate / 100) / n), n * time);

    updateResult(amount, 'Interés Compuesto', `P: ${principal}, r: ${rate}%, t: ${time} años, n: ${n}`);
}

// Expose for HTML onclicks (Simple/Compound)
window.calculateSimpleInterest = calculateSimpleInterest;
window.calculateCompoundInterest = calculateCompoundInterest;
