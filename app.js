/* =========================================================
   app.js
   - Animación de la portada: red de "peeps" en anillos concéntricos
     que se abultan al acercar el cursor (réplica de The Evolution of Trust).
   - Navegación simple entre pantallas (portada -> introducción).
   - Manejo robusto del recuadro de video (loop, sin audio).
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Navegación entre pantallas ---------- */
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.toggle('is-active', s.id === id);
    });
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-goto]');
    if (!t) return;
    e.preventDefault();
    showScreen(t.getAttribute('data-goto'));
  });

  // Deep-link: abrir una página puntual con #id (p. ej. index.html#cap9)
  var hashId = (location.hash || '').replace('#', '');
  if (hashId && document.getElementById(hashId)) showScreen(hashId);

  /* ---------- Video: aviso "falta el archivo" SOLO si no hay fuente cargable ----------
     No ocultamos el video por errores transitorios de decodificación durante el loop.
     Solo mostramos el aviso si el navegador no encontró ninguna fuente válida
     (networkState === NETWORK_NO_SOURCE) y nunca llegó a tener datos. */
  function wireVideos() {
    var vids = document.querySelectorAll('.js-video');
    for (var i = 0; i < vids.length; i++) {
      (function (video) {
        var overlay = video.parentElement.querySelector('.video-card__missing');
        if (!overlay) return;

        function reallyMissing() {
          if (video.readyState >= 1 || video.currentTime > 0) return false;
          return video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
        }
        function check() {
          var missing = reallyMissing();
          overlay.style.display = missing ? 'flex' : 'none';
          video.style.display = missing ? 'none' : 'block';
        }
        function loaded() {
          overlay.style.display = 'none';
          video.style.display = 'block';
        }

        video.addEventListener('error', check, true);
        video.addEventListener('loadeddata', loaded);
        video.addEventListener('canplay', function () {
          var p = video.play();
          if (p && p.catch) p.catch(function () {});
        });
        setTimeout(check, 1200);
      })(vids[i]);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireVideos);
  } else {
    wireVideos();
  }

  /* ---------- Datos compartidos (capítulos 1 y 2) ----------
     Puntos aproximados de la Figura 1 (izquierda) de
     "Scaling Laws for Neural Language Models" (OpenAI, 2020).
     x = órdenes de magnitud de cómputo (escala log10, corrida +6:
         0 ↔ 10⁻⁶, 9 ↔ 10³)
     y = test loss (cross-entropy) */
  var DATA = [
    [0, 5.2],
    [1.5, 4.4],
    [3, 3.7],
    [4.5, 3.1],
    [6, 2.6],
    [7.5, 2.2],
    [9, 1.9],
  ];

  // Marcas del eje X en escala logarítmica.
  var XTICKS = [
    [0, '10⁻⁶'],
    [3, '10⁻³'],
    [6, '10⁰'],
    [9, '10³'],
  ];
  // Textos de los gráficos: los provee i18n.js según el idioma elegido.
  var T = (window.I18N && window.I18N.t) || function (k) { return k; };
  var LANG = (window.I18N && window.I18N.lang) || 'es';
  var XLABEL = T('chartXLabel');

  // Mejor ajuste por mínimos cuadrados (para el botón y la referencia).
  function bestFit(data) {
    var n = data.length,
      sx = 0,
      sy = 0,
      sxx = 0,
      sxy = 0;
    for (var i = 0; i < n; i++) {
      sx += data[i][0];
      sy += data[i][1];
      sxx += data[i][0] * data[i][0];
      sxy += data[i][0] * data[i][1];
    }
    var w = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    var b = (sy - w * sx) / n;
    return { w: w, b: b };
  }

  function mse(data, w, b) {
    var s = 0;
    for (var i = 0; i < data.length; i++) {
      var e = data[i][1] - (w * data[i][0] + b);
      s += e * e;
    }
    return s / data.length;
  }

  var SVGNS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs) {
    var el = document.createElementNS(SVGNS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  /* ---------- Gráfico de dispersión (capítulo 1) ---------- */
  function buildScatter() {
    var svg = document.getElementById('scatter-cap1');
    if (!svg) return;
    var W = 380,
      H = 240,
      ml = 44,
      mb = 34,
      mt = 14,
      mr = 14;
    var x0 = ml,
      x1 = W - mr,
      y0 = H - mb,
      y1 = mt;
    var maxX = 10,
      maxY = 6;
    function px(x) {
      return x0 + (x / maxX) * (x1 - x0);
    }
    function py(y) {
      return y0 + (y / maxY) * (y1 - y0);
    }
    // ejes
    svg.appendChild(svgEl('line', { x1: x0, y1: y0, x2: x1, y2: y0, stroke: '#9b97a3', 'stroke-width': 2 }));
    svg.appendChild(svgEl('line', { x1: x0, y1: y0, x2: x0, y2: y1, stroke: '#9b97a3', 'stroke-width': 2 }));
    // líneas guía y etiquetas Y (test loss)
    [2, 4, 6].forEach(function (v) {
      svg.appendChild(svgEl('line', { x1: x0, y1: py(v), x2: x1, y2: py(v), stroke: '#f1eee6', 'stroke-width': 1 }));
      var t = svgEl('text', { x: x0 - 6, y: py(v) + 4, 'font-size': 10, fill: '#9b97a3', 'text-anchor': 'end' });
      t.textContent = v;
      svg.appendChild(t);
    });
    // marcas X (escala logarítmica)
    XTICKS.forEach(function (tk) {
      var t = svgEl('text', { x: px(tk[0]), y: y0 + 16, 'font-size': 10, fill: '#9b97a3', 'text-anchor': 'middle' });
      t.textContent = tk[1];
      svg.appendChild(t);
    });
    // recta de tendencia (mejor ajuste)
    var bf = bestFit(DATA);
    svg.appendChild(
      svgEl('line', {
        x1: px(0), y1: py(bf.b), x2: px(maxX), y2: py(bf.w * maxX + bf.b),
        stroke: '#4f88e6', 'stroke-width': 2.5, 'stroke-dasharray': '7 5',
      })
    );
    // puntos
    DATA.forEach(function (d) {
      svg.appendChild(svgEl('circle', { cx: px(d[0]), cy: py(d[1]), r: 6, fill: '#e8543f' }));
    });
    var lx = svgEl('text', { x: (x0 + x1) / 2, y: H - 4, 'font-size': 11, fill: '#6f6b78', 'text-anchor': 'middle' });
    lx.textContent = XLABEL;
    svg.appendChild(lx);
  }

  /* ---------- Diagrama de neurona (capítulo 4) — ahora con bias ---------- */
  function buildNeuron() {
    var svg = document.getElementById('neuron-diagram');
    if (!svg) return;
    // delega en drawNeuron (mismo estilo que las compuertas), incluyendo el sesgo b
    drawNeuron(svg, 100, { b: 'b', w1: 'w₁', w2: 'w₂', formula: 'Σ', out: 'z' });
  }

  /* ---------- Herramienta interactiva de regresión (capítulo 2) ---------- */
  function buildRegTool() {
    var canvas = document.getElementById('reg-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var wEl = document.getElementById('reg-w');
    var bEl = document.getElementById('reg-b');
    var wVal = document.getElementById('reg-w-val');
    var bVal = document.getElementById('reg-b-val');
    var mseEl = document.getElementById('reg-mse');
    var bestBtn = document.getElementById('reg-best');

    var CW = canvas.width,
      CH = canvas.height;
    var ml = 56,
      mb = 46,
      mt = 20,
      mr = 24;
    var x0 = ml,
      x1 = CW - mr,
      y0 = CH - mb,
      y1 = mt;
    var maxX = 10,
      maxY = 6;
    function px(x) {
      return x0 + (x / maxX) * (x1 - x0);
    }
    function py(y) {
      return y0 + (y / maxY) * (y1 - y0);
    }

    function draw() {
      var w = parseFloat(wEl.value);
      var b = parseFloat(bEl.value);
      ctx.clearRect(0, 0, CW, CH);

      // grilla + etiquetas Y (test loss)
      ctx.font = '13px FuturaHandwritten, sans-serif';
      ctx.fillStyle = '#9b97a3';
      ctx.textAlign = 'right';
      [0, 1, 2, 3, 4, 5, 6].forEach(function (v) {
        ctx.strokeStyle = '#f1eee6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x0, py(v));
        ctx.lineTo(x1, py(v));
        ctx.stroke();
        ctx.fillText(v, x0 - 8, py(v) + 4);
      });
      // ejes
      ctx.strokeStyle = '#9b97a3';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y0);
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0, y1);
      ctx.stroke();
      // etiquetas X (escala logarítmica)
      ctx.textAlign = 'center';
      ctx.fillStyle = '#9b97a3';
      XTICKS.forEach(function (tk) {
        ctx.fillText(tk[1], px(tk[0]), y0 + 20);
      });
      ctx.fillStyle = '#6f6b78';
      ctx.fillText(XLABEL, (x0 + x1) / 2, CH - 10);

      // recta del modelo
      ctx.strokeStyle = '#4f88e6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(px(0), py(b));
      ctx.lineTo(px(maxX), py(w * maxX + b));
      ctx.stroke();

      // residuos + puntos
      DATA.forEach(function (d) {
        var pred = w * d[0] + b;
        ctx.strokeStyle = 'rgba(232,84,63,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px(d[0]), py(d[1]));
        ctx.lineTo(px(d[0]), py(pred));
        ctx.stroke();
        ctx.fillStyle = '#e8543f';
        ctx.beginPath();
        ctx.arc(px(d[0]), py(d[1]), 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      var err = mse(DATA, w, b);
      // recuadro con el error (MSE) sobre el gráfico
      ctx.textAlign = 'left';
      ctx.font = '16px FuturaHandwritten, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillRect(x0 + 4, y1 - 4, 168, 26);
      ctx.fillStyle = '#e8543f';
      ctx.fillText(T('chartError') + err.toFixed(2), x0 + 10, y1 + 14);

      wVal.textContent = w.toFixed(2);
      bVal.textContent = b.toFixed(1);
      mseEl.textContent = err.toFixed(2);
    }

    wEl.addEventListener('input', draw);
    bEl.addEventListener('input', draw);
    if (bestBtn) {
      bestBtn.addEventListener('click', function () {
        var bf = bestFit(DATA);
        wEl.value = bf.w.toFixed(2);
        bEl.value = bf.b.toFixed(1);
        draw();
      });
    }
    // Draw at the available CSS width instead of shrinking a desktop bitmap.
    // Hidden chapters are resized when they become visible.
    function resizeCanvas() {
      var width = canvas.parentElement.clientWidth;
      if (!width) return;
      CW = width;
      CH = Math.max(270, Math.round(CW * 380 / 640));
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(CW * ratio);
      canvas.height = Math.round(CH * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ml = CW < 400 ? 44 : 56;
      mr = CW < 400 ? 16 : 24;
      x0 = ml;
      x1 = CW - mr;
      y0 = CH - mb;
      draw();
    }
    draw();
    if (window.ResizeObserver) {
      new ResizeObserver(resizeCanvas).observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', resizeCanvas);
      // Navigation can reveal a previously hidden chapter without a resize.
      document.addEventListener('click', function (e) {
        if (e.target.closest('[data-goto]')) resizeCanvas();
      });
    }
    resizeCanvas();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(resizeCanvas);
    }
  }

  /* ---------- Compuertas: recorte de semiplano (Sutherland-Hodgman) ---------- */
  function clipPoly(poly, a, b, c) {
    // conserva los vértices con a*x + b*y + c >= 0
    var out = [],
      n = poly.length;
    for (var i = 0; i < n; i++) {
      var cur = poly[i],
        prev = poly[(i + n - 1) % n];
      var dc = a * cur.x + b * cur.y + c,
        dp = a * prev.x + b * prev.y + c;
      if (dc >= 0) {
        if (dp < 0) {
          var t = dp / (dp - dc);
          out.push({ x: prev.x + t * (cur.x - prev.x), y: prev.y + t * (cur.y - prev.y) });
        }
        out.push(cur);
      } else if (dp >= 0) {
        var t2 = dp / (dp - dc);
        out.push({ x: prev.x + t2 * (cur.x - prev.x), y: prev.y + t2 * (cur.y - prev.y) });
      }
    }
    return out;
  }

  /* ---------- Gráfico de una compuerta (puntos separados de los ejes) ---------- */
  function buildGatePlot(svgId, cfg) {
    var svg = document.getElementById(svgId);
    if (!svg) return;
    var m = { xmin: -0.45, xmax: 1.45, ymin: -0.45, ymax: 1.45, L: 50, R: 246, B: 200, T: 16 };
    function mx(x) {
      return m.L + ((x - m.xmin) / (m.xmax - m.xmin)) * (m.R - m.L);
    }
    function my(y) {
      return m.B - ((y - m.ymin) / (m.ymax - m.ymin)) * (m.B - m.T);
    }
    var rect = [
      { x: m.xmin, y: m.ymin },
      { x: m.xmax, y: m.ymin },
      { x: m.xmax, y: m.ymax },
      { x: m.xmin, y: m.ymax },
    ];
    // fondo base
    svg.appendChild(svgEl('rect', { x: m.L, y: m.T, width: m.R - m.L, height: m.B - m.T, fill: cfg.baseColor || 'rgba(120,116,108,0.05)' }));
    // región resaltada (intersección de restricciones)
    if (cfg.overlay) {
      var poly = rect.slice();
      cfg.overlay.cons.forEach(function (c) {
        poly = clipPoly(poly, c[0], c[1], c[2]);
      });
      if (poly.length) {
        var pts = poly
          .map(function (p) {
            return mx(p.x).toFixed(1) + ',' + my(p.y).toFixed(1);
          })
          .join(' ');
        svg.appendChild(svgEl('polygon', { points: pts, fill: cfg.overlay.color }));
      }
    }
    // marca de agua
    if (cfg.watermark) {
      var wm = svgEl('text', { x: (m.L + m.R) / 2, y: (m.T + m.B) / 2 + 16, 'font-size': 46, fill: 'rgba(120,116,108,0.12)', 'text-anchor': 'middle' });
      wm.textContent = cfg.watermark;
      svg.appendChild(wm);
    }
    // rectas de decisión
    (cfg.lines || []).forEach(function (ln) {
      var a = ln[0],
        b = ln[1],
        c = ln[2],
        p1,
        p2;
      if (Math.abs(b) > 1e-9) {
        p1 = { x: m.xmin, y: -(a * m.xmin + c) / b };
        p2 = { x: m.xmax, y: -(a * m.xmax + c) / b };
      } else {
        p1 = { x: -c / a, y: m.ymin };
        p2 = { x: -c / a, y: m.ymax };
      }
      var attrs = { x1: mx(p1.x), y1: my(p1.y), x2: mx(p2.x), y2: my(p2.y), stroke: ln[3] || '#4f88e6', 'stroke-width': 3, 'stroke-linecap': 'round' };
      if (ln[4]) attrs['stroke-dasharray'] = ln[4];
      svg.appendChild(svgEl('line', attrs));
    });
    // ejes
    svg.appendChild(svgEl('line', { x1: m.L, y1: m.B, x2: m.R + 8, y2: m.B, stroke: '#9b97a3', 'stroke-width': 2 }));
    svg.appendChild(svgEl('line', { x1: m.L, y1: m.B, x2: m.L, y2: m.T - 2, stroke: '#9b97a3', 'stroke-width': 2 }));
    // marcas 0 y 1
    [0, 1].forEach(function (t) {
      var lx = svgEl('text', { x: mx(t), y: m.B + 18, 'font-size': 12, fill: '#6f6b78', 'text-anchor': 'middle' });
      lx.textContent = t;
      svg.appendChild(lx);
      var ly = svgEl('text', { x: m.L - 13, y: my(t) + 4, 'font-size': 12, fill: '#6f6b78', 'text-anchor': 'middle' });
      ly.textContent = t;
      svg.appendChild(ly);
    });
    var ax = svgEl('text', { x: m.R + 4, y: m.B + 18, 'font-size': 13, fill: '#4f88e6' });
    ax.textContent = 'x₁';
    svg.appendChild(ax);
    var ay = svgEl('text', { x: m.L - 32, y: m.T + 8, 'font-size': 13, fill: '#e9962f' });
    ay.textContent = 'x₂';
    svg.appendChild(ay);
    // puntos
    (cfg.points || []).forEach(function (p) {
      svg.appendChild(svgEl('circle', { cx: mx(p.x1), cy: my(p.x2), r: 9, fill: p.val ? '#2bae7e' : '#e8543f', stroke: '#fff', 'stroke-width': 2 }));
    });
  }

  /* ---------- Diagrama de neurona para una compuerta ---------- */
  function drawNeuron(svg, cy, cfg) {
    var ix = 36,
      bx = 96,
      ncx = 196,
      nr = 40,
      ox = 268;
    var rows = [
      { y: cy - 52, label: '1', w: cfg.b, fill: '#e3f3ea', stroke: '#2bae7e' },
      { y: cy, label: 'x₁', w: cfg.w1, fill: '#e6f1fb', stroke: '#4f88e6' },
      { y: cy + 52, label: 'x₂', w: cfg.w2, fill: '#fbeede', stroke: '#e9962f' },
    ];
    rows.forEach(function (r) {
      // conexión punteada
      svg.appendChild(svgEl('line', { x1: ix + 16, y1: r.y, x2: ncx - nr, y2: cy, stroke: '#bdb9ae', 'stroke-width': 2, 'stroke-dasharray': '2 4', 'stroke-linecap': 'round' }));
      // nodo de entrada
      svg.appendChild(svgEl('circle', { cx: ix, cy: r.y, r: 15, fill: r.fill, stroke: r.stroke, 'stroke-width': 2.5 }));
      var lt = svgEl('text', { x: ix, y: r.y + 4, 'font-size': 12, fill: '#3b3743', 'text-anchor': 'middle' });
      lt.textContent = r.label;
      svg.appendChild(lt);
      // caja de peso
      svg.appendChild(svgEl('rect', { x: bx - 15, y: r.y - 13, width: 30, height: 26, rx: 4, fill: '#fff', stroke: '#9b97a3', 'stroke-width': 1.5 }));
      var wt = svgEl('text', { x: bx, y: r.y + 4, 'font-size': 12, fill: '#3b3743', 'text-anchor': 'middle' });
      wt.textContent = r.w;
      svg.appendChild(wt);
    });
    // cuerpo de la neurona
    svg.appendChild(svgEl('circle', { cx: ncx, cy: cy, r: nr, fill: '#fde9c8', stroke: '#3b3743', 'stroke-width': 2.5 }));
    var fm = svgEl('text', { x: ncx, y: cy + 4, 'font-size': 12.5, fill: '#3b3743', 'text-anchor': 'middle' });
    fm.textContent = cfg.formula;
    svg.appendChild(fm);
    // salida
    svg.appendChild(svgEl('line', { x1: ncx + nr, y1: cy, x2: ox - 14, y2: cy, stroke: '#bdb9ae', 'stroke-width': 2, 'stroke-dasharray': '2 4' }));
    svg.appendChild(svgEl('circle', { cx: ox, cy: cy, r: 14, fill: '#fbeaf0', stroke: '#d4537e', 'stroke-width': 2.5 }));
    var ot = svgEl('text', { x: ox, y: cy + 4, 'font-size': 11, fill: '#3b3743', 'text-anchor': 'middle' });
    ot.textContent = cfg.out || 'y';
    svg.appendChild(ot);
  }
  function buildGateNeuron(svgId, cfg) {
    var svg = document.getElementById(svgId);
    if (!svg) return;
    drawNeuron(svg, 95, cfg);
  }
  function buildGateNeuron2(svgId, c1, c2) {
    var svg = document.getElementById(svgId);
    if (!svg) return;
    drawNeuron(svg, 92, c1);
    drawNeuron(svg, 250, c2);
  }

  /* ---------- Diagrama de capas (entrada / ocultas / salida) ---------- */
  function buildLayers(svgId) {
    var svg = document.getElementById(svgId);
    if (!svg) return;
    var cols = [
      { x: 95, fill: '#eceae3', stroke: '#9b97a3', tag: T('layerPrev'), name: T('layerInput') },
      { x: 240, fill: '#fde9c8', stroke: '#e9962f', tag: T('layerCurr'), name: T('layerHidden') },
      { x: 385, fill: '#eceae3', stroke: '#9b97a3', tag: T('layerNext'), name: T('layerOutput') },
    ];
    var ys = [92, 158];
    // conexiones entre columnas
    for (var c = 0; c < 2; c++) {
      ys.forEach(function (y1) {
        ys.forEach(function (y2) {
          svg.appendChild(svgEl('line', { x1: cols[c].x + 22, y1: y1, x2: cols[c + 1].x - 22, y2: y2, stroke: '#cbc7bd', 'stroke-width': 1.6 }));
        });
      });
    }
    cols.forEach(function (col) {
      // recuadro punteado
      svg.appendChild(svgEl('rect', { x: col.x - 40, y: 58, width: 80, height: 134, rx: 8, fill: 'none', stroke: '#bdb9ae', 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }));
      ys.forEach(function (y) {
        svg.appendChild(svgEl('circle', { cx: col.x, cy: y, r: 21, fill: col.fill, stroke: col.stroke, 'stroke-width': 2.5 }));
      });
      var tag = svgEl('text', { x: col.x, y: 208, 'font-size': 11, fill: '#9b97a3', 'text-anchor': 'middle', 'letter-spacing': '1' });
      tag.textContent = col.tag;
      svg.appendChild(tag);
      var nm = svgEl('text', { x: col.x, y: 234, 'font-size': 13, fill: '#3b3743', 'text-anchor': 'middle', 'letter-spacing': '1.5' });
      nm.textContent = col.name;
      svg.appendChild(nm);
    });
  }

  /* ---------- Helpers para gráficos nuevos ---------- */
  function txt(svg, x, y, str, size, fill, anchor) {
    var t = svgEl('text', { x: x, y: y, 'font-size': size || 12, fill: fill || '#3b3743', 'text-anchor': anchor || 'middle' });
    t.textContent = str;
    svg.appendChild(t);
    return t;
  }
  function vir(t) {
    t = Math.max(0, Math.min(1, t));
    if (t < 0.25) return '#39477e';
    if (t < 0.45) return '#2c7a93';
    if (t < 0.62) return '#2f9e8f';
    if (t < 0.8) return '#7cc24a';
    return '#ecdf3f';
  }
  function arrow(svg, x1, y1, x2, y2, col, w) {
    svg.appendChild(svgEl('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: col, 'stroke-width': w || 2, 'stroke-linecap': 'round' }));
    var ang = Math.atan2(y2 - y1, x2 - x1),
      a = 7;
    var p = mx2(x2, y2) + ' ' + (x2 - a * Math.cos(ang - 0.5)) + ',' + (y2 - a * Math.sin(ang - 0.5)) + ' ' + (x2 - a * Math.cos(ang + 0.5)) + ',' + (y2 - a * Math.sin(ang + 0.5));
    svg.appendChild(svgEl('polygon', { points: p, fill: col }));
  }
  function mx2(x, y) { return x + ',' + y; }

  /* ---------- Superficie 3D del error (descenso del gradiente, capítulo 8) ---------- */
  function buildGradientSurface(svgId) {
    var svg = document.getElementById(svgId);
    if (!svg) return;
    var N = 12, ox = 185, oy = 58;
    function hgt(i, j) {
      var u = (i / N - 0.5) * 4, v = (j / N - 0.5) * 4;
      return 42 - (u * u + v * v) * 1.0 + Math.sin(u * 1.7) * Math.cos(v * 1.5) * 8 + Math.cos(u * 0.9 + v * 1.1) * 6;
    }
    function proj(i, j) { var h = hgt(i, j); return [ox + (i - j) * 11.5, oy + (i + j) * 6.2 - h]; }
    var minH = 1e9, maxH = -1e9;
    for (var a = 0; a <= N; a++) for (var b = 0; b <= N; b++) { var h = hgt(a, b); if (h < minH) minH = h; if (h > maxH) maxH = h; }
    var minI = 0, minJ = 0, mv = 1e9;
    for (var j = 0; j < N; j++) {
      for (var i = 0; i < N; i++) {
        var p0 = proj(i, j), p1 = proj(i + 1, j), p2 = proj(i + 1, j + 1), p3 = proj(i, j + 1);
        var avg = (hgt(i, j) + hgt(i + 1, j) + hgt(i + 1, j + 1) + hgt(i, j + 1)) / 4;
        if (avg < mv) { mv = avg; minI = i; minJ = j; }
        svg.appendChild(svgEl('polygon', { points: p0[0].toFixed(1) + ',' + p0[1].toFixed(1) + ' ' + p1[0].toFixed(1) + ',' + p1[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1) + ' ' + p3[0].toFixed(1) + ',' + p3[1].toFixed(1), fill: vir((avg - minH) / (maxH - minH)), stroke: 'rgba(255,255,255,0.28)', 'stroke-width': 0.5 }));
      }
    }
    var bp = proj(minI + 0.5, minJ + 0.5);
    arrow(svg, bp[0], bp[1] - 42, bp[0] - 6, bp[1] - 6, '#222', 2.5);
    svg.appendChild(svgEl('circle', { cx: bp[0], cy: bp[1] - 4, r: 6, fill: '#222' }));
    txt(svg, ox, 22, 'θ := θ − ∇f', 19, '#3b3743');
  }

  /* ---------- Reparto de responsabilidades en backpropagation (capítulo 8) ---------- */
  function buildBackpropResp(svgId) {
    var svg = document.getElementById(svgId);
    if (!svg) return;
    var inX = 70, hX = 235, outX = 400;
    var inY = [85, 165], hY = [50, 125, 200], resp = [0.28, 0.9, 0.18];
    inY.forEach(function (y1) { hY.forEach(function (y2) { svg.appendChild(svgEl('line', { x1: inX + 16, y1: y1, x2: hX - 24, y2: y2, stroke: '#e7e3d8', 'stroke-width': 1.4 })); }); });
    hY.forEach(function (y1) { svg.appendChild(svgEl('line', { x1: hX + 24, y1: y1, x2: outX - 18, y2: 125, stroke: '#e7e3d8', 'stroke-width': 1.4 })); });
    // flechas de error hacia atrás (salida -> ocultas), grosor por responsabilidad
    hY.forEach(function (y, i) {
      var col = resp[i] > 0.6 ? '#e8543f' : '#e9962f';
      arrow(svg, outX - 18, 125, hX + 24, y, col, 1.5 + resp[i] * 5);
    });
    inY.forEach(function (y) { svg.appendChild(svgEl('circle', { cx: inX, cy: y, r: 16, fill: '#eceae3', stroke: '#9b97a3', 'stroke-width': 2.5 })); });
    hY.forEach(function (y, i) {
      var r = 16 + resp[i] * 14;
      var fill = resp[i] > 0.6 ? '#f6b4a8' : '#fde9c8';
      var stroke = resp[i] > 0.6 ? '#e8543f' : '#e9962f';
      svg.appendChild(svgEl('circle', { cx: hX, cy: y, r: r, fill: fill, stroke: stroke, 'stroke-width': 2.5 }));
      txt(svg, hX, y + 4, 'δ' + (i + 1), 12, '#3b3743');
    });
    svg.appendChild(svgEl('circle', { cx: outX, cy: 125, r: 20, fill: '#e8543f', stroke: '#a3291b', 'stroke-width': 2.5 }));
    txt(svg, outX, 129, T('respError'), 11, '#fff');
    txt(svg, hX, 235, T('respHidden'), 12, '#6f6b78');
    txt(svg, outX, 235, T('respOutput'), 12, '#6f6b78');
    txt(svg, inX, 235, T('respInput'), 12, '#6f6b78');
  }

  /* ---------- Construcción de figuras de los capítulos ---------- */
  try {
  buildScatter();
  buildNeuron();
  buildRegTool();

  // Compuertas AND y OR (capítulo 5)
  buildGateNeuron('neuron-and', { b: '−3', w1: '2', w2: '2', formula: '2x₁+2x₂−3', out: 'y' });
  buildGatePlot('plot-and', {
    baseColor: 'rgba(232,84,63,0.10)',
    overlay: { cons: [[2, 2, -3]], color: 'rgba(43,174,126,0.18)' },
    lines: [[2, 2, -3, '#4f88e6']],
    watermark: 'AND',
    points: [
      { x1: 0, x2: 0, val: 0 },
      { x1: 0, x2: 1, val: 0 },
      { x1: 1, x2: 0, val: 0 },
      { x1: 1, x2: 1, val: 1 },
    ],
  });
  buildGateNeuron('neuron-or', { b: '−1', w1: '2', w2: '2', formula: '2x₁+2x₂−1', out: 'y' });
  buildGatePlot('plot-or', {
    baseColor: 'rgba(232,84,63,0.10)',
    overlay: { cons: [[2, 2, -1]], color: 'rgba(43,174,126,0.18)' },
    lines: [[2, 2, -1, '#4f88e6']],
    watermark: 'OR',
    points: [
      { x1: 0, x2: 0, val: 0 },
      { x1: 0, x2: 1, val: 1 },
      { x1: 1, x2: 0, val: 1 },
      { x1: 1, x2: 1, val: 1 },
    ],
  });

  // XOR imposible (capítulo 6)
  buildGatePlot('plot-xor', {
    baseColor: 'rgba(120,116,108,0.05)',
    lines: [[1, 1, -1, '#e8543f', '6 5']],
    watermark: 'XOR',
    points: [
      { x1: 0, x2: 0, val: 1 },
      { x1: 0, x2: 1, val: 0 },
      { x1: 1, x2: 0, val: 0 },
      { x1: 1, x2: 1, val: 1 },
    ],
  });

  // XOR resuelto con dos neuronas (capítulo 7)
  buildGateNeuron2(
    'neuron-xor',
    { b: '−1', w1: '2', w2: '2', formula: '2x₁+2x₂−1', out: 'h₁' },
    { b: '−3', w1: '2', w2: '2', formula: '2x₁+2x₂−3', out: 'h₂' }
  );
  buildGatePlot('plot-xor2', {
    baseColor: 'rgba(43,174,126,0.18)',
    overlay: { cons: [[1, 1, -0.5], [-1, -1, 1.5]], color: 'rgba(232,84,63,0.16)' },
    lines: [[2, 2, -1, '#4f88e6'], [2, 2, -3, '#8f6fd1']],
    watermark: 'XOR',
    points: [
      { x1: 0, x2: 0, val: 1 },
      { x1: 0, x2: 1, val: 0 },
      { x1: 1, x2: 0, val: 0 },
      { x1: 1, x2: 1, val: 1 },
    ],
  });

  buildLayers('layers-diagram');

  // Gráficos nuevos (descenso de gradiente, backpropagation)
  buildGradientSurface('gradient-surface');
  buildBackpropResp('backprop-resp');
  buildReferencias();
  } catch (err) {
    if (window.console && console.error) console.error('Figuras:', err);
  }

  /* ---------- Tabla de referencias (página 11), generada desde papers.js ---------- */
  function buildReferencias() {
    var tbody = document.getElementById('papers-tbody');
    if (!tbody || !window.PAPERS) return;
    var html = '';
    window.PAPERS.forEach(function (p) {
      // Cada entrada trae su versión en inglés en p.en (ver papers.js).
      var r = LANG === 'en' && p.en ? p.en : p;
      html += '<tr>' +
        '<td><strong>' + r.factor + '</strong><br><span class="term-desc">' + r.descripcion + '</span></td>' +
        '<td><a href="' + p.url + '" target="_blank" rel="noopener">' + r.paper + '</a></td>' +
        '<td>' + r.fuente + '</td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
  }

  /* ---------- Animación de portada (canvas) ---------- */
  var TAU = Math.PI * 2;
  var PEEP_W = 302;
  var PEEP_H = 402;
  var PEEP_SCALE = 0.3;

  // Anillos: [radioX, cantidad] — idéntico al original.
  var RINGS = [
    [400, 20],
    [520, 25],
    [640, 30],
    [760, 35],
  ];

  var canvas = document.getElementById('splash-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var img = new Image();
  var imgReady = false;
  img.onload = function () {
    imgReady = true;
  };
  img.src = 'assets/basic_peep.png';

  var peeps = [];
  var edges = [];
  var W = 0;
  var H = 0;
  var mouse = { x: -99999, y: -99999 };

  function build() {
    var rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    peeps = [];
    var cx = W / 2;
    var cy = H / 2;
    for (var r = 0; r < RINGS.length; r++) {
      var xRadius = RINGS[r][0];
      var count = RINGS[r][1];
      var yRadius = xRadius * (350 / 400);
      var increment = TAU / count + 0.0001;
      for (var angle = 0; angle < TAU; angle += increment) {
        var a = angle - TAU / 4;
        var x = cx + Math.cos(a) * xRadius;
        var y = cy + Math.sin(a) * yRadius;
        peeps.push({
          initX: x,
          initY: y,
          initRotation: (Math.random() - 0.5) * (Math.PI - 0.4),
          radius: 5 + Math.random() * 20,
          swing: 0.05 + Math.random() * 0.45,
          angle: Math.random() * TAU,
          speed: (0.05 + Math.random() * 0.95) / 60,
          flip: Math.random() < 0.5 ? -1 : 1,
          x: x,
          y: y,
        });
      }
    }

    edges = [];
    var r2 = 250 * 250;
    for (var p1 = 0; p1 < peeps.length; p1++) {
      for (var p2 = p1 + 1; p2 < peeps.length; p2++) {
        var ddx = peeps[p2].initX - peeps[p1].initX;
        var ddy = peeps[p2].initY - peeps[p1].initY;
        if (ddx * ddx + ddy * ddy < r2) edges.push([p1, p2]);
      }
    }
  }

  var last = performance.now();
  function frame(now) {
    var delta = Math.min((now - last) / (1000 / 60), 3);
    last = now;

    for (var k = 0; k < peeps.length; k++) {
      var p = peeps[k];
      p.angle += p.speed * delta;
      var x = p.initX + Math.cos(p.angle) * p.radius;
      var y = p.initY + Math.sin(p.angle) * p.radius;

      var dx = mouse.x - x;
      var dy = mouse.y - y;
      var rad = 200;
      var dist2 = dx * dx + dy * dy;
      if (dist2 < rad * rad) {
        var bulge = Math.sin(((rad - Math.sqrt(dist2)) / rad) * (TAU / 4)) * 50;
        var ba = Math.atan2(-dy, -dx);
        x += Math.cos(ba) * bulge;
        y += Math.sin(ba) * bulge;
      }
      p.x = x;
      p.y = y;
    }

    ctx.clearRect(0, 0, W, H);

    // aristas
    ctx.strokeStyle = 'rgba(138, 132, 120, 0.34)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var e = 0; e < edges.length; e++) {
      var na = peeps[edges[e][0]];
      var nb = peeps[edges[e][1]];
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
    }
    ctx.stroke();

    // peeps
    if (imgReady) {
      var dw = PEEP_W * PEEP_SCALE;
      var dh = PEEP_H * PEEP_SCALE;
      for (var m = 0; m < peeps.length; m++) {
        var q = peeps[m];
        var rot = q.initRotation + Math.cos(q.angle) * q.swing;
        ctx.save();
        ctx.translate(q.x, q.y);
        ctx.rotate(rot);
        ctx.scale(q.flip, 1);
        ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
        ctx.restore();
      }
    }

    requestAnimationFrame(frame);
  }

  build();
  requestAnimationFrame(frame);

  window.addEventListener('mousemove', function (ev) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = ev.clientX - rect.left;
    mouse.y = ev.clientY - rect.top;
  });
  window.addEventListener('mouseout', function () {
    mouse.x = -99999;
    mouse.y = -99999;
  });
  if (window.ResizeObserver) {
    new ResizeObserver(function () {
      if (canvas.clientWidth && canvas.clientHeight) build();
    }).observe(canvas);
  } else {
    window.addEventListener('resize', build);
    document.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-goto="splash"]')) build();
    });
  }
})();
