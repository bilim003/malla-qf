const dependencias = {
  "morfologia": ["biologia-celular"],
  "quim-general-2": ["quimica-general-1"],
  "quim-organica-1": ["quimica-general-1"],
  "fisica": ["elementos-algebra"],
  "fisiologia": ["morfologia"],
  "quim-organica-2": ["quim-organica-1"],
  "quimica-analitica": ["quim-general-2"],
  "fisicoquimica": ["fisica", "quim-general-2"],
  "farmacocinetica": ["fisicoquimica"],
  "quimica-analitica-instrumental": ["quimica-analitica"],
  "bioquimica-general": ["quim-organica-2", "fisiologia"],
  "fisiopatologia": ["fisiologia"],
  "salud-publica-1": ["fisiopatologia"],
  "farmacologia-humana-1": ["fisiopatologia", "farmacocinetica"],
  "bioquimica-clinica": ["fisiopatologia", "biologia-molecular"],
  "farmacoquimica-1": ["quimica-analitica-instrumental"],
  "microbiologia": ["bioquimica-general"],
  "biologia-molecular": ["microbiologia"],
  "farmacoquimica-2": ["farmacoquimica-1"],
  "farmacologia-humana-2": ["farmacologia-humana-1"],
  "botanica": ["farmacoquimica-1", "farmacologia-humana-1"],
  "tecnologia-farmaceutica-2": ["tecnologia-farmaceutica-1", "microbiologia"],
  "farmacovigilancia": ["salud-publica-1", "farmacologia-humana-2"],
  "farmacologia-humana-3": ["botanica", "farmacologia-humana-2"],
  "toxicologia-clinica": ["farmacoquimica-2", "bioquimica-clinica"],
  "farmacia-clinica": ["farmacologia-humana-3", "farmacovigilancia", "bioquimica-clinica"],
  "salud-publica-2": ["farmacovigilancia"],
  "farmacoeconomia": ["salud-publica-2"],
  "administracion-salud": ["salud-publica-2"],
  "gestion-control-calidad": ["tecnologia-cosmetica"],
  "integrador-1": ["quimica-analitica-instrumental", "toxicologia-clinica", "tecnologia-cosmetica"],
  "farmacia-clinica-2": ["farmacia-clinica"],
  "gestion-recursos": ["farmacoeconomia", "administracion-salud"],
  "etica-farmaceutica": ["farmacoeconomia", "administracion-salud"],
  "farmacia-hospitalaria": ["administracion-salud", "farmacia-clinica-2"],
  "integrador-2": ["farmacia-clinica-2"],
  "practica-farmacia-comunitaria": [
    "farmacoeconomia",
    "administracion-salud",
    "integrador-1",
    "farmacia-clinica-2",
    "gestion-control-calidad"
  ]
};

function actualizarBloqueos() {
  document.querySelectorAll(".course").forEach(curso => {
    const id = curso.id;
    const requisitos = dependencias[id] || [];
    const aprobado = curso.classList.contains("aprobado");

    if (aprobado) {
      curso.classList.remove("bloqueado");
      return;
    }

    if (requisitos.length === 0) {
      curso.classList.remove("bloqueado");
    } else {
      const puedeDesbloquear = requisitos.every(req => {
        const reqElemento = document.getElementById(req);
        return reqElemento && reqElemento.classList.contains("aprobado");
      });
      if (puedeDesbloquear) {
        curso.classList.remove("bloqueado");
      } else {
        curso.classList.add("bloqueado");
      }
    }
  });
}

function toggleCurso(curso) {
  if (curso.classList.contains("bloqueado")) return;

  curso.classList.toggle("aprobado");
  actualizarBloqueos();
}

// Inicializar eventos y bloqueos
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".course").forEach(curso => {
    curso.addEventListener("click", () => toggleCurso(curso));
  });
  actualizarBloqueos();
});
