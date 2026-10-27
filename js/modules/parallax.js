/*
 * Parallax sutil, solo en el hero.
 * La imagen se desplaza unos pocos píxeles (translate3d vía variable CSS) más despacio que la página.
 * Se desactiva en móvil y con prefers-reduced-motion; sin JS la imagen queda estática y correcta.
 */
const MAX_SHIFT_PX = 22;

export function initParallax() {
  const target = document.querySelector('[data-parallax]');
  const hero = target ? target.closest('.hero') : null;
  if (!target || !hero) return;

  const wide = window.matchMedia('(min-width: 48em)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let active = false;
  let frame = null;

  const update = () => {
    frame = null;
    const heroHeight = hero.offsetHeight || 1;
    const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
    target.style.setProperty('--parallax-y', `${(progress * MAX_SHIFT_PX).toFixed(1)}px`);
  };

  const onScroll = () => {
    if (frame === null) frame = window.requestAnimationFrame(update);
  };

  const sync = () => {
    const shouldRun = wide.matches && !reducedMotion.matches;
    if (shouldRun && !active) {
      window.addEventListener('scroll', onScroll, { passive: true });
      active = true;
      update();
    } else if (!shouldRun && active) {
      window.removeEventListener('scroll', onScroll);
      target.style.removeProperty('--parallax-y');
      active = false;
    }
  };

  wide.addEventListener('change', sync);
  reducedMotion.addEventListener('change', sync);
  sync();
}
