/*
 * Scroll suave con Lenis, sincronizado con el reloj de GSAP para que el parallax no tiemble.
 * Solo con rueda/trackpad (en pantallas táctiles Lenis deja el scroll nativo) y nunca
 * con prefers-reduced-motion. Los enlaces internos se desplazan con Lenis y mueven
 * el foco al destino, como el salto nativo.
 */
export function initSmoothScroll() {
  const { Lenis, gsap, ScrollTrigger } = window;
  if (!Lenis || !gsap) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lenis = new Lenis();

  if (ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const id = link.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    // Lenis ya respeta el scroll-padding-top del CSS (compensa el header sticky)
    lenis.scrollTo(target);
    // El foco sigue al salto (enlace "Saltar al contenido", menú con teclado) sin provocar otro scroll
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    window.history.pushState(null, '', `#${id}`);
  });
}
