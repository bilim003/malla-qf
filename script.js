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
  "farmacologia-humana-1": ["fisiopatologia", "farmacocinetica"],
  "farmacoquimica-1": ["quim-organica-2", "quimica-analitica-instrumental"],

  "farmacologia-humana-2": ["farmacologia-humana-1", "farmacoquimica-2"],
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

const desbloquea = {};
for (const [ramo, reqs] of Object.entries(requisitos)) {
  reqs.forEach(r => {
    if (!desbloquea[r]) desbloquea[r] = [];
    desbloquea[r].push(ramo);
  });
}

const aprobado = new Set();

function puedeDesbloquear(id) {
  const reqs = requisitos[id];
  return reqs.every(r => aprobado.has(r));
}

function bloquearRamo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('locked');
    el.classList.remove('approved');
  }
  aprobado.delete(id);
}

function desbloquearRamo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('locked');
  }
}

function aprobarRamo(id) {
  aprobado.add(id);
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('approved');
    el.classList.remove('locked');
  }
  if (desbloquea[id]) {
    desbloquea[id].forEach(hijo => {
      if (puedeDesbloquear(hijo)) desbloquearRamo(hijo);
    });
  }
}

function desmarcarRamo(id) {
  aprobado.delete(id);
  const el = document.getElementById(id);
  if (el) el.classList.remove('approved');
  if (desbloquea[id]) {
    desbloquea[id].forEach(hijo => {
      if (!puedeDesbloquear(hijo)) {
        bloquearRamo(hijo);
        desmarcarRamo(hijo);
      }
    });
  }
}

function toggleRamo(e) {
  const el = e.currentTarget;
  if (el.classList.contains('locked')) {
    alert('Este ramo está bloqueado. Debes aprobar primero sus requisitos.');
    return;
  }
  const id = el.id;
  if (aprobado.has(id)) {
    desmarcarRamo(id);
  } else {
    aprobarRamo(id);
  }
}

function inicializar() {
  document.querySelectorAll('.course').forEach(el => {
    const id = el.id;
    if (requisitos[id].length === 0) {
      desbloquearRamo(id);
    } else {
      bloquearRamo(id);
    }
  });
  aprobado.clear();
}

function setup() {
  inicializar();
  document.querySelectorAll('.course').forEach(el => {
    el.addEventListener('click', toggleRamo);
  });
}

window.onload = setup;
