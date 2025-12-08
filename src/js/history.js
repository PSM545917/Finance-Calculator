const HISTORY_KEY = 'finance_calculator_history';

// --- History Management ---

function getHistory() {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveCalculationToHistory(calculation) {
    if (!calculation) {
        alert('Realiza un cálculo primero');
        return;
    }

    const history = getHistory();
    history.push(calculation);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    loadHistory(); // Refresh list
    alert('Guardado en el historial');
}

function loadHistory() {
    const history = getHistory();
    const list = document.getElementById('history-list');

    if (!list) return; // Guard for tests

    list.innerHTML = '';

    // Show last 10 items
    history.slice(-10).reverse().forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.date} - ${item.type}: ${item.result} (${item.details})`;
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
});
