// ========================================
// CALCULADORA ROI - LOGICA
// ========================================

let currentROIMode = 'simple'; // 'simple' or 'annualized'

// ========================================
// FUNCIÓN: switchROIMode(mode)
// ========================================

function switchROIMode(mode) {
    currentROIMode = mode;

    // Update tabs
    document.querySelectorAll('.roi-tab').forEach(tab => {
        if (tab.getAttribute('data-tab') === mode) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Toggle Time Input (only for annualized)
    const timeGroup = document.getElementById('roi-time-group');
    const timeInput = document.getElementById('roi-time');

    if (mode === 'annualized') {
        timeGroup.style.display = 'block';
        timeInput.setAttribute('required', 'required');
    } else {
        timeGroup.style.display = 'none';
        timeInput.removeAttribute('required');
    }

    // Reset Results View
    document.getElementById('roi-results').style.display = 'none';
    document.getElementById('roi-empty-state').style.display = 'block';
}

// ========================================
// FUNCIÓN: calculateROI()
// ========================================

function calculateROI() {
    // Inputs
    const initial = parseFloat(document.getElementById('roi-initial').value);
    const final = parseFloat(document.getElementById('roi-final').value);
    const costs = parseFloat(document.getElementById('roi-costs').value) || 0;
    const time = parseFloat(document.getElementById('roi-time').value) || 1;

    // Validations
    if (isNaN(initial) || initial <= 0) {
        alert('Por favor ingresa una inversión inicial válida');
        return;
    }

    if (isNaN(final) || final < 0) {
        alert('Por favor ingresa un valor final válido');
        return;
    }

    if (costs < 0) {
        alert('Los costos adicionales no pueden ser negativos');
        return;
    }

    if (currentROIMode === 'annualized' && (isNaN(time) || time <= 0)) {
        alert('Por favor ingresa un tiempo de inversión válido (años)');
        return;
    }

    // Calculations
    const totalInvestment = initial + costs;
    const netGain = final - totalInvestment;
    const roiSimple = (netGain / totalInvestment) * 100;
    const totalReturn = (final / totalInvestment) * 100 - 100;

    let roiAnnualized = null;
    if (currentROIMode === 'annualized') {
        // CAGR Formula: (Ending Value / Beginning Value)^(1/Time) - 1
        roiAnnualized = (Math.pow(final / totalInvestment, 1 / time) - 1) * 100;
    }

    // Classification Logic
    const roiToClassify = currentROIMode === 'annualized' ? roiAnnualized : roiSimple;

    let classification = '';
    let roiClass = ''; // 'positive', 'negative', 'neutral'

    if (roiToClassify > 20) {
        classification = 'EXCELENTE';
        roiClass = 'positive';
    } else if (roiToClassify > 10) {
        classification = 'BUENO';
        roiClass = 'positive';
    } else if (roiToClassify > 5) {
        classification = 'REGULAR';
        roiClass = 'neutral';
    } else if (roiToClassify > 0) {
        classification = 'BAJO';
        roiClass = 'neutral';
    } else if (Math.abs(roiToClassify) < 0.01) { // Close to 0
        classification = 'PUNTO DE EQUILIBRIO';
        roiClass = 'neutral';
    } else {
        classification = 'PÉRDIDA';
        roiClass = 'negative';
    }

    // Progress Bar Logic (Normalize for visual representation)
    // -100% -> 0% width, 0% -> 50% width, +100% -> 100% width
    let progressWidth = Math.min(Math.max((roiToClassify + 100) / 2, 0), 100);

    // Update UI
    updateROIUI({
        roiVal: roiToClassify,
        roiClass: roiClass,
        classification: classification,
        progressWidth: progressWidth,
        netGain: netGain,
        totalInvestment: totalInvestment,
        final: final,
        totalReturn: totalReturn,
        roiAnnualized: roiAnnualized
    });

    // Save to History (if function exists globally or implement locally)
    saveROIHistory({
        mode: currentROIMode,
        initial: initial,
        final: final,
        roi: roiToClassify
    });
}

function updateROIUI(data) {
    // Show Results Area
    document.getElementById('roi-empty-state').style.display = 'none';
    document.getElementById('roi-results').style.display = 'block';

    // Main Percentage
    const percentageEl = document.getElementById('roi-percentage-display');
    percentageEl.textContent = data.roiVal.toFixed(2) + '%';
    percentageEl.className = 'roi-percentage roi-' + data.roiClass;

    // Classification
    document.getElementById('roi-classification').textContent = data.classification;

    // Progress Bar
    const progressFill = document.getElementById('roi-progress-fill');
    progressFill.style.width = data.progressWidth + '%';
    progressFill.className = 'roi-progress-fill roi-progress-' + data.roiClass;

    // Details
    document.getElementById('roi-net-gain').textContent = formatCurrency(data.netGain);
    document.getElementById('roi-total-investment').textContent = formatCurrency(data.totalInvestment);
    document.getElementById('roi-final-value-display').textContent = formatCurrency(data.final);
    document.getElementById('roi-total-return').textContent = data.totalReturn.toFixed(2) + '%';

    // Annualized Details
    const annualizedDetails = document.getElementById('roi-annualized-details');
    if (currentROIMode === 'annualized' && data.roiAnnualized !== null) {
        annualizedDetails.style.display = 'block';
        document.getElementById('roi-annualized-display').textContent = data.roiAnnualized.toFixed(2) + '% / año';
    } else {
        annualizedDetails.style.display = 'none';
    }

    // Interpretation Message
    const interpretationEl = document.getElementById('roi-interpretation');
    let message = '';
    let interpretClass = '';

    if (data.roiClass === 'positive') {
        message = '✓ Esta es una inversión rentable con buenos retornos';
        interpretClass = 'interpretation-positive';
    } else if (data.roiClass === 'negative') {
        message = '✗ Esta inversión ha generado pérdidas';
        interpretClass = 'interpretation-negative';
    } else {
        message = '➖ Inversión en punto de equilibrio o retornos bajos';
        interpretClass = 'interpretation-neutral';
    }

    interpretationEl.textContent = message;
    interpretationEl.className = 'roi-interpretation ' + interpretClass;
}

// ========================================
// HELPERS
// ========================================

function formatCurrency(value) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

function saveROIHistory(data) {
    // Use the global addToHistory if available (from history.js? No, history.js has specific functions)
    // Or saveCalculationToHistory from history.js if we can adapt it.
    // Let's assume we want to use the generic structure.

    if (typeof saveCalculationToHistory === 'function') {
        saveCalculationToHistory({
            type: 'ROI ' + (data.mode === 'simple' ? 'Simple' : 'Anualizado'),
            result: data.roi.toFixed(2) + '%',
            details: `Inv: ${data.initial} -> Final: ${data.final}`,
            date: new Date().toLocaleDateString()
        });
    }
}

// ========================================
// EVENT LISTENERS initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    document.querySelectorAll('.roi-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const mode = tab.getAttribute('data-tab');
            switchROIMode(mode);
        });
    });

    // Calculate Button
    const btnCalculate = document.getElementById('btn-calculate-roi');
    if (btnCalculate) {
        btnCalculate.addEventListener('click', calculateROI);
    }

    // Enter Key Calculation
    ['roi-initial', 'roi-final', 'roi-costs', 'roi-time'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') calculateROI();
            });
        }
    });

    // Initial state
    switchROIMode('simple');
});
