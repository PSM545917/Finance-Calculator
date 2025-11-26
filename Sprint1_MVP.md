Sprint 1: Implementación del MVP para Finance Calculator
Contexto General del Proyecto
Finance Calculator es una aplicación web avanzada diseñada para realizar cálculos financieros complejos. El MVP (Minimum Viable Product) se centra en proporcionar herramientas útiles para usuarios que necesitan analizar préstamos y inversiones, resolviendo problemas comunes como la planificación de deudas o el pronóstico de rendimientos. El proyecto demuestra conceptos de Ingeniería de Software, incluyendo Git para control de versiones, Scrum para gestión ágil, arquitectura de software y testing, adaptado a un desarrollo individual.
El MVP incluye las siguientes funcionalidades principales:

Cálculos de préstamos (amortización).
Análisis de intereses compuestos.
Cálculo de ROI (Return on Investment).
Visualización de métricas financieras (ej. gráficos simples de proyecciones).
Cálculo de TIR (Tasa Interna de Retorno) – para evaluar la rentabilidad de inversiones.
Análisis de sensibilidad – para simular variaciones en variables como tasas de interés o plazos.

Además, se incorpora una opción de historial: Para cálculos importantes (como préstamos, intereses, ROI, etc.), se agrega un botón "Guardar al Historial" que permite exportar los datos en formato .CSV.
Propósito de este Sprint (Sprint 1)
Este sprint se enfoca exclusivamente en la implementación inicial del MVP, limitándose a:

Funcionalidades de una calculadora básica (suma, resta, multiplicación, división).
Cálculo de intereses simples para un préstamo por un monto específico (el usuario puede ajustar el porcentaje de interés).
Cálculo de intereses compuestos para préstamos.

El goal del sprint es entregar un producto funcional básico que demuestre la aplicación práctica de los conceptos evaluados en el parcial (Git, Scrum, Arquitectura y Testing). Se simula un sprint de 2 horas, adaptado a desarrollo individual, con rotación de roles (Product Owner para priorización, Developer para implementación, Scrum Master para facilitación).
Duración estimada:

Planning: 15 minutos (definir backlog simplificado y arquitectura).
Execution: 80 minutos (implementar código, Git workflows, UML, conflictos).
Review: 15 minutos (demo y release).
Retrospective: 10 minutos (reflexión).

El resultado debe ser un repositorio GitHub con código funcional, documentación UML, evidencias de Git (commits, PRs, branches) y un historial exportable a .CSV.
Alcance del Sprint

Funcionalidades a implementar:
Calculadora básica: Interfaz para operaciones aritméticas simples.
Interés simple: Fórmula = Principal * Tasa * Tiempo (usuario ingresa monto, tasa ajustable, tiempo).
Interés compuesto: Fórmula = Principal * (1 + Tasa/n)^(n*Tiempo) (incluye compuestos por período, ej. mensual).
Historial: Botón "Guardar al Historial" para cada cálculo, que almacena datos en LocalStorage y genera un .CSV descargable (usando Blob y URL.createObjectURL).

Limitaciones: No se implementan ROI, TIR, análisis de sensibilidad ni visualizaciones avanzadas en este sprint. Persistencia via LocalStorage (no backend). Testing manual inicial.
Criterios de Aceptación:
La app debe correr localmente en navegador.
Inputs validados (ej. no negativos para montos).
Exportación .CSV con columnas: Tipo de Cálculo, Monto, Tasa, Tiempo, Resultado, Fecha.
Al menos 5-7 commits clave, 2-3 PRs, 1 conflicto resuelto.
Cobertura de testing >60% (unitarios para funciones de cálculo).


Herramientas Necesarias

IDE/Entorno de Desarrollo: Antigravity (para edición y ejecución local, guiado por este documento).
Lenguajes y Stack: HTML5, CSS3 (para UI responsive), JavaScript ES6+ (para lógica, sin frameworks para simplicidad).
Control de Versiones: Git + GitHub (repositorio: https://github.com/PSM545917/Finance-Calculator.git). Usa Git Flow: branch main para estable, feature/* para funcionalidades.
Documentación UML: PlantUML (genera diagramas de componentes, clases, secuencia y actividades; renderiza online en plantuml.com).
LLM: Antigravity / Claude (para generar código, prompts como: "Genera código JS para cálculo de interés compuesto" o "Crea diagrama PlantUML para arquitectura").
Testing: Jest o Mocha (para unitarios; instala via npm si Antigravity lo permite, o manual).
Otras: Navegador moderno (Chrome/Firefox) para testing local. Node.js opcional para server local (live-server).
Dependencias: Ninguna externa obligatoria; usa vanilla JS. Para .CSV, usa APIs nativas de browser.

Estructura de Archivos Recomendada

index.html: Página principal con UI (forms para inputs, botones, display de resultados).
src/js/calculations.js: Módulos para funciones de cálculo (básico, simple interest, compound interest).
src/js/history.js: Lógica para historial y export .CSV.
src/css/main.css: Estilos responsive.
docs/: Backlog.md, architecture.puml (y renders), review.md, retrospective.md.
tests/: Archivos de tests (ej. calculations.test.js).
README.md: Instrucciones de setup y uso.

Plan de Ejecución (Adaptado a GitQuest Ágil)

Sprint Planning (15 min):
Definir backlog simplificado (3-4 items: UI básica, interés simple, interés compuesto, historial).
Generar diagrama de arquitectura con PlantUML via Claude.
Inicializar Git: git init, commit inicial, push a GitHub.
Configurar Project Board en GitHub (columnas: To Do, In Progress, Done).

Sprint Execution (80 min):
Daily Standup: Reflexión rápida individual.
Implementar features en branches separadas (ej. feature/basic-calc).
Usar Claude para código: Prompt como "Escribe función JS para interés compuesto con inputs ajustables".
Documentar UML: Diagrama de clases para cálculos, secuencia para historial.
Simular conflicto: Editar mismo archivo en branches, resolver con git merge.
Agregar tests unitarios.
Implementar botón de historial y export .CSV.

Sprint Review (15 min):
Demo: Correr app localmente, mostrar cálculos y export.
Crear release en GitHub con tag v0.1.

Sprint Retrospective (10 min):
Formato: Start (qué empezar), Stop (qué detener), Continue (qué continuar).
Documentar en docs/retrospective.md.
