'use strict';

// ═══════════════════════════════════════════════════════
// TEXTOS (i18n-ready — todos los strings en un solo objeto)
// ═══════════════════════════════════════════════════════
const T = {
  appTitulo: 'Tablas de Multiplicar',
  perfiles: {
    titulo: 'Elige tu perfil para empezar',
    nuevo: 'Nuevo perfil',
    placeholder: 'Escribe tu nombre...',
  },
  saludo: nombre => `¡Hola, ${nombre}! 👋`,
  empezar: '▶ Empezar sesión',
  todoAlDia: '🎉 ¡Todo al día! Vuelve mañana',
  enCooldown: horasMin => `⏳ Vuelve en ${horasMin}`,
  stats: {
    pendientes: 'Para hoy',
    dominadas: 'Dominadas',
    rachaMax: 'Racha',
    aciertos: 'Aciertos',
    fallos: 'Fallos',
    tiempoMedio: 'Tiempo medio',
    repescas: 'Repescas superadas',
  },
  feedback: {
    facil: '✨ ¡Genial!',
    bien: '✅ ¡Bien!',
    titubeante: '👌 ¡Correcto!',
    memoriza: [
      '🧠 ¡Este es el resultado! ¡No lo vayas a olvidar!',
      '✨ ¡Grábalo bien! Este es el resultado',
      '🎯 ¡Este es el resultado! ¡Memorízalo!',
      '🔑 ¡Este es el resultado! ¡Recuérdalo!',
    ],
    copiar: '✍️ Escríbe el número en el cuadro de abajo para seguir',
    copiado: '✅ ¡Eso es!',
    repescaMensajes: [
      '💪 ¡Casi lo tienes! Vamos a por esa otra vez',
      '😄 ¡Se te está resistiendo! Esta vez seguro que sí',
      '🔥 ¡Esta tabla te está poniendo a prueba! ¡Tú puedes!',
      '🚀 ¡Ya casi es tuya! Un intento más y lo tienes',
      '🌟 ¡Las tablas más difíciles son las que más orgullo dan! ¡Vamos!',
    ],
  },
  resumen: {
    titulo: 'Resumen de la sesión',
    fallados: 'Revisa estos errores:',
    sinFallos: '¡Ningún fallo! 🎉',
    nuevasMedallas: '🏅 ¡Medallas nuevas!',
    volver: 'Volver al inicio',
  },
  repesca: (ronda, restantes) =>
    `🔄 Repesca ${ronda} · ${restantes} restante${restantes !== 1 ? 's' : ''}`,
  desbloqueo: {
    mensaje: '🎉 ¡Has dominado el 80% de las tablas! ¿Quieres desbloquear las tablas del 11 y 12?',
    boton: '✨ ¡Sí, desbloquear!',
  },
  eliminar: {
    paso1Titulo: '⚠️ Eliminar perfil',
    paso1Texto: nombre => `¿Seguro que quieres eliminar el perfil de «${nombre}»? Se perderán todos sus datos de progreso.`,
    paso2Titulo: '🔒 Confirmación final',
    paso2Texto: nombre => `Escribe «${nombre}» para confirmar:`,
    cancelar: 'Cancelar',
    confirmar1: 'Sí, eliminar',
    confirmar2: 'Eliminar definitivamente',
    errorNoCoincide: 'El nombre no coincide',
  },
  extendidas: {
    label: 'Incluir tablas del 11 y 12',
    auto: '✨ Desbloqueado',
  },
  extra: {
    titulo: '💪 ¿Quieres practicar un poco más?',
    desc: 'Puedes hacer 5 tarjetas más ahora mismo. ¡Solo si te ves con energía!',
    aviso: '⚠️ Aviso: si haces más tarjetas hoy, en los próximos días tendrás unas cuantas más que repasar.',
    anadir5: '+5 tarjetas',
  },
  motivacion: {
    excelente: [
      '¡Increíble! ¡Lo estás bordando! 🌟',
      '¡Eres una máquina de multiplicar! 🚀',
      '¡Fantástico trabajo! ¡Sigue así! 💪',
      '¡Brillante! ¡Las tablas no se te resisten! ✨',
    ],
    bueno: [
      '¡Muy bien! ¡Cada vez mejor! 👏',
      '¡Buen trabajo! La práctica hace al maestro 📚',
      '¡Vas por buen camino! ¡Sigue practicando! 💪',
      '¡Genial! Con un poco más de práctica, ¡serás imparable! 🎯',
    ],
    animo: [
      '¡No te rindas! Cada error es una oportunidad para aprender 🌱',
      '¡Ánimo! Roma no se construyó en un día 🏗️',
      '¡Sigue intentándolo! La perseverancia es la clave 🔑',
      '¡Tú puedes! Mañana lo harás todavía mejor 💫',
    ],
  },
  leyenda: ['No practicada', 'Empezando', 'Aprendiendo', 'Progresando', 'Bien', 'Dominada', 'Consolidada', 'Casi graduada', '¡Graduada! 🎓'],
};

// ═══════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════
const CLAVE = 'tablas_multiplicar_v2';

const CONFIG = {
  tablas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  tablasExtendidas: [11, 12],
  factores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  itemsPorSesion: 15,
  extraPorRonda: 5,
  maxNuevosPorSesion: 5,
  // 7 niveles de dominio (índice 0..6 = Nivel 1..7)
  escalonesDias: [1, 3, 7, 14, 30, 60, 90],
  // Tramos de latencia: premia la evocación automática y frena el cálculo secuencial
  umbralInstantaneoMs: 1500,
  umbralAutomaticoMs: 3000,
  // A partir de este nivel (0-indexado) la ficha cuenta como "Dominada"
  escalonDominada: 4,
  // Fichas graduadas: reaparecen como "retos" de mantenimiento cada N días
  retoIntervaloDias: 7,
  maxRetosPorSesion: 2,
  modoPrueba: new URLSearchParams(location.search).has('debug'),
  umbralDesbloqueo: 0.8,
};

const DIA = CONFIG.modoPrueba ? 10_000 : 86_400_000;
const COOLDOWN_SESION = CONFIG.modoPrueba ? DIA : 20 * 60 * 60 * 1000; // 20h en prod, 1 DIA en debug

// ═══════════════════════════════════════════════════════
// COLORES
// ═══════════════════════════════════════════════════════
const COLORES_ESCALON = [
  '#1e293b', // nunca practicada
  '#ef4444', // nivel 1 · 1 día
  '#f97316', // nivel 2 · 3 días
  '#eab308', // nivel 3 · 7 días
  '#84cc16', // nivel 4 · 14 días
  '#22c55e', // nivel 5 · 30 días (dominada)
  '#14b8a6', // nivel 6 · 60 días
  '#3b82f6', // nivel 7 · 90 días
];
const COLOR_GRADUADA = '#f59e0b'; // 🎓 dorado: dominio a largo plazo confirmado

// ═══════════════════════════════════════════════════════
// MEDALLAS
// ═══════════════════════════════════════════════════════
const MEDALLAS = [
  { id: 'primera_sesion', emoji: '🌟', nombre: 'Primera Sesión', desc: 'Completar tu primera sesión' },
  { id: 'racha_10', emoji: '🔥', nombre: 'En Racha', desc: '10 aciertos seguidos' },
  { id: 'tabla_dominada', emoji: '💪', nombre: 'Tabla Dominada', desc: 'Dominar una tabla entera' },
  { id: 'mitad_camino', emoji: '🏆', nombre: 'Mitad del Camino', desc: '50% de items dominados' },
  { id: 'maestro', emoji: '👑', nombre: 'Gran Maestro', desc: '100% de items dominados' },
  { id: 'velocista', emoji: '⚡', nombre: 'Velocista', desc: '5 respuestas rápidas seguidas' },
  { id: 'estudioso', emoji: '📚', nombre: 'Estudioso', desc: 'Completar 10 sesiones' },
  { id: 'perfeccion', emoji: '🎯', nombre: 'Perfección', desc: 'Sesión sin ningún fallo' },
  { id: 'graduacion', emoji: '🎓', nombre: 'Graduación', desc: 'Graduar 5 fichas (dominio a largo plazo)' },
];

// ═══════════════════════════════════════════════════════
// ESTADO GLOBAL
// ═══════════════════════════════════════════════════════
let ESTADO = null;
let pantallaActual = '';
let feedbackActivo = false;
let feedbackTimer = null;
let corrigiendo = false;
let intentosFallidos = {};
let inputActual = '';
let audioCtx = null;
let debugTimeOffset = 0;
let pendingDeleteName = null;

const sesion = {
  cola: [],
  repesca: [],
  itemActual: null,
  orientacionActual: null,
  retoKeys: new Set(),
  totalPreguntas: 0,
  preguntaActual: 0,
  enRepesca: false,
  rondaRepesca: 0,
  esExtra: false,
  stats: { aciertos: 0, fallos: 0, repescasSuperadas: 0, rachaActual: 0, rachaMax: 0, velocidadRachaActual: 0, tiempos: [], itemsFallados: [] },
  t0: 0,
  inicioSesion: 0,
};

// ═══════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════
function ahora() { return Date.now() + debugTimeOffset; }

const mezclar = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

// ═══════════════════════════════════════════════════════
// PERSISTENCIA
// ═══════════════════════════════════════════════════════
function cargarTodo() {
  try {
    // El modelo v1 (escalones antiguos y pares sin conmutativa) queda obsoleto
    localStorage.removeItem('tablas_multiplicar_v1');
    const raw = localStorage.getItem(CLAVE);
    if (raw) {
      const datos = JSON.parse(raw);
      if (datos.version === 2) return datos;
    }
  } catch (e) { console.warn('Datos corruptos, reiniciando', e); }
  return { version: 2, perfilActivo: null, perfiles: {} };
}

function guardarTodo() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(ESTADO));
  } catch (e) {
    console.error('Error al guardar:', e);
  }
}

// ═══════════════════════════════════════════════════════
// PERFILES
// ═══════════════════════════════════════════════════════
// Clave canónica: el par conmutativo {a,b} se guarda siempre como "menor x mayor".
// Así 6×7 y 7×6 comparten una única ficha y nunca se estudian por duplicado.
function claveCanonica(a, b) {
  return a <= b ? `${a}x${b}` : `${b}x${a}`;
}

function crearItem(a, b) {
  const t = Math.min(a, b);
  const f = Math.max(a, b);
  return {
    t, f, escalon: 0, graduada: false, proximoReto: 0,
    aciertos: 0, fallos: 0, racha: 0, ultimaVez: null, proximaRevision: 0,
  };
}

function crearPerfil(nombre) {
  const items = {};
  for (const t of CONFIG.tablas) {
    for (const f of CONFIG.factores) {
      items[claveCanonica(t, f)] = crearItem(t, f);
    }
  }
  return {
    creado: ahora(),
    tablasExtendidas: false,
    items,
    sesiones: [],
    medallas: [],
    rachaMaxima: 0,
  };
}

function obtenerPerfilActivo() {
  if (!ESTADO.perfilActivo || !ESTADO.perfiles[ESTADO.perfilActivo]) return null;
  return ESTADO.perfiles[ESTADO.perfilActivo];
}

function activarTablasExtendidas(perfil) {
  perfil.tablasExtendidas = true;
  for (const t of CONFIG.tablasExtendidas) {
    for (const f of CONFIG.factores) {
      const key = claveCanonica(t, f);
      if (!perfil.items[key]) perfil.items[key] = crearItem(t, f);
    }
  }
  guardarTodo();
}

function verificarDesbloqueo(perfil) {
  if (perfil.tablasExtendidas) return false;
  const baseItems = Object.values(perfil.items).filter(i => i.f <= 10);
  const dominados = baseItems.filter(i => i.escalon >= CONFIG.escalonDominada).length;
  return baseItems.length > 0 && (dominados / baseItems.length) >= CONFIG.umbralDesbloqueo;
}

function tablasActivas(perfil) {
  return perfil.tablasExtendidas
    ? [...CONFIG.tablas, ...CONFIG.tablasExtendidas]
    : [...CONFIG.tablas];
}

// Orientaciones (tabla × factor) válidas para una ficha canónica.
// Un par como {5,11} solo se puede preguntar como 11×5 (el 11 nunca es factor).
function orientacionesValidas(item, perfil) {
  const tabs = tablasActivas(perfil);
  const ops = [];
  if (tabs.includes(item.t) && CONFIG.factores.includes(item.f)) ops.push({ t: item.t, f: item.f });
  if (tabs.includes(item.f) && CONFIG.factores.includes(item.t)) ops.push({ t: item.f, f: item.t });
  return ops;
}

// Fichas que el perfil puede practicar (con al menos una orientación válida)
function paresVisibles(perfil) {
  return Object.values(perfil.items).filter(i => orientacionesValidas(i, perfil).length > 0);
}

// Elige al azar una orientación válida para la ficha
function orientar(item, perfil) {
  const ops = orientacionesValidas(item, perfil);
  return ops.length > 0 ? ops[Math.floor(Math.random() * ops.length)] : { t: item.t, f: item.f };
}

// ═══════════════════════════════════════════════════════
// AUDIO (Web Audio API — un solo AudioContext)
// ═══════════════════════════════════════════════════════
function initAudio() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) { console.warn('Web Audio no disponible', e); }
}

function pitido(frecuencia, duracion = 0.12) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gan = audioCtx.createGain();
    osc.connect(gan);
    gan.connect(audioCtx.destination);
    osc.frequency.value = frecuencia;
    osc.type = 'sine';
    gan.gain.setValueAtTime(0.13, audioCtx.currentTime);
    gan.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duracion);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duracion);
  } catch (e) { /* silenciar errores de audio */ }
}

function sonidoMedalla() {
  if (!audioCtx) return;
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => pitido(f, 0.15), i * 100);
  });
}

// ═══════════════════════════════════════════════════════
// ALGORITMO DE REPETICIÓN ESPACIADA
// ═══════════════════════════════════════════════════════
// ── Clasificación por latencia ──
// instantaneo (<1,5s): evocación directa  ·  automatico (1,5-3s): automatizado
// titubeante (>3s): acierta pero calculando  ·  fallo
function clasificar(esCorrecto, ms) {
  if (!esCorrecto) return 'fallo';
  if (ms < CONFIG.umbralInstantaneoMs) return 'instantaneo';
  if (ms <= CONFIG.umbralAutomaticoMs) return 'automatico';
  return 'titubeante';
}

function actualizarItem(item, resultado, repetido = false) {
  const now = ahora();

  // ── Fallo ──
  if (resultado === 'fallo') {
    item.fallos++;
    item.racha = 0;
    item.ultimaVez = now;

    if (repetido) {
      // Fallo repetido dentro de la misma sesión (repesca): reinicia por completo
      item.graduada = false;
      item.escalon = 0;
    } else if (item.graduada) {
      // Una ficha graduada que falla vuelve al mazo activo, sin castigo duro
      item.graduada = false;
      item.escalon = CONFIG.escalonDominada;
    } else {
      // Retroceso suave de 2 niveles: no devuelve al niño al principio
      item.escalon = Math.max(0, item.escalon - 2);
    }

    item.proximoReto = 0;
    item.proximaRevision = now + CONFIG.escalonesDias[item.escalon] * DIA;
    return;
  }

  // ── Acierto ──
  item.aciertos++;
  item.racha++;
  item.ultimaVez = now;

  // Titubeante: acierta, pero no consolida ni avanza (mantiene el intervalo)
  if (resultado === 'titubeante') {
    if (item.graduada) item.proximoReto = now + CONFIG.retoIntervaloDias * DIA;
    else item.proximaRevision = now + CONFIG.escalonesDias[item.escalon] * DIA;
    return;
  }

  // Repaso de una ficha ya graduada: confirma el dominio y se reprograma
  if (item.graduada) {
    item.proximoReto = now + CONFIG.retoIntervaloDias * DIA;
    return;
  }

  const tope = CONFIG.escalonesDias.length - 1;
  if (item.escalon >= tope) {
    // Superado el repaso de 90 días con respuesta automática → graduada 🎓
    item.graduada = true;
    item.proximoReto = now + CONFIG.retoIntervaloDias * DIA;
    return;
  }

  const paso = resultado === 'instantaneo' ? 2 : 1;
  item.escalon = Math.min(item.escalon + paso, tope);
  item.proximaRevision = now + CONFIG.escalonesDias[item.escalon] * DIA;
}

function construirSesion(perfil, objetivo) {
  const now = ahora();
  const items = paresVisibles(perfil);
  const seleccionados = [];
  const keys = new Set();

  function agregar(item) {
    const key = claveCanonica(item.t, item.f);
    if (keys.has(key)) return false;
    keys.add(key);
    seleccionados.push(item);
    return true;
  }

  // Las fichas graduadas salen del mazo activo: se repasan aparte, como retos
  const activos = items.filter(i => !i.graduada);

  // 1. Vencidos: los que ya toca repasar
  const vencidos = activos
    .filter(i => i.ultimaVez !== null && i.proximaRevision <= now)
    .sort((a, b) => a.proximaRevision - b.proximaRevision);
  for (const item of vencidos) {
    if (seleccionados.length >= objetivo) break;
    agregar(item);
  }

  // 2. Nuevos: máximo maxNuevosPorSesion
  if (seleccionados.length < objetivo) {
    const cupo = Math.min(
      CONFIG.maxNuevosPorSesion,
      objetivo - seleccionados.length
    );
    const nuevos = mezclar(activos.filter(i => i.ultimaVez === null));
    let n = 0;
    for (const item of nuevos) {
      if (seleccionados.length >= objetivo || n >= cupo) break;
      if (agregar(item)) n++;
    }
  }

  // 3. Relleno: los que más fallan
  if (seleccionados.length < objetivo) {
    const resto = activos
      .filter(i => !keys.has(claveCanonica(i.t, i.f)))
      .sort((a, b) => (b.fallos - b.aciertos) - (a.fallos - a.aciertos));
    for (const item of resto) {
      if (seleccionados.length >= objetivo) break;
      agregar(item);
    }
  }

  return mezclar(seleccionados);
}

// ═══════════════════════════════════════════════════════
// PISTAS DINÁMICAS
// ═══════════════════════════════════════════════════════
// Fichas graduadas cuyo reto de mantenimiento ya toca confirmar
function retosVencidos(perfil) {
  const now = ahora();
  return paresVisibles(perfil)
    .filter(i => i.graduada && i.proximoReto > 0 && i.proximoReto <= now)
    .sort((a, b) => a.proximoReto - b.proximoReto);
}

// Retos que entran en la sesión diaria (1-2 al azar)
function seleccionarRetos(perfil) {
  return mezclar(retosVencidos(perfil)).slice(0, CONFIG.maxRetosPorSesion);
}

function generarPista(t, f) {
  const r = t * f;
  switch (f) {
    case 1: return `Cualquier número × 1 es él mismo: ${t} × 1 = ${t}`;
    case 2: return `Es el doble: ${t} + ${t} = ${r}`;
    case 3: return `Es el triple: ${t}×2 + ${t} = ${t * 2} + ${t} = ${r}`;
    case 4: return `Doble del doble: (${t}×2)×2 = ${t * 2}×2 = ${r}`;
    case 5: return `Mitad de ×10: ${t}×10 ÷ 2 = ${t * 10} ÷ 2 = ${r}`;
    case 6: return `Es ×5 + ×1: ${t * 5} + ${t} = ${r}`;
    case 7: return `Es ×5 + ×2: ${t * 5} + ${t * 2} = ${r}`;
    case 8: return `Doble del doble del doble: ${t}→${t * 2}→${t * 4}→${r}`;
    case 9: return `Es ×10 − el número: ${t * 10} − ${t} = ${r}`;
    case 10: return `Añade un cero: ${t} × 10 = ${r}`;
    default: return `${t} × ${f} = ${r}`;
  }
}

// ═══════════════════════════════════════════════════════
// MEDALLAS — VERIFICACIÓN
// ═══════════════════════════════════════════════════════
function verificarMedallas(perfil, stats) {
  const m = perfil.medallas || [];
  const nuevas = [];

  function tiene(id) { return m.includes(id); }
  function dar(id) { if (!tiene(id)) { nuevas.push(id); } }

  // Primera sesión
  if (perfil.sesiones.length >= 1) dar('primera_sesion');

  // Racha 10 en sesión
  if (stats.rachaMax >= 10) dar('racha_10');

  // Tabla dominada (alguna tabla con todos sus factores en nivel ≥ dominada)
  const tabs = tablasActivas(perfil);
  for (const t of tabs) {
    const todosFactores = CONFIG.factores.every(f => {
      const item = perfil.items[claveCanonica(t, f)];
      return item && item.escalon >= CONFIG.escalonDominada;
    });
    if (todosFactores) { dar('tabla_dominada'); break; }
  }

  // Mitad del camino / Gran maestro (sobre fichas canónicas: la conmutativa no infla el total)
  const allItems = Object.values(perfil.items);
  const dominados = allItems.filter(i => i.escalon >= CONFIG.escalonDominada).length;
  if (allItems.length > 0 && dominados / allItems.length >= 0.5) dar('mitad_camino');
  if (allItems.length > 0 && dominados === allItems.length) dar('maestro');

  // Graduación (5 fichas con dominio a largo plazo confirmado)
  if (allItems.filter(i => i.graduada).length >= 5) dar('graduacion');

  // Velocista (5 respuestas automáticas seguidas: ≤3s)
  if (stats.velocidadRachaActual >= 5) dar('velocista');

  // Estudioso (10 sesiones)
  if (perfil.sesiones.length >= 10) dar('estudioso');

  // Perfección (0 fallos en sesión con al menos 5 preguntas)
  if (stats.fallos === 0 && stats.aciertos >= 5) dar('perfeccion');

  perfil.medallas = [...m, ...nuevas];
  return nuevas;
}

// ═══════════════════════════════════════════════════════
// NAVEGACIÓN
// ═══════════════════════════════════════════════════════
function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.hidden = true);
  const el = document.getElementById(id);
  if (el) {
    el.hidden = false;
    pantallaActual = id;
  }
}

// ═══════════════════════════════════════════════════════
// RENDERIZADO: PERFILES
// ═══════════════════════════════════════════════════════
function renderPerfiles() {
  const lista = document.getElementById('lista-perfiles');
  const nombres = Object.keys(ESTADO.perfiles);

  if (nombres.length === 0) {
    lista.innerHTML = '<p class="subtitulo" style="padding:20px 0">Crea tu primer perfil para empezar 🎓</p>';
    return;
  }

  lista.innerHTML = nombres.map(nombre => {
    const perfil = ESTADO.perfiles[nombre];
    const items = paresVisibles(perfil);
    const dominados = items.filter(i => i.escalon >= CONFIG.escalonDominada).length;
    const pct = items.length > 0 ? Math.round(dominados / items.length * 100) : 0;
    const sesiones = perfil.sesiones ? perfil.sesiones.length : 0;

    return `
    <div class="perfil-card glass" data-perfil="${esc(nombre)}">
      <div class="perfil-avatar">${nombre.charAt(0)}</div>
      <div class="perfil-info">
        <div class="perfil-nombre">${esc(nombre)}</div>
        <div class="perfil-detalle">${pct}% dominado · ${sesiones} sesión${sesiones !== 1 ? 'es' : ''}</div>
      </div>
      <button class="btn-icono btn-eliminar-perfil" data-nombre="${esc(nombre)}" aria-label="Eliminar perfil de ${esc(nombre)}">🗑️</button>
    </div>
  `;
  }).join('');
}

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ═══════════════════════════════════════════════════════
// RENDERIZADO: INICIO
// ═══════════════════════════════════════════════════════
function renderInicio() {
  const perfil = obtenerPerfilActivo();
  if (!perfil) return;
  const nombre = ESTADO.perfilActivo;

  document.getElementById('saludo').textContent = T.saludo(nombre);

  // Stats rápidas
  const now = ahora();
  const items = paresVisibles(perfil);
  const pendientes = items.filter(i => !i.graduada && i.ultimaVez !== null && i.proximaRevision <= now).length;
  const nuevos = items.filter(i => !i.graduada && i.ultimaVez === null).length;
  const retos = retosVencidos(perfil).length;
  const dominados = items.filter(i => i.escalon >= CONFIG.escalonDominada).length;
  const total = items.length;
  const pct = total > 0 ? Math.round(dominados / total * 100) : 0;

  document.getElementById('resumen-rapido').innerHTML = `
  <div class="stat-card glass">
    <div class="stat-valor">${pendientes + Math.min(nuevos, CONFIG.maxNuevosPorSesion) + retos}</div>
    <div class="stat-label">${T.stats.pendientes}</div>
  </div>
  <div class="stat-card glass">
    <div class="stat-valor">${pct}%</div>
    <div class="stat-label">${T.stats.dominadas}</div>
  </div>
  <div class="stat-card glass">
    <div class="stat-valor">${perfil.rachaMaxima || 0}</div>
    <div class="stat-label">${T.stats.rachaMax}</div>
  </div>
`;

  // Botón empezar — comprobar cooldown entre sesiones
  const btn = document.getElementById('btn-empezar');
  const ultimaSesion = perfil.sesiones.length > 0
    ? perfil.sesiones[perfil.sesiones.length - 1].fecha
    : null;
  const tiempoDesdeUltima = ultimaSesion ? now - ultimaSesion : Infinity;
  const enCooldown = ultimaSesion !== null && tiempoDesdeUltima < COOLDOWN_SESION;

  if (enCooldown) {
    btn.disabled = true;
    const restanteMs = COOLDOWN_SESION - tiempoDesdeUltima;
    let horas = Math.floor(restanteMs / (60 * 60 * 1000));
    let minutos = Math.round((restanteMs % (60 * 60 * 1000)) / (60 * 1000));
    if (minutos === 60) { horas++; minutos = 0; }
    const textoTiempo = CONFIG.modoPrueba
      ? `${Math.ceil(restanteMs / 1000)}s`
      : horas > 0 ? `${horas}h ${minutos}min` : `${minutos}min`;
    btn.textContent = T.enCooldown(textoTiempo);
  } else {
    const hayQueHacer = pendientes > 0 || nuevos > 0 || retos > 0;
    if (!hayQueHacer) {
      const algunoDisponible = items.length > 0;
      btn.disabled = !algunoDisponible;
      btn.textContent = algunoDisponible ? T.empezar : T.todoAlDia;
    } else {
      btn.disabled = false;
      btn.textContent = T.empezar;
    }
  }

  // Auto-desbloqueo
  const aviso = document.getElementById('aviso-tablas-extendidas');
  if (verificarDesbloqueo(perfil)) {
    aviso.hidden = false;
    aviso.innerHTML = `
    <p>${T.desbloqueo.mensaje}</p>
    <button class="btn-secundario" id="btn-desbloquear-ext">${T.desbloqueo.boton}</button>
  `;
  } else {
    aviso.hidden = true;
  }
}

// ═══════════════════════════════════════════════════════
// BUCLE DE SESIÓN
// ═══════════════════════════════════════════════════════
function iniciarSesion(opciones = {}) {
  const perfil = obtenerPerfilActivo();
  if (!perfil) return;

  const esExtra = !!opciones.esExtra;
  const objetivo = esExtra ? CONFIG.extraPorRonda : CONFIG.itemsPorSesion;

  // Los retos (fichas graduadas que ya toca confirmar) solo entran en la sesión diaria
  const retos = esExtra ? [] : seleccionarRetos(perfil);
  const cola = [...construirSesion(perfil, objetivo), ...retos];
  if (cola.length === 0) return;

  sesion.cola = mezclar(cola);
  sesion.repesca = [];
  sesion.itemActual = null;
  sesion.orientacionActual = null;
  sesion.retoKeys = new Set(retos.map(i => claveCanonica(i.t, i.f)));
  sesion.totalPreguntas = cola.length;
  sesion.preguntaActual = 0;
  sesion.enRepesca = false;
  sesion.rondaRepesca = 0;
  sesion.esExtra = esExtra;
  sesion.stats = { aciertos: 0, fallos: 0, repescasSuperadas: 0, rachaActual: 0, rachaMax: 0, velocidadRachaActual: 0, tiempos: [], itemsFallados: [] };
  sesion.t0 = 0;
  sesion.inicioSesion = ahora();

  inputActual = '';
  feedbackActivo = false;
  corrigiendo = false;
  intentosFallidos = {};

  mostrarPantalla('pantalla-practica');
  siguientePregunta();
}

function siguientePregunta() {
  if (sesion.cola.length === 0) {
    if (sesion.repesca.length > 0) {
      sesion.cola = mezclar([...sesion.repesca]);
      sesion.repesca = [];
      sesion.enRepesca = true;
      sesion.rondaRepesca++;
    } else {
      terminarSesion();
      return;
    }
  }

  sesion.itemActual = sesion.cola.shift();
  sesion.preguntaActual++;
  sesion.orientacionActual = orientar(sesion.itemActual, obtenerPerfilActivo());
  inputActual = '';
  corrigiendo = false;

  renderPregunta();
  sesion.t0 = ahora();
}

// Muestra el chip «🎓 Reto» solo si la ficha actual es una graduada en mantenimiento
function actualizarBadgeReto() {
  const badge = document.getElementById('reto-badge');
  const item = sesion.itemActual;
  if (!badge) return;
  badge.hidden = !(item && sesion.retoKeys.has(claveCanonica(item.t, item.f)));
}

function renderPregunta() {
  const { t, f } = sesion.orientacionActual;
  const el = document.getElementById('pregunta-texto');
  el.innerHTML = `${t} <span style="color:var(--text-secondary)">×</span> ${f} <span style="color:var(--text-secondary)">=</span> <span class="interrogante">?</span>`;
  el.className = 'pregunta slide-in';
  actualizarBadgeReto();

  document.getElementById('pantalla-practica').classList.remove('corrigiendo');

  const zona = document.getElementById('zona-pregunta');
  zona.className = 'zona-pregunta glass';

  actualizarDisplay();
  actualizarBarraProgreso();
  actualizarRacha();

  document.getElementById('input-respuesta').className = 'input-display glass';
  document.getElementById('cursor').hidden = false;
}

function agregarDigito(d) {
  if (feedbackActivo) return;
  if (inputActual.length >= 3) return;
  inputActual += d;
  actualizarDisplay();
  if (corrigiendo) comprobarCorreccion();
}

function borrarDigito() {
  if (feedbackActivo) return;
  inputActual = inputActual.slice(0, -1);
  actualizarDisplay();
}

function actualizarDisplay() {
  document.getElementById('respuesta-valor').textContent = inputActual;
  document.getElementById('cursor').hidden = inputActual.length >= 3;
}

function confirmarRespuesta() {
  if (feedbackActivo) return;
  // En modo corrección se avanza solo al escribir el resultado correcto
  if (corrigiendo) return;
  if (inputActual === '') {
    document.getElementById('input-respuesta').classList.add('shake');
    setTimeout(() => document.getElementById('input-respuesta').classList.remove('shake'), 400);
    return;
  }

  const respuestaUsuario = parseInt(inputActual, 10);
  const item = sesion.itemActual;
  const { t, f } = sesion.orientacionActual;
  const respuestaCorrecta = t * f;
  const esCorrecto = respuestaUsuario === respuestaCorrecta;
  const ms = ahora() - sesion.t0;
  const resultado = clasificar(esCorrecto, ms);
  const key = claveCanonica(item.t, item.f);

  // Un segundo fallo de la misma ficha en la sesión (repesca) sí la reinicia del todo
  const repetido = !!intentosFallidos[key];
  actualizarItem(item, resultado, repetido);

  if (resultado === 'fallo') {
    const primerFallo = !intentosFallidos[key];
    intentosFallidos[key] = (intentosFallidos[key] || 0) + 1;

    if (primerFallo) {
      // Solo el primer fallo de cada tarjeta cuenta como fallo de la sesión:
      // así el bucle de repescas no hunde el porcentaje
      sesion.stats.fallos++;
      sesion.stats.itemsFallados.push({
        t, f,
        respuestaUsuario,
        respuestaCorrecta,
      });
    } else {
      // En repesca no penaliza: solo refrescamos la última respuesta errónea
      const reg = sesion.stats.itemsFallados.find(x => claveCanonica(x.t, x.f) === key);
      if (reg) reg.respuestaUsuario = respuestaUsuario;
    }

    sesion.stats.rachaActual = 0;
    sesion.stats.velocidadRachaActual = 0;
    // Repesca ilimitada: la tarjeta vuelve al final las veces que haga falta
    sesion.repesca.push(item);
  } else {
    sesion.stats.aciertos++;
    if (sesion.enRepesca) sesion.stats.repescasSuperadas++;
    sesion.stats.rachaActual++;
    sesion.stats.rachaMax = Math.max(sesion.stats.rachaMax, sesion.stats.rachaActual);
    if (resultado === 'instantaneo' || resultado === 'automatico') {
      sesion.stats.velocidadRachaActual++;
    } else {
      sesion.stats.velocidadRachaActual = 0;
    }
  }

  sesion.stats.tiempos.push(ms);
  guardarTodo();

  mostrarFeedback(item, resultado, respuestaCorrecta);
}

// Escribe el resultado correcto para poder seguir (sin temporizador)
function comprobarCorreccion() {
  const item = sesion.itemActual;
  if (!item) return;
  const { t, f } = sesion.orientacionActual;
  const correcta = String(t * f);
  const inputEl = document.getElementById('input-respuesta');

  if (inputActual === correcta) {
    corrigiendo = false;
    feedbackActivo = true;
    document.getElementById('cursor').hidden = true;
    document.getElementById('zona-pregunta').className = 'zona-pregunta glass pregunta-acierto';
    document.getElementById('pregunta-texto').innerHTML = `<div class="fb-acierto">${T.feedback.copiado}</div>`;
    inputEl.className = 'input-display glass input-acierto';
    pitido(880);
    feedbackTimer = setTimeout(avanzarDesdeFeedback, 800);
    return;
  }

  // Si lo escrito no va camino del resultado, se le anima a intentarlo otra vez
  if (!correcta.startsWith(inputActual)) {
    inputActual = '';
    actualizarDisplay();
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 400);
  }
}

function mostrarFeedback(item, resultado, respuestaCorrecta) {
  const pregEl = document.getElementById('pregunta-texto');
  const zona = document.getElementById('zona-pregunta');
  const inputEl = document.getElementById('input-respuesta');
  const cursor = document.getElementById('cursor');

  // ── Fallo: modo corrección, sin temporizador ──
  if (resultado === 'fallo') {
    feedbackActivo = false;
    corrigiendo = true;

    const { t, f } = sesion.orientacionActual;
    const key = claveCanonica(item.t, item.f);
    const n = intentosFallidos[key] || 1;
    const mensajes = T.feedback.repescaMensajes;
    const animo = n >= 2
      ? `<div class="fb-animo">${mensajes[Math.min(n - 2, mensajes.length - 1)]}</div>`
      : '';

    zona.className = 'zona-pregunta glass pregunta-error';
    pregEl.innerHTML = `
    <div class="fb-error">
      <div class="fb-operacion">${t} × ${f} =</div>
      <div class="fb-resultado">${respuestaCorrecta}</div>
      <div class="fb-recordatorio">${pick(T.feedback.memoriza)}</div>
      ${animo}
      <div class="fb-copiar">${T.feedback.copiar}</div>
      <div class="fb-pista">💡 ${generarPista(t, f)}</div>
    </div>`;
    inputEl.className = 'input-display glass input-correccion';
    document.getElementById('pantalla-practica').classList.add('corrigiendo');
    pitido(220, 0.25);

    inputActual = '';
    actualizarDisplay();
    cursor.hidden = false;
    return;
  }

  // ── Acierto: feedback breve y avance automático ──
  feedbackActivo = true;
  cursor.hidden = true;

  let duracion;

  if (resultado === 'instantaneo') {
    zona.className = 'zona-pregunta glass pregunta-acierto';
    pregEl.innerHTML = `<div class="fb-acierto">${T.feedback.facil}</div>`;
    inputEl.className = 'input-display glass input-acierto';
    pitido(880);
    duracion = 1200;
  } else if (resultado === 'automatico') {
    zona.className = 'zona-pregunta glass pregunta-acierto';
    pregEl.innerHTML = `<div class="fb-acierto">${T.feedback.bien}</div>`;
    inputEl.className = 'input-display glass input-acierto';
    pitido(660);
    duracion = 1200;
  } else {
    // Titubeante: acertó, pero sin automaticidad
    zona.className = 'zona-pregunta glass pregunta-acierto';
    pregEl.innerHTML = `<div class="fb-acierto">${T.feedback.titubeante}</div>`;
    inputEl.className = 'input-display glass input-acierto';
    pitido(560);
    duracion = 1200;
  }

  feedbackTimer = setTimeout(avanzarDesdeFeedback, duracion);
}

function avanzarDesdeFeedback() {
  if (!feedbackActivo) return;
  feedbackActivo = false;
  corrigiendo = false;
  clearTimeout(feedbackTimer);
  feedbackTimer = null;

  actualizarRacha();
  siguientePregunta();
}

function actualizarBarraProgreso() {
  const fill = document.getElementById('progreso-fill');
  const texto = document.getElementById('progreso-texto');

  if (sesion.enRepesca) {
    const restantes = sesion.cola.length + 1;
    fill.style.width = '100%';
    fill.classList.add('repesca');
    texto.textContent = T.repesca(sesion.rondaRepesca, restantes);
  } else {
    const pct = sesion.totalPreguntas > 0
      ? Math.min(100, (sesion.preguntaActual / sesion.totalPreguntas) * 100)
      : 0;
    fill.style.width = `${pct}%`;
    fill.classList.remove('repesca');
    texto.textContent = `${sesion.preguntaActual} / ${sesion.totalPreguntas}`;
  }
}

function actualizarRacha() {
  const container = document.getElementById('racha-display');
  const numero = document.getElementById('racha-numero');
  const racha = sesion.stats.rachaActual;

  if (racha >= 2) {
    container.hidden = false;
    numero.textContent = racha;
    container.classList.toggle('racha-alta', racha >= 5);
  } else {
    container.hidden = true;
  }
}

function terminarSesion() {
  const perfil = obtenerPerfilActivo();
  if (!perfil) return;

  const tiempoMedio = sesion.stats.tiempos.length > 0
    ? Math.round(sesion.stats.tiempos.reduce((a, b) => a + b, 0) / sesion.stats.tiempos.length)
    : 0;

  const duracion = ahora() - sesion.inicioSesion;

  // Las rondas extra se suman a la sesión del día (no cuentan como sesión nueva)
  if (sesion.esExtra && perfil.sesiones.length > 0) {
    const ultima = perfil.sesiones[perfil.sesiones.length - 1];
    const preguntasPrev = ultima.aciertos + ultima.fallos;
    const preguntasRonda = sesion.stats.aciertos + sesion.stats.fallos;
    const totalPreguntas = preguntasPrev + preguntasRonda;
    ultima.tiempoMedio = totalPreguntas > 0
      ? Math.round((ultima.tiempoMedio * preguntasPrev + tiempoMedio * preguntasRonda) / totalPreguntas)
      : tiempoMedio;
    ultima.aciertos += sesion.stats.aciertos;
    ultima.fallos += sesion.stats.fallos;
    ultima.duracion += duracion;
    ultima.fecha = ahora();
  } else {
    perfil.sesiones.push({
      fecha: ahora(),
      aciertos: sesion.stats.aciertos,
      fallos: sesion.stats.fallos,
      tiempoMedio,
      duracion,
    });
  }

  perfil.rachaMaxima = Math.max(perfil.rachaMaxima || 0, sesion.stats.rachaMax);

  // Verificar medallas
  const nuevasMedallas = verificarMedallas(perfil, sesion.stats);

  // Verificar desbloqueo
  const desbloquear = verificarDesbloqueo(perfil);

  guardarTodo();

  if (nuevasMedallas.length > 0) sonidoMedalla();

  renderResumen(sesion.stats, tiempoMedio, nuevasMedallas, desbloquear);
  mostrarPantalla('pantalla-resumen');
}

// ═══════════════════════════════════════════════════════
// RENDERIZADO: RESUMEN
// ═══════════════════════════════════════════════════════
// Panel que aparece al terminar la sesión para practicar 5 tarjetas más
function renderPanelExtraResumen() {
  const panel = document.getElementById('extra-resumen');
  if (!panel) return;

  const perfil = obtenerPerfilActivo();
  if (!perfil || construirSesion(perfil, CONFIG.extraPorRonda).length === 0) {
    panel.hidden = true;
    return;
  }

  panel.hidden = false;
  panel.innerHTML = `
    <div class="extra-sesion-titulo">${T.extra.titulo}</div>
    <p class="extra-sesion-desc">${T.extra.desc}</p>
    <div class="extra-sesion-aviso">${T.extra.aviso}</div>
    <div class="extra-sesion-botones">
      <button class="btn-secundario btn-extra" id="btn-extra-ronda">${T.extra.anadir5}</button>
    </div>
  `;
}

function renderResumen(stats, tiempoMedio, nuevasMedallas, desbloquear) {
  const total = stats.aciertos + stats.fallos;
  const pct = total > 0 ? Math.round(stats.aciertos / total * 100) : 0;

  // Círculo animado
  const circ = 2 * Math.PI * 58; // r=58
  const offset = circ * (1 - pct / 100);
  const circEl = document.getElementById('circulo-prog');
  const textoEl = document.getElementById('circulo-texto');
  circEl.style.strokeDashoffset = circ;
  textoEl.textContent = '0%';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      circEl.style.strokeDashoffset = offset;
      textoEl.textContent = `${pct}%`;
    });
  });

  // Stats
  const tiempoSeg = (tiempoMedio / 1000).toFixed(1);
  document.getElementById('resumen-stats').innerHTML = `
  <div class="resumen-stat glass">
    <div class="resumen-stat-valor" style="color:var(--success)">${stats.aciertos}</div>
    <div class="resumen-stat-label">${T.stats.aciertos}</div>
  </div>
  <div class="resumen-stat glass">
    <div class="resumen-stat-valor" style="color:var(--warning)">${stats.fallos}</div>
    <div class="resumen-stat-label">${T.stats.fallos}</div>
  </div>
  <div class="resumen-stat glass">
    <div class="resumen-stat-valor">${tiempoSeg}s</div>
    <div class="resumen-stat-label">${T.stats.tiempoMedio}</div>
  </div>
  <div class="resumen-stat glass">
    <div class="resumen-stat-valor" style="color:var(--accent)">${stats.repescasSuperadas || 0}</div>
    <div class="resumen-stat-label">${T.stats.repescas}</div>
  </div>
`;

  // Items fallados (una sola vez por tarjeta, con el nº de intentos)
  const fallados = document.getElementById('resumen-fallados');
  if (stats.itemsFallados.length > 0) {
    fallados.innerHTML = `
    <div class="resumen-fallados-titulo">${T.resumen.fallados}</div>
    ${stats.itemsFallados.map(f => {
      const veces = intentosFallidos[claveCanonica(f.t, f.f)] || 1;
      return `
      <div class="fallo-item glass">
        <span class="fallo-pregunta">${f.t} × ${f.f}${veces > 1 ? ` <span class="fallo-veces">×${veces}</span>` : ''}</span>
        <span>
          <span class="fallo-tuya">${f.respuestaUsuario}</span>
          <span class="fallo-respuesta">${f.respuestaCorrecta}</span>
        </span>
      </div>
    `;
    }).join('')}
  `;
  } else {
    fallados.innerHTML = `<p class="subtitulo">${T.resumen.sinFallos}</p>`;
  }

  // Medallas nuevas
  const medallasEl = document.getElementById('resumen-medallas');
  if (nuevasMedallas.length > 0) {
    medallasEl.hidden = false;
    medallasEl.innerHTML = `
    <p style="width:100%;text-align:center;font-weight:700;margin-bottom:4px">${T.resumen.nuevasMedallas}</p>
    ${nuevasMedallas.map(id => {
      const m = MEDALLAS.find(x => x.id === id);
      return m ? `
        <div class="medalla-nueva glass">
          <div class="medalla-emoji">${m.emoji}</div>
          <div class="medalla-nombre">${m.nombre}</div>
        </div>
      ` : '';
    }).join('')}
  `;
  } else {
    medallasEl.hidden = true;
  }

  // Mensaje motivador
  let mensajes;
  if (pct >= 90) mensajes = T.motivacion.excelente;
  else if (pct >= 70) mensajes = T.motivacion.bueno;
  else mensajes = T.motivacion.animo;
  document.getElementById('resumen-mensaje').textContent = pick(mensajes);

  // Desbloqueo de tablas 11-12
  document.getElementById('resumen-desbloqueo').innerHTML = desbloquear
    ? `<div class="aviso-desbloqueo"><p>${T.desbloqueo.mensaje}</p><button class="btn-secundario" id="btn-desbloquear-resumen">${T.desbloqueo.boton}</button></div>`
    : '';

  // Panel para practicar 5 tarjetas más
  renderPanelExtraResumen();
}

// ═══════════════════════════════════════════════════════
// RENDERIZADO: PROGRESO
// ═══════════════════════════════════════════════════════
function renderProgreso() {
  const perfil = obtenerPerfilActivo();
  if (!perfil) return;

  const tabs = tablasActivas(perfil);
  const items = paresVisibles(perfil);
  const now = ahora();
  const dominados = items.filter(i => i.escalon >= CONFIG.escalonDominada).length;
  const pendientes = items.filter(i => !i.graduada && i.ultimaVez !== null && i.proximaRevision <= now).length;
  const pct = items.length > 0 ? Math.round(dominados / items.length * 100) : 0;

  // Stats
  document.getElementById('progreso-stats').innerHTML = `
  <div class="stat-card glass">
    <div class="stat-valor">${pct}%</div>
    <div class="stat-label">${T.stats.dominadas}</div>
  </div>
  <div class="stat-card glass">
    <div class="stat-valor">${pendientes}</div>
    <div class="stat-label">${T.stats.pendientes}</div>
  </div>
  <div class="stat-card glass">
    <div class="stat-valor">${perfil.rachaMaxima || 0}</div>
    <div class="stat-label">${T.stats.rachaMax}</div>
  </div>
`;

  // Mapa de calor
  renderMapaCalor(perfil, tabs);

  // Leyenda (8 niveles + estado graduada)
  const coloresLeyenda = [...COLORES_ESCALON, COLOR_GRADUADA];
  document.getElementById('leyenda-mapa').innerHTML = coloresLeyenda.map((color, i) => `
  <div class="leyenda-item">
    <div class="leyenda-color" style="background:${color}"></div>
    <span>${T.leyenda[i]}</span>
  </div>
`).join('');

  // Medallas
  renderMedallasProgreso(perfil);

  // Toggle extendidas
  const wrapper = document.getElementById('opcion-ext-wrapper');
  wrapper.innerHTML = `
  <label for="toggle-ext">
    <span>${T.extendidas.label}</span>
  </label>
  <div style="display:flex;align-items:center;gap:8px">
    ${perfil.tablasExtendidas ? `<span class="tag-auto">${T.extendidas.auto}</span>` : ''}
    <button class="toggle-switch ${perfil.tablasExtendidas ? 'activo' : ''}" id="toggle-ext"
            role="switch" aria-checked="${perfil.tablasExtendidas}" aria-label="${T.extendidas.label}"></button>
  </div>
`;
}

function renderMapaCalor(perfil, tabs) {
  const contenedor = document.getElementById('mapa-calor');
  let html = '<table class="heatmap"><thead><tr><th></th>';

  for (const f of CONFIG.factores) {
    html += `<th>×${f}</th>`;
  }
  html += '</tr></thead><tbody>';

  for (const t of tabs) {
    html += `<tr><th>${t}</th>`;
    for (const f of CONFIG.factores) {
      const key = claveCanonica(t, f);
      const item = perfil.items[key];
      let color, titulo;
      if (!item) {
        color = COLORES_ESCALON[0];
        titulo = `${t}×${f} — No disponible`;
      } else if (item.graduada) {
        color = COLOR_GRADUADA;
        titulo = `${t}×${f}=${t * f} — 🎓 Graduada · ${item.aciertos}✓ ${item.fallos}✗`;
      } else if (item.ultimaVez === null) {
        color = COLORES_ESCALON[0];
        titulo = `${t}×${f}=${t * f} — No practicada`;
      } else {
        color = COLORES_ESCALON[Math.min(item.escalon + 1, COLORES_ESCALON.length - 1)];
        titulo = `${t}×${f}=${t * f} — Nivel ${item.escalon + 1} · ${item.aciertos}✓ ${item.fallos}✗`;
      }
      html += `<td style="background:${color}" title="${titulo}"></td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  contenedor.innerHTML = html;
}

function renderMedallasProgreso(perfil) {
  const container = document.getElementById('medallas-todas');
  const obtenidas = perfil.medallas || [];

  container.innerHTML = MEDALLAS.map(m => {
    const tiene = obtenidas.includes(m.id);
    return `
    <div class="medalla-card glass ${tiene ? '' : 'bloqueada'}" title="${m.desc}">
      <div class="medalla-emoji">${m.emoji}</div>
      <div class="medalla-nombre">${m.nombre}</div>
    </div>
  `;
  }).join('');
}

// ═══════════════════════════════════════════════════════
// EXPORT / IMPORT
// ═══════════════════════════════════════════════════════
function exportarProgreso() {
  const perfil = obtenerPerfilActivo();
  if (!perfil) return;

  const data = {
    exportado: new Date().toISOString(),
    nombre: ESTADO.perfilActivo,
    perfil: perfil,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tablas_${ESTADO.perfilActivo}_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importarProgreso(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.nombre || !data.perfil || !data.perfil.items) {
        alert('El archivo no contiene datos válidos.');
        return;
      }
      ESTADO.perfiles[data.nombre] = data.perfil;
      ESTADO.perfilActivo = data.nombre;
      guardarTodo();
      renderProgreso();
      renderInicio();
      alert(`Progreso de «${data.nombre}» importado correctamente.`);
    } catch (err) {
      alert('Error al leer el archivo: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ═══════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════
function mostrarModal(html) {
  document.getElementById('modal-contenido').innerHTML = html;
  document.getElementById('modal-overlay').hidden = false;
}

function cerrarModal() {
  document.getElementById('modal-overlay').hidden = true;
  pendingDeleteName = null;
}

function eliminarPerfilPaso1(nombre) {
  pendingDeleteName = nombre;
  mostrarModal(`
  <h3>${T.eliminar.paso1Titulo}</h3>
  <p>${T.eliminar.paso1Texto(nombre)}</p>
  <div class="modal-botones">
    <button class="btn-secundario" id="modal-cancelar">${T.eliminar.cancelar}</button>
    <button class="btn-peligro" id="modal-siguiente">${T.eliminar.confirmar1}</button>
  </div>
`);
}

function eliminarPerfilPaso2() {
  if (!pendingDeleteName) return;
  const nombre = pendingDeleteName;
  mostrarModal(`
  <h3>${T.eliminar.paso2Titulo}</h3>
  <p>${T.eliminar.paso2Texto(nombre)}</p>
  <input type="text" class="modal-input" id="modal-input-confirmar" placeholder="${nombre}" autocomplete="off">
  <div class="modal-botones">
    <button class="btn-secundario" id="modal-cancelar">${T.eliminar.cancelar}</button>
    <button class="btn-peligro" id="modal-confirmar-final">${T.eliminar.confirmar2}</button>
  </div>
`);
  setTimeout(() => {
    const inp = document.getElementById('modal-input-confirmar');
    if (inp) inp.focus();
  }, 100);
}

function confirmarEliminar() {
  const inp = document.getElementById('modal-input-confirmar');
  if (!inp || !pendingDeleteName) return;
  const valor = inp.value.trim();
  if (valor === pendingDeleteName) {
    delete ESTADO.perfiles[pendingDeleteName];
    if (ESTADO.perfilActivo === pendingDeleteName) {
      ESTADO.perfilActivo = null;
    }
    guardarTodo();
    cerrarModal();
    renderPerfiles();
  } else {
    inp.classList.add('shake');
    setTimeout(() => inp.classList.remove('shake'), 400);
    inp.value = '';
    inp.placeholder = T.eliminar.errorNoCoincide;
  }
}

// ═══════════════════════════════════════════════════════
// DEBUG
// ═══════════════════════════════════════════════════════
function initDebug() {
  if (!CONFIG.modoPrueba) return;
  document.getElementById('debug-panel').hidden = false;
  actualizarDebugTiempo();
}

function actualizarDebugTiempo() {
  const el = document.getElementById('debug-tiempo');
  if (el) {
    const dias = Math.round(debugTimeOffset / DIA * 10) / 10;
    el.textContent = `Offset: +${dias} días (${Math.round(debugTimeOffset / 1000)}s)`;
  }
}

// ═══════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════

// ---- Teclado en pantalla ----
document.querySelector('.teclado').addEventListener('pointerdown', (e) => {
  const btn = e.target.closest('.tecla');
  if (!btn) return;
  e.preventDefault();
  const tecla = btn.dataset.tecla;
  if (tecla === 'borrar') borrarDigito();
  else if (tecla === 'confirmar') confirmarRespuesta();
  else agregarDigito(tecla);
});

// ---- Teclado físico ----
document.addEventListener('keydown', (e) => {
  if (pantallaActual !== 'pantalla-practica' || feedbackActivo) return;
  if (e.key >= '0' && e.key <= '9') {
    e.preventDefault();
    agregarDigito(e.key);
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    borrarDigito();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    confirmarRespuesta();
  }
});

// ---- Perfiles: selección ----
document.getElementById('lista-perfiles').addEventListener('click', (e) => {
  // Ignorar click en botón de eliminar
  if (e.target.closest('.btn-eliminar-perfil')) {
    const nombre = e.target.closest('.btn-eliminar-perfil').dataset.nombre;
    eliminarPerfilPaso1(nombre);
    return;
  }
  const card = e.target.closest('.perfil-card');
  if (!card) return;
  const nombre = card.dataset.perfil;
  ESTADO.perfilActivo = nombre;
  guardarTodo();
  initAudio();
  renderInicio();
  mostrarPantalla('pantalla-inicio');
});

// ---- Nuevo perfil ----
document.getElementById('btn-mostrar-nuevo').addEventListener('click', () => {
  document.getElementById('btn-mostrar-nuevo').hidden = true;
  document.getElementById('input-nuevo-perfil').hidden = false;
  document.getElementById('nombre-nuevo-perfil').focus();
});

document.getElementById('btn-cancelar-nuevo').addEventListener('click', () => {
  document.getElementById('btn-mostrar-nuevo').hidden = false;
  document.getElementById('input-nuevo-perfil').hidden = true;
  document.getElementById('nombre-nuevo-perfil').value = '';
});

function crearNuevoPerfil() {
  const input = document.getElementById('nombre-nuevo-perfil');
  const nombre = input.value.trim().slice(0, 20);
  if (!nombre) {
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    return;
  }
  if (ESTADO.perfiles[nombre]) {
    input.value = '';
    input.placeholder = 'Ese nombre ya existe...';
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    return;
  }
  ESTADO.perfiles[nombre] = crearPerfil(nombre);
  ESTADO.perfilActivo = nombre;
  guardarTodo();
  input.value = '';
  document.getElementById('btn-mostrar-nuevo').hidden = false;
  document.getElementById('input-nuevo-perfil').hidden = true;
  initAudio();
  renderPerfiles();
  renderInicio();
  mostrarPantalla('pantalla-inicio');
}

document.getElementById('btn-crear-perfil').addEventListener('click', crearNuevoPerfil);
document.getElementById('nombre-nuevo-perfil').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') crearNuevoPerfil();
  if (e.key === 'Escape') {
    document.getElementById('btn-mostrar-nuevo').hidden = false;
    document.getElementById('input-nuevo-perfil').hidden = true;
    document.getElementById('nombre-nuevo-perfil').value = '';
  }
});

// ---- Inicio: botones ----
document.getElementById('btn-empezar').addEventListener('click', () => {
  initAudio();
  iniciarSesion();
});

document.getElementById('btn-progreso').addEventListener('click', () => {
  renderProgreso();
  mostrarPantalla('pantalla-progreso');
});

document.getElementById('btn-cambiar-perfil').addEventListener('click', () => {
  renderPerfiles();
  mostrarPantalla('pantalla-perfiles');
});

// ---- Tarjetas extra: practicar 5 más tras terminar la sesión ----
document.getElementById('extra-resumen').addEventListener('click', (e) => {
  if (!e.target.closest('#btn-extra-ronda')) return;
  initAudio();
  iniciarSesion({ esExtra: true });
});

// ---- Desbloqueo tablas extendidas (delegado) ----
document.addEventListener('click', (e) => {
  if (e.target.id === 'btn-desbloquear-ext' || e.target.id === 'btn-desbloquear-resumen') {
    const perfil = obtenerPerfilActivo();
    if (perfil) {
      activarTablasExtendidas(perfil);
      renderInicio();
    }
  }
});

// ---- Resumen: volver ----
document.getElementById('btn-volver-inicio').addEventListener('click', () => {
  renderInicio();
  mostrarPantalla('pantalla-inicio');
});

// ---- Progreso: botones ----
document.getElementById('btn-volver-progreso').addEventListener('click', () => {
  renderInicio();
  mostrarPantalla('pantalla-inicio');
});

document.getElementById('btn-exportar').addEventListener('click', exportarProgreso);

document.getElementById('btn-importar-trigger').addEventListener('click', () => {
  document.getElementById('input-importar').click();
});

document.getElementById('input-importar').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) importarProgreso(file);
  e.target.value = '';
});

// Toggle extendidas (delegado)
document.getElementById('opcion-ext-wrapper').addEventListener('click', (e) => {
  const toggle = e.target.closest('#toggle-ext');
  if (!toggle) return;
  const perfil = obtenerPerfilActivo();
  if (!perfil) return;

  if (!perfil.tablasExtendidas) {
    activarTablasExtendidas(perfil);
  } else {
    // Desactivar (no borramos items, solo ocultamos)
    perfil.tablasExtendidas = false;
    guardarTodo();
  }
  renderProgreso();
});

// ---- Modal: delegación ----
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'modal-cancelar') cerrarModal();
  else if (e.target.id === 'modal-siguiente') eliminarPerfilPaso2();
  else if (e.target.id === 'modal-confirmar-final') confirmarEliminar();
  else if (e.target === document.getElementById('modal-overlay')) cerrarModal();
});

document.getElementById('modal-overlay').addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModal();
  if (e.key === 'Enter' && document.getElementById('modal-confirmar-final')) {
    confirmarEliminar();
  }
});

// ---- Debug ----
if (CONFIG.modoPrueba) {
  document.getElementById('debug-avanzar').addEventListener('click', () => {
    debugTimeOffset += DIA;
    actualizarDebugTiempo();
    if (pantallaActual === 'pantalla-inicio') renderInicio();
    if (pantallaActual === 'pantalla-progreso') renderProgreso();
  });

  document.getElementById('debug-reset').addEventListener('click', () => {
    const perfil = obtenerPerfilActivo();
    if (!perfil) return;
    const nombre = ESTADO.perfilActivo;
    ESTADO.perfiles[nombre] = crearPerfil(nombre);
    guardarTodo();
    if (pantallaActual === 'pantalla-inicio') renderInicio();
    if (pantallaActual === 'pantalla-progreso') renderProgreso();
    console.log('Perfil reseteado:', nombre);
  });

  document.getElementById('debug-consola').addEventListener('click', () => {
    const perfil = obtenerPerfilActivo();
    console.log('ESTADO completo:', ESTADO);
    if (perfil) {
      console.table(Object.entries(perfil.items).map(([k, v]) => ({
        clave: k,
        nivel: v.escalon + 1,
        dominada: v.escalon >= CONFIG.escalonDominada ? 'sí' : '',
        graduada: v.graduada ? '🎓' : '',
        aciertos: v.aciertos,
        fallos: v.fallos,
        racha: v.racha,
        ultimaVez: v.ultimaVez ? new Date(v.ultimaVez).toLocaleString() : '—',
        proxRevision: v.proximaRevision ? new Date(v.proximaRevision).toLocaleString() : '—',
        proximoReto: v.proximoReto ? new Date(v.proximoReto).toLocaleString() : '—',
      })));
    }
  });
}

// ═══════════════════════════════════════════════════════
// INICIALIZACIÓN
// ═══════════════════════════════════════════════════════
function init() {
  ESTADO = cargarTodo();

  const perfil = obtenerPerfilActivo();
  if (perfil) {
    renderPerfiles();
    renderInicio();
    mostrarPantalla('pantalla-inicio');
  } else {
    renderPerfiles();
    mostrarPantalla('pantalla-perfiles');
  }

  initDebug();
}

init();
