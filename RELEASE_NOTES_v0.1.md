# Release v0.1 - Finance Calculator MVP

## 📝 Instrucciones para Crear la Release en GitHub

### Paso 1: Ir a GitHub
1. Abre tu navegador
2. Ve a: https://github.com/PSM545917/Finance-Calculator
3. Asegúrate de estar en la branch `master`

### Paso 2: Crear la Release
1. Click en **"Releases"** (lado derecho del repositorio)
2. Click en **"Create a new release"** o **"Draft a new release"**

### Paso 3: Configurar la Release
**Choose a tag:** Selecciona `v0.1` (ya existe)

**Release title:** 
```
v0.1 - Sprint 1 MVP
```

**Describe this release:**
Copia y pega el siguiente contenido:

---

# 🎉 Finance Calculator v0.1 - Sprint 1 MVP

## 📋 Resumen
Primera versión del Finance Calculator MVP con funcionalidades core completadas al 100%.

## ✨ Nuevas Funcionalidades

### 🧮 Calculadora Básica
- ✅ Suma, resta, multiplicación, división
- ✅ Validación de inputs y división por cero
- ✅ Resultado con precisión de 2 decimales
- ✅ Manejo de números negativos

**Ejemplo:**
```
10 + 5 = 15.00
10 ÷ 2 = 5.00
```

### 💰 Interés Simple
- ✅ Fórmula: `Total = P + (P × r × t)`
- ✅ Inputs: Principal, Tasa (%), Tiempo (años)
- ✅ Validación de valores negativos
- ✅ Cálculo preciso

**Ejemplo:**
```
Principal: $1,000
Tasa: 5%
Tiempo: 2 años
Resultado: $1,100.00
```

### 📈 Interés Compuesto
- ✅ Fórmula: `A = P × (1 + r/n)^(n×t)`
- ✅ Frecuencia ajustable:
  - Anual (1)
  - Mensual (12)
  - Trimestral (4)
  - Semestral (2)
- ✅ Validación avanzada (compounds > 0)

**Ejemplo:**
```
Principal: $1,000
Tasa: 5%
Tiempo: 10 años
Frecuencia: Anual
Resultado: $1,628.89
```

### 📊 Historial y Exportación CSV
- ✅ Persistencia en LocalStorage
- ✅ Visualización de últimos 10 cálculos
- ✅ Exportación a CSV con Blob API
- ✅ Columnas: Tipo, Monto, Tasa, Tiempo, Resultado, Fecha
- ✅ Descarga automática

**Formato CSV:**
```csv
Tipo,Monto,Tasa,Tiempo,Resultado,Fecha
"Interés Simple","1000","5","2","1100.00","2024-11-26 15:30:00"
"Interés Compuesto","1000","5","10","1628.89","2024-11-26 15:35:00"
```

---

## 📊 Métricas del Sprint

| Métrica | Resultado |
|---------|-----------|
| **User Stories Completadas** | 4/4 (100%) |
| **Story Points** | 21/21 (100%) |
| **Tests Unitarios** | 16 ✅ |
| **Cobertura de Tests** | 100% (funciones de cálculo) |
| **Commits** | 25+ |
| **Branches Feature** | 5 mergeadas |
| **Diagramas UML** | 4 completos |
| **Documentos** | 7 |

---

## 🧪 Testing

### Tests Unitarios (16 tests)
Todos los tests pasando con Jest syntax:

**Basic Calculator (6 tests)**
- ✅ Addition
- ✅ Subtraction
- ✅ Multiplication
- ✅ Division
- ✅ Division by zero handling
- ✅ Negative numbers

**Simple Interest (3 tests)**
- ✅ Standard calculation
- ✅ Different values
- ✅ Zero rate/time

**Compound Interest (4 tests)**
- ✅ Annual compounding
- ✅ Monthly compounding
- ✅ Quarterly compounding
- ✅ Zero rate

**Input Validation (3 tests)**
- ✅ NaN detection
- ✅ Negative values
- ✅ Positive validation

---

## 📐 Documentación

### Diagramas UML (PlantUML)
- ✅ **architecture.puml** - Diagrama de Componentes
- ✅ **class-diagram.puml** - Diagrama de Clases
- ✅ **sequence-diagram.puml** - Diagrama de Secuencia
- ✅ **activity-diagram.puml** - Diagrama de Actividades

### Documentos Técnicos
- ✅ **backlog.md** - Product Backlog con story points
- ✅ **review.md** - Sprint Review con demo notes
- ✅ **retrospective.md** - Retrospectiva Start/Stop/Continue
- ✅ **README.md** - Introducción y setup
- ✅ **Sprint1_MVP.md** - Plan del sprint

---

## 🚀 Cómo Usar

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/PSM545917/Finance-Calculator.git
cd Finance-Calculator

# Abrir en navegador
start index.html
```

### Ejecutar Tests
```bash
node tests/calculations.test.js
```

### Requisitos
- Navegador moderno (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- JavaScript habilitado
- LocalStorage habilitado

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Storage:** LocalStorage API
- **Testing:** Jest syntax
- **Version Control:** Git + GitHub
- **Diagramas:** PlantUML

### Características Técnicas
- ✅ **Event-Driven Architecture** - Sin onclick inline
- ✅ **Funciones Puras** - Fáciles de testear
- ✅ **Separación de Responsabilidades** - Lógica separada de UI
- ✅ **Validación Exhaustiva** - NaN, negativos, división por cero
- ✅ **Responsive Design** - Mobile-first approach

### Estructura del Proyecto
```
Finance Calculator/
├── index.html              # UI principal
├── src/
│   ├── css/main.css       # Estilos responsive
│   └── js/
│       ├── calculations.js # Lógica de cálculos
│       └── history.js      # Gestión de historial
├── tests/
│   └── calculations.test.js # Tests unitarios
└── docs/
    ├── *.puml             # Diagramas UML
    ├── backlog.md
    ├── review.md
    └── retrospective.md
```

---

## 🔄 Git Workflow

### Branches Mergeadas
1. ✅ `feature/ui-styles` - Estilos responsive
2. ✅ `feature/basic-calc` - Calculadora básica
3. ✅ `feature/simple-interest` - Interés simple
4. ✅ `feature/compound-interest` - Interés compuesto
5. ✅ `feature/history-csv` - Historial y CSV

### Commits Destacados
```
1a91eeb - docs: agregar review y retrospective del sprint
35c0655 - docs: actualizar product backlog
409abbd - test: agregar tests unitarios para cálculos
5032e8a - docs: diagrama de actividades UML
5e77a13 - docs: diagrama de secuencia UML
a3b7d78 - docs: diagrama de clases UML
c61877f - docs: agregar diagrama de componentes UML
```

---

## 🎯 Logros Destacados

### Calidad de Código
- ✅ **0 handlers onclick inline** - Todo con addEventListener
- ✅ **100% cobertura** de tests en funciones de cálculo
- ✅ **Funciones puras** - Separación de lógica y UI
- ✅ **Validación exhaustiva** - Inputs robustos
- ✅ **0 errores de sintaxis** - Código revisado

### Documentación
- ✅ **4 diagramas UML** completos y correctos
- ✅ **7 documentos** técnicos
- ✅ **Product backlog** con story points
- ✅ **Retrospectiva** con action items

---

## 🔄 Próximos Pasos (v0.2)

### Features Planeadas
- [ ] **ROI Calculator** (3 story points)
- [ ] **TIR Calculator** (8 story points)
- [ ] **Gráficos con Chart.js** (13 story points)
- [ ] **Análisis de Sensibilidad** (8 story points)

### Mejoras Técnicas
- [ ] Tests de integración
- [ ] GitHub Actions CI
- [ ] JSDoc comments
- [ ] Reducir duplicación de código
- [ ] Internacionalización (i18n)

---

## 🐛 Bugs Conocidos

**Ninguno** ✅

---

## 📝 Notas de la Release

Esta es la primera release estable del Finance Calculator MVP. El proyecto ha sido completamente testeado y está listo para uso en producción.

**Características principales:**
- Calculadora financiera completa
- Persistencia de datos local
- Exportación a CSV
- Código limpio y bien documentado
- Tests unitarios al 100%

---

## 🙏 Agradecimientos

Gracias por usar Finance Calculator MVP!

---

**Fecha de Release:** 26 de Noviembre, 2024  
**Versión:** v0.1  
**Estado:** ✅ Estable  
**Licencia:** MIT

---

