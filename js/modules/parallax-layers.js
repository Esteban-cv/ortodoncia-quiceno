/*
 * Parallax por capas de la sección "Sonríe con confianza" (GSAP + ScrollTrigger).
 * Adaptación del componente de capas de Osmo: cada [data-parallax-layer] se desplaza
 * a una velocidad distinta mientras la sección cruza la pantalla. La capa 1 es la más lejana.
 * Sin GSAP, en movimiento reducido o sin JS, la composición queda estática y legible.
 */

// Recorrido total de cada capa, como fracción del alto de la sección.
// Mantiene las proporciones del original (70 / 55 / 40 / 10).
const DEPTH = { 1: 0.28, 2: 0.22, 3: 0.16, 4: 0.04 };

export function initParallaxLayers() {
  const section = document.querySelector('[data-parallax-layers]');
  const { gsap, ScrollTrigger } = window;
  if (!section || !gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // matchMedia revierte las animaciones solo si cambia la preferencia de movimiento
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    Object.entries(DEPTH).forEach(([layer, depth]) => {
      const targets = section.querySelectorAll(`[data-parallax-layer="${layer}"]`);
      if (targets.length === 0) return;
      const travel = () => section.offsetHeight * depth;
      timeline.fromTo(
        targets,
        { y: () => -travel() / 2 },
        { y: () => travel() / 2, ease: 'none' },
        0
      );
    });
  });
}
