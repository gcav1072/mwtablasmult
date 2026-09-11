# 🧮 Tablas de Multiplicar — Repetición Espaciada

Una aplicación web educativa e interactiva diseñada para que niños de 9 a 11 años dominen las tablas de multiplicar de forma sólida y divertida mediante **repetición espaciada** (*Spaced Repetition System* - SRS).

Desarrollada con **HTML5, Vanilla CSS y Vanilla JavaScript**, sin dependencias ni herramientas de compilación externas. Compatible para ser alojada como sitio estático en **GitHub Pages**.

---

## ✨ Características Principales

- **🧠 Algoritmo de Repetición Espaciada (SRS):**
  - Sistema de 5 escalones de dominio: 1 día, 3 días, 7 días, 14 días y 30 días.
  - Sesiones diarias optimizadas de 15 operaciones (máximo 5 fichas nuevas por sesión, el resto de repaso).
  - Cooldown de 20 horas entre sesiones completadas para fomentar el hábito diario sin sobrecargar.
  - Sistema de **repesca**: las fichas falladas en una sesión se vuelven a preguntar al final de la misma antes de consolidar el resultado.

- **📊 Visualización del Progreso & Gamificación:**
  - **Matriz / Heatmap interactivo**: visualización de todas las multiplicaciones (tablas del 1 al 10, o hasta el 12) con código de colores según el nivel de dominio.
  - **Sistema de medallas**: 8 logros desbloqueables por hitos (primeros pasos, rachas, velocidad, dominio de tablas).
  - **Estadísticas detalladas**: racha actual y máxima, total de aciertos/fallos, tiempo medio de respuesta.
  - **Desbloqueo progresivo**: opción de activar las tablas del 11 y 12 automáticamente al alcanzar el 80% de dominio de las tablas básicas (o manualmente desde ajustes).

- **👥 Multi-Perfil con Persistencia Local:**
  - Permite múltiples usuarios en el mismo dispositivo.
  - Todos los progresos se guardan en `localStorage`.
  - Seguridad en borrado: confirmación en dos pasos (aviso + confirmación escribiendo el nombre).

- **🎨 Diseño Moderno & Adaptable:**
  - Interfaz oscura premium (*dark mode* con acentos violeta/azul y efectos de cristal/glassmorphism).
  - Teclado numérico virtual táctil para móviles y tablets + soporte nativo de teclado físico (números, Numpad, Enter, Backspace).
  - Efectos de sonido sintetizados mediante **Web Audio API** (sin necesidad de cargar archivos de audio externos).
  - Modo seguro y accesible con soporte para navegación por teclado y contraste adecuado.

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

Para pruebas rápidas y desarrollo, la app cuenta con un panel de herramientas de desarrollo:
- Añade `?debug=1` en la URL del navegador (ej: `http://localhost:8080/?debug=1`).
- En modo debug:
  - Las sesiones tienen un cooldown acelerado de 10 segundos.
  - Aparece un panel flotante para avanzar días (`+1 día`), resetear el perfil activo o volcar el estado a la consola de desarrollo (`console.table`).

---

## 🌐 Despliegue en GitHub Pages

1. Sube este repositorio a GitHub.
2. Ve a **Settings > Pages** dentro de tu repositorio.
3. En **Source**, selecciona la rama `main` (o `master`) y la carpeta `/ (root)`.
4. Guarda los cambios. En unos minutos tu aplicación estará publicada y accesible en internet.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
