/*
 * Footer "revelado" (adaptación del Sticky Footer de Efferd UI).
 * El panel del footer queda fijo al fondo de la pantalla, detrás de la página, y el
 * contenedor <footer> reserva su alto y lo recorta (clip-path): al llegar al final,
 * la página se desliza hacia arriba y descubre el footer.
 * Solo se activa si el footer cabe entero bajo el header; si no (móvil, pantallas
 * bajas), queda como un footer normal. Sin JS también es un footer normal.
 */
export function initStickyFooter() {
  const footer = document.querySelector('[data-sticky-footer]');
  const panel = footer ? footer.querySelector('[data-sticky-footer-panel]') : null;
  if (!panel || !('ResizeObserver' in window)) return;

  const header = document.querySelector('[data-header]');

  const update = () => {
    const height = panel.offsetHeight;
    const available = window.innerHeight - (header ? header.offsetHeight : 0);
    footer.style.setProperty('--footer-h', `${height}px`);
    footer.classList.toggle('is-sticky', height <= available);
  };

  new ResizeObserver(update).observe(panel);

  // El panel fijo siempre "está" en pantalla; lo que se observa es el hueco que lo descubre
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        footer.classList.add('is-revealed');
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(footer);
  } else {
    footer.classList.add('is-revealed');
  }
  window.addEventListener('resize', update);
  update();
}
