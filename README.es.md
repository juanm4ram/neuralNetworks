# La evolución de los agentes y las redes neuronales

Trabajo práctico de **Análisis Matemático 2**: una página web interactiva que explica qué hay detrás de las redes neuronales — cómo aprenden, cómo se las optimiza y cómo surgieron — usando la matemática del curso.

**➜ Ver la página:** https://juanm4ram.github.io/neuralNetworks/

*🇬🇧 [Read this README in English](README.md) · el sitio es bilingüe (selector EN / ES en la barra superior).*

![Portada del sitio](assets/readme/portada.png)

---

## Por qué este proyecto

Una parte importante de aprender a trabajar con agentes de IA es entender cómo aprenden ellos. Detrás de cada agente hay funciones matemáticas enormes, y lo sorprendente es que es la propia máquina quien se las arregla para obtenerlas: nadie elige sus miles de millones de parámetros a mano.

Queríamos mostrar ese recorrido sin cajas negras. Cada fórmula que aparece en el sitio se puede seguir con lápiz y papel usando las herramientas de AM2: derivadas parciales, regla de la cadena, mínimos de funciones. La tesis del trabajo es que con eso alcanza para entender cómo la inteligencia artificial es capaz de generar texto con sentido.

## Cómo lo pensamos

- **Una introducción ampliada.** Una analogía sobre el aprendizaje presenta los modelos de lenguaje, los IDs de tokens, los embeddings, los bloques Transformer y los parámetros aprendidos. Incluye fórmulas en LaTeX, recuadros, resaltados por color y un ejemplo visual de tokens y su vector de entrada.
- **Una historia en 9 páginas, de lo simple a lo complejo.** El sitio se lee como un cuadernillo: una recta sobre datos reales (página 1) → el error como función a minimizar (página 2) → más dimensiones y mínimos cuadrados (página 3) → el perceptrón (página 4) → compuertas AND/OR (página 5) → el límite del XOR (página 6) → capas y funciones de activación (página 7) → backpropagation y descenso del gradiente (página 8) → conclusión y referencias (página 9).
- **Papers reales como hilo conductor.** Cada concepto matemático entra cuando un hallazgo real lo pide: la regresión lineal aparece para modelar las Scaling Laws de OpenAI, y el XOR aparece porque el hallazgo multi-agente de DeepMind + MIT (los multi-agentes ayudan en tareas paralelizables y perjudican en secuenciales) tiene exactamente esa forma.
- **Interactivo donde suma, estático donde no.** La página 2 tiene una herramienta para mover la pendiente y el sesgo de la recta y ver el error cuadrático medio cambiar en vivo. El resto son gráficos SVG dibujados por código, sin librerías.
- **Estética hecha a mano.** Tipografía manuscrita, colores de papel y una portada animada (homenaje a *The Evolution of Trust* de Nicky Case): la idea es que se sienta como un cuaderno de apuntes y no como una presentación corporativa.
- **Selección de idioma.** La introducción, la navegación y los nueve capítulos están disponibles en inglés y español; el inglés es el idioma predeterminado. El cambio de idioma conserva los colores, los recuadros y las fórmulas LaTeX. Los tokens de ejemplo permanecen en español para conservar la correspondencia con sus IDs y vectores. La elección se recuerda entre visitas.
- **Sin dependencias ni build.** HTML + CSS + JS vanilla; solo MathJax por CDN para las fórmulas. Desplegar es copiar archivos estáticos.

## El recorrido, en capturas

**Introducción — aprendizaje y modelos de lenguaje.** La analogía inicial y el video presentan el modelo, con palabras clave resaltadas por color.

![Introducción: analogía del aprendizaje y video](assets/readme/introduccion.png)

**Introducción — de los tokens al vector de entrada.** Los fragmentos se muestran separados y se corresponden con los IDs de la fórmula en LaTeX, dentro de un recuadro.

![Introducción: tokens y posiciones en el vector de entrada](assets/readme/introduccion-tokens.png)

**Página 1 — los datos reales y la primera recta.** El test loss de los modelos de OpenAI cae con el cómputo siguiendo una ley de potencias; en escala log-log es casi una recta, y esa recta es nuestro primer modelo:

![Página 1: scaling laws](assets/readme/scaling-laws.png)

**Página 2 — el error como función.** La herramienta interactiva: movés la pendiente y el sesgo, y el error cuadrático medio te dice qué tan buena es tu recta:

![Página 2: herramienta de regresión](assets/readme/herramienta-mse.png)

**Página 6 — el límite.** El hallazgo multi-agente tiene forma de XOR y ninguna recta puede separar ese patrón: la razón geométrica por la que hacen falta redes:

![Página 6: la paradoja XOR](assets/readme/xor.png)

**Página 9 — la conclusión.** El repaso de todo lo utilizado, etapa por etapa, y las referencias:

![Página 9: conclusión](assets/readme/conclusion.png)

## Cómo correrlo local

No hay nada que instalar. Cualquier servidor estático sirve:

```bash
# Con Python
python -m http.server 8000

# o con Node
npx http-server -p 8000 -c-1
```

Abrí `http://localhost:8000` y navegá con los botones, o con el paginador numérico (1–9) que aparece al pie de cada página. También podés saltar a una página puntual con el hash: `http://localhost:8000/#cap6`.

## Estructura del proyecto

```
neuralNetworks/
├── index.html      # Las 9 páginas de la presentación
├── styles.css      # Estética "hecha a mano" (papel, tipografía manuscrita)
├── app.js          # Navegación, portada animada, gráficos y tabla de referencias
├── i18n.js         # ★ Diccionario inglés + motor de idioma (por defecto: inglés)
├── papers.js       # Bibliografía: solo los papers citados en el texto (solo datos)
├── assets/         # Fuente, imágenes y capturas del README
├── videos/         # Animaciones de apoyo
└── PaperSequentialParallel.pdf  # Paper de Plancraft (página 6)
```

### Cómo funciona la capa bilingüe

El HTML está escrito en español y cada bloque traducible lleva una clave `data-i18n="tNNN"`. `i18n.js` guarda la cadena en inglés de cada clave y las aplica al cargar — el inglés es el idioma por defecto y la elección del lector se guarda en `localStorage`.

Cambiar de idioma recarga la página (conservando la sección actual mediante el `#hash`) para que los canvas, las etiquetas SVG y las tablas generadas se reconstruyan en el idioma elegido, sin texto viejo dando vueltas.

Para traducir un bloque nuevo: agregá `data-i18n="tNNN"` al elemento en `index.html` y su cadena en inglés al diccionario `EN` de `i18n.js`. Las etiquetas de los gráficos y demás textos que no viven en el DOM se piden con `I18N.t('clave')`.

`papers.js` contiene únicamente los papers **citados en el texto** ([1]–[5]), en el mismo orden que las citas; la tabla de referencias de la página 9 se genera automáticamente desde ahí. Cada entrada trae un bloque `en` con su versión en inglés. Para agregar una referencia alcanza con añadir una entrada al array y citarla en el texto.

## Referencias

| # | Hallazgo | Paper | Fuente |
|---|---|---|---|
| [1] | El error cae con el cómputo | [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361) | Kaplan et al., OpenAI — 2020 |
| [2] | Pensar más tiempo mejora la respuesta | [Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903) | Wei et al., Google — 2022 |
| [3] | Multi-agente: depende de la tarea (XOR) | [Towards a Science of Scaling Agent Systems](https://arxiv.org/abs/2512.08296) | DeepMind + MIT — 2025 |
| [4] | Tareas secuenciales encadenan dependencias | [Plancraft (Minecraft)](https://arxiv.org/abs/2412.21033) | Univ. de Edimburgo — 2025 |
| [5] | Las redes multicapa se autoajustan | [Learning representations by back-propagating errors](https://www.nature.com/articles/323533a0) | Rumelhart, Hinton y Williams — 1986 |

## Créditos e inspiración

Un agradecimiento especial a **[Nicky Case (@ncase)](https://github.com/ncase)**. La estética hecha a mano y la portada animada del proyecto se inspiran en *The Evolution of Trust*, y su manera de explicar mediante experiencias interactivas es una referencia educativa para este trabajo.

