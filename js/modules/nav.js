/*
 * Navegación: estado del header al hacer scroll, menú móvil y enlace activo.
 * Todo con IntersectionObserver o eventos puntuales; sin escuchar scroll continuo.
 */
const DESKTOP_QUERY = '(min-width: 75em)';

export function initNav() {
  initHeaderState();
  initMobileMenu();
  initActiveLink();
}

/* Marca el header cuando la página ya no está en el tope (borde y fondo translúcido) */
function initHeaderState() {
  const header = document.querySelector('[data-header]');
  const sentinel = document.querySelector('.scroll-sentinel');
  if (!header || !sentinel || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(([entry]) => {
    header.toggleAttribute('data-scrolled', !entry.isIntersecting);
  });
  observer.observe(sentinel);
}

function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  const desktop = window.matchMedia(DESKTOP_QUERY);

  const setOpen = (open, { returnFocus = false } = {}) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);

    if (open) {
      // Lleva el foco al primer enlace para que el teclado entre al panel
      const firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  };

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Cerrar al elegir un enlace; el navegador continúa con el salto a la sección
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a') && isOpen()) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setOpen(false, { returnFocus: true });
  });

  // Cerrar al tocar fuera del header
  document.addEventListener('click', (event) => {
    if (isOpen() && !event.target.closest('[data-header]')) setOpen(false);
  });

  // Al pasar a escritorio el panel deja de ser desplegable: se restablece el estado
  desktop.addEventListener('change', (event) => {
    if (event.matches && isOpen()) setOpen(false);
  });
}

/* Resalta en el menú la sección que ocupa la zona central de la pantalla */
function initActiveLink() {
  if (!('IntersectionObserver' in window)) return;

  const links = [...document.querySelectorAll('[data-nav] a[href^="#"]')];
  const sectionsById = new Map();
  links.forEach((link) => {
    const section = document.getElementById(link.getAttribute('href').slice(1));
    if (section) sectionsById.set(section.id, section);
  });
  if (sectionsById.size === 0) return;

  const setCurrent = (id) => {
    links.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  // Banda estrecha cerca del centro: la sección que la cruza es la "actual"
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sectionsById.forEach((section) => observer.observe(section));

  // Al volver al hero no hay enlace activo
  const hero = document.getElementById('inicio');
  if (hero) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCurrent('');
      },
      { rootMargin: '-45% 0px -50% 0px' }
    ).observe(hero);
  }
}
