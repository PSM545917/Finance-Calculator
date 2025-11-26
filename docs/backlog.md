# Product Backlog - Finance Calculator MVP

## Sprint 1 - MVP Core Features

### Completed Items ✅

| ID | User Story | Story Points | Estado | Prioridad |
|----|------------|--------------|--------|-----------|
| US-001 | **UI Básica**: Como usuario, quiero una interfaz web responsive para ingresar datos de cálculos financieros | 5 | ✅ DONE | Alta |
| US-002 | **Interés Simple**: Como usuario, quiero calcular interés simple ingresando principal, tasa y tiempo | 3 | ✅ DONE | Alta |
| US-003 | **Interés Compuesto**: Como usuario, quiero calcular interés compuesto con frecuencia de composición ajustable | 5 | ✅ DONE | Alta |
| US-004 | **Historial y CSV**: Como usuario, quiero guardar mis cálculos en historial y exportarlos a CSV | 8 | ✅ DONE | Media |

**Total Story Points Sprint 1:** 21 puntos ✅

---

## Detalles de User Stories

### US-001: UI Básica
**Descripción:** Interfaz web con formularios para calculadora básica, interés simple e interés compuesto.

**Criterios de Aceptación:**
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Validación visual de inputs
- ✅ Estilos CSS profesionales
- ✅ Sin handlers inline (addEventListener)
- ✅ Secciones claramente separadas

**Tareas Técnicas:**
- ✅ Crear `index.html` con estructura semántica
- ✅ Implementar `main.css` con Flexbox/Grid
- ✅ Agregar validación de inputs
- ✅ Conectar event listeners

**Estado:** ✅ Completado en Sprint 1

---

### US-002: Interés Simple
**Descripción:** Cálculo de interés simple con fórmula `Total = P + (P * r * t)`.

**Criterios de Aceptación:**
- ✅ Inputs: Principal, Tasa (%), Tiempo (años)
- ✅ Validación de valores negativos y NaN
- ✅ Resultado mostrado en pantalla
- ✅ Fórmula matemáticamente correcta

**Tareas Técnicas:**
- ✅ Implementar función `computeSimpleInterest()`
- ✅ Crear handler `handleSimpleInterest()`
- ✅ Agregar validaciones
- ✅ Tests unitarios (3 casos)

**Estado:** ✅ Completado en Sprint 1

---

### US-003: Interés Compuesto
**Descripción:** Cálculo de interés compuesto con fórmula `A = P * (1 + r/n)^(n*t)`.

**Criterios de Aceptación:**
- ✅ Inputs: Principal, Tasa (%), Tiempo (años), Frecuencia (n)
- ✅ Opciones de frecuencia: Anual, Mensual, Trimestral, Semestral
- ✅ Validación de valores negativos y NaN
- ✅ Validación de compounds > 0
- ✅ Resultado preciso con 2 decimales

**Tareas Técnicas:**
- ✅ Implementar función `computeCompoundInterest()`
- ✅ Crear handler `handleCompoundInterest()`
- ✅ Agregar validaciones avanzadas
- ✅ Tests unitarios (4 casos)

**Estado:** ✅ Completado en Sprint 1

---

### US-004: Historial y CSV
**Descripción:** Persistencia de cálculos en LocalStorage y exportación a CSV.

**Criterios de Aceptación:**
- ✅ Guardar cálculos en LocalStorage
- ✅ Mostrar últimos 10 cálculos
- ✅ Exportar a CSV con columnas: Tipo, Monto, Tasa, Tiempo, Resultado, Fecha
- ✅ Usar Blob y URL.createObjectURL
- ✅ Descarga automática del archivo

**Tareas Técnicas:**
- ✅ Implementar `saveCalculationToHistory()`
- ✅ Implementar `loadHistory()`
- ✅ Implementar `exportHistoryToCSV()`
- ✅ Parsear detalles con regex
- ✅ Generar CSV con formato correcto

**Estado:** ✅ Completado en Sprint 1

---

## Sprint 2 - Features Avanzadas (Backlog)

| ID | User Story | Story Points | Estado | Prioridad |
|----|------------|--------------|--------|-----------|
| US-005 | **ROI**: Como usuario, quiero calcular el retorno de inversión (ROI) | 3 | 📋 TODO | Media |
| US-006 | **TIR**: Como usuario, quiero calcular la tasa interna de retorno (TIR) | 8 | 📋 TODO | Media |
| US-007 | **Gráficos**: Como usuario, quiero visualizar mis cálculos en gráficos | 13 | 📋 TODO | Baja |
| US-008 | **Análisis de Sensibilidad**: Como usuario, quiero ver cómo varían los resultados con diferentes tasas | 8 | 📋 TODO | Baja |

---

## Definición de Done (DoD)

Para que una User Story se considere **DONE**, debe cumplir:

- ✅ Código implementado y funcional
- ✅ Tests unitarios pasando (cobertura >60%)
- ✅ Validaciones de inputs implementadas
- ✅ Documentación actualizada
- ✅ Code review completado
- ✅ Merged a branch principal
- ✅ Sin errores de lint
- ✅ Funcionalidad verificada en navegador

---

## Métricas del Sprint 1

| Métrica | Valor |
|---------|-------|
| Story Points Planeados | 21 |
| Story Points Completados | 21 |
| Velocidad del Sprint | 21 puntos |
| User Stories Completadas | 4/4 (100%) |
| Tests Unitarios | 16 tests ✅ |
| Commits | 15+ |
| Branches Feature | 5 |
| Diagramas UML | 4 (Componentes, Clases, Secuencia, Actividades) |

---

## Notas del Sprint

**Logros:**
- ✅ MVP completamente funcional
- ✅ Arquitectura bien documentada (4 diagramas UML)
- ✅ Tests con cobertura 100% de funciones de cálculo
- ✅ Git workflow implementado correctamente
- ✅ Código refactorizado con event listeners

**Lecciones Aprendidas:**
- Event listeners mejoran la mantenibilidad vs onclick inline
- Separar lógica de cálculo de UI facilita testing
- LocalStorage es suficiente para MVP
- PlantUML requiere sintaxis específica (evitar !define con colores)

**Deuda Técnica:**
- Ninguna significativa

---

## Próximos Pasos

1. Planificar Sprint 2 con features avanzadas
2. Considerar integración de Chart.js para gráficos
3. Evaluar migración a framework (React/Vue) si el proyecto crece
4. Implementar backend para persistencia multi-usuario (opcional)
