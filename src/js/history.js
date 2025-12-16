const HISTORY_KEY = 'finance_calculator_history';

// --- History Management ---

// API Configuration
const API_URL = 'http://localhost:3000/api/history';

async function getHistory() {
    // Try to fetch from API first
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            const data = await response.json();
            // Update LocalStorage to keep in sync (optional, serves as cache)
            localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
            return data;
        }
    } catch (error) {
        console.warn('API unavailable, falling back to LocalStorage', error);
    }

    // Fallback to LocalStorage
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
}

async function saveCalculationToHistory(calculation) {
    if (!calculation) {
        alert('Realiza un cálculo primero');
        return;
    }

    // 1. Save to LocalStorage (Optimistic UI)
    const stored = localStorage.getItem(HISTORY_KEY);
    const history = stored ? JSON.parse(stored) : [];
    history.push(calculation);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    // 2. Send to API
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(calculation)
        });
        console.log('Saved to API');
    } catch (error) {
        console.error('Failed to save to API', error);
    }

    loadHistory(); // Refresh list
    alert('Guardado en el historial');
}

async function loadHistory() {
    const history = await getHistory(); // Now async
    const list = document.getElementById('history-list');

    if (!list) return; // Guard for tests

    list.innerHTML = '';

    // Show last 10 items
    // Handle both array formats (if API returns different structure, currently assumed same)
    const displayList = Array.isArray(history) ? history : [];

    displayList.slice(0, 50).forEach(item => { // Show up to 50 from API/Local
        const li = document.createElement('li');
        // Handle date string differences if any
        const dateStr = item.date || new Date(item.created_at).toLocaleDateString();
        li.textContent = `${dateStr} - ${item.type}: ${item.result} (${item.details})`;
        list.appendChild(li);
    });
}

function exportHistoryToCSV() {
    const history = getHistory();

    // Get movements from LocalStorage (defined in calculations.js)
    const movementsStored = localStorage.getItem('finance_calculator_movements');
    const movements = movementsStored ? JSON.parse(movementsStored) : [];

    if (history.length === 0 && movements.length === 0) {
        alert('No hay historial para exportar');
        return;
    }

    // Create combined CSV with both calculations and movements
    let csvContent = '';

    // Section 1: Calculation History
    if (history.length > 0) {
        const calcHeaders = ['Tipo', 'Monto', 'Tasa', 'Tiempo', 'Resultado', 'Fecha'];

        const calcRows = history.map(item => {
            const details = item.details || '';
            const montoMatch = details.match(/P:\s*([0-9.]+)/);
            const tasaMatch = details.match(/r:\s*([0-9.]+)%/);
            const tiempoMatch = details.match(/t:\s*([0-9.]+)/);

            return [
                `"${item.type}"`,
                `"${montoMatch ? montoMatch[1] : 'N/A'}"`,
                `"${tasaMatch ? tasaMatch[1] : 'N/A'}"`,
                `"${tiempoMatch ? tiempoMatch[1] : 'N/A'}"`,
                `"${item.result}"`,
                `"${item.date}"`
            ];
        });

        csvContent += 'HISTORIAL DE CALCULOS\n';
        csvContent += calcHeaders.join(',') + '\n';
        csvContent += calcRows.map(row => row.join(',')).join('\n');
        csvContent += '\n\n';
    }

    // Section 2: Movement Tracking
    if (movements.length > 0) {
        const movHeaders = ['Tipo', 'Monto', 'Descripción', 'Balance', 'Fecha'];

        const movRows = movements.map(item => {
            return [
                `"${item.tipo}"`,
                `"${item.monto}"`,
                `"${item.descripcion}"`,
                `"${item.balance}"`,
                `"${item.fecha}"`
            ];
        });

        csvContent += 'MOVIMIENTOS Y BALANCE\n';
        csvContent += movHeaders.join(',') + '\n';
        csvContent += movRows.map(row => row.join(',')).join('\n');
        csvContent += '\n\n';
    }

    // Section 3: Trading Data
    const tradesStored = localStorage.getItem('finance_calculator_trades');
    const trades = tradesStored ? JSON.parse(tradesStored) : [];

    if (trades.length > 0) {
        const tradeHeaders = ['Asset', 'Entry', 'SL', 'TP', 'Leverage', 'R/R', 'Resultado', 'Fecha'];

        const tradeRows = trades.map(item => {
            return [
                `"${item.asset}"`,
                `"${item.entry}"`,
                `"${item.sl}"`,
                `"${item.tp}"`,
                `"${item.leverage}"`,
                `"${item.rr}"`,
                `"${item.resultado}"`,
                `"${item.fecha}"`
            ];
        });

        csvContent += 'TRADING POSITIONS\n';
        csvContent += tradeHeaders.join(',') + '\n';
        csvContent += tradeRows.map(row => row.join(',')).join('\n');
    }

    // Create Blob and Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'finance_history.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Load history on startup
    loadHistory();

    // Save to History button
    const btnSaveHistory = document.getElementById('btn-save-history');
    if (btnSaveHistory) {
        btnSaveHistory.addEventListener('click', () => {
            // Access currentCalculation from calculations.js global scope
            if (typeof currentCalculation !== 'undefined') {
                saveCalculationToHistory(currentCalculation);
            } else {
                alert('Realiza un cálculo primero');
            }
        });
    }

    // Export CSV button
    const btnExportCSV = document.getElementById('btn-export-csv');
    if (btnExportCSV) {
        btnExportCSV.addEventListener('click', exportHistoryToCSV);
    }

    // Clear History Button
    const btnClearHistory = document.getElementById('btn-clear-history');
    if (btnClearHistory) {
        btnClearHistory.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
                localStorage.removeItem(HISTORY_KEY);
                localStorage.removeItem('finance_calculator_movements');
                localStorage.removeItem('finance_calculator_trades');
                loadHistory();
                alert('Historial borrado correctamente');
            }
        });
    }
});
