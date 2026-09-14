/* =========================================================
   papers.js — Referencias del trabajo
   ---------------------------------------------------------
   Bibliografía del sitio: cada entrada es un hallazgo citado
   en alguna página, con el paper que lo respalda. El orden
   sigue la numeración de las citas [1]–[5] del texto.
   La tabla de referencias de la página 11 se genera desde acá.

   Esquema de una entrada:
     id          : identificador único (string)
     factor      : nombre corto del hallazgo
     descripcion : qué dice y en qué página se usa
     paper       : título del paper o artículo
     fuente      : autores / organización y año
     url         : enlace a la fuente
     en          : misma entrada en inglés { factor, descripcion,
                   paper, fuente } — la usa i18n.js/app.js cuando
                   el sitio está en inglés

   Para AGREGAR una referencia: añadí una entrada acá
   (y citala en el texto con su número), con su bloque `en`.
   ========================================================= */
window.PAPERS = [
  {
    id: 'computo',
    factor: 'El error cae con el cómputo (ley de potencias)',
    descripcion:
      'El test loss de un LLM cae de forma predecible al escalar cómputo, datos y tamaño, con rendimientos decrecientes. Son los datos de la regresión de las páginas 3 y 4.',
    paper: 'Scaling Laws for Neural Language Models',
    fuente: 'Kaplan et al., OpenAI — 2020',
    url: 'https://arxiv.org/abs/2001.08361',
    en: {
      factor: 'Error falls with compute (a power law)',
      descripcion:
        'The test loss of an LLM falls predictably as compute, data and size are scaled, with diminishing returns. This is the regression data used on pages 3 and 4.',
      paper: 'Scaling Laws for Neural Language Models',
      fuente: 'Kaplan et al., OpenAI — 2020',
    },
  },
  {
    id: 'cot',
    factor: 'Pensar más tiempo mejora la respuesta',
    descripcion:
      'Razonar paso a paso durante la inferencia (Test-Time Compute) muestra un beneficio directo del tiempo de pensamiento. Es la segunda variable de la página 5.',
    paper: 'Chain-of-Thought Prompting Elicits Reasoning in LLMs',
    fuente: 'Wei et al., Google — 2022',
    url: 'https://arxiv.org/abs/2201.11903',
    en: {
      factor: 'Thinking for longer improves the answer',
      descripcion:
        'Reasoning step by step during inference (Test-Time Compute) shows a direct benefit from thinking time. It is the second variable on page 5.',
      paper: 'Chain-of-Thought Prompting Elicits Reasoning in LLMs',
      fuente: 'Wei et al., Google — 2022',
    },
  },
  {
    id: 'multiagente',
    factor: 'Multi-agente: ayuda o perjudica según la tarea',
    descripcion:
      'En tareas paralelizables, coordinar muchos agentes dispara el éxito (+80,8 %); en tareas secuenciales lo degrada (−39 % a −70 %). Es el patrón XOR de la página 8.',
    paper: 'Towards a Science of Scaling Agent Systems',
    fuente: 'Google DeepMind + MIT — 2025',
    url: 'https://arxiv.org/abs/2512.08296',
    en: {
      factor: 'Multi-agent: helps or hurts depending on the task',
      descripcion:
        'On parallelisable tasks, coordinating many agents boosts success (+80.8%); on sequential tasks it degrades it (−39% to −70%). It is the XOR pattern of page 8.',
      paper: 'Towards a Science of Scaling Agent Systems',
      fuente: 'Google DeepMind + MIT — 2025',
    },
  },
  {
    id: 'plancraft',
    factor: 'Las tareas secuenciales encadenan dependencias',
    descripcion:
      'Evalúa agentes LLM sobre el crafteo de Minecraft, donde cada receta depende de la anterior: el ejemplo de tarea secuencial de la página 8.',
    paper: 'Plancraft: an evaluation dataset for planning with LLM agents',
    fuente: 'Universidad de Edimburgo — 2025',
    url: 'https://arxiv.org/abs/2412.21033',
    en: {
      factor: 'Sequential tasks chain dependencies',
      descripcion:
        'Evaluates LLM agents on Minecraft crafting, where each recipe depends on the previous one: the sequential-task example on page 8.',
      paper: 'Plancraft: an evaluation dataset for planning with LLM agents',
      fuente: 'University of Edinburgh — 2025',
    },
  },
  {
    id: 'backprop',
    factor: 'Las redes multicapa pueden autoajustarse',
    descripcion:
      'El artículo que terminó el invierno de la IA: una red multicapa puede ajustar todos sus parámetros propagando el error hacia atrás. Es el algoritmo de la página 10.',
    paper: 'Learning representations by back-propagating errors',
    fuente: 'Rumelhart, Hinton y Williams — 1986',
    url: 'https://www.nature.com/articles/323533a0',
    en: {
      factor: 'Multi-layer networks can tune themselves',
      descripcion:
        'The paper that ended the AI winter: a multi-layer network can adjust all its parameters by propagating the error backwards. It is the algorithm of page 10.',
      paper: 'Learning representations by back-propagating errors',
      fuente: 'Rumelhart, Hinton and Williams — 1986',
    },
  },
];
