/*
 * Entrada sutil de elementos .reveal al llegar al viewport.
 * El CSS solo los oculta si <html> tiene la clase "js", así que sin JS todo es visible.
 */
export function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (items.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        // Una vez revelado no hay nada más que observar
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );
  items.forEach((item) => observer.observe(item));
}
