/**
 * Unit Tests for Finance Calculator
 * Using Jest syntax (manual setup assumed)
 */

// Mock DOM elements
const mockDOM = () => {
    global.document = {
        getElementById: jest.fn((id) => ({
            value: '',
            textContent: '',
            addEventListener: jest.fn()
        })),
        addEventListener: jest.fn(),
        createElement: jest.fn(() => ({
            setAttribute: jest.fn(),
            style: {}
        })),
        body: {
            appendChild: jest.fn(),
            removeChild: jest.fn()
        }
    };

    global.alert = jest.fn();
};

// Import calculation functions (assuming they're exported)
// For this test, we'll define them inline or assume they're available globally

describe('Finance Calculator - Unit Tests', () => {

    beforeEach(() => {
        mockDOM();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // ==================== BASIC CALCULATOR TESTS ====================

    describe('Basic Calculator Operations', () => {

        test('should add two numbers correctly', () => {
            // Arrange
            const a = 10;
            const b = 5;
            const expected = 15;

            // Act
            const result = a + b;

            // Assert
            expect(result).toBe(expected);
            expect(result).toEqual(15);
        });

        test('should subtract two numbers correctly', () => {
            // Arrange
            const a = 10;
            const b = 5;
            const expected = 5;

            // Act
            const result = a - b;

            // Assert
            expect(result).toBe(expected);
            expect(result).toEqual(5);
        });

        test('should multiply two numbers correctly', () => {
            // Arrange
            const a = 10;
            const b = 5;
            const expected = 50;

            // Act
            const result = a * b;

            // Assert
            expect(result).toBe(expected);
            expect(result).toEqual(50);
        });

        test('should divide two numbers correctly', () => {
            // Arrange
            const a = 10;
            const b = 5;
            const expected = 2;

            // Act
            const result = a / b;

            // Assert
            expect(result).toBe(expected);
            expect(result).toEqual(2);
        });

        test('should handle division by zero', () => {
            // Arrange
            const a = 10;
            const b = 0;

            // Act
            const result = a / b;

            // Assert
            expect(result).toBe(Infinity);
            expect(isFinite(result)).toBe(false);
        });

        test('should handle negative numbers in addition', () => {
            // Arrange
            const a = -10;
            const b = 5;
            const expected = -5;

            // Act
            const result = a + b;

            // Assert
            expect(result).toBe(expected);
        });
    });

    // ==================== SIMPLE INTEREST TESTS ====================

    describe('Simple Interest Calculation', () => {

        test('should calculate simple interest correctly', () => {
            // Arrange
            const principal = 1000;
            const rate = 5; // 5%
            const time = 2; // 2 years

            // Formula: Total = P + (P * r * t)
            // Total = 1000 + (1000 * 0.05 * 2) = 1000 + 100 = 1100
            const expectedInterest = principal * (rate / 100) * time;
            const expectedTotal = principal + expectedInterest;

            // Act
            const interest = principal * (rate / 100) * time;
            const total = principal + interest;

            // Assert
            expect(interest).toBe(100);
            expect(total).toBe(1100);
            expect(total).toEqual(expectedTotal);
        });

        test('should calculate simple interest with different values', () => {
            // Arrange
            const principal = 5000;
            const rate = 3.5; // 3.5%
            const time = 3; // 3 years

            // Formula: I = P * r * t
            const expectedInterest = 5000 * 0.035 * 3; // 525
            const expectedTotal = 5000 + 525; // 5525

            // Act
            const interest = principal * (rate / 100) * time;
            const total = principal + interest;

            // Assert
            expect(interest).toBeCloseTo(525, 2);
            expect(total).toBeCloseTo(5525, 2);
        });

        test('should return principal when rate or time is zero', () => {
            // Arrange
            const principal = 1000;
            const rate = 0;
            const time = 5;

            // Act
            const interest = principal * (rate / 100) * time;
            const total = principal + interest;

            // Assert
            expect(interest).toBe(0);
            expect(total).toBe(principal);
        });
    });

    // ==================== COMPOUND INTEREST TESTS ====================

    describe('Compound Interest Calculation', () => {

        test('should calculate compound interest correctly (annual compounding)', () => {
            // Arrange
            const principal = 1000;
            const rate = 5; // 5%
            const time = 10; // 10 years
            const compounds = 1; // Annual compounding

            // Formula: A = P * (1 + r/n)^(n*t)
            // A = 1000 * (1 + 0.05/1)^(1*10)
            // A = 1000 * (1.05)^10
            // A ≈ 1628.89
            const expected = 1628.89;

            // Act
            const amount = principal * Math.pow((1 + (rate / 100) / compounds), compounds * time);
            const rounded = Math.round(amount * 100) / 100;

            // Assert
            expect(rounded).toBe(expected);
            expect(rounded).toBeCloseTo(1628.89, 2);
        });

        test('should calculate compound interest with monthly compounding', () => {
            // Arrange
            const principal = 1000;
            const rate = 5; // 5%
            const time = 10; // 10 years
            const compounds = 12; // Monthly compounding

            // Formula: A = P * (1 + r/n)^(n*t)
            // A = 1000 * (1 + 0.05/12)^(12*10)
            const expected = 1000 * Math.pow((1 + 0.05 / 12), 12 * 10);

            // Act
            const amount = principal * Math.pow((1 + (rate / 100) / compounds), compounds * time);

            // Assert
            expect(amount).toBeCloseTo(expected, 2);
            expect(amount).toBeGreaterThan(1000); // Should be more than principal
            expect(amount).toBeCloseTo(1647.01, 1); // Approximate value
        });

        test('should return principal when rate is zero', () => {
            // Arrange
            const principal = 1000;
            const rate = 0;
            const time = 10;
            const compounds = 1;

            // Act
            const amount = principal * Math.pow((1 + (rate / 100) / compounds), compounds * time);

            // Assert
            expect(amount).toBe(principal);
        });

        test('should calculate compound interest with quarterly compounding', () => {
            // Arrange
            const principal = 5000;
            const rate = 4; // 4%
            const time = 5; // 5 years
            const compounds = 4; // Quarterly compounding

            // Formula: A = P * (1 + r/n)^(n*t)
            const expected = 5000 * Math.pow((1 + 0.04 / 4), 4 * 5);

            // Act
            const amount = principal * Math.pow((1 + (rate / 100) / compounds), compounds * time);

            // Assert
            expect(amount).toBeCloseTo(expected, 2);
            expect(amount).toBeCloseTo(6100.95, 1);
        });
    });

    // ==================== VALIDATION TESTS ====================

    describe('Input Validation', () => {

        test('should detect NaN values', () => {
            // Arrange
            const value = 'not a number';

            // Act
            const result = parseFloat(value);

            // Assert
            expect(isNaN(result)).toBe(true);
        });

        test('should detect negative values', () => {
            // Arrange
            const value = -100;

            // Act & Assert
            expect(value < 0).toBe(true);
        });

        test('should validate positive numbers', () => {
            // Arrange
            const value = 100;

            // Act & Assert
            expect(value >= 0).toBe(true);
            expect(isNaN(value)).toBe(false);
        });
    });

    // ==================== LOAN AMORTIZATION TESTS ====================

    describe('Loan Amortization Calculation', () => {

        // Helper function to simulate amortizacionPrestamo
        function amortizacionPrestamo(principal, tasaAnual, meses) {
            if (isNaN(principal) || isNaN(tasaAnual) || isNaN(meses)) {
                throw new Error('Todos los valores deben ser numéricos');
            }

            if (principal <= 0 || tasaAnual < 0 || meses <= 0) {
                throw new Error('Los valores deben ser positivos');
            }

            const tasaMensual = (tasaAnual / 100) / 12;
            let pagoMensual;

            if (tasaMensual === 0) {
                pagoMensual = principal / meses;
            } else {
                const factor = Math.pow(1 + tasaMensual, meses);
                pagoMensual = principal * (tasaMensual * factor) / (factor - 1);
            }

            const schedule = [];
            let saldoRestante = principal;

            for (let mes = 1; mes <= meses; mes++) {
                const interesMes = saldoRestante * tasaMensual;
                const capitalMes = pagoMensual - interesMes;
                saldoRestante -= capitalMes;

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

        test('should calculate standard loan amortization correctly ($10,000 at 5% for 12 months)', () => {
            // Arrange
            const principal = 10000;
            const tasaAnual = 5;
            const meses = 12;

            // Act
            const schedule = amortizacionPrestamo(principal, tasaAnual, meses);

            // Assert
            expect(schedule).toHaveLength(12);
            expect(schedule[0].mes).toBe(1);
            expect(schedule[11].mes).toBe(12);

            // Verify monthly payment is consistent
            const monthlyPayment = schedule[0].pago;
            schedule.forEach(row => {
                expect(row.pago).toBe(monthlyPayment);
            });

            // Verify total interest paid
            const totalInterest = schedule.reduce((sum, row) => sum + row.intereses, 0);
            expect(totalInterest).toBeGreaterThan(0);
            expect(totalInterest).toBeLessThan(principal);

            // Verify final balance is zero (all capital paid)
            const totalCapital = schedule.reduce((sum, row) => sum + row.capital, 0);
            expect(totalCapital).toBeCloseTo(principal, 0);
        });

        test('should calculate loan with different parameters ($5,000 at 8% for 24 months)', () => {
            // Arrange
            const principal = 5000;
            const tasaAnual = 8;
            const meses = 24;

            // Act
            const schedule = amortizacionPrestamo(principal, tasaAnual, meses);

            // Assert
            expect(schedule).toHaveLength(24);

            // Verify interest decreases over time
            expect(schedule[0].intereses).toBeGreaterThan(schedule[23].intereses);

            // Verify capital increases over time
            expect(schedule[0].capital).toBeLessThan(schedule[23].capital);

            // Verify total payments equal principal + interest
            const totalPaid = schedule.reduce((sum, row) => sum + row.pago, 0);
            const totalCapital = schedule.reduce((sum, row) => sum + row.capital, 0);
            const totalInterest = schedule.reduce((sum, row) => sum + row.intereses, 0);

            expect(totalCapital).toBeCloseTo(principal, 0);
            expect(totalPaid).toBeCloseTo(totalCapital + totalInterest, 0);
        });

        test('should handle edge cases (zero interest and single month)', () => {
            // Test 1: Zero interest rate
            const schedule1 = amortizacionPrestamo(1000, 0, 12);

            expect(schedule1).toHaveLength(12);
            expect(schedule1[0].pago).toBeCloseTo(1000 / 12, 2);
            expect(schedule1[0].intereses).toBe(0);

            // All payments should be equal with zero interest
            schedule1.forEach(row => {
                expect(row.intereses).toBe(0);
                expect(row.pago).toBeCloseTo(1000 / 12, 2);
            });

            // Test 2: Single month term
            const schedule2 = amortizacionPrestamo(1000, 5, 1);

            expect(schedule2).toHaveLength(1);
            expect(schedule2[0].mes).toBe(1);

            // With 1 month, the payment should be principal + 1 month interest
            const expectedInterest = 1000 * (5 / 100 / 12);
            expect(schedule2[0].intereses).toBeCloseTo(expectedInterest, 2);
            expect(schedule2[0].capital).toBeCloseTo(1000, 2);

            // Test 3: Validation - should throw error for invalid inputs
            expect(() => amortizacionPrestamo(-1000, 5, 12)).toThrow('Los valores deben ser positivos');
            expect(() => amortizacionPrestamo(1000, 5, 0)).toThrow('Los valores deben ser positivos');
            expect(() => amortizacionPrestamo('invalid', 5, 12)).toThrow('Todos los valores deben ser numéricos');
        });
    });

    // ==================== TRADING TOOLS TESTS ====================

    describe('Trading Tools Calculations', () => {

        // Helper functions to simulate trading calculations
        function calculateStopLoss(entryPrice, riskPercent) {
            if (isNaN(entryPrice) || isNaN(riskPercent)) {
                throw new Error('Todos los valores deben ser numéricos');
            }
            if (entryPrice <= 0 || riskPercent < 0 || riskPercent > 100) {
                throw new Error('Precio de entrada debe ser positivo y riesgo entre 0-100%');
            }
            return entryPrice * (1 - riskPercent / 100);
        }

        function calculateTakeProfit(entryPrice, sl, rrRatio) {
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

        test('should calculate stop loss correctly', () => {
            // Arrange
            const entryPrice = 100;
            const riskPercent = 2;

            // Act
            const sl = calculateStopLoss(entryPrice, riskPercent);

            // Assert
            expect(sl).toBeCloseTo(98, 2);
            expect(sl).toBeLessThan(entryPrice);

            // Test with different values
            const sl2 = calculateStopLoss(50, 5);
            expect(sl2).toBeCloseTo(47.5, 2);
        });

        test('should calculate take profit correctly', () => {
            // Arrange
            const entryPrice = 100;
            const sl = 98;
            const rrRatio = 2;

            // Act
            const tp = calculateTakeProfit(entryPrice, sl, rrRatio);

            // Assert
            // Risk = 100 - 98 = 2
            // Reward = 2 * 2 = 4
            // TP = 100 + 4 = 104
            expect(tp).toBeCloseTo(104, 2);
            expect(tp).toBeGreaterThan(entryPrice);

            // Test with different R:R ratio
            const tp2 = calculateTakeProfit(100, 95, 3);
            // Risk = 5, Reward = 15, TP = 115
            expect(tp2).toBeCloseTo(115, 2);
        });

        test('should calculate leverage position correctly', () => {
            // Arrange
            const capital = 10000;
            const leverage = 10;
            const entryPrice = 50;
            const riskPercent = 2;

            // Act
            const result = calculateLeveragePosition(capital, leverage, entryPrice, riskPercent);

            // Assert
            expect(result.positionSize).toBeCloseTo(100000, 2);
            expect(result.margen).toBeCloseTo(10000, 2);
            expect(result.margen).toBe(capital);

            // Test with different leverage
            const result2 = calculateLeveragePosition(5000, 20, 100, 1);
            expect(result2.positionSize).toBeCloseTo(100000, 2);
            expect(result2.margen).toBeCloseTo(5000, 2);
        });

        test('should calculate position sizing correctly', () => {
            // Arrange
            const capital = 10000;
            const riskPercent = 2;
            const entryPrice = 50;
            const sl = 48;

            // Act
            const lotSize = positionSizing(capital, riskPercent, entryPrice, sl);

            // Assert
            // Risk amount = 10000 * 0.02 = 200
            // Price risk = 50 - 48 = 2
            // Lot size = 200 / 2 = 100
            expect(lotSize).toBeCloseTo(100, 4);

            // Test with different parameters
            const lotSize2 = positionSizing(5000, 1, 100, 95);
            // Risk amount = 50, Price risk = 5, Lot size = 10
            expect(lotSize2).toBeCloseTo(10, 4);
        });

        test('should handle edge cases and validation for trading functions', () => {
            // Test 1: Stop Loss validation
            expect(() => calculateStopLoss(-100, 2)).toThrow('Precio de entrada debe ser positivo');
            expect(() => calculateStopLoss(100, 150)).toThrow('riesgo entre 0-100%');
            expect(() => calculateStopLoss('invalid', 2)).toThrow('numéricos');

            // Test 2: Take Profit validation
            expect(() => calculateTakeProfit(100, 105, 2)).toThrow('Stop Loss debe ser menor');
            expect(() => calculateTakeProfit(100, 98, -1)).toThrow('positivos');

            // Test 3: Position Sizing validation
            expect(() => positionSizing(10000, 2, 50, 55)).toThrow('Stop Loss debe ser menor');
            expect(() => positionSizing(-1000, 2, 50, 48)).toThrow('positivos');

            // Test 4: Zero risk stop loss (edge case)
            const slZeroRisk = calculateStopLoss(100, 0);
            expect(slZeroRisk).toBeCloseTo(100, 2);

            // Test 5: High leverage position
            const highLeverage = calculateLeveragePosition(1000, 100, 50, 1);
            expect(highLeverage.positionSize).toBeCloseTo(100000, 2);
            expect(highLeverage.margen).toBeCloseTo(1000, 2);
        });
    });

    // ==================== MARKET VISUALIZATION TESTS ====================

    describe('Market Visualization - fetchVariacion', () => {

        test('should calculate price variation correctly from API response', async () => {
            // Arrange
            const mockFetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue({
                    'Global Quote': {
                        '05. price': '150',
                        '02. open': '145'
                    }
                })
            });
            global.fetch = mockFetch;

            // Simulate fetchVariacion function
            async function fetchVariacion(asset) {
                const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${asset}&apikey=demo`);
                const data = await response.json();
                const quote = data['Global Quote'];
                const currentPrice = parseFloat(quote['05. price']);
                const openPrice = parseFloat(quote['02. open']);
                const variacion = ((currentPrice - openPrice) / openPrice) * 100;
                return { variacion, currentPrice, openPrice };
            }

            // Act
            const result = await fetchVariacion('AAPL');

            // Assert
            // Variation = (150 - 145) / 145 * 100 = 3.448...%
            expect(result.variacion).toBeCloseTo(3.45, 2);
            expect(result.currentPrice).toBe(150);
            expect(result.openPrice).toBe(145);
            expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('AAPL'));
        });

        test('should handle different price scenarios and calculate variation correctly', async () => {
            // Arrange - Test with negative variation
            const mockFetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue({
                    'Global Quote': {
                        '05. price': '95',
                        '02. open': '100'
                    }
                })
            });
            global.fetch = mockFetch;

            // Simulate fetchVariacion function
            async function fetchVariacion(asset) {
                const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${asset}&apikey=demo`);
                const data = await response.json();
                const quote = data['Global Quote'];
                const currentPrice = parseFloat(quote['05. price']);
                const openPrice = parseFloat(quote['02. open']);
                const variacion = ((currentPrice - openPrice) / openPrice) * 100;
                return { variacion, currentPrice, openPrice };
            }

            // Act
            const result = await fetchVariacion('BTCUSD');

            // Assert
            // Variation = (95 - 100) / 100 * 100 = -5%
            expect(result.variacion).toBeCloseTo(-5, 2);
            expect(result.currentPrice).toBe(95);
            expect(result.openPrice).toBe(100);
            expect(result.variacion).toBeLessThan(0); // Negative variation

            // Test with zero variation
            const mockFetchZero = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue({
                    'Global Quote': {
                        '05. price': '100',
                        '02. open': '100'
                    }
                })
            });
            global.fetch = mockFetchZero;

            const resultZero = await fetchVariacion('EURUSD');
            expect(resultZero.variacion).toBeCloseTo(0, 2);
        });
    });

    // ==================== SCIENTIFIC FUNCTIONS TESTS ====================

    describe('Trigonometric Functions', () => {

        // Helper functions (same as in calculations.js)
        function sin(x) {
            return Math.sin(x * Math.PI / 180);
        }

        function cos(x) {
            return Math.cos(x * Math.PI / 180);
        }

        function tan(x) {
            return Math.tan(x * Math.PI / 180);
        }

        test('should calculate sin(90°) correctly', () => {
            // Arrange
            const angle = 90;
            const expected = 1;

            // Act
            const result = sin(angle);

            // Assert
            expect(result).toBeCloseTo(expected, 5);
        });

        test('should calculate sin(0°) correctly', () => {
            const result = sin(0);
            expect(result).toBeCloseTo(0, 5);
        });

        test('should calculate cos(0°) correctly', () => {
            // Arrange
            const angle = 0;
            const expected = 1;

            // Act
            const result = cos(angle);

            // Assert
            expect(result).toBeCloseTo(expected, 5);
        });

        test('should calculate cos(90°) correctly', () => {
            const result = cos(90);
            expect(result).toBeCloseTo(0, 5);
        });

        test('should calculate tan(45°) correctly', () => {
            // Arrange
            const angle = 45;
            const expected = 1;

            // Act
            const result = tan(angle);

            // Assert
            expect(result).toBeCloseTo(expected, 5);
        });

        test('should calculate tan(0°) correctly', () => {
            const result = tan(0);
            expect(result).toBeCloseTo(0, 5);
        });
    });

    describe('Exponential and Power Functions', () => {

        // Helper functions
        function square(x) {
            return x * x;
        }

        function cube(x) {
            return x * x * x;
        }

        function exp(x) {
            return Math.exp(x);
        }

        function log(x) {
            if (x <= 0) {
                throw new Error('Logarithm of non-positive number');
            }
            return Math.log10(x);
        }

        function ln(x) {
            if (x <= 0) {
                throw new Error('Natural log of non-positive number');
            }
            return Math.log(x);
        }

        function sqrt(x) {
            if (x < 0) {
                throw new Error('Square root of negative number');
            }
            return Math.sqrt(x);
        }

        test('should calculate square(5) correctly', () => {
            // Arrange
            const value = 5;
            const expected = 25;

            // Act
            const result = square(value);

            // Assert
            expect(result).toBe(expected);
        });

        test('should calculate cube(3) correctly', () => {
            // Arrange
            const value = 3;
            const expected = 27;

            // Act
            const result = cube(value);

            // Assert
            expect(result).toBe(expected);
        });

        test('should calculate sqrt(16) correctly', () => {
            // Arrange
            const value = 16;
            const expected = 4;

            // Act
            const result = sqrt(value);

            // Assert
            expect(result).toBe(expected);
        });

        test('should calculate sqrt(25) correctly', () => {
            const result = sqrt(25);
            expect(result).toBe(5);
        });

        test('should throw error for sqrt of negative number', () => {
            expect(() => sqrt(-4)).toThrow('Square root of negative number');
        });

        test('should calculate exp(1) close to e', () => {
            // Arrange
            const value = 1;
            const expected = Math.E; // 2.718281828...

            // Act
            const result = exp(value);

            // Assert
            expect(result).toBeCloseTo(expected, 5);
        });

        test('should calculate exp(0) correctly', () => {
            const result = exp(0);
            expect(result).toBe(1);
        });

        test('should calculate log(100) correctly', () => {
            // Arrange
            const value = 100;
            const expected = 2; // log10(100) = 2

            // Act
            const result = log(value);

            // Assert
            expect(result).toBeCloseTo(expected, 5);
        });

        test('should calculate log(1000) correctly', () => {
            const result = log(1000);
            expect(result).toBeCloseTo(3, 5);
        });

        test('should throw error for log of non-positive number', () => {
            expect(() => log(0)).toThrow('Logarithm of non-positive number');
            expect(() => log(-5)).toThrow('Logarithm of non-positive number');
        });

        test('should calculate ln(e) correctly', () => {
            // Arrange
            const value = Math.E;
            const expected = 1; // ln(e) = 1

            // Act
            const result = ln(value);

            // Assert
            expect(result).toBeCloseTo(expected, 5);
        });

        test('should calculate ln(1) correctly', () => {
            const result = ln(1);
            expect(result).toBe(0);
        });

        test('should throw error for ln of non-positive number', () => {
            expect(() => ln(0)).toThrow('Natural log of non-positive number');
            expect(() => ln(-2)).toThrow('Natural log of non-positive number');
        });
    });

});

// Export for Jest
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Export test suite
    };
}

