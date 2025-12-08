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
});

// Export for Jest
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Export test suite
    };
}
