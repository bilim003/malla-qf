// Los requisitos (igual que antes)
const requisitos = {
  "biologia-celular": [],
  "quimica-general-1": [],
  "elementos-algebra": [],
  "intro": [],

  "morfologia": ["biologia-celular"],
  "quim-general-2": ["quimica-general-1"],
  "fisica": ["elementos-algebra"],
  "quim-organica-1": ["quimica-general-1"],

  "fisiologia": ["morfologia"],
  "quim-organica-2": ["quim-organica-1", "quim-general-2"],
  "fisicoquimica": ["quim-general-2", "fisica"],
  "quimica-analitica": ["quim-general-2"],

  "fisiopatologia": ["fisiologia"],
  "quimica-analitica-instrumental": ["quimica-analitica"],
  "bioquimica-general": ["fisiologia", "quim-organica-2"],
  "farmacocinetica": ["fisicoquimica"],

  "salud-publica-1": ["fisiopatologia"],
  "microbiologia": ["bioquimica-general"],
  "farmacologia-humana-1": ["fisiopatologia", "farmacocinetica"], // corequisito: farmacoquimica-1
  "farmacoquimica-1": ["quim-organica-2", "quimica-analitica-instrumental"],

  "farmacologia-humana-2": ["farmacologia-humana-1", "farmacoquimica-2"], // corequisito farmacoquim 2
  "biologia-molecular": ["microbiologia"],
  "farmacoquimica-2": ["farmacoquimica-1"],
  "botanica": ["farmacologia-humana-1", "farmacoquimica-1"],
  "tecnologia-farmaceutica-1": ["farmacocinetica"],

  "farmacovigilancia": ["salud-publica-1", "farmacologia-humana-2"],
  "bioquimica-clinica": ["bioquimica-general"],
  "farmacologia-humana-3": ["farmacologia-humana-2", "botanica"],
  "tecnologia-farmaceutica-2": ["tecnologia-farmaceutica-1"],

  "salud-publica-2": ["farmacovigilancia"],
  "toxicologia-clinica": ["farmacologia-humana-3", "bioquimica-clinica"],
  "farmacia-clinica": ["farmacovigilancia", "farmacologia-humana-3"],
  "tecnologia-cosmetica": ["tecnologia-farmaceutica-2"],

  "gestion-control-calidad": ["tecnologia-cosmetica"],

  "farmacoeconomia": ["salud-publica-2"],
  "administracion-salud": ["salud-publica-2"],
  "integrador-1": ["quimica-analitica-instrumental", "toxicologia-clinica", "farmacia-clinica-2"],
  "farmacia-clinica-2": ["farmacia-clinica"],
  
  "gestion-recursos": ["farmacoeconomia", "administracion-salud"],
  "etica-farmaceutica": ["farmacoeconomia", "administracion-salud"],
  "farmacia-hospitalaria": ["administracion-salud"],
  "integrador-2": ["integrador-1"],
  "practica-farmacia-comunitaria": ["integrador-1"],
};

// Estado aprobado (set)
const aprobado = new Set();

// Inicializar: desbloquea todos (ya no bloqueamos)
function inicializar() {
  document.querySelectorAll('.course').forEach(el => {
    el.classList.remove('locked', 'approved');
  });
  aprobado.clear();
}

// Toggle sin bloquear otros ni comprobar requisitos
function toggleRamo(event) {
  const el = event.currentTarget;
  const id = el.id;
  if (aprobado.has(id)) {
    aprobado.delete(id);
    el.classList.remove('approved');
  } else {
    aprobado.add(id);
    el.classList.add('approved');
  }
}

// Setup
function setup() {
  inicializar();
  document.querySelectorAll('.course').forEach(el => {
    el.addEventListener('click', toggleRamo);
  });
}

window.onload = setup;
