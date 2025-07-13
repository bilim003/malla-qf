const semestres = [
  { anio: 1, semestre: 1, cursos: ['Biologia celular', 'Quimica general 1', 'Elementos de algebra', 'Intro'] },
  { anio: 1, semestre: 2, cursos: ['Morfologia', 'Quim general 2', 'Fisica', 'Quimica organica 1'] },
  { anio: 2, semestre: 1, cursos: ['Fisiologia', 'quimica organica 2', 'fisicoquimica', 'quimica analitica'] },
  { anio: 2, semestre: 2, cursos: ['Fisiopatologia', 'Quimica analitica e instrumental', 'Bioquimica general', 'Farmacocinetica'] },
  { anio: 3, semestre: 1, cursos: ['Salud publica 1', 'microbiologia', 'farmacologia humana 1', 'farmacoquimica 1'] },
  { anio: 3, semestre: 2, cursos: ['Farmacologia humana 2', 'Bioologia molecular', 'Farmacoquimica 2', 'botanica', 'tecnologia farmaceutica 1'] },
  { anio: 4, semestre: 1, cursos: ['Farmacovigilancia', 'bioquimica clinica', 'farmacologia humana 3', 'tecnologia farmaceutica 2'] },
  { anio: 4, semestre: 2, cursos: ['Salud publica 2', 'toxicologia clinica', 'farmacia clinica', 'tecnologia cosmetica'] },
  { anio: 5, semestre: 1, cursos: ['Farmacoeconomia', 'administracion en salud', 'integrador 1', 'farmacia clinica 2', 'gestion y control de calidad'] },
  { anio: 5, semestre: 2, cursos: ['Gestion de recursos', 'Etica farmaceutica', 'Farmacia hospitalaria', 'Integrador 2', 'Practica en farmacia comunitaria'] },
];

const dependencies = {
  'Biologia celular': ['Morfologia'],
  'Quimica general 1': ['Quim general 2', 'Quimica organica 1'],
  'Elementos de algebra': ['Fisica'],
  'Morfologia': ['Fisiologia'],
  'Quim general 2': ['Quimica analitica', 'fisicoquimica'],
  'Fisica': ['fisicoquimica'],
  'Quimica organica 1': ['quimica organica 2'],
  'Fisiologia': ['Fisiopatologia', 'Bioquimica general'],
  'quimica organica 2': ['Bioquimica general', 'farmacoquimica 1'],
  'fisicoquimica': ['Farmacocinetica'],
  'quimica analitica': ['Quimica analitica e instrumental'],
  'Fisiopatologia': ['Salud publica 1', 'farmacologia humana 1', 'bioquimica clinica'],
  'Quimica analitica e instrumental': ['farmacoquimica 1', 'integrador 1'],
  'Bioquimica general': ['microbiologia'],
  'Farmacocinetica': ['farmacologia humana 1', 'tecnologia farmaceutica 1'],
  'Salud publica 1': ['Farmacovigilancia', 'Salud publica 2'],
  'microbiologia': ['Bioologia molecular', 'tecnologia farmaceutica 2'],
  'farmacologia humana 1': ['farmacologia humana 2', 'botanica'],
  'farmacoquimica 1': ['Farmacoquimica 2', 'botanica'],
  'Farmacologia humana 2': ['Farmacovigilancia', 'farmacologia humana 3'],
  'Bioologia molecular': ['bioquimica clinica'],
  'Farmacoquimica 2': ['toxicologia clinica'],
  'botanica': ['farmacologia humana 3'],
  'tecnologia farmaceutica 1': ['tecnologia farmaceutica 2'],
  'Farmacovigilancia': ['Salud publica 2', 'farmacia clinica'],
  'bioquimica clinica': ['toxicologia clinica'],
  'farmacologia humana 3': ['farmacia clinica'],
  'tecnologia farmaceutica 2': ['tecnologia cosmetica'],
  'Salud publica 2': ['Farmacoeconomia', 'administracion en salud'],
  'toxicologia clinica': ['integrador 1'],
  'farmacia clinica': ['farmacia clinica 2'],
  'tecnologia cosmetica': ['integrador 1', 'gestion y control de calidad'],
  'Farmacoeconomia': ['Gestion de recursos', 'Etica farmaceutica', 'Practica en farmacia comunitaria'],
  'administracion en salud': ['Etica farmaceutica', 'Gestion de recursos', 'Farmacia hospitalaria', 'Practica en farmacia comunitaria'],
  'integrador 1': ['Practica en farmacia comunitaria'],
  'farmacia clinica 2': ['Integrador 2', 'Farmacia hospitalaria', 'Practica en farmacia comunitaria'],
  'gestion y control de calidad': ['Practica en farmacia comunitaria'],
};

const approvedCourses = new Set();

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
    // Un curso está desbloqueado si todos sus prerequisitos están aprobados
    const prereqs = Object.entries(dependencies)
      .filter(([, unlocks]) => unlocks.includes(name))
      .map(([prereq]) => prereq);

    const isUnlocked = prereqs.every(prereq => approvedCourses.has(prereq));
    // Si no tiene prerequisitos, está desbloqueado
    if (prereqs.length === 0) {
      el.classList.remove('locked');
    } else if (isUnlocked) {
      el.classList.remove('locked');
    } else {
      el.classList.add('locked');
      el.classList.remove('approved'); // Si está bloqueado, no puede estar aprobado
      approvedCourses.delete(name);
    }
  });
}

const container = document.getElementById('malla-container');

// Agrupamos semestres por año
const semestresPorAnio = semestres.reduce((acc, sem) => {
  if (!acc[sem.anio]) acc[sem.anio] = [];
  acc[sem.anio].push(sem);
  return acc;
}, {});

for (const anio in semestresPorAnio) {
  // Crear contenedor del año
  const anioDiv = document.createElement('div');
  anioDiv.className = 'anio';
  
  // Título del año
  const anioTitle = document.createElement('h2');
  anioTitle.textContent = `${anio}º Año`;
  anioDiv.appendChild(anioTitle);

  // Contenedor fila semestres
  const semestresRow = document.createElement('div');
  semestresRow.className = 'semestres-row';

  // Añadir cada semestre del año
  semestresPorAnio[anio].forEach(({ semestre, cursos }) => {
    const semDiv = document.createElement('div');
    semDiv.className = 'semestre';

    const semTitle = document.createElement('h3');
    semTitle.textContent = `${semestre}º Semestre`;
    semDiv.appendChild(semTitle);

    const grid = document.createElement('div');
    grid.className = 'grid';

    cursos.forEach(curso => {
      grid.appendChild(createCourseElement(curso));
    });

    semDiv.appendChild(grid);
    semestresRow.appendChild(semDiv);
  });

  anioDiv.appendChild(semestresRow);
  container.appendChild(anioDiv);
}

updateCourses();
