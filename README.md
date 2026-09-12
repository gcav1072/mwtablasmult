# 🧮 Tablas de Multiplicar — Repetición Espaciada

Una aplicación web educativa e interactiva diseñada para que niños de 9 a 12 años dominen las tablas de multiplicar de forma sólida y divertida mediante **repetición espaciada** (*Spaced Repetition System* - SRS).

Desarrollada con **HTML5, Vanilla CSS y Vanilla JavaScript**, sin dependencias ni herramientas de compilación externas. Compatible para ser alojada como sitio estático en **GitHub Pages**.

---

## ✨ Características Principales

- **🧠 Algoritmo de Repetición Espaciada (SRS):**
  - **7 niveles de dominio** con intervalos crecientes: 1, 3, 7, 14, 30, 60 y 90 días. Al superar el último, la ficha se **gradúa** y pasa a repasos de mantenimiento.
  - **La velocidad de respuesta cuenta**: acertar en menos de 1,5 s sube **dos** escalones (memoria); entre 1,5 s y 4,5 s sube **uno** (automatizado); por encima de 4,5 s se acepta como correcto pero no avanza, porque aún lo está calculando. Un fallo baja hasta 2 escalones.
  - **Corrección obligatoria al fallar**: no hay auto-avance. Aparece el resultado correcto en grande y el niño debe **teclearlo** para continuar, lo que convierte el error en un repaso activo.
  - Sesiones diarias según el **ritmo del perfil**: Normal (15 tarjetas/día), Rápido (20) o Intenso (30). Si hay más fichas vencidas de las previstas, la sesión incluye **todas** las vencidas, de modo que el contador *"Para hoy"* de Inicio coincide siempre con el número de tarjetas de la sesión.
  - **Ritmo de estudio configurable**: al crear un perfil se eligen 3 ritmos con su tiempo estimado de sesión (Normal ≈ 5 min · Rápido ≈ 6 min · Intenso ≈ 9 min). También se pueden **cambiar las tarjetas diarias** después, desde la tarjeta *"⚡ Tarjetas diarias"* de la pantalla **Mi Progreso**.
  - Cooldown de 20 horas entre sesiones completadas para fomentar el hábito diario sin sobrecargar.
  - Sistema de **repesca ilimitada**: las fichas falladas vuelven a preguntarse al final de la sesión, tantas veces como haga falta hasta acertarlas. Los fallos dentro de la repesca no penalizan las estadísticas.
  - **Rondas extra opcionales**: al terminar, se puede practicar en bloques de **+5 tarjetas** tantas veces como se quiera (se suman a la sesión del día).

- **📊 Visualización del Progreso & Gamificación:**
  - **Matriz / Heatmap interactivo**: visualización de todas las multiplicaciones (tablas del 1 al 10, o hasta el 12) con código de colores según el nivel de dominio. Cada uno de los 7 niveles y el estado *graduada* usa una tonalidad claramente distinta (rojo → naranja → amarillo → lima → esmeralda → cian → azul → fucsia para las graduadas) y los **mismos colores** valen para tema claro y oscuro.
  - **Sistema de medallas**: 9 logros desbloqueables por hitos (primeros pasos, rachas, velocidad, dominio de tablas, graduación).
  - **Estadísticas detalladas**: racha actual y máxima, total de aciertos/fallos, tiempo medio de respuesta.
  - **Desbloqueo progresivo**: opción de activar las tablas del 11 y 12 automáticamente al alcanzar el 80% de dominio de las tablas básicas (o manualmente desde ajustes).

- **👥 Multi-Perfil con Persistencia Local:**
  - Permite múltiples usuarios en el mismo dispositivo.
  - Todos los progresos se guardan en `localStorage`.
  - **Importar un perfil** directamente desde la pantalla de selección de perfiles (📤 *Importar perfil*), sin necesidad de crear un usuario antes. Si el nombre ya existe, se pide confirmación antes de reemplazarlo.
  - **Exportar** el progreso del perfil activo desde **Mi Progreso** (📥 *Exportar*).
  - Seguridad en borrado: confirmación en dos pasos (aviso + confirmación escribiendo el nombre).

- **🎨 Diseño Moderno & Adaptable:**
  - Interfaz con acentos violeta/azul y efectos de cristal (*glassmorphism*).
  - **Tema claro, oscuro o automático según el sistema** (por defecto: sistema).
  - Tipografía: **Poppins** en los títulos y **Cabin** en el texto.
  - Teclado numérico virtual táctil para móviles y tablets + soporte nativo de teclado físico (números, Numpad, Enter, Backspace).
  - Efectos de sonido sintetizados mediante **Web Audio API** (sin necesidad de cargar archivos de audio externos), con opción de silenciarlos.
  - Modo seguro y accesible con soporte para navegación por teclado y contraste adecuado.

- **📖 Guía de bienvenida en 2 pestañas:**
  - Al abrir o refrescar la app aparece un cuadro de documentación con dos pestañas: **Para padres** (cómo funciona la repetición espaciada, la importancia de la velocidad, el hábito diario y el respaldo de datos) y **Para niños** (qué van a hacer, cómo responder, qué pasa si fallan y las medallas).
  - Casilla **"No volver a mostrar esto al abrir la app"** para no resultar pesada.
  - Siempre se puede volver a consultar desde **Ajustes ⚙️ → ℹ️ ¿Cómo funciona?**.

- **⚙️ Ajustes del dispositivo:**
  - Se abren desde el botón flotante ⚙️ de la esquina superior derecha, que despliega una **barra lateral**.
  - **Sonido** activado/desactivado, **tema** (Claro · Oscuro · Sistema) y acceso a la **guía de uso** (ℹ️ *¿Cómo funciona?*).
  - Se guardan en `localStorage` bajo la clave `tablas_prefs_v1`, **independientes de los perfiles** (son preferencias del dispositivo).

---

## 📁 Estructura del Proyecto

```text
mwtablasmult/
├── index.html          # Estructura semántica de las 5 pantallas y modales
├── css/
│   └── style.css       # Sistema de diseño, temas, layout responsivo y animaciones
├── js/
│   └── app.js          # Lógica SRS, estado, audio, renderizado y eventos
├── README.md           # Documentación del proyecto
└── .gitignore          # Archivos ignorados por git
```

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

No se requiere `npm` ni librerías externas. Puedes abrir el archivo directamente o usar cualquier servidor web estático:

### Opción 1: Con Python (Recomendado)
```bash
python3 -m http.server 8080
```
Luego abre tu navegador en `http://localhost:8080`.

### Opción 2: Abrir directamente el archivo
Haz doble clic en `index.html` o ábrelo en tu navegador favorito.

---

## 🛠️ Modo Debug

Para pruebas rápidas y desarrollo, la app cuenta con un panel de herramientas:
- Añade `?debug=1` en la URL del navegador (ej: `http://localhost:8080/?debug=1`).
- En modo debug:
  - Las sesiones tienen un cooldown acelerado de 10 segundos.
  - Aparece una **pestaña lateral** (🛠️) que despliega un **panel de debug** desde la derecha:
    - En escritorio el panel arranca **abierto** (sin oscurecer la pantalla, para poder usar la app).
    - En móvil queda **plegado** tras la pestaña para no tapar botones.
  - Dentro del panel: avanzar días (`+1 día`), resetear el perfil activo o volcar el estado a la consola (`console.table`).
- El panel de ajustes y el de debug son mutuamente excluyentes y se cierran con `Esc`, con la ✕ o pulsando fuera.

---

## 🌐 Despliegue en GitHub Pages

1. Sube este repositorio a GitHub.
2. Ve a **Settings > Pages** dentro de tu repositorio.
3. En **Source**, selecciona la rama `main` (o `master`) y la carpeta `/ (root)`.
4. Guarda los cambios. En unos minutos tu aplicación estará publicada y accesible en internet.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
