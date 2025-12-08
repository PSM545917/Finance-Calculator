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

// --- Compound Interest Logic ---

function computeCompoundInterest(principal, rate, time, compounds) {
    // Formula: A = P * (1 + r/n)^(n*t)
    return principal * Math.pow((1 + (rate / 100) / compounds), compounds * time);
}

function handleCompoundInterest() {
    const principal = parseFloat(document.getElementById('compound-principal').value);
    const rate = parseFloat(document.getElementById('compound-rate').value);
    const time = parseFloat(document.getElementById('compound-time').value);
    const compounds = parseInt(document.getElementById('compound-frequency').value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || isNaN(compounds)) {
        alert('Por favor ingresa valores numéricos válidos');
        return;
    }

    if (principal < 0 || rate < 0 || time < 0 || compounds <= 0) {
        alert('Los valores no pueden ser negativos (compounds debe ser mayor a 0)');
        return;
    }

    const amount = computeCompoundInterest(principal, rate, time, compounds);
    updateResult(amount, 'Interés Compuesto', `P: ${principal}, r: ${rate}%, t: ${time} años, n: ${compounds}`);
}

// --- Loan Amortization Logic ---

function amortizacionPrestamo(principal, tasaAnual, meses) {
    // Validate inputs
    if (isNaN(principal) || isNaN(tasaAnual) || isNaN(meses)) {
        throw new Error('Todos los valores deben ser numéricos');
    }

    if (principal <= 0 || tasaAnual < 0 || meses <= 0) {
        throw new Error('Los valores deben ser positivos');
    }

    // Convert annual rate to monthly rate (decimal)
    const tasaMensual = (tasaAnual / 100) / 12;

    // Calculate monthly payment using PMT formula
    // PMT = P * r(1+r)^n / ((1+r)^n - 1)
    let pagoMensual;

    if (tasaMensual === 0) {
        // Special case: 0% interest
        pagoMensual = principal / meses;
    } else {
        const factor = Math.pow(1 + tasaMensual, meses);
        pagoMensual = principal * (tasaMensual * factor) / (factor - 1);
    }

    // Generate amortization schedule
    const schedule = [];
    let saldoRestante = principal;

    for (let mes = 1; mes <= meses; mes++) {
        const interesMes = saldoRestante * tasaMensual;
        const capitalMes = pagoMensual - interesMes;
        saldoRestante -= capitalMes;

        // Handle floating point precision for last payment
        if (mes === meses) {
            saldoRestante = 0;
        }

        schedule.push({
            mes: mes,
            pago: parseFloat(pagoMensual.toFixed(2)),
            capital: parseFloat(capitalMes.toFixed(2)),
            intereses: parseFloat(interesMes.toFixed(2))
        });
    }

    return schedule;
}

function handleLoanAmortization() {
    const principal = parseFloat(document.getElementById('loan-principal').value);
    const tasaAnual = parseFloat(document.getElementById('loan-rate').value);
    const meses = parseInt(document.getElementById('loan-months').value);

    try {
        const schedule = amortizacionPrestamo(principal, tasaAnual, meses);
        displayAmortizationSchedule(schedule);
    } catch (error) {
        alert(error.message);
    }
}

function displayAmortizationSchedule(schedule) {
    const tableBody = document.getElementById('amortization-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    schedule.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.mes}</td>
            <td>$${row.pago}</td>
            <td>$${row.capital}</td>
            <td>$${row.intereses}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// --- Movement Tracking Logic ---

const MOVEMENTS_KEY = 'finance_calculator_movements';
const BALANCE_KEY = 'finance_calculator_balance';

function getBalance() {
    const stored = localStorage.getItem(BALANCE_KEY);
    return stored ? parseFloat(stored) : 0;
}

function getMovements() {
    const stored = localStorage.getItem(MOVEMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
}

function trackMovimiento(tipo, monto, descripcion) {
    // Validate inputs
    if (!tipo || (tipo !== 'ingreso' && tipo !== 'gasto')) {
        throw new Error('Tipo debe ser "ingreso" o "gasto"');
    }

    if (isNaN(monto) || monto <= 0) {
        throw new Error('El monto debe ser un número positivo');
    }

    if (!descripcion || descripcion.trim() === '') {
        throw new Error('La descripción es requerida');
    }

    // Get current balance and movements
    let balance = getBalance();
    const movements = getMovements();

    // Update balance
    if (tipo === 'ingreso') {
        balance += monto;
    } else {
        balance -= monto;
    }

    // Store movement
    const movement = {
        tipo: tipo,
        monto: parseFloat(monto.toFixed(2)),
        descripcion: descripcion.trim(),
        balance: parseFloat(balance.toFixed(2)),
        fecha: new Date().toLocaleString()
    };

    movements.push(movement);

    // Save to LocalStorage
    localStorage.setItem(BALANCE_KEY, balance.toString());
    localStorage.setItem(MOVEMENTS_KEY, JSON.stringify(movements));

    return balance;
}

function handleMovementTracking() {
    const tipo = document.getElementById('movement-type').value;
    const monto = parseFloat(document.getElementById('movement-amount').value);
    const descripcion = document.getElementById('movement-description').value;

    try {
        const newBalance = trackMovimiento(tipo, monto, descripcion);
        updateBalanceDisplay(newBalance);

        // Clear form
        document.getElementById('movement-amount').value = '';
        document.getElementById('movement-description').value = '';

        alert(`Movimiento registrado. Balance actual: $${newBalance.toFixed(2)}`);
    } catch (error) {
        alert(error.message);
    }
}

function updateBalanceDisplay(balance) {
    const balanceDisplay = document.getElementById('balance-display');
    if (balanceDisplay) {
        balanceDisplay.textContent = `$${balance.toFixed(2)}`;
    }
}

function loadBalanceOnStartup() {
    const balance = getBalance();
    updateBalanceDisplay(balance);
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

    // Compound Interest Button
    const btnCompound = document.getElementById('btn-compound-interest');
    if (btnCompound) btnCompound.addEventListener('click', handleCompoundInterest);

    // Loan Amortization Button
    const btnLoan = document.getElementById('btn-loan-amortization');
    if (btnLoan) btnLoan.addEventListener('click', handleLoanAmortization);

    // Movement Tracking Button
    const btnMovement = document.getElementById('btn-track-movement');
    if (btnMovement) btnMovement.addEventListener('click', handleMovementTracking);

    // Load balance on startup
    loadBalanceOnStartup();
});
