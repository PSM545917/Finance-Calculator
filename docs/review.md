# Sprint 1 Review - Finance Calculator MVP

## 📅 Sprint Information
- **Sprint:** Sprint 1 - MVP Core Features
- **Fecha:** Noviembre 2024
- **Duración:** 1 Sprint
- **Equipo:** 1 Developer

---

## 🎯 Objetivos del Sprint

Desarrollar un MVP funcional de Finance Calculator con:
- ✅ Calculadora básica (suma, resta, multiplicación, división)
- ✅ Cálculo de interés simple
- ✅ Cálculo de interés compuesto
- ✅ Historial con exportación a CSV

---

## 🚀 Cómo Correr la Aplicación Localmente

### Opción 1: Abrir Directamente en Navegador
```bash
# Navegar al directorio del proyecto
cd "C:\Users\ASUS\Desktop\Calculadora Financiera"

# Abrir index.html en tu navegador favorito
# Doble click en index.html
# O desde terminal:
start index.html
```

### Opción 2: Usar Live Server (Recomendado)
```bash
# Si tienes VS Code con Live Server
# Click derecho en index.html > "Open with Live Server"

# O usar Python simple server
python -m http.server 8000
# Luego abrir: http://localhost:8000
```

### Opción 3: Desde GitHub
```bash
# Clonar repositorio
git clone https://github.com/PSM545917/Finance-Calculator.git
cd Finance-Calculator

# Abrir index.html
start index.html
```

---

## ✅ Funcionalidades Implementadas

### 1. Calculadora Básica
**Estado:** ✅ Funcional

**Cómo usar:**
1. Ingresa dos números en los campos "Número 1" y "Número 2"
2. Click en el botón de operación deseada (+, -, ×, ÷)
3. El resultado aparece en la sección "Resultado"

**Validaciones:**
- ✅ Detecta valores no numéricos (NaN)
- ✅ Maneja división por cero (muestra alert)
- ✅ Acepta números decimales
- ✅ Acepta números negativos

**Ejemplo:**
- Input: 10 + 5
- Output: 15.00

---

### 2. Interés Simple
**Estado:** ✅ Funcional

**Fórmula:** `Total = P + (P * r * t)`

**Cómo usar:**
1. Ingresa Monto Principal (ej: 1000)
2. Ingresa Tasa de Interés Anual en % (ej: 5)
3. Ingresa Tiempo en años (ej: 2)
4. Click en "Calcular Interés Simple"

**Validaciones:**
- ✅ No acepta valores negativos
- ✅ Valida que todos los campos sean numéricos
- ✅ Muestra mensajes de error claros

**Ejemplo:**
- Input: Principal=1000, Tasa=5%, Tiempo=2 años
- Cálculo: 1000 + (1000 * 0.05 * 2) = 1000 + 100
- Output: 1100.00

---

### 3. Interés Compuesto
**Estado:** ✅ Funcional

**Fórmula:** `A = P * (1 + r/n)^(n*t)`

**Cómo usar:**
1. Ingresa Monto Principal (ej: 1000)
2. Ingresa Tasa de Interés Anual en % (ej: 5)
3. Ingresa Tiempo en años (ej: 10)
4. Selecciona frecuencia de composición:
   - Anual (1)
   - Mensual (12)
   - Trimestral (4)
   - Semestral (2)
5. Click en "Calcular Interés Compuesto"

**Validaciones:**
- ✅ No acepta valores negativos
- ✅ Valida que compounds sea > 0
- ✅ Precisión de 2 decimales

**Ejemplo:**
- Input: Principal=1000, Tasa=5%, Tiempo=10 años, Frecuencia=Anual
- Cálculo: 1000 * (1 + 0.05/1)^(1*10) = 1000 * (1.05)^10
- Output: 1628.89

---

### 4. Historial y Exportación CSV
**Estado:** ✅ Funcional

**Cómo usar:**
1. Realiza cualquier cálculo
2. Click en "Guardar al Historial"
3. El cálculo se guarda en LocalStorage
4. Aparece en la lista de "Historial Reciente" (últimos 10)
5. Click en "Descargar CSV" para exportar todo el historial

**Formato CSV:**
```csv
Tipo,Monto,Tasa,Tiempo,Resultado,Fecha
"Interés Simple","1000","5","2","1100.00","2024-11-26 15:30:00"
"Interés Compuesto","1000","5","10","1628.89","2024-11-26 15:35:00"
```

**Características:**
- ✅ Persistencia en LocalStorage
- ✅ Exportación automática con Blob API
- ✅ Parsing de detalles con regex
- ✅ Limpieza de recursos (URL.revokeObjectURL)

---

## 🧪 Testing

### Tests Unitarios
**Framework:** Jest (sintaxis)
**Archivo:** `tests/calculations.test.js`
**Total Tests:** 16

**Cobertura:**
- ✅ Basic Calculator: 6 tests
- ✅ Simple Interest: 3 tests
- ✅ Compound Interest: 4 tests
- ✅ Input Validation: 3 tests

**Ejecutar tests:**
```bash
# Con Jest (si está instalado)
npm test

# Con Node (mock manual)
node tests/calculations.test.js
```

---

## 📐 Arquitectura

### Estructura de Archivos
```
Finance Calculator/
├── index.html              # UI principal
├── src/
│   ├── css/
│   │   └── main.css       # Estilos responsive
│   └── js/
│       ├── calculations.js # Lógica de cálculos
│       └── history.js      # Gestión de historial
├── tests/
│   └── calculations.test.js # Tests unitarios
├── docs/
│   ├── architecture.puml   # Diagrama de componentes
│   ├── class-diagram.puml  # Diagrama de clases
│   ├── sequence-diagram.puml # Diagrama de secuencia
│   ├── activity-diagram.puml # Diagrama de actividades
│   ├── backlog.md          # Product backlog
│   ├── review.md           # Este documento
│   └── retrospective.md    # Retrospectiva
├── README.md
└── Sprint1_MVP.md
```

### Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Storage:** LocalStorage API
- **Testing:** Jest syntax
- **Version Control:** Git + GitHub
- **Diagramas:** PlantUML

---

## 📊 Métricas del Sprint

| Métrica | Valor |
|---------|-------|
| User Stories Completadas | 4/4 (100%) |
| Story Points | 21/21 (100%) |
| Tests Unitarios | 16 ✅ |
| Cobertura de Tests | 100% (funciones de cálculo) |
| Commits | 20+ |
| Branches Feature | 5 |
| Diagramas UML | 4 |
| Archivos de Código | 5 |
| Líneas de Código | ~600 |

---

## 🎨 Características Técnicas

### Event-Driven Architecture
- ✅ Sin handlers `onclick` inline
- ✅ Todos los eventos con `addEventListener`
- ✅ Separación de lógica y presentación

### Validaciones
- ✅ Detección de NaN
- ✅ Validación de negativos
- ✅ División por cero
- ✅ Compounds > 0

### Responsive Design
- ✅ Mobile-first approach
- ✅ Flexbox/Grid layout
- ✅ Media queries
- ✅ Validación visual de inputs

---

## 🐛 Bugs Conocidos

**Ninguno reportado** ✅

---

## 🔄 Próximos Pasos (Sprint 2)

1. **ROI Calculator** - Retorno de inversión
2. **TIR Calculator** - Tasa interna de retorno
3. **Gráficos** - Visualización con Chart.js
4. **Análisis de Sensibilidad** - Variación de tasas

---

## 📝 Notas Adicionales

### Compatibilidad
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

### Requisitos
- Navegador moderno con soporte para ES6
- LocalStorage habilitado
- JavaScript habilitado

### Limitaciones Conocidas
- Historial limitado a LocalStorage (no multi-dispositivo)
- Sin autenticación de usuarios
- Sin backend (solo frontend)

---

## ✅ Demo Checklist

Para demostrar la aplicación:

- [ ] Abrir `index.html` en navegador
- [ ] Probar calculadora básica (10 + 5 = 15)
- [ ] Calcular interés simple (1000, 5%, 2 años = 1100)
- [ ] Calcular interés compuesto (1000, 5%, 10 años, anual = 1628.89)
- [ ] Guardar cálculo en historial
- [ ] Verificar que aparece en lista
- [ ] Exportar a CSV
- [ ] Abrir CSV y verificar formato
- [ ] Mostrar código fuente limpio
- [ ] Mostrar tests pasando
- [ ] Mostrar diagramas UML

---

**Sprint 1 Review completado exitosamente** ✅

**Fecha de Review:** 26 de Noviembre, 2024
