// ========================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// ========================================

const exchangeRates = {};
let lastFetchTime = null;
const CACHE_DURATION = 3600000; // 1 hour in ms
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

// ========================================
// FUNCIÓN: fetchExchangeRates(baseCurrency)
// ========================================

async function fetchExchangeRates(baseCurrency) {
    const url = `${API_BASE_URL}${baseCurrency}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener tasas de cambio');

        const data = await response.json();

        if (data.rates) {
            exchangeRates[baseCurrency] = data.rates;
            lastFetchTime = Date.now();
            return data.rates;
        } else {
            throw new Error('Formato de respuesta inválido');
        }
    } catch (error) {
        console.error('Error fetching rates:', error);
        alert('No se pudo obtener las tasas de cambio. Verifica tu conexión a internet.');

        if (exchangeRates[baseCurrency]) {
            alert('Se usarán las últimas tasas guardadas.');
            return exchangeRates[baseCurrency];
        }
        return null;
    }
}

// ========================================
// FUNCIÓN: convertCurrency()
// ========================================

async function convertCurrency() {
    const amountInput = document.getElementById('currency-amount');
    const fromSelect = document.getElementById('currency-from');
    const toSelect = document.getElementById('currency-to');
    const resultDiv = document.getElementById('conversion-result');
    const btnConvert = document.getElementById('btn-convert-currency');

    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    // Validations
    if (isNaN(amount) || amount <= 0) {
        alert('Por favor ingresa un monto válido mayor a 0');
        return;
    }

    if (from === to) {
        // Same currency, direct output
        updateResultUI(amount, to, amount, to, 1.0);
        return;
    }

    // Check Cache logic handled primarily by fetch logic being called only if needed
    // But we need to ensure we have rates for the 'from' currency
    const now = Date.now();
    const isCacheValid = lastFetchTime && (now - lastFetchTime < CACHE_DURATION) && exchangeRates[from];

    let rates;

    if (isCacheValid) {
        rates = exchangeRates[from];
    } else {
        // UI Loading State
        btnConvert.classList.add('loading');
        btnConvert.textContent = 'Convirtiendo...';

        rates = await fetchExchangeRates(from);

        btnConvert.classList.remove('loading');
        btnConvert.textContent = 'Convertir Moneda';
    }

    if (!rates) return; // Error handled in fetch

    // Calculate
    let result;
    let rate;

    // Use logic: if we have base rates, use them. If not, try to convert via USD if we have USD rates etc.
    // The API returns rates relative to 'from' if we called it with 'from'.
    // Or relative to 'base' if simplified. 
    // Our fetch uses `baseCurrency` param so `exchangeRates[from]` should contain rates RELATIVE TO FROM.

    if (rates[to]) {
        rate = rates[to];
        result = amount * rate;
    } else {
        alert('No se pudieron obtener las tasas de cambio para este par.');
        return;
    }

    updateResultUI(result, to, amount, from, rate);
    addToConversionHistory(from, to, amount, result, rate);
}

function updateResultUI(resultAmount, resultCurrency, originalAmount, originalCurrency, rate) {
    const resultDiv = document.getElementById('conversion-result');
    const resultAmountSpan = document.getElementById('result-amount');
    const resultCurrencySpan = document.getElementById('result-currency');
    const rateDisplay = document.getElementById('exchange-rate-display');

    resultDiv.style.display = 'block';
    resultAmountSpan.textContent = formatCurrency(resultAmount);
    resultCurrencySpan.textContent = resultCurrency;
    rateDisplay.textContent = `Tasa: 1 ${originalCurrency} = ${rate.toFixed(4)} ${resultCurrency}`;
}

// ========================================
// FUNCIÓN: swapCurrencies()
// ========================================

function swapCurrencies() {
    const fromSelect = document.getElementById('currency-from');
    const toSelect = document.getElementById('currency-to');
    const amountInput = document.getElementById('currency-amount');

    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    // Logic to only convert if there is a value
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
        convertCurrency();
    }
}

// ========================================
// FUNCIÓN: addToConversionHistory(...)
// ========================================

function addToConversionHistory(from, to, amount, result, rate) {
    const conversion = {
        from: from,
        to: to,
        amount: amount,
        result: result,
        rate: rate,
        date: new Date().toLocaleString('es-ES')
    };

    let history = [];
    try {
        const stored = localStorage.getItem('currencyHistory');
        if (stored) {
            history = JSON.parse(stored);
        }
    } catch (e) {
        console.warn('LocalStorage error:', e);
    }

    history.unshift(conversion);
    if (history.length > 10) {
        history = history.slice(0, 10);
    }

    try {
        localStorage.setItem('currencyHistory', JSON.stringify(history));
    } catch (e) {
        console.warn('LocalStorage write error:', e);
    }

    displayConversionHistory();
}

// ========================================
// FUNCIÓN: displayConversionHistory()
// ========================================

function displayConversionHistory() {
    const list = document.getElementById('currency-history-list');
    if (!list) return;

    let history = [];
    try {
        const stored = localStorage.getItem('currencyHistory');
        if (stored) {
            history = JSON.parse(stored);
        }
    } catch (e) {
        console.warn('LocalStorage error:', e);
    }

    list.innerHTML = '';

    if (history.length === 0) {
        const li = document.createElement('li');
        li.textContent = "No hay conversiones recientes";
        li.style.textAlign = 'center';
        li.style.color = '#94a3b8';
        li.style.padding = '1rem';
        list.appendChild(li);
        return;
    }

    history.forEach(conversion => {
        const li = document.createElement('li');
        // Format: "100.00 USD → 90.50 EUR"
        const line1 = `${formatCurrency(conversion.amount)} ${conversion.from} → ${formatCurrency(conversion.result)} ${conversion.to}`;
        const line2 = `Tasa: ${conversion.rate.toFixed(4)} | ${conversion.date}`;

        li.innerHTML = `<div>${line1}</div><div style="font-size: 0.75rem; color: #64748b;">${line2}</div>`;
        list.appendChild(li);
    });
}

// Helper
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    displayConversionHistory();

    const btnConvert = document.getElementById('btn-convert-currency');
    const btnSwap = document.getElementById('btn-swap-currencies');
    const amountInput = document.getElementById('currency-amount');
    const fromSelect = document.getElementById('currency-from');
    const toSelect = document.getElementById('currency-to');
    const resultDiv = document.getElementById('conversion-result');

    if (btnConvert) {
        btnConvert.addEventListener('click', convertCurrency);
    }

    if (btnSwap) {
        btnSwap.addEventListener('click', swapCurrencies);
    }

    if (amountInput) {
        amountInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') convertCurrency();
        });
    }

    const hideResult = () => {
        if (resultDiv) resultDiv.style.display = 'none';
    };

    if (fromSelect) fromSelect.addEventListener('change', hideResult);
    if (toSelect) toSelect.addEventListener('change', hideResult);
});
