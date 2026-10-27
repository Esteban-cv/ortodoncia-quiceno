/*
 * Zoom parallax de la galería "Sonríe con confianza" (GSAP + ScrollTrigger).
 * Adaptación del componente Zoom Parallax (framer-motion): la escena queda fija mientras
 * se recorre la pista (300 % del alto de pantalla) y cada foto escala de 1 a su factor
 * (data-zoom-scale). La foto del centro termina cubriendo la pantalla y aparece el mensaje.
 * Sin GSAP, sin JS o con movimiento reducido, queda un collage estático.
 */
export function initZoomParallax() {
  const track = document.querySelector('[data-zoom]');
  const { gsap, ScrollTrigger } = window;
  if (!track || !gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    // La pista solo se alarga cuando la animación existe (el CSS la deja en 100vh por defecto)
    track.classList.add('is-zooming');

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    track.querySelectorAll('[data-zoom-scale]').forEach((item) => {
      // force3D: false mantiene transform 2D: el navegador repinta la foto nítida a cada escala
      // en vez de ampliar una captura pequeña (con translate3d se veía pixelada)
      timeline.fromTo(
        item,
        { scale: 1 },
        { scale: Number(item.dataset.zoomScale), ease: 'none', duration: 1, force3D: false },
        0,
      );
    });

    const message = track.querySelector('[data-zoom-message]');
    if (message) {
      // Entra en el último tramo, cuando la foto del centro ya cubre casi toda la pantalla
      timeline.fromTo(message, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ease: 'power1.out', duration: 0.15 }, 0.8);
    }

    ScrollTrigger.refresh();

    return () => track.classList.remove('is-zooming');
  });
}
