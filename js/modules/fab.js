/*
 * Botón flotante de WhatsApp.
 * Se oculta mientras haya otro CTA de WhatsApp visible ([data-fab-hide]),
 * para no duplicar la acción en pantalla. Sin JS permanece siempre visible.
 */
export function initFab() {
  const fab = document.querySelector('[data-fab]');
  if (!fab) return;

  const hiders = document.querySelectorAll('[data-fab-hide]');
  if (hiders.length === 0 || !('IntersectionObserver' in window)) {
    fab.classList.add('is-visible');
    return;
  }

  const inView = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        inView.add(entry.target);
      } else {
        inView.delete(entry.target);
      }
    });
    fab.classList.toggle('is-visible', inView.size === 0);
  });
  hiders.forEach((element) => observer.observe(element));
}
