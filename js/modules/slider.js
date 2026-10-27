/*
 * Slider de casos clínicos.
 * La base es scroll nativo con scroll-snap (táctil y teclado funcionan sin JS);
 * este módulo añade los botones anterior/siguiente y el contador.
 * No hay autoplay.
 */
export function initSlider() {
  document.querySelectorAll('[data-slider]').forEach(setupSlider);
}

function setupSlider(slider) {
  const track = slider.querySelector('[data-slider-track]');
  const prev = slider.querySelector('[data-slider-prev]');
  const next = slider.querySelector('[data-slider-next]');
  const status = slider.querySelector('[data-slider-status]');
  if (!track || !prev || !next) return;

  const slides = [...track.children];
  if (slides.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Distancia entre el inicio de una diapositiva y la siguiente (ancho + separación)
  const getStep = () => {
    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    return slides[0].getBoundingClientRect().width + gap;
  };

  const atStart = () => track.scrollLeft <= 2;
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;

  const getIndex = () => {
    if (atEnd()) return slides.length - 1;
    return Math.min(slides.length - 1, Math.round(track.scrollLeft / getStep()));
  };

  const update = () => {
    // aria-disabled (no disabled) para no perder el foco al llegar a un extremo
    prev.setAttribute('aria-disabled', String(atStart()));
    next.setAttribute('aria-disabled', String(atEnd()));
    if (status) status.textContent = `Caso ${getIndex() + 1} de ${slides.length}`;
  };

  const scrollByStep = (direction) => {
    track.scrollBy({
      left: direction * getStep(),
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
  };

  prev.addEventListener('click', () => {
    if (prev.getAttribute('aria-disabled') !== 'true') scrollByStep(-1);
  });
  next.addEventListener('click', () => {
    if (next.getAttribute('aria-disabled') !== 'true') scrollByStep(1);
  });

  // Un listener pasivo del propio carrusel, agrupado por fotograma, mantiene botones y contador al día
  let frame = null;
  track.addEventListener(
    'scroll',
    () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        update();
      });
    },
    { passive: true }
  );
  window.addEventListener('resize', update, { passive: true });

  update();
}
