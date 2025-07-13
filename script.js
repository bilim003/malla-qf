// script.js
const dependencies = {
  'Biologia celular': ['Morfologia'],
  'Quimica general 1': ['Quim general 2', 'Quim organica 1'],
  'Elementos de algebra': ['Fisica'],
  'Morfologia': ['Fisiologia'],
  'Quim general 2': ['Quim analitica', 'Fisicoquimica'],
  'Fisica': ['Fisicoquimica'],
  'Quimica organica 1': ['Quim organica 2'],
  'Fisiologia': ['Fisiopatologia', 'Bioquimica general'],
  'quimica organica 2': ['Bioquimica general', 'Farmacoquimica 1'],
  'fisicoquimica': ['Farmacocinetica'],
  'quimica analitica': ['Quimica analitica instrumental'],
  'Fisiopatologia': ['Salud publica 1', 'Farmacologia humana 1', 'Bioquimica clinica'],
  'Quimica analitica e instrumental': ['Farmacoquimica 1', 'Integrador 1'],
  'Bioquimica general': ['Microbiologia'],
  'Farmacocinetica': ['Farmacologia humana 1', 'Tecnologia farmaceutica'],
  'Salud publica 1': ['Farmacovigilancia', 'Salud publica 2'],
  'microbiologia': ['Biologia molecular', 'Tecnologia farmaceutica 2'],
  'farmacologia humana 1': ['Farmacologia humana 2', 'Botanica'],
  'farmacoquimica 1': ['Farmacoquimica 2', 'Botanica'],
  'Farmacologia humana 2': ['Farmacovigilancia', 'Farmacologia humana 3'],
  'Bioologia molecular': ['Bioquimica clinica'],
  'Farmacoquimica 2': ['Toxicologia clinica'],
  'botanica': ['Farmacologia humana 3'],
  'tecnologia farmaceutica 1': ['Tecnologia farmaceutica 2'],
  'Farmacovigilancia': ['Salud publica 2', 'Farmacia clinica'],
  'bioquimica clinica': ['Toxicologia clinica'],
  'farmacologia humana 3': ['Farmacia clinica'],
  'tecnologia farmaceutica 2': ['Tecnologia cosmetica'],
  'Salud publica 2': ['Farmacoeconomia', 'Administracion en salud'],
  'toxicologia clinica': ['Integrador 1'],
  'farmacia clinica': ['Farmacia clinica 2'],
  'tecnologia cosmetica': ['Integrador 1', 'Gestion y control de calidad'],
  'Farmacoeconomia': ['Gestion de recursos', 'Etica farmaceutica', 'Practica en farmacia comunitaria'],
  'administracion en salud': ['Etica farmaceutica', 'Gestion de recursos', 'Farmacia hospitalaria', 'Practica en farmacia comunitaria'],
  'integrador 1': ['Practica en farmacia comunitaria'],
  'farmacia clinica 2': ['Integrador 2', 'Farmacia hospitalaria', 'Practica en farmacia comunitaria'],
  'gestion y control de calidad': ['Practica en farmacia comunitaria']
};

const courses = Object.keys(dependencies).reduce((all, key) => {
  all.add(key);
  dependencies[key].forEach(d => all.add(d));
  return all;
}, new Set());

const approvedCourses = new Set();
const grid = document.getElementById('grid');

function createCourseElement(name) {
  const div = document.createElement('div');
  div.classList.add('course', 'locked');
  div.textContent = name;
  div.dataset.name = name;
  div.addEventListener('click', () => toggleCourse(name, div));
  return div;
}

function toggleCourse(name, element) {
  if (element.classList.contains('locked')) return;
  if (approvedCourses.has(name)) {
    approvedCourses.delete(name);
    element.classList.remove('approved');
  } else {
    approvedCourses.add(name);
    element.classList.add('approved');
  }
  updateCourses();
}

function updateCourses() {
  document.querySelectorAll('.course').forEach(el => {
    const name = el.dataset.name;
    if (!dependencies[name]) {
      el.classList.remove('locked');
      return;
    }
    const prereqs = Object.entries(dependencies).filter(([key, values]) => values.includes(name));
    const isUnlocked = prereqs.every(([prereq]) => approvedCourses.has(prereq));
    if (isUnlocked) el.classList.remove('locked');
    else el.classList.add('locked');
  });
}

[...courses].sort().forEach(name => {
  const el = createCourseElement(name);
  grid.appendChild(el);
});

updateCourses();

