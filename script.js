const projects = {
  talon: {
    number: '01', title: 'Star Talon', kind: 'QA / GAMEPLAY ANALYSIS', year: 'PROFESSIONAL QA',
    description: 'A focused testing case study built around player clarity, issue reproduction, and the small details that shape a better play session.',
    tags: ['QA testing', 'Bug reporting', 'Player experience']
  },
  troc: {
    number: '02', title: 'The Reaper Of Choices', kind: 'SYSTEMS / PROTOTYPING', year: 'IN DEVELOPMENT',
    description: 'An independent game project exploring the relationship between exploration, reward, and player-led discovery.',
    tags: ['Player Choice', 'Narrative', 'Branching Paths']
  },
  signal: {
    number: '03', title: 'Signal / Noise', kind: 'UX / FEATURE DESIGN', year: 'CONCEPT STUDY',
    description: 'A systems-forward concept study about translating complex feature logic into readable, actionable player feedback.',
    tags: ['Gameplay UX', 'Documentation', 'Iteration']
  }
};

const modalBackdrop = document.querySelector('#modal-backdrop');
const profileBackdrop = document.querySelector('#profile-backdrop');
const body = document.body;

function openProject(key) {
  const project = projects[key];
  if (!project) return;
  document.querySelector('#modal-kicker').textContent = `PROJECT ${project.number} / ${project.year}`;
  document.querySelector('#modal-title').textContent = project.title;
  document.querySelector('#modal-kind').textContent = project.kind;
  document.querySelector('#modal-description').textContent = project.description;
  document.querySelector('#modal-tags').innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
  modalBackdrop.hidden = false;
  body.classList.add('dialog-open');
  document.querySelector('[data-close]')?.focus();
}

function closeProject() {
  modalBackdrop.hidden = true;
  body.classList.remove('dialog-open');
}

function openProfile() {
  profileBackdrop.hidden = false;
  body.classList.add('dialog-open');
  document.querySelector('[data-close-profile]')?.focus();
}

function closeProfile() {
  if (!profileBackdrop) return;
  profileBackdrop.hidden = true;
  body.classList.remove('dialog-open');
}

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => openProject(button.dataset.project));
});
document.querySelector('[data-profile]')?.addEventListener('click', openProfile);
document.querySelector('[data-close]')?.addEventListener('click', closeProject);
document.querySelector('[data-close-profile]')?.addEventListener('click', closeProfile);
modalBackdrop?.addEventListener('click', (event) => { if (event.target === modalBackdrop) closeProject(); });
profileBackdrop?.addEventListener('click', (event) => { if (event.target === profileBackdrop) closeProfile(); });
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeProject();
  closeProfile();
});

const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('span').textContent = isOpen ? '×' : '☰';
});
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.querySelector('span').textContent = '☰';
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
