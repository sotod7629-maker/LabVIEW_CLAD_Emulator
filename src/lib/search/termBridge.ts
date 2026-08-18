/**
 * Spanish → English term bridge for cross-language retrieval.
 *
 * THE PROBLEM
 * -----------
 * The question bank is written in Spanish; the LabVIEW participant guides are
 * in English. A raw keyword search of a Spanish question against English prose
 * retrieves almost nothing.
 *
 * WHAT THIS IS (AND IS NOT)
 * -------------------------
 * This is a *retrieval aid* only: a glossary that expands a Spanish query with
 * the English terms the guides actually use. It never rewrites, translates or
 * generates any text that is shown to the user. Retrieved passages are always
 * displayed verbatim in the document's own language with a real citation.
 *
 * Most LabVIEW terminology is untranslated in practice ("shift register",
 * "Case Structure", "cluster"), so this table is deliberately small and covers
 * the terms the bank genuinely translates.
 */

/** Multi-word Spanish phrases, matched before single tokens. */
const PHRASE_MAP: ReadonlyArray<readonly [RegExp, string]> = [
  [/panel\s+frontal/g, 'front panel'],
  [/diagrama\s+de\s+bloques/g, 'block diagram'],
  [/panel\s+de\s+conexiones/g, 'connector pane'],
  [/explorador\s+de\s+proyectos?/g, 'project explorer'],
  [/paleta\s+de\s+controles/g, 'controls palette'],
  [/paleta\s+de\s+funciones/g, 'functions palette'],
  [/paleta\s+de\s+herramientas/g, 'tools palette'],
  [/ayuda\s+contextual/g, 'context help'],
  [/registro\s+de\s+desplazamiento/g, 'shift register'],
  [/nodo\s+de\s+realimentacion/g, 'feedback node'],
  [/tunel\s+indexado/g, 'indexing tunnel'],
  [/lazo\s+while/g, 'while loop'],
  [/lazo\s+for/g, 'for loop'],
  [/ciclo\s+while/g, 'while loop'],
  [/ciclo\s+for/g, 'for loop'],
  [/estructura\s+de\s+casos?/g, 'case structure'],
  [/estructura\s+secuencial/g, 'sequence structure'],
  [/maquina\s+de\s+estados/g, 'state machine'],
  [/tipo\s+de\s+dato/g, 'data type'],
  [/tipos\s+de\s+datos/g, 'data types'],
  [/punto\s+flotante/g, 'floating point'],
  [/numero\s+entero/g, 'integer'],
  [/manejo\s+de\s+errores/g, 'error handling'],
  [/agrupamiento\s+de\s+errores/g, 'error cluster'],
  [/cable\s+roto/g, 'broken wire'],
  [/flecha\s+rota/g, 'broken run arrow'],
  [/punto\s+de\s+interrupcion/g, 'breakpoint'],
  [/sonda\s+de\s+datos/g, 'probe'],
  [/animacion\s+de\s+ejecucion/g, 'execution highlighting'],
  [/hoja\s+de\s+calculo/g, 'spreadsheet'],
  [/archivo\s+de\s+texto/g, 'text file'],
  [/ruta\s+de\s+archivo/g, 'file path'],
  [/barra\s+de\s+progreso/g, 'progress bar'],
  [/control\s+numerico/g, 'numeric control'],
  [/definicion\s+de\s+tipo/g, 'type definition'],
  [/control\s+personalizado/g, 'custom control'],
  [/nodo\s+de\s+propiedad/g, 'property node'],
  [/variable\s+local/g, 'local variable'],
  [/condicion\s+de\s+carrera/g, 'race condition'],
  [/flujo\s+de\s+datos/g, 'dataflow'],
  [/patron\s+de\s+diseno/g, 'design pattern'],
  [/estructura\s+de\s+eventos/g, 'event structure'],
  [/productor\s*[\/\s-]\s*consumidor/g, 'producer consumer'],
  [/maestro\s*[\/\s-]\s*esclavo/g, 'master slave'],
  [/cociente\s+y\s+residuo/g, 'quotient remainder'],
  [/secuencia\s+plana/g, 'flat sequence'],
];

/** Single-token Spanish → English mappings. */
const TOKEN_MAP: Readonly<Record<string, string>> = {
  arreglo: 'array',
  arreglos: 'arrays',
  matriz: 'array',
  matrices: 'arrays',
  agrupamiento: 'cluster',
  agrupamientos: 'clusters',
  cadena: 'string',
  cadenas: 'strings',
  bucle: 'loop',
  bucles: 'loops',
  lazo: 'loop',
  lazos: 'loops',
  ciclo: 'loop',
  ciclos: 'loops',
  estructura: 'structure',
  estructuras: 'structures',
  caso: 'case',
  casos: 'case',
  tunel: 'tunnel',
  tuneles: 'tunnels',
  terminal: 'terminal',
  terminales: 'terminals',
  cable: 'wire',
  cables: 'wires',
  cableado: 'wiring',
  nodo: 'node',
  nodos: 'nodes',
  control: 'control',
  controles: 'controls',
  indicador: 'indicator',
  indicadores: 'indicators',
  entrada: 'input',
  entradas: 'inputs',
  salida: 'output',
  salidas: 'outputs',
  funcion: 'function',
  funciones: 'functions',
  archivo: 'file',
  archivos: 'files',
  ruta: 'path',
  rutas: 'paths',
  error: 'error',
  errores: 'errors',
  depuracion: 'debugging',
  depurar: 'debug',
  sonda: 'probe',
  sondas: 'probes',
  ejecucion: 'execution',
  ejecutar: 'run',
  iteracion: 'iteration',
  iteraciones: 'iterations',
  temporizacion: 'timing',
  temporizador: 'timer',
  espera: 'wait',
  milisegundos: 'milliseconds',
  numerico: 'numeric',
  numericos: 'numeric',
  entero: 'integer',
  enteros: 'integers',
  flotante: 'float',
  booleano: 'boolean',
  booleanos: 'booleans',
  cluster: 'cluster',
  grafica: 'graph',
  graficas: 'graphs',
  grafico: 'chart',
  graficos: 'charts',
  memoria: 'memory',
  proyecto: 'project',
  proyectos: 'projects',
  biblioteca: 'library',
  bibliotecas: 'libraries',
  icono: 'icon',
  iconos: 'icons',
  conector: 'connector',
  conectores: 'connectors',
  documentacion: 'documentation',
  propiedad: 'property',
  propiedades: 'properties',
  variable: 'variable',
  variables: 'variables',
  evento: 'event',
  eventos: 'events',
  cola: 'queue',
  colas: 'queues',
  notificador: 'notifier',
  seleccionar: 'select',
  seleccion: 'selection',
  valor: 'value',
  valores: 'values',
  dato: 'data',
  datos: 'data',
  tamano: 'size',
  longitud: 'length',
  indice: 'index',
  indices: 'index',
  elemento: 'element',
  elementos: 'elements',
  dimension: 'dimension',
  dimensiones: 'dimensions',
  fila: 'row',
  filas: 'rows',
  columna: 'column',
  columnas: 'columns',
  vacio: 'empty',
  inicializar: 'initialize',
  inicializado: 'initialized',
  guardar: 'save',
  abrir: 'open',
  cerrar: 'close',
  escribir: 'write',
  leer: 'read',
  concatenar: 'concatenate',
  subconjunto: 'subset',
  reemplazar: 'replace',
  insertar: 'insert',
  eliminar: 'delete',
  buscar: 'search',
  ordenar: 'sort',
  invertir: 'reverse',
  convertir: 'convert',
  conversion: 'conversion',
  coercion: 'coercion',
  punto: 'dot',
  paleta: 'palette',
  ventana: 'window',
  herramienta: 'tool',
  herramientas: 'tools',
  automatico: 'automatic',
  paralelo: 'parallel',
  secuencial: 'sequential',
  condicional: 'conditional',
  contador: 'count',
  primero: 'first',
  ultimo: 'last',
  anterior: 'previous',
  siguiente: 'next',
  actual: 'current',
  predeterminado: 'default',
  aplicacion: 'application',
  interfaz: 'interface',
  usuario: 'user',
  mensaje: 'message',
  cuadro: 'dialog',
  dialogo: 'dialog',
  boton: 'button',
  etiqueta: 'label',
  escalar: 'scalar',
  constante: 'constante',
  velocidad: 'speed',
  rendimiento: 'performance',
  copia: 'copy',
  referencia: 'reference',
  referencias: 'references',
  jerarquia: 'hierarchy',
  reutilizar: 'reuse',
  reutilizacion: 'reuse',
  modularidad: 'modularity',
  subvi: 'subvi',
  subvis: 'subvis',

  // Added after calibration against the bank: these Spanish terms were being
  // misread as English technical terms absent from the guides, which wrongly
  // suppressed otherwise well-supported explanations.
  productor: 'producer',
  consumidor: 'consumer',
  maestro: 'master',
  esclavo: 'slave',
  operacion: 'operation',
  operaciones: 'operations',
  automatica: 'automatic',
  enumerado: 'enum',
  orden: 'order',
  detener: 'stop',
  agregar: 'add',
  anadir: 'add',
  configurar: 'configure',
  residuo: 'remainder',
  cociente: 'quotient',
  plana: 'flat',
  plano: 'flat',
  sin: 'without',
  todos: 'all',
  todas: 'all',
  mundo: 'world',
  hola: 'hello',

  // Abbreviations the bank uses but the guides spell out in full.
  typedef: 'type definition',
  sgl: 'single',
  dbl: 'double',
  ext: 'extended',
  i32: 'integer',
  u32: 'integer',
};

/**
 * Expand a Spanish query into the English vocabulary of the guides.
 *
 * Returns the original tokens plus their English equivalents — the original
 * tokens are kept because LabVIEW proper nouns ("Case Structure", "SubVI") are
 * already English in the Spanish text and must still match.
 */
export function bridgeToEnglish(text: string): string {
  let working = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

  const additions: string[] = [];

  for (const [pattern, english] of PHRASE_MAP) {
    if (pattern.test(working)) additions.push(english);
    pattern.lastIndex = 0;
  }

  for (const token of working.replace(/[^a-z0-9]+/g, ' ').split(/\s+/)) {
    const mapped = TOKEN_MAP[token];
    if (mapped) additions.push(mapped);
  }

  return additions.length ? `${working} ${additions.join(' ')}` : working;
}

/**
 * Tokens in `text` that the bridge recognises as SPANISH — either mapped
 * directly or consumed by a Spanish phrase pattern.
 *
 * The evidence gate uses this to tell two very different situations apart when
 * a term is missing from the English guides:
 *
 *   "frontal"  (from "Panel Frontal")  — missing because it is Spanish. The
 *              concept IS documented, under its English name.
 *   "tick"     (from "Tick Count (ms)") — missing because the guides genuinely
 *              never mention it.
 *
 * Only the second kind should block an explanation.
 */
export function spanishSourceTokens(text: string): Set<string> {
  const normalized = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const tokens = new Set<string>();

  for (const [pattern] of PHRASE_MAP) {
    pattern.lastIndex = 0;
    const matches = normalized.match(pattern);
    if (!matches) continue;
    for (const fragment of matches) {
      for (const token of fragment.split(/[^a-z0-9]+/)) {
        if (token) tokens.add(token);
      }
    }
  }

  for (const token of normalized.replace(/[^a-z0-9]+/g, ' ').split(/\s+/)) {
    if (TOKEN_MAP[token]) tokens.add(token);
  }

  return tokens;
}
