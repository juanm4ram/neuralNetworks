/* =========================================================
   papers.js — Referencias del trabajo
   ---------------------------------------------------------
   Bibliografía del sitio: cada entrada es un hallazgo citado
   en alguna página, con el paper que lo respalda. El orden
   sigue la numeración de las citas [1]–[5] del texto.
   La tabla de referencias de la página 9 se genera desde acá.

   Esquema de una entrada:
     id          : identificador único (string)
     factor      : nombre corto del hallazgo
     descripcion : qué dice y en qué página se usa
     paper       : título del paper o artículo
     fuente      : autores / organización y año
     url         : enlace a la fuente

   Para AGREGAR una referencia: añadí una entrada acá
   (y citala en el texto con su número).
   ========================================================= */
window.PAPERS = [
  {
    id: 'computo',
    factor: 'El error cae con el cómputo (ley de potencias)',
    descripcion:
      'El test loss de un LLM cae de forma predecible al escalar cómputo, datos y tamaño, con rendimientos decrecientes. Son los datos de la regresión de las páginas 1 y 2.',
    paper: 'Scaling Laws for Neural Language Models',
    fuente: 'Kaplan et al., OpenAI — 2020',
    url: 'https://arxiv.org/abs/2001.08361',
  },
  {
    id: 'cot',
    factor: 'Pensar más tiempo mejora la respuesta',
    descripcion:
      'Razonar paso a paso durante la inferencia (Test-Time Compute) muestra un beneficio directo del tiempo de pensamiento. Es la segunda variable de la página 3.',
    paper: 'Chain-of-Thought Prompting Elicits Reasoning in LLMs',
    fuente: 'Wei et al., Google — 2022',
    url: 'https://arxiv.org/abs/2201.11903',
  },
  {
    id: 'multiagente',
    factor: 'Multi-agente: ayuda o perjudica según la tarea',
    descripcion:
      'En tareas paralelizables, coordinar muchos agentes dispara el éxito (+80,8 %); en tareas secuenciales lo degrada (−39 % a −70 %). Es el patrón XOR de la página 6.',
    paper: 'Towards a Science of Scaling Agent Systems',
    fuente: 'Google DeepMind + MIT — 2025',
    url: 'https://arxiv.org/abs/2512.08296',
  },
  {
    id: 'plancraft',
    factor: 'Las tareas secuenciales encadenan dependencias',
    descripcion:
      'Evalúa agentes LLM sobre el crafteo de Minecraft, donde cada receta depende de la anterior: el ejemplo de tarea secuencial de la página 6.',
    paper: 'Plancraft: an evaluation dataset for planning with LLM agents',
    fuente: 'Universidad de Edimburgo — 2025',
    url: 'https://arxiv.org/abs/2412.21033',
  },
  {
    id: 'backprop',
    factor: 'Las redes multicapa pueden autoajustarse',
    descripcion:
      'El artículo que terminó el invierno de la IA: una red multicapa puede ajustar todos sus parámetros propagando el error hacia atrás. Es el algoritmo de la página 8.',
    paper: 'Learning representations by back-propagating errors',
    fuente: 'Rumelhart, Hinton y Williams — 1986',
    url: 'https://www.nature.com/articles/323533a0',
  },
];
