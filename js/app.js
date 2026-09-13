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
  importar: {
    ok: nombre => `Progreso de «${nombre}» importado correctamente.`,
    errorArchivo: 'El archivo no contiene datos válidos.',
    errorLeer: msg => `Error al leer el archivo: ${msg}`,
    sobrescribir: nombre => `Ya existe un perfil llamado «${nombre}». ¿Quieres reemplazarlo con el del archivo?`,
  },
  ritmo: {
    titulo: '¿Cuánto quieres practicar al día?',
    nota: '💡 Podrás cambiarlo más adelante desde tu perfil y tus estadísticas.',
    tarjetasDia: n => `${n} tarjetas/día`,
    tiempo: min => `≈ ${min} min`,
    nombres: { normal: 'Normal', rapido: 'Rápido', intenso: 'Intenso' },
    // Pantalla de Progreso
    progresoTitulo: '⚡ Tarjetas diarias',
    progresoDesc: min => `Elige cuánto quieres practicar cada día. Tu sesión será de ≈ ${min} min.`,
    guardado: '✅ Guardado',
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
    noRecordado: 'No lo recordaba',
    nuevasMedallas: '🏅 ¡Medallas nuevas!',
    volver: 'Volver al inicio',
  },
  repesca: (ronda, restantes) =>
    `🔄 Repesca ${ronda} · ${restantes} restante${restantes !== 1 ? 's' : ''}`,
  // Botones de la pantalla de práctica
  practica: {
    salir: 'Salir al inicio y guardar el progreso',
    noRecuerdo: '🤔 No lo sé',
    noRecuerdoAria: 'No lo recuerdo, muéstrame el resultado',
  },
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
  // Guía de bienvenida (se muestra al abrir la app hasta marcar "no mostrar de nuevo")
  bienvenida: {
    titulo: '👋 ¡Bienvenido a las Tablas de Multiplicar!',
    tabs: { padres: '👨‍👩‍👧 Para padres', ninos: '🧒 Para niños' },
    cerrar: '¡Entendido!',
    noMostrar: 'No volver a mostrar esto al abrir la app',
    reabrir: 'ℹ️ ¿Cómo funciona?',
    padres: {
      intro: 'Una app para que los niños de 9 a 12 años memoricen las tablas de multiplicar con repetición espaciada. Esta guía resume cómo funciona y qué esperar.',
      bloques: [
        {
          icono: '🧠', titulo: 'Cómo funciona',
          texto: 'Cada multiplicación tiene su propio nivel de dominio. Cuando el niño la acierta, la ficha sube un escalón y tarda más en volver (1, 3, 7, 14, 30, 60 y 90 días). Si falla, baja y reaparece antes. El resultado: repasa mucho lo difícil y poco lo que ya domina.',
        },
        {
          icono: '⏱️', titulo: 'La velocidad importa',
          texto: 'Si responde en menos de 1,8 s, se considera memoria y sube dos escalones de golpe. Hasta 4,5 s cuenta como respuesta automática y sube uno. Si tarda más, se acepta como correcta pero no avanza: todavía lo está calculando, no lo tiene memorizado.',
        },
        {
          icono: '✍️', titulo: 'Si falla, escribe la respuesta',
          texto: 'Al fallar no se avanza directamente: aparece el resultado correcto y el niño debe teclearlo para continuar. Esa ficha vuelve a salir al final de la sesión y se repite hasta que la acierte. Los fallos de esta "repesca" no penalizan sus estadísticas.',
        },
        {
          icono: '⚡', titulo: 'El ritmo diario',
          texto: 'Al crear el perfil se elige el ritmo: Normal (15 tarjetas), Rápido (20) o Intenso (30). Se puede cambiar cuando quiera desde Mi Progreso. Si un día quedan muchas fichas pendientes, la sesión las incluye todas.',
        },
        {
          icono: '📅', titulo: 'Lo más importante: todos los días',
          texto: 'Cinco o nueve minutos diarios funcionan muchísimo mejor que una sesión larga de vez en cuando. El sistema está diseñado para un ratito cada día; si se saltan días, se acumulan las fichas pendientes y el progreso se enlentece.',
        },
        {
          icono: '💾', titulo: 'Los datos son locales',
          texto: 'Todo el progreso se guarda en este dispositivo y navegador (no se envía a ningún servidor), y hay un breve bloqueo de 20 h entre sesiones para fomentar el hábito. Para cambiar de dispositivo, se puede Exportar el progreso desde Mi Progreso e Importarlo desde la pantalla de perfiles.',
        },
        {
          icono: '📊', titulo: 'Seguimiento',
          texto: 'En Mi Progreso hay un mapa de calor que colorea cada multiplicación según su nivel, además de medallas y estadísticas. Todo el progreso se puede exportar como archivo de respaldo.',
        },
      ],
    },
    ninos: {
      intro: '¡Vas a practicar las tablas de multiplicar de una forma que se te van a quedar grabadas! Te explicamos cómo en 1 minuto.',
      bloques: [
        {
          icono: '🖊️', titulo: 'Cómo responder',
          texto: 'Te sale una multiplicación, como 7 × 8. Toca los números del teclado (o usa el teclado del ordenador) y pulsa el botón ✓ para responder.',
        },
        {
          icono: '⚡', titulo: 'Si aciertas',
          texto: '¡Aparece un mensaje y pasas a la siguiente! Cuanto más rápido contestes sin pensarlo, más cerca estará esa multiplicación de estar dominada. Es como un videojuego: intenta superarte.',
        },
        {
          icono: '🔥', titulo: 'Si fallas',
          texto: '¡No pasa nada, así se aprende! Te mostramos el resultado para que lo mires bien, y después lo escribes tú para poder seguir. Esa multiplicación volverá a salir al final de la sesión y se repetirá hasta que la aciertes.',
        },
        {
          icono: '🏅', titulo: 'Medallas y rachas',
          texto: 'Vas a ganar medallas: ⚡ por responder rápido varias veces seguidas, 🔥 por acertar muchas seguidas, 🏆 por dominar tablas enteras y 🎓 por las que ya nunca se te olvidan. ¡Intenta conseguirlas todas!',
        },
        {
          icono: '📅', titulo: 'El truco de los campeones',
          texto: 'Practica TODOS LOS DÍAS. Con 5 minutitos al día es suficiente. Estudiar un montón un solo día no funciona tan bien como practicar un poquito cada día.',
        },
        {
          icono: '💪', titulo: '¿Con ganas de más?',
          texto: 'Cuando termines la sesión puedes pulsar el botón "+5 tarjetas" para seguir un rato más. ¡Solo si te apetece!',
        },
      ],
    },
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
  leyenda: ['No practicada', 'Empezando', 'Aprendiendo', 'Progresando', 'Bien', 'Dominada', 'Consolidada', 'Casi graduada', '¡Graduada!'],
  // Detalle de una casilla del mapa de calor (hover en escritorio, toque en táctil)
  heatmap: {
    ayuda: '💡 Pasa el cursor (o toca) una casilla para ver su detalle',
    sinPracticar: 'Sin practicar todavía',
    veces: 'veces',
    ultima: 'Última vez',
    proximo: 'Próximo repaso',
    hoy: 'hoy',
    ayer: 'ayer',
    haceDias: n => `hace ${n} día${n === 1 ? '' : 's'}`,
    enDias: n => `en ${n} día${n === 1 ? '' : 's'}`,
    tocaRepasar: '¡Ya toca repasarla!',
    retoMantenimiento: '🎓 Reto de mantenimiento',
  },
  // Ficha de identidad de la marca (se pinta en Ajustes → «Acerca de»)
  identidad: {
    marca: 'Mathwizards Consultoría Educativa STEM',
    autor: 'Ing. Gabriel Astudillo',
    usuario: '@mathwizards.ve',
    url: 'https://www.instagram.com/mathwizards.ve',
    ubicacion: 'Maturín, Venezuela & Modalidad Online',
    enfoque: 'Enfoque constructivista STEM: aprendizaje activo y práctico, rigor analítico y comprensión profunda de las bases conceptuales, sin perder dinamismo.',
    logo: 'assets/img/l_white.png',
    paleta: [
      { nombre: 'Rojo Mathwizards', hex: '#E2232D' },
      { nombre: 'Rosa', hex: '#E3229F' },
      { nombre: 'Naranja rojizo', hex: '#E34122' },
      { nombre: 'Magenta', hex: '#C922E3' },
      { nombre: 'Naranja', hex: '#E36322' },
      { nombre: 'Negro', hex: '#000000' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
    ],
  },
};

// ═══════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════
const CLAVE = 'tablas_multiplicar_v2';

const CONFIG = {
  tablas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  tablasExtendidas: [11, 12],
  factores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  extraPorRonda: 5,
  maxNuevosPorSesion: 5,
  // 7 niveles de dominio (índice 0..6 = Nivel 1..7)
  escalonesDias: [1, 3, 7, 14, 30, 60, 90],
  // Tramos de latencia: premia la evocación automática y frena el cálculo secuencial
  umbralInstantaneoMs: 1800,
  umbralAutomaticoMs: 4500,
  // A partir de este nivel (0-indexado) la ficha cuenta como "Dominada"
  escalonDominada: 4,
  // Fichas graduadas: reaparecen como "retos" de mantenimiento cada N días
  retoIntervaloDias: 7,
  maxRetosPorSesion: 2,
  modoPrueba: new URLSearchParams(location.search).has('debug'),
  umbralDesbloqueo: 0.8,
};

// Ritmos de estudio: cada perfil guarda uno y define su sesión diaria base.
// El número es el mínimo de tarjetas al día; si hay más vencidas, la sesión las incluye todas.
const RITMOS = [
  { id: 'normal', tarjetas: 15, emoji: '🌤️' },
  { id: 'rapido', tarjetas: 20, emoji: '🚀' },
  { id: 'intenso', tarjetas: 30, emoji: '🔥' },
];
const RITMO_DEFECTO = 'normal';
// Estimación mostrada en el selector ("≈ X min"): segundos medios por tarjeta
const SEGUNDOS_POR_TARJETA = 18;

const DIA = CONFIG.modoPrueba ? 10_000 : 86_400_000;
const COOLDOWN_SESION = CONFIG.modoPrueba ? DIA : 20 * 60 * 60 * 1000; // 20h en prod, 1 DIA en debug

// ═══════════════════════════════════════════════════════
// COLORES DEL MAPA DE CALOR
// ═══════════════════════════════════════════════════════
// Los colores viven en tokens CSS (--heat-*) para que sean idénticos en modo
// claro y oscuro; solo la celda "no practicada" cambia de tono según el tema.
// Cada nivel tiene una tonalidad claramente distinta de la anterior y la siguiente.
const COLORES_ESCALON = [
  'var(--heat-0)', // nunca practicada
  'var(--heat-1)', // nivel 1 · 1 día
  'var(--heat-2)', // nivel 2 · 3 días
  'var(--heat-3)', // nivel 3 · 7 días
  'var(--heat-4)', // nivel 4 · 14 días
  'var(--heat-5)', // nivel 5 · 30 días (dominada)
  'var(--heat-6)', // nivel 6 · 60 días
  'var(--heat-7)', // nivel 7 · 90 días
];
const COLOR_GRADUADA = 'var(--heat-grad)'; // 🎓 dominio a largo plazo confirmado
// Celda "no practicada": usa un token CSS para adaptarse al tema claro/oscuro
const HEAT_0 = 'var(--heat-0)';

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
let avisoTimer = null;
let audioCtx = null;
let debugTimeOffset = 0;
let pendingDeleteName = null;
let cooldownTimer = null;
// Detalle de una casilla del mapa de calor: un único nodo reutilizado en <body>.
// En táctil el detalle queda fijo (heatTipPinned) hasta tocar fuera u otra casilla.
let heatTipPinned = false;
let heatTipTd = null;
const heatTipEl = document.getElementById('heat-tip');

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

function crearPerfil(nombre, ritmo) {
  const items = {};
  for (const t of CONFIG.tablas) {
    for (const f of CONFIG.factores) {
      items[claveCanonica(t, f)] = crearItem(t, f);
    }
  }
  return {
    creado: ahora(),
    // Ritmo elegido al crear el perfil: define el tamaño base de la sesión diaria
    ritmo: ritmo || RITMO_DEFECTO,
    tablasExtendidas: false,
    items,
    sesiones: [],
    medallas: [],
    rachaMaxima: 0,
  };
}

// Ritmo de un perfil. Los perfiles antiguos (sin `ritmo`) usan el ritmo por defecto.
function ritmoDe(perfil) {
  const id = perfil && perfil.ritmo;
  return RITMOS.find(r => r.id === id) || RITMOS.find(r => r.id === RITMO_DEFECTO);
}

// Tarjetas base al día según el ritmo del perfil
function tarjetasBase(perfil) {
  return ritmoDe(perfil).tarjetas;
}

// Tiempo estimado de sesión, redondeado al minuto
function minutosEstimados(tarjetas) {
  return Math.max(1, Math.round(tarjetas * SEGUNDOS_POR_TARJETA / 60));
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
// PREFERENCIAS DEL DISPOSITIVO (sonido y tema)
// ═══════════════════════════════════════════════════════
// No van por perfil: son ajustes del navegador/dispositivo.
const CLAVE_PREFS = 'tablas_prefs_v1';
const PREFS_DEFECTO = { version: 1, sonido: true, tema: 'system', bienvenida: true };
let PREFS = { ...PREFS_DEFECTO };

const mqTemaClaro = window.matchMedia
  ? window.matchMedia('(prefers-color-scheme: light)')
  : null;

function cargarPrefs() {
  try {
    const raw = localStorage.getItem(CLAVE_PREFS);
    if (raw) {
      const datos = JSON.parse(raw);
      if (datos && datos.version === 1) {
        PREFS = { ...PREFS_DEFECTO, ...datos };
        return;
      }
    }
  } catch (e) { console.warn('Preferencias corruptas, usando valores por defecto', e); }
  PREFS = { ...PREFS_DEFECTO };
}

function guardarPrefs() {
  try {
    localStorage.setItem(CLAVE_PREFS, JSON.stringify(PREFS));
  } catch (e) {
    console.error('Error al guardar preferencias:', e);
  }
}

// 'light' | 'dark' a partir de la preferencia guardada
function resolverTema(pref) {
  if (pref === 'light' || pref === 'dark') return pref;
  return mqTemaClaro && mqTemaClaro.matches ? 'light' : 'dark';
}

function aplicarTema() {
  const tema = resolverTema(PREFS.tema);
  document.documentElement.dataset.theme = tema;
  document.documentElement.style.colorScheme = tema;
}

function cambiarTema(pref) {
  PREFS.tema = pref;
  guardarPrefs();
  aplicarTema();
  renderAjustes();
}

// Si el sistema cambia de tema y el ajuste es "Sistema", seguimos el cambio
if (mqTemaClaro) {
  mqTemaClaro.addEventListener('change', () => {
    if (PREFS.tema === 'system') aplicarTema();
  });
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
  if (!PREFS.sonido || !audioCtx) return;
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
// instantaneo (<1,8s): evocación directa  ·  automatico (1,8-4,5s): automatizado
// titubeante (>4,5s): acierta pero calculando  ·  fallo
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
function verificarMedallas(perfil, stats, sesionCompleta = true) {
  const m = perfil.medallas || [];
  const nuevas = [];

  function tiene(id) { return m.includes(id); }
  function dar(id) { if (!tiene(id)) { nuevas.push(id); } }

  // Primera sesión (solo cuenta una sesión terminada)
  if (sesionCompleta && perfil.sesiones.length >= 1) dar('primera_sesion');

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

  // Velocista (5 respuestas automáticas seguidas: ≤4,5s)
  if (stats.velocidadRachaActual >= 5) dar('velocista');

  // Estudioso (10 sesiones)
  if (sesionCompleta && perfil.sesiones.length >= 10) dar('estudioso');

  // Perfección (0 fallos en sesión terminada con al menos 5 preguntas)
  if (sesionCompleta && stats.fallos === 0 && stats.aciertos >= 5) dar('perfeccion');

  perfil.medallas = [...m, ...nuevas];
  return nuevas;
}

// ═══════════════════════════════════════════════════════
// NAVEGACIÓN
// ═══════════════════════════════════════════════════════
function mostrarPantalla(id) {
  // Al cambiar de pantalla el detalle del heatmap deja de tener sentido
  heatTipPinned = false;
  ocultarTipCalor();
  document.querySelectorAll('.pantalla').forEach(p => p.hidden = true);
  const el = document.getElementById(id);
  if (el) {
    el.hidden = false;
    pantallaActual = id;
  }
  // El botón de salir solo tiene sentido mientras se está practicando
  actualizarBotonesFlotantes();
}

// ═══════════════════════════════════════════════════════
// RENDERIZADO: PERFILES
// ═══════════════════════════════════════════════════════
function renderPerfiles() {
  const lista = document.getElementById('lista-perfiles');
  const nombres = Object.keys(ESTADO.perfiles);

  if (nombres.length === 0) {
    lista.innerHTML = '<p class="subtitulo" style="padding:20px 0">Crea tu primer perfil o importa uno para empezar 🎓</p>';
    return;
  }

  lista.innerHTML = nombres.map(nombre => {
    const perfil = ESTADO.perfiles[nombre];
    const items = paresVisibles(perfil);
    const dominados = items.filter(i => i.escalon >= CONFIG.escalonDominada).length;
    const pct = items.length > 0 ? Math.round(dominados / items.length * 100) : 0;
    const sesiones = perfil.sesiones ? perfil.sesiones.length : 0;
    const base = tarjetasBase(perfil);

    return `
    <div class="perfil-card glass" data-perfil="${esc(nombre)}">
      <div class="perfil-avatar">${nombre.charAt(0)}</div>
      <div class="perfil-info">
        <div class="perfil-nombre">${esc(nombre)}</div>
        <div class="perfil-detalle">${T.ritmo.tarjetasDia(base)} · ${pct}% dominado · ${sesiones} ${sesiones === 1 ? 'sesión' : 'sesiones'}</div>
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
// PLAN DE LA SESIÓN DE HOY
// ═══════════════════════════════════════════════════════
// La sesión hace al menos las tarjetas del ritmo del perfil, pero si hay más
// fichas vencidas de las previstas las incluye TODAS para no dejar deberes atrás.
// El número que muestra "Para hoy" es exactamente el que tendrá la sesión.
// Preguntas ya respondidas hoy si el niño salió a mitad de sesión. Se deriva del
// último registro parcial (sin campo extra en el modelo de datos): así "Para hoy"
// muestra lo que falta y no vuelve a pedir la sesión entera.
function hechasHoy(perfil) {
  const ultima = perfil.sesiones[perfil.sesiones.length - 1];
  if (!ultima || !ultima.parcial) return 0;
  if (ahora() - ultima.fecha >= COOLDOWN_SESION) return 0; // de otro día
  return ultima.aciertos + ultima.fallos;
}

function planSesionHoy(perfil) {
  const now = ahora();
  const items = paresVisibles(perfil);
  const activos = items.filter(i => !i.graduada);
  const pendientes = activos.filter(i => i.ultimaVez !== null && i.proximaRevision <= now).length;
  const nuevos = activos.filter(i => i.ultimaVez === null).length;
  const nuevosEnSesion = Math.min(nuevos, CONFIG.maxNuevosPorSesion);
  const retos = Math.min(retosVencidos(perfil).length, CONFIG.maxRetosPorSesion);
  // Objetivo de fichas activas (sin retos): la base del ritmo (menos lo ya hecho
  // hoy si se salió a mitad), o todas las vencidas + nuevas si son más
  const base = Math.max(0, tarjetasBase(perfil) - hechasHoy(perfil));
  const objetivo = Math.max(base, pendientes + nuevosEnSesion);
  const total = Math.min(objetivo, activos.length) + retos;
  return { pendientes, nuevos, nuevosEnSesion, retos, objetivo, total };
}

// ═══════════════════════════════════════════════════════
// RENDERIZADO: INICIO
// ═══════════════════════════════════════════════════════
// Refresca el botón «Empezar» según el cooldown entre sesiones.
// Devuelve true si la sesión sigue en cooldown (útil para mantener el ticker vivo).
function actualizarBotonEmpezar(perfil = obtenerPerfilActivo()) {
  const btn = document.getElementById('btn-empezar');
  if (!perfil || !btn) return false;

  const now = ahora();
  const items = paresVisibles(perfil);
  const plan = planSesionHoy(perfil);
  // El cooldown solo cuenta sesiones TERMINADAS: salir a mitad no bloquea al niño
  const ultimaCompleta = [...perfil.sesiones].reverse().find(s => !s.parcial);
  const ultimaSesion = ultimaCompleta ? ultimaCompleta.fecha : null;
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
    return true;
  }

  const hayQueHacer = plan.pendientes > 0 || plan.nuevos > 0 || plan.retos > 0;
  if (!hayQueHacer) {
    const algunoDisponible = items.length > 0;
    btn.disabled = !algunoDisponible;
    btn.textContent = algunoDisponible ? T.empezar : T.todoAlDia;
  } else {
    btn.disabled = false;
    btn.textContent = T.empezar;
  }
  return false;
}

// Cuenta atrás en vivo del cooldown: refresca el botón cada segundo mientras siga activo.
function iniciarTickerCooldown() {
  if (cooldownTimer) return;
  cooldownTimer = setInterval(() => {
    if (pantallaActual !== 'pantalla-inicio') return;
    if (!actualizarBotonEmpezar()) {
      clearInterval(cooldownTimer);
      cooldownTimer = null;
    }
  }, 1000);
}

function renderInicio() {
  const perfil = obtenerPerfilActivo();
  if (!perfil) return;
  const nombre = ESTADO.perfilActivo;

  document.getElementById('saludo').textContent = T.saludo(nombre);

  // Stats rápidas
  const items = paresVisibles(perfil);
  const plan = planSesionHoy(perfil);
  const dominados = items.filter(i => i.escalon >= CONFIG.escalonDominada).length;
  const total = items.length;
  const pct = total > 0 ? Math.round(dominados / total * 100) : 0;

  document.getElementById('resumen-rapido').innerHTML = `
  <div class="stat-card glass">
    <div class="stat-valor">${plan.total}</div>
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

  // Botón empezar — comprobar cooldown entre sesiones (con cuenta atrás en vivo)
  if (actualizarBotonEmpezar(perfil)) iniciarTickerCooldown();

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
  // La sesión diaria incluye todas las fichas vencidas (mínimo la base de 15)
  const objetivo = esExtra ? CONFIG.extraPorRonda : planSesionHoy(perfil).objetivo;

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
  document.getElementById('btn-no-recuerdo').disabled = false;
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
  resolverRespuesta(parseInt(inputActual, 10));
}

// «No lo sé»: el niño se bloquea y lo dice. Cuenta como fallo y entra al mismo
// flujo de corrección que un error, así aprende el resultado en vez de quedarse
// atascado mirando la pantalla. `respuestaUsuario = null` = no hubo respuesta.
function noLoRecuerdo() {
  if (feedbackActivo || corrigiendo) return;
  if (!sesion.itemActual) return;
  resolverRespuesta(null);
}

function resolverRespuesta(respuestaUsuario) {
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

  // El tiempo solo cuenta como dato con una respuesta real: decir «no lo sé»
  // no debe inflar el tiempo medio de la sesión
  if (respuestaUsuario !== null) sesion.stats.tiempos.push(ms);
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

  // Mientras dura el feedback (o la corrección) el botón ya no tiene sentido
  document.getElementById('btn-no-recuerdo').disabled = true;

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

// Tiempo medio de las respuestas de la sesión (0 si no hubo ninguna)
function tiempoMedioSesion() {
  const t = sesion.stats.tiempos;
  return t.length > 0 ? Math.round(t.reduce((a, b) => a + b, 0) / t.length) : 0;
}

// Suma una ronda a un registro de sesión existente (media de tiempo ponderada).
// Lo usan las rondas extra y el retomar una sesión parcial del mismo día.
function combinarEnSesion(destino, stats, tiempoMedio, duracion) {
  const preguntasPrev = destino.aciertos + destino.fallos;
  const preguntasRonda = stats.aciertos + stats.fallos;
  const totalPreguntas = preguntasPrev + preguntasRonda;
  destino.tiempoMedio = totalPreguntas > 0
    ? Math.round((destino.tiempoMedio * preguntasPrev + tiempoMedio * preguntasRonda) / totalPreguntas)
    : tiempoMedio;
  destino.aciertos += stats.aciertos;
  destino.fallos += stats.fallos;
  destino.duracion += duracion;
  destino.fecha = ahora();
}

// ¿La última sesión es un registro parcial del mismo día? (se puede continuar)
function parcialVigente(perfil) {
  const ultima = perfil.sesiones[perfil.sesiones.length - 1];
  return !!ultima && !!ultima.parcial && (ahora() - ultima.fecha) < COOLDOWN_SESION;
}

// Guarda lo hecho al salir a mitad de sesión. Si ya había un parcial del mismo
// día se combina, así salir dos veces no infla el histórico de sesiones.
function registrarSesionParcial(perfil, tiempoMedio, duracion) {
  if (parcialVigente(perfil)) {
    combinarEnSesion(perfil.sesiones[perfil.sesiones.length - 1], sesion.stats, tiempoMedio, duracion);
    return;
  }
  perfil.sesiones.push({
    fecha: ahora(),
    aciertos: sesion.stats.aciertos,
    fallos: sesion.stats.fallos,
    tiempoMedio,
    duracion,
    parcial: true,
  });
}

// Salir al inicio sin terminar: se guarda lo ya hecho y **no** se activa el
// cooldown, para que el niño pueda volver y seguir donde lo dejó.
function salirDeSesion() {
  const perfil = obtenerPerfilActivo();

  // Cancelar el avance pendiente: si no, el temporizador seguiría corriendo
  clearTimeout(feedbackTimer);
  feedbackTimer = null;
  feedbackActivo = false;
  corrigiendo = false;

  if (perfil) {
    const respondidas = sesion.stats.aciertos + sesion.stats.fallos;
    if (respondidas > 0) {
      registrarSesionParcial(perfil, tiempoMedioSesion(), ahora() - sesion.inicioSesion);
      perfil.rachaMaxima = Math.max(perfil.rachaMaxima || 0, sesion.stats.rachaMax);
      // Se conservan las medallas de esfuerzo (racha, velocidad, dominio); las que
      // exigen haber terminado la sesión se otorgan cuando la termine de verdad
      verificarMedallas(perfil, sesion.stats, false);
      guardarTodo();
    }
  }

  // Limpiar el estado de la sesión abandonada
  sesion.cola = [];
  sesion.repesca = [];
  sesion.itemActual = null;
  inputActual = '';
  intentosFallidos = {};
  document.getElementById('pantalla-practica').classList.remove('corrigiendo');

  renderInicio();
  mostrarPantalla('pantalla-inicio');
}

function terminarSesion() {
  const perfil = obtenerPerfilActivo();
  if (!perfil) return;

  const tiempoMedio = tiempoMedioSesion();
  const duracion = ahora() - sesion.inicioSesion;

  // Las rondas extra y una sesión parcial del mismo día se suman al registro
  // existente en vez de crear una sesión nueva: el día cuenta como una sola
  const ultima = perfil.sesiones[perfil.sesiones.length - 1];
  if (ultima && (sesion.esExtra || parcialVigente(perfil))) {
    combinarEnSesion(ultima, sesion.stats, tiempoMedio, duracion);
    ultima.parcial = false;
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
      // Sin respuesta = dijo «no lo sé»: no es un error tachado, es otra cosa
      const sinRespuesta = f.respuestaUsuario === null;
      return `
      <div class="fallo-item glass">
        <span class="fallo-pregunta">${f.t} × ${f.f}${veces > 1 ? ` <span class="fallo-veces">×${veces}</span>` : ''}</span>
        <span>
          <span class="${sinRespuesta ? 'fallo-sin-respuesta' : 'fallo-tuya'}">${sinRespuesta ? T.resumen.noRecordado : f.respuestaUsuario}</span>
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
  const plan = planSesionHoy(perfil);
  const dominados = items.filter(i => i.escalon >= CONFIG.escalonDominada).length;
  const pct = items.length > 0 ? Math.round(dominados / items.length * 100) : 0;

  // Stats
  document.getElementById('progreso-stats').innerHTML = `
  <div class="stat-card glass">
    <div class="stat-valor">${pct}%</div>
    <div class="stat-label">${T.stats.dominadas}</div>
  </div>
  <div class="stat-card glass">
    <div class="stat-valor">${plan.total}</div>
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
  const coloresLeyenda = [HEAT_0, ...COLORES_ESCALON.slice(1), COLOR_GRADUADA];
  document.getElementById('leyenda-mapa').innerHTML = coloresLeyenda.map((color, i) => `
  <div class="leyenda-item">
    <div class="leyenda-color" style="background:${color}"></div>
    <span>${T.leyenda[i]}</span>
  </div>
`).join('');
  document.getElementById('heat-ayuda').textContent = T.heatmap.ayuda;

  // Medallas
  renderMedallasProgreso(perfil);

  // Selector de tarjetas diarias (ritmo)
  document.getElementById('ritmo-wrapper').innerHTML = `
  <div class="opcion-ritmo-cabecera">
    <span class="opcion-ritmo-titulo">${T.ritmo.progresoTitulo}</span>
    <span id="ritmo-guardado" class="ritmo-guardado" hidden>${T.ritmo.guardado}</span>
  </div>
  <p class="opcion-ritmo-sub">${T.ritmo.progresoDesc(minutosEstimados(tarjetasBase(perfil)))}</p>
  <div class="ritmo-selector" role="radiogroup" aria-label="${T.ritmo.progresoTitulo}">
    ${htmlRitmoOpciones(ritmoDe(perfil).id)}
  </div>
`;

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

// ═══════════════════════════════════════════════════════
// DETALLE DE UNA CASILLA DEL MAPA DE CALOR
// Un único nodo (#heat-tip) reutilizado: eventos delegados en #mapa-calor,
// sin listeners por celda ni markup extra en las ~100 casillas.
// ═══════════════════════════════════════════════════════

// Estado de una ficha reutilizando la leyenda y los colores del heatmap
function estadoDeItem(item) {
  if (!item || item.ultimaVez === null) {
    return { nombre: T.heatmap.sinPracticar, color: HEAT_0 };
  }
  if (item.graduada) return { nombre: T.leyenda[8], color: COLOR_GRADUADA };
  const idx = Math.min(item.escalon + 1, COLORES_ESCALON.length - 1);
  return { nombre: T.leyenda[idx], color: COLORES_ESCALON[idx] };
}

// Días que faltan (≥0) hasta una marca de tiempo, en "días" del sistema
// (en modo debug DIA dura 10 s, así que las fechas de prueba cuadran)
function diasHasta(ts) {
  return Math.max(0, Math.round((ts - ahora()) / DIA));
}

function haceTiempo(ts) {
  const dias = Math.max(0, Math.floor((ahora() - ts) / DIA));
  if (dias === 0) return T.heatmap.hoy;
  if (dias === 1) return T.heatmap.ayer;
  return T.heatmap.haceDias(dias);
}

// Próximo repaso: "en X días", "¡Ya toca repasarla!" o "🎓 Reto de mantenimiento · en X días"
function proximoRepaso(item) {
  const ts = item.graduada ? item.proximoReto : item.proximaRevision;
  const dias = diasHasta(ts);
  if (dias === 0) return T.heatmap.tocaRepasar;
  const cuando = T.heatmap.enDias(dias);
  return item.graduada ? `${T.heatmap.retoMantenimiento} · ${cuando}` : cuando;
}

// Dona aciertos (verde) / fallos (rojo) con conic-gradient puro: sin SVG ni canvas.
// El total de respuestas va en el centro; gris cuando aún no hay datos.
function htmlDonaCalor(aciertos, fallos) {
  const total = aciertos + fallos;
  const pct = total > 0 ? Math.round(aciertos / total * 100) : 0;
  return `
    <div class="heat-tip-dona-wrap" aria-hidden="true">
      <div class="heat-tip-dona${total > 0 ? '' : ' sin-datos'}" style="--pct:${pct}%">
        <span>${total}</span>
      </div>
      <span class="heat-tip-dona-pie">${T.heatmap.veces}</span>
    </div>`;
}

// Contenido del detalle de una ficha (item puede ser null si no está disponible)
function buildHeatTip(item, t, f) {
  const estado = estadoDeItem(item);
  const practicada = !!item && item.ultimaVez !== null;
  const aciertos = item ? item.aciertos : 0;
  const fallos = item ? item.fallos : 0;
  return `
    <div class="heat-tip-cabecera">
      <span class="heat-tip-op">${t}×${f}=${t * f}</span>
      <span class="heat-tip-estado" style="--estado:${estado.color}">
        <span class="heat-tip-estado-punto"></span>${estado.nombre}
      </span>
    </div>
    <div class="heat-tip-cuerpo">
      ${htmlDonaCalor(aciertos, fallos)}
      <div class="heat-tip-datos">
        <div class="heat-tip-fila"><span>${T.stats.aciertos}</span><b class="ok">${aciertos}</b></div>
        <div class="heat-tip-fila"><span>${T.stats.fallos}</span><b class="mal">${fallos}</b></div>
        <div class="heat-tip-fila"><span>${T.heatmap.ultima}</span><b>${practicada ? haceTiempo(item.ultimaVez) : '—'}</b></div>
        <div class="heat-tip-fila"><span>${T.heatmap.proximo}</span><b>${practicada ? proximoRepaso(item) : '—'}</b></div>
      </div>
    </div>`;
}

// Coloca el detalle sobre la casilla: centrado, sin salirse del viewport y
// prefiriendo la parte de arriba (si no cabe, debajo)
function posicionarTipCalor(td) {
  const r = td.getBoundingClientRect();
  const m = 10;
  const w = heatTipEl.offsetWidth;
  const h = heatTipEl.offsetHeight;
  const left = Math.max(m, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - m));
  let top = r.top - h - m;
  if (top < m) top = r.bottom + m;
  top = Math.max(m, Math.min(top, window.innerHeight - h - m));
  heatTipEl.style.left = `${Math.round(left)}px`;
  heatTipEl.style.top = `${Math.round(top)}px`;
}

function mostrarTipCalor(td) {
  const perfil = obtenerPerfilActivo();
  if (!perfil || !td) return;
  const t = Number(td.dataset.t);
  const f = Number(td.dataset.f);
  const item = perfil.items[claveCanonica(t, f)] || null;
  heatTipEl.innerHTML = buildHeatTip(item, t, f);
  heatTipEl.hidden = false;
  posicionarTipCalor(td);
  heatTipEl.classList.add('visible');
  heatTipTd = td;
}

function ocultarTipCalor() {
  if (!heatTipEl || heatTipEl.hidden) return;
  heatTipEl.hidden = true;
  heatTipEl.classList.remove('visible');
  heatTipTd = null;
}

function renderMapaCalor(perfil, tabs) {
  heatTipPinned = false;
  ocultarTipCalor();
  const contenedor = document.getElementById('mapa-calor');
  let html = '<table class="heatmap"><thead><tr><th></th>';

  for (const f of CONFIG.factores) {
    html += `<th>×${f}</th>`;
  }
  html += '</tr></thead><tbody>';

  for (const t of tabs) {
    html += `<tr><th>${t}</th>`;
    for (const f of CONFIG.factores) {
      const item = perfil.items[claveCanonica(t, f)];
      // Nombre y color salen de la MISMA fuente (estadoDeItem): si se duplica la
      // lógica aquí, una ficha graduada puede acabar pintada como "Casi graduada".
      const estado = estadoDeItem(item);
      // aria-label: los lectores de pantalla leen el detalle sin necesidad de hover
      const datos = item
        ? `${estado.nombre}. ${T.stats.aciertos}: ${item.aciertos}. ${T.stats.fallos}: ${item.fallos}.`
        : `${estado.nombre}.`;
      html += `<td data-t="${t}" data-f="${f}" style="background:${estado.color}" aria-label="${t} × ${f} = ${t * f}. ${datos}"></td>`;
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
// GUÍA DE BIENVENIDA
// ═══════════════════════════════════════════════════════
// Dos pestañas: una para padres y otra para niños. Se muestra al abrir la app
// hasta que se marque "no volver a mostrar" (preferencia del dispositivo).
let guiaTab = 'padres';

function renderGuia() {
  const g = T.bienvenida;
  document.getElementById('guia-titulo').textContent = g.titulo;
  document.getElementById('guia-no-mostrar-label').textContent = g.noMostrar;
  document.getElementById('guia-cerrar').textContent = g.cerrar;

  document.querySelector('.guia-tabs').innerHTML = Object.keys(g.tabs).map(id => `
    <button type="button" class="guia-tab ${id === guiaTab ? 'activo' : ''}" data-guia="${id}"
      role="tab" aria-selected="${id === guiaTab}">${g.tabs[id]}</button>
  `).join('');

  const c = g[guiaTab];
  document.getElementById('guia-contenido').innerHTML = `
    <p class="guia-intro">${c.intro}</p>
    ${c.bloques.map(b => `
      <div class="guia-bloque">
        <span class="guia-bloque-icono" aria-hidden="true">${b.icono}</span>
        <div class="guia-bloque-cuerpo">
          <span class="guia-bloque-titulo">${b.titulo}</span>
          <p class="guia-bloque-texto">${b.texto}</p>
        </div>
      </div>`).join('')}
  `;
}

function abrirGuia() {
  renderGuia();
  const check = document.getElementById('guia-no-mostrar');
  // La casilla refleja la preferencia actual: si ya está desactivada, sale marcada.
  // Así, reabrir la guía desde Ajustes para leerla no la reactiva al cerrar.
  if (check) check.checked = !PREFS.bienvenida;
  document.getElementById('guia-contenido').scrollTop = 0;
  document.getElementById('bienvenida-overlay').hidden = false;
}

function cerrarGuia() {
  const check = document.getElementById('guia-no-mostrar');
  // Si queda marcada, no volvemos a mostrarla al abrir la app
  PREFS.bienvenida = !(check && check.checked);
  guardarPrefs();
  document.getElementById('bienvenida-overlay').hidden = true;
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
        alert(T.importar.errorArchivo);
        return;
      }
      // Si ya hay un perfil con ese nombre, preguntamos antes de reemplazarlo
      if (ESTADO.perfiles[data.nombre] && !confirm(T.importar.sobrescribir(data.nombre))) {
        return;
      }
      ESTADO.perfiles[data.nombre] = data.perfil;
      ESTADO.perfilActivo = data.nombre;
      guardarTodo();
      initAudio();
      renderPerfiles();
      renderInicio();
      mostrarPantalla('pantalla-inicio');
      alert(T.importar.ok(data.nombre));
    } catch (err) {
      alert(T.importar.errorLeer(err.message));
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
// PANELES LATERALES (ajustes y debug)
// ═══════════════════════════════════════════════════════
function renderAjustes() {
  const switchSonido = document.getElementById('toggle-sonido');
  if (switchSonido) {
    switchSonido.classList.toggle('activo', PREFS.sonido);
    switchSonido.setAttribute('aria-checked', String(PREFS.sonido));
  }
  const btnGuia = document.getElementById('btn-ver-guia');
  if (btnGuia) btnGuia.textContent = T.bienvenida.reabrir;
  document.querySelectorAll('.tema-opcion').forEach(btn => {
    const activo = btn.dataset.tema === PREFS.tema;
    btn.classList.toggle('activo', activo);
    btn.setAttribute('aria-checked', String(activo));
  });

  // Ficha de identidad de marca (logo, autoría, ubicación y paleta)
  const acerca = document.getElementById('acerca-de');
  if (acerca) acerca.innerHTML = htmlAcercaDe();
}

// Contenido del bloque «Acerca de» del panel de ajustes
function htmlAcercaDe() {
  const id = T.identidad;
  return `
  <div class="acerca-logo">
    <img src="${id.logo}" alt="Logo de ${esc(id.marca)}" loading="lazy">
  </div>
  <div class="acerca-marca">${esc(id.marca)}</div>
  <div class="acerca-meta">
    <span>✏️ ${esc(id.autor)}</span>
    <span>📍 ${esc(id.ubicacion)}</span>
    <a href="${id.url}" target="_blank" rel="noopener">📷 ${esc(id.usuario)}</a>
  </div>
  <p class="acerca-enfoque">${esc(id.enfoque)}</p>
  <div class="acerca-paleta" role="list" aria-label="Paleta de marca">
    ${id.paleta.map(c => `<span class="acerca-swatch" role="listitem" style="background:${c.hex}" title="${esc(c.nombre)} ${c.hex}"></span>`).join('')}
  </div>
`;
}

function botonDePanel(id) {
  return id === 'debug-panel'
    ? document.getElementById('debug-tab')
    : document.getElementById('btn-ajustes');
}

// Los botones flotantes desaparecen mientras hay un panel abierto,
// para no tapar el botón de cerrar ni el contenido del panel.
function actualizarBotonesFlotantes() {
  const hayPanelAbierto = !!document.querySelector('.panel-lateral.abierto');
  const gear = document.getElementById('btn-ajustes');
  const tab = document.getElementById('debug-tab');
  const salir = document.getElementById('btn-salir');
  if (gear) gear.hidden = hayPanelAbierto;
  if (tab) tab.hidden = hayPanelAbierto || !CONFIG.modoPrueba;
  if (salir) salir.hidden = hayPanelAbierto || pantallaActual !== 'pantalla-practica';
}

function abrirPanel(id, { conOverlay = true } = {}) {
  const panel = document.getElementById(id);
  if (!panel) return;

  // Nunca apilar los dos paneles: cerramos el otro si estuviera abierto
  document.querySelectorAll('.panel-lateral.abierto').forEach(p => {
    if (p.id !== id) cerrarPanel(p.id);
  });

  panel.classList.add('abierto');
  panel.setAttribute('aria-hidden', 'false');
  if (conOverlay) document.getElementById('panel-overlay').hidden = false;
  const btn = botonDePanel(id);
  if (btn) btn.setAttribute('aria-expanded', 'true');
  actualizarBotonesFlotantes();
}

function cerrarPanel(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  panel.classList.remove('abierto');
  panel.setAttribute('aria-hidden', 'true');
  const btn = botonDePanel(id);
  if (btn) btn.setAttribute('aria-expanded', 'false');
  // El fondo solo desaparece cuando no queda ningún panel abierto
  if (!document.querySelector('.panel-lateral.abierto')) {
    document.getElementById('panel-overlay').hidden = true;
  }
  actualizarBotonesFlotantes();
}

function alternarPanel(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  if (panel.classList.contains('abierto')) cerrarPanel(id);
  else abrirPanel(id);
}

function cerrarPaneles() {
  document.querySelectorAll('.panel-lateral.abierto').forEach(p => cerrarPanel(p.id));
}

// ═══════════════════════════════════════════════════════
// DEBUG
// ═══════════════════════════════════════════════════════
function initDebug() {
  if (!CONFIG.modoPrueba) return;
  actualizarDebugTiempo();
  // En escritorio el panel arranca abierto (sin fondo, para poder usar la app);
  // en móvil queda plegado tras la pestaña para no tapar botones.
  const escritorio = window.matchMedia && window.matchMedia('(min-width: 768px)').matches;
  if (escritorio) abrirPanel('debug-panel', { conOverlay: false });
  actualizarBotonesFlotantes();
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

// ---- Práctica: «no lo sé» y salir al inicio ----
// Con click (no pointerdown) para que un dedo que empieza a hacer scroll no los dispare
document.getElementById('btn-no-recuerdo').addEventListener('click', noLoRecuerdo);
document.getElementById('btn-salir').addEventListener('click', salirDeSesion);

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
let ritmoNuevo = RITMO_DEFECTO;

// Selector de ritmo: se dibuja desde RITMOS para que nombre, tarjetas y
// tiempo estimado salgan siempre de la misma fuente.
// `seleccionado` es el id del ritmo activo ('normal' | 'rapido' | 'intenso').
function htmlRitmoOpciones(seleccionado) {
  return RITMOS.map(r => `
    <button type="button" class="ritmo-opcion ${r.id === seleccionado ? 'activo' : ''}"
      data-ritmo="${r.id}" role="radio" aria-checked="${r.id === seleccionado}">
      <span class="ritmo-emoji" aria-hidden="true">${r.emoji}</span>
      <span class="ritmo-nombre">${T.ritmo.nombres[r.id]}</span>
      <span class="ritmo-tarjetas">${T.ritmo.tarjetasDia(r.tarjetas)}</span>
      <span class="ritmo-tiempo">${T.ritmo.tiempo(minutosEstimados(r.tarjetas))}</span>
    </button>
  `).join('');
}

// Selector del formulario "Nuevo perfil"
function renderRitmoSelector() {
  document.getElementById('ritmo-titulo').textContent = T.ritmo.titulo;
  document.getElementById('ritmo-nota').textContent = T.ritmo.nota;
  document.getElementById('ritmo-selector').innerHTML = htmlRitmoOpciones(ritmoNuevo);
}

document.getElementById('ritmo-selector').addEventListener('click', (e) => {
  const btn = e.target.closest('.ritmo-opcion');
  if (!btn) return;
  ritmoNuevo = btn.dataset.ritmo;
  renderRitmoSelector();
});

function mostrarFormNuevoPerfil(mostrar) {
  document.getElementById('btn-mostrar-nuevo').hidden = mostrar;
  // Al abrir el formulario ocultamos también "Importar perfil" para que
  // no parezca parte del formulario nuevo
  document.getElementById('btn-importar-perfiles').hidden = mostrar;
  document.getElementById('input-nuevo-perfil').hidden = !mostrar;
  if (mostrar) {
    // Cada perfil nuevo empieza en el ritmo por defecto
    ritmoNuevo = RITMO_DEFECTO;
    renderRitmoSelector();
    const input = document.getElementById('nombre-nuevo-perfil');
    input.value = '';
    input.placeholder = T.perfiles.placeholder;
    input.focus();
  }
}

document.getElementById('btn-mostrar-nuevo').addEventListener('click', () => mostrarFormNuevoPerfil(true));

document.getElementById('btn-cancelar-nuevo').addEventListener('click', () => mostrarFormNuevoPerfil(false));

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
  ESTADO.perfiles[nombre] = crearPerfil(nombre, ritmoNuevo);
  ESTADO.perfilActivo = nombre;
  guardarTodo();
  mostrarFormNuevoPerfil(false);
  initAudio();
  renderPerfiles();
  renderInicio();
  mostrarPantalla('pantalla-inicio');
}

document.getElementById('btn-crear-perfil').addEventListener('click', crearNuevoPerfil);
document.getElementById('nombre-nuevo-perfil').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') crearNuevoPerfil();
  if (e.key === 'Escape') mostrarFormNuevoPerfil(false);
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

// Importar se hace desde la pantalla de perfiles (así se puede importar sin
// tener que crear antes un perfil y entrar a Mi progreso)
document.getElementById('btn-importar-perfiles').addEventListener('click', () => {
  document.getElementById('input-importar').click();
});

document.getElementById('input-importar').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) importarProgreso(file);
  e.target.value = '';
});

// Cambiar las tarjetas diarias desde la pantalla de Progreso (delegado)
document.getElementById('ritmo-wrapper').addEventListener('click', (e) => {
  const btn = e.target.closest('.ritmo-opcion');
  if (!btn) return;
  const perfil = obtenerPerfilActivo();
  if (!perfil) return;
  const ritmo = RITMOS.find(r => r.id === btn.dataset.ritmo);
  if (!ritmo || perfil.ritmo === ritmo.id) return;

  perfil.ritmo = ritmo.id;
  guardarTodo();
  renderProgreso();

  // Confirmación breve: el cambio se aplica desde la próxima sesión
  const aviso = document.getElementById('ritmo-guardado');
  if (aviso) {
    aviso.hidden = false;
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => { aviso.hidden = true; }, 1800);
  }
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

// ---- Mapa de calor: detalle de una casilla ----
// Delegado en #mapa-calor (una sola escucha para las ~100 casillas).
// Escritorio: el ratón muestra el detalle al pasar y lo oculta al salir de la tabla.
// Táctil: el toque lo fija hasta tocar fuera u otra casilla (así se puede leer con calma).
const mapaCalor = document.getElementById('mapa-calor');
let tapInicio = null; // origen del toque, para distinguir un tap de un arrastre

mapaCalor.addEventListener('pointerover', (e) => {
  if (e.pointerType !== 'mouse') return; // en táctil manda el toque
  if (heatTipPinned) return;             // en híbridos no pisar el detalle fijado con un toque
  const td = e.target.closest('td[data-t]');
  if (td && td !== heatTipTd) mostrarTipCalor(td);
});

// pointerleave no burbujea: solo salta al abandonar la tabla, no al cambiar de casilla
mapaCalor.addEventListener('pointerleave', () => {
  if (!heatTipPinned) ocultarTipCalor();
});

mapaCalor.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse') return;
  tapInicio = { x: e.clientX, y: e.clientY, td: e.target.closest('td[data-t]') };
});

mapaCalor.addEventListener('pointerup', (e) => {
  if (e.pointerType === 'mouse' || !tapInicio) return;
  const { x, y, td } = tapInicio;
  tapInicio = null;
  // Si el dedo se movió, era un desplazamiento (scroll) y no un toque
  if (!td || Math.hypot(e.clientX - x, e.clientY - y) > 10) return;
  // Volver a tocar la misma casilla cierra el detalle
  if (heatTipPinned && heatTipTd === td) {
    heatTipPinned = false;
    ocultarTipCalor();
    return;
  }
  heatTipPinned = true;
  mostrarTipCalor(td);
});

mapaCalor.addEventListener('pointercancel', () => { tapInicio = null; });

// Tocar fuera cierra el detalle fijado
document.addEventListener('pointerdown', (e) => {
  if (!heatTipPinned) return;
  if (e.target.closest('#mapa-calor')) return;
  heatTipPinned = false;
  tapInicio = null;
  ocultarTipCalor();
});

// Al desplazar, el detalle acompaña a su casilla; si esta sale de pantalla, se cierra.
// capture=true escucha también el scroll horizontal interno de .mapa-calor
window.addEventListener('scroll', () => {
  if (heatTipEl.hidden || !heatTipTd) return;
  const r = heatTipTd.getBoundingClientRect();
  const visible = r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
  if (visible) posicionarTipCalor(heatTipTd);
  else {
    heatTipPinned = false;
    ocultarTipCalor();
  }
}, true);

window.addEventListener('resize', () => {
  heatTipPinned = false;
  ocultarTipCalor();
});

// ---- Paneles laterales (ajustes y debug) ----
document.getElementById('btn-ajustes').addEventListener('click', () => alternarPanel('panel-ajustes'));

document.getElementById('panel-overlay').addEventListener('click', cerrarPaneles);

document.querySelectorAll('.panel-cerrar').forEach(btn => {
  btn.addEventListener('click', () => cerrarPanel(btn.dataset.cerrar));
});

document.getElementById('toggle-sonido').addEventListener('click', () => {
  PREFS.sonido = !PREFS.sonido;
  guardarPrefs();
  renderAjustes();
  if (PREFS.sonido) {
    // Pequeña confirmación sonora al reactivar el sonido
    initAudio();
    pitido(880);
  }
});

document.querySelectorAll('.tema-opcion').forEach(btn => {
  btn.addEventListener('click', () => cambiarTema(btn.dataset.tema));
});

// ---- Guía de bienvenida ----
document.querySelector('.guia-tabs').addEventListener('click', (e) => {
  const tab = e.target.closest('.guia-tab');
  if (!tab || tab.dataset.guia === guiaTab) return;
  guiaTab = tab.dataset.guia;
  renderGuia();
  document.getElementById('guia-contenido').scrollTop = 0;
});

document.getElementById('guia-cerrar').addEventListener('click', cerrarGuia);

document.getElementById('bienvenida-overlay').addEventListener('click', (e) => {
  // Clic en el fondo: se comporta igual que el botón de cerrar
  if (e.target === document.getElementById('bienvenida-overlay')) cerrarGuia();
});

document.getElementById('btn-ver-guia').addEventListener('click', () => {
  cerrarPaneles();
  abrirGuia();
});

// Cerrar los paneles con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!document.getElementById('bienvenida-overlay').hidden) cerrarGuia();
    else cerrarPaneles();
  }
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
  document.getElementById('debug-tab').addEventListener('click', () => alternarPanel('debug-panel'));

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
    ESTADO.perfiles[nombre] = crearPerfil(nombre, perfil.ritmo);
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
// Etiquetas de la pantalla de práctica (viven en T para poder traducirse)
function renderTextosPractica() {
  const noRecuerdo = document.getElementById('btn-no-recuerdo');
  if (noRecuerdo) {
    noRecuerdo.textContent = T.practica.noRecuerdo;
    noRecuerdo.setAttribute('aria-label', T.practica.noRecuerdoAria);
  }
  const salir = document.getElementById('btn-salir');
  if (salir) salir.setAttribute('aria-label', T.practica.salir);
}

function init() {
  cargarPrefs();
  aplicarTema();
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

  renderAjustes();
  renderRitmoSelector();
  renderTextosPractica();
  initDebug();

  // Guía de bienvenida: solo si no se pidió no volver a mostrarla
  if (PREFS.bienvenida) abrirGuia();
}

init();
