// ✅ visual-pro.js

const paneles = [
  "estrategia1", "estrategia2", "estrategia3",
  "estrategia4", "estrategia5", "estrategia6"
];

document.addEventListener("DOMContentLoaded", () => {
  paneles.forEach(panel => {
    initPanel(panel);
  });
});

function initPanel(panel) {
  const rangoSelect = document.getElementById(`rango-${panel}`);
  const form = document.querySelector(`.form-inscripcion[data-panel="${panel}"]`);

  if (rangoSelect) {
    rangoSelect.addEventListener("change", () => actualizarVisual(panel));
  }

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      inscribir(panel, form);
    });
  }

  actualizarVisual(panel);
}

function inscribir(panel, form) {
  const nombre = form.nombre.value.trim();
  const ov = parseInt(form.ov.value);
  if (!nombre || isNaN(ov)) return;

  const inscritos = getInscritos(panel);
  const rango = getRangoActual(panel);
  const estructura = estructurasBase?.[panel]?.[rango] || [];

  if (inscritos.length < estructura.length) {
    inscritos.push({ nombre, ov });
    setInscritos(panel, inscritos);
    actualizarVisual(panel);
    form.reset();
  }
}

function getInscritos(panel) {
  const data = localStorage.getItem(`inscritos-${panel}`);
  return data ? JSON.parse(data) : [];
}

function setInscritos(panel, data) {
  localStorage.setItem(`inscritos-${panel}`, JSON.stringify(data));
}

function getRangoActual(panel) {
  const select = document.getElementById(`rango-${panel}`);
  return select ? select.value : "elite";
}

function actualizarVisual(panel) {
  const rango = getRangoActual(panel);
  const recoDiv = document.getElementById(`recomendacion-${panel}`);
  const estructuraDiv = document.getElementById(`estructura-${panel}`);
  const inscritosDiv = document.getElementById(`inscritos-${panel}`);
  const progresoDiv = document.getElementById(`progreso-${panel}`);

  const inscritos = getInscritos(panel);
  const estructura = estructurasBase?.[panel]?.[rango] || [];

  if (inscritosDiv) {
    inscritosDiv.innerHTML = '<ul>' + inscritos.map((insc, i) => `
      <li>${insc.nombre} (${insc.ov} OV)
        <button onclick="editarInscrito('${panel}', ${i})">✏️</button>
        <button onclick="eliminarInscrito('${panel}', ${i})">🗑️</button>
      </li>`).join('') + '</ul>';
  }

  if (estructuraDiv) {
    estructuraDiv.innerHTML = estructura.map((nodo, i) => {
      const nivel = (nodo.texto.match(/└|├|   /g) || []).length;
      const clase = `nodo nivel-${nivel} ${nodo.clase}`;
      const inscrito = inscritos[i] ? `<span class="nombre">(${inscritos[i].nombre})</span>` : '';
      return `<div class="${clase}">${nodo.texto} ${inscrito}</div>`;
    }).join('');
  }

  if (recoDiv) {
    const estrategia = estrategiasBase?.[panel] || {};
    recoDiv.innerHTML = `
      <h3>🧠 ${estrategia.nombre || panel}</h3>
      <p><strong>Rango:</strong> ${rango.toUpperCase()} (${inscritos.length} inscritos)</p>
      ${estrategia.descripcion || ""}
    `;
  }

  if (progresoDiv) {
    const totalOV = inscritos.reduce((acc, cur) => acc + cur.ov, 0);
    const metaOV = getMetaOV(rango);
    progresoDiv.innerHTML = `
      <h3>Progreso Power of 3</h3>
      <p>Total OV: ${totalOV} / ${metaOV}</p>
      <progress max="${metaOV}" value="${totalOV}"></progress>
    `;
  }
}

function getMetaOV(rango) {
  switch (rango) {
    case "elite": return 3000;
    case "silver": return 9000;
    case "gold": return 15000;
    case "platinum": return 27000;
    case "diamond": return 36000;
    case "blue": return 50000;
    case "presidential": return 70000;
    default: return 3000;
  }
}

function eliminarInscrito(panel, index) {
  const inscritos = getInscritos(panel);
  inscritos.splice(index, 1);
  setInscritos(panel, inscritos);
  actualizarVisual(panel);
}

function editarInscrito(panel, index) {
  const inscritos = getInscritos(panel);
  const nuevoNombre = prompt("Nuevo nombre:", inscritos[index].nombre);
  const nuevoOV = parseInt(prompt("Nuevo OV:", inscritos[index].ov));
  if (nuevoNombre && !isNaN(nuevoOV)) {
    inscritos[index] = { nombre: nuevoNombre.trim(), ov: nuevoOV };
    setInscritos(panel, inscritos);
    actualizarVisual(panel);
  }
}

function resetPanel(panel) {
  localStorage.removeItem(`inscritos-${panel}`);
  actualizarVisual(panel);
}
function toggleTooltip(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === "block" ? "none" : "block";
}
