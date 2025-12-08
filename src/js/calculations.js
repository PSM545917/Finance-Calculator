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

// --- Trading Tools Logic ---

const TRADES_KEY = 'finance_calculator_trades';

function getTrades() {
    const stored = localStorage.getItem(TRADES_KEY);
    return stored ? JSON.parse(stored) : [];
}

function calculateStopLoss(entryPrice, riskPercent) {
    // Validate inputs
    if (isNaN(entryPrice) || isNaN(riskPercent)) {
        throw new Error('Todos los valores deben ser numéricos');
    }

    if (entryPrice <= 0 || riskPercent < 0 || riskPercent > 100) {
        throw new Error('Precio de entrada debe ser positivo y riesgo entre 0-100%');
    }

    return entryPrice * (1 - riskPercent / 100);
}

function calculateTakeProfit(entryPrice, sl, rrRatio) {
    // Validate inputs
    if (isNaN(entryPrice) || isNaN(sl) || isNaN(rrRatio)) {
        throw new Error('Todos los valores deben ser numéricos');
    }

    if (entryPrice <= 0 || sl <= 0 || rrRatio <= 0) {
        throw new Error('Todos los valores deben ser positivos');
    }

    if (sl >= entryPrice) {
        throw new Error('Stop Loss debe ser menor que el precio de entrada');
    }

    return entryPrice + ((entryPrice - sl) * rrRatio);
}

function calculateLeveragePosition(capital, leverage, entryPrice, riskPercent) {
    // Validate inputs
    if (isNaN(capital) || isNaN(leverage) || isNaN(entryPrice) || isNaN(riskPercent)) {
        throw new Error('Todos los valores deben ser numéricos');
    }

    if (capital <= 0 || leverage <= 0 || entryPrice <= 0 || riskPercent < 0) {
        throw new Error('Todos los valores deben ser positivos');
    }

    const positionSize = capital * leverage;
    const margen = positionSize / leverage;

    return {
        positionSize: parseFloat(positionSize.toFixed(2)),
        margen: parseFloat(margen.toFixed(2))
    };
}

function positionSizing(capital, riskPercent, entryPrice, sl) {
    // Validate inputs
    if (isNaN(capital) || isNaN(riskPercent) || isNaN(entryPrice) || isNaN(sl)) {
        throw new Error('Todos los valores deben ser numéricos');
    }

    if (capital <= 0 || riskPercent <= 0 || entryPrice <= 0 || sl <= 0) {
        throw new Error('Todos los valores deben ser positivos');
    }

    if (sl >= entryPrice) {
        throw new Error('Stop Loss debe ser menor que el precio de entrada');
    }

    const riskAmount = capital * (riskPercent / 100);
    const priceRisk = entryPrice - sl;
    const lotSize = riskAmount / priceRisk;

    return parseFloat(lotSize.toFixed(4));
}

function handleTradingCalculation() {
    const capital = parseFloat(document.getElementById('trading-capital').value);
    const entryPrice = parseFloat(document.getElementById('trading-entry').value);
    const riskPercent = parseFloat(document.getElementById('trading-risk').value);
    const leverage = parseFloat(document.getElementById('trading-leverage').value);
    const rrRatio = parseFloat(document.getElementById('trading-rr').value);

    try {
        // Calculate all trading metrics
        const sl = calculateStopLoss(entryPrice, riskPercent);
        const tp = calculateTakeProfit(entryPrice, sl, rrRatio);
        const leveragePos = calculateLeveragePosition(capital, leverage, entryPrice, riskPercent);
        const lotSize = positionSizing(capital, riskPercent, entryPrice, sl);

        // Display results
        displayTradingResults({
            sl: sl,
            tp: tp,
            lotSize: lotSize,
            margen: leveragePos.margen,
            positionSize: leveragePos.positionSize
        });

        // Store trade for history
        const trade = {
            asset: 'Trading Position',
            entry: entryPrice,
            sl: sl,
            tp: tp,
            leverage: leverage,
            rr: rrRatio,
            resultado: 'Pendiente',
            fecha: new Date().toLocaleString()
        };

        const trades = getTrades();
        trades.push(trade);
        localStorage.setItem(TRADES_KEY, JSON.stringify(trades));

    } catch (error) {
        alert(error.message);
    }
}

function displayTradingResults(results) {
    const slDisplay = document.getElementById('result-sl');
    const tpDisplay = document.getElementById('result-tp');
    const lotDisplay = document.getElementById('result-lot');
    const margenDisplay = document.getElementById('result-margen');

    if (slDisplay) slDisplay.textContent = `$${results.sl.toFixed(2)}`;
    if (tpDisplay) tpDisplay.textContent = `$${results.tp.toFixed(2)}`;
    if (lotDisplay) lotDisplay.textContent = results.lotSize.toFixed(4);
    if (margenDisplay) margenDisplay.textContent = `$${results.margen.toFixed(2)}`;
}

// --- Market Visualization Logic ---

let currentAsset = null;
let currentPrice = null;

async function fetchVariacion(asset) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${asset}&apikey=demo`);
        const data = await response.json();

        if (!data['Global Quote']) {
            throw new Error('No se pudo obtener datos del activo');
        }

        const quote = data['Global Quote'];
        const currentPrice = parseFloat(quote['05. price']);
        const openPrice = parseFloat(quote['02. open']);

        if (isNaN(currentPrice) || isNaN(openPrice)) {
            throw new Error('Datos de precio inválidos');
        }

        const variacion = ((currentPrice - openPrice) / openPrice) * 100;

        return {
            variacion: variacion,
            currentPrice: currentPrice,
            openPrice: openPrice
        };
    } catch (error) {
        console.error('Error fetching variation:', error);
        throw error;
    }
}

function loadTradingViewChart(symbol) {
    const chartContainer = document.getElementById('chart-container');
    if (!chartContainer) return;

    // Create iframe for TradingView
    const iframe = document.createElement('iframe');
    iframe.src = `https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.html?symbol=${symbol}&interval=D&theme=light&style=1&locale=es&toolbar_bg=%23f1f3f6&enable_publishing=false&withdateranges=true&hide_side_toolbar=false&allow_symbol_change=true&save_image=false&calendar=false&hide_volume=false&support_host=https%3A%2F%2Fwww.tradingview.com`;
    iframe.width = '100%';
    iframe.height = '400';
    iframe.frameBorder = '0';
    iframe.allowTransparency = 'true';
    iframe.scrolling = 'no';

    chartContainer.innerHTML = '';
    chartContainer.appendChild(iframe);
}

async function handleAssetClick(symbol) {
    currentAsset = symbol;

    // Update current asset display
    const assetDisplay = document.getElementById('current-asset-display');
    if (assetDisplay) assetDisplay.textContent = symbol;

    // Load TradingView chart
    loadTradingViewChart(symbol);

    // Fetch and display price variation
    try {
        const data = await fetchVariacion(symbol);
        currentPrice = data.currentPrice;

        const variacionDisplay = document.getElementById('variacion-display');
        const priceDisplay = document.getElementById('current-price-display');

        if (variacionDisplay) {
            const variacionText = `${data.variacion >= 0 ? '+' : ''}${data.variacion.toFixed(2)}%`;
            variacionDisplay.textContent = variacionText;
            variacionDisplay.style.color = data.variacion >= 0 ? '#27ae60' : '#e74c3c';
        }

        if (priceDisplay) {
            priceDisplay.textContent = `$${data.currentPrice.toFixed(2)}`;
        }
    } catch (error) {
        const variacionDisplay = document.getElementById('variacion-display');
        if (variacionDisplay) {
            variacionDisplay.textContent = 'Error al cargar';
            variacionDisplay.style.color = '#999';
        }
        alert('No se pudo obtener la variación de precio. Usando API demo con datos limitados.');
    }
}

function handleAddAsset() {
    const input = document.getElementById('new-asset-input');
    if (!input) return;

    const symbol = input.value.trim().toUpperCase();
    if (!symbol) {
        alert('Por favor ingresa un símbolo válido');
        return;
    }

    const assetsList = document.getElementById('assets-list');
    if (!assetsList) return;

    // Check if asset already exists
    const existingAssets = assetsList.querySelectorAll('.asset-item');
    for (let asset of existingAssets) {
        if (asset.dataset.symbol === symbol) {
            alert('Este activo ya está en la lista');
            return;
        }
    }

    // Create new asset item
    const li = document.createElement('li');
    li.dataset.symbol = symbol;
    li.className = 'asset-item';
    li.style.cssText = 'padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px; cursor: pointer;';
    li.textContent = `📊 ${symbol}`;
    li.addEventListener('click', () => handleAssetClick(symbol));

    assetsList.appendChild(li);
    input.value = '';
}

function handleAnalyzeTrade() {
    if (!currentAsset || !currentPrice) {
        alert('Primero selecciona un activo del Market Watch');
        return;
    }

    const riskPercent = parseFloat(document.getElementById('trade-risk-percent').value);

    if (isNaN(riskPercent) || riskPercent <= 0) {
        alert('Por favor ingresa un porcentaje de riesgo válido');
        return;
    }

    try {
        const sl = calculateStopLoss(currentPrice, riskPercent);
        const risk = currentPrice - sl;

        // Display results
        const resultDiv = document.getElementById('trade-analysis-result');
        const entrySpan = document.getElementById('analysis-entry');
        const slSpan = document.getElementById('analysis-sl');
        const riskSpan = document.getElementById('analysis-risk');

        if (entrySpan) entrySpan.textContent = `$${currentPrice.toFixed(2)}`;
        if (slSpan) slSpan.textContent = `$${sl.toFixed(2)}`;
        if (riskSpan) riskSpan.textContent = `$${risk.toFixed(2)}`;

        if (resultDiv) resultDiv.style.display = 'block';

    } catch (error) {
        alert(error.message);
    }
}

// --- SPA Navigation Logic ---

function switchSection(sectionId) {
    // Hide all sections
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Update active button state
    const allButtons = document.querySelectorAll('.nav-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
        }
    });
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

    // Trading Tools Button
    const btnTrading = document.getElementById('btn-trading-calculate');
    if (btnTrading) btnTrading.addEventListener('click', handleTradingCalculation);

    // Market Visualization - Asset List Clicks
    const assetItems = document.querySelectorAll('.asset-item');
    assetItems.forEach(item => {
        item.addEventListener('click', () => handleAssetClick(item.dataset.symbol));
    });

    // Market Visualization - Add Asset Button
    const btnAddAsset = document.getElementById('btn-add-asset');
    if (btnAddAsset) btnAddAsset.addEventListener('click', handleAddAsset);

    // Market Visualization - Analyze Trade Button
    const btnAnalyzeTrade = document.getElementById('btn-analyze-trade');
    if (btnAnalyzeTrade) btnAnalyzeTrade.addEventListener('click', handleAnalyzeTrade);

    // Navigation Buttons for SPA
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });

    // Load balance on startup
    loadBalanceOnStartup();
});
