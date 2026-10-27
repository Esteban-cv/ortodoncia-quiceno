/*
 * Esqueleto de carga de las fotos.
 * El CSS oculta cada foto de los contenedores con esqueleto (solo con .js) y muestra un
 * brillo que recorre el marco; este módulo marca cada <img> con .is-loaded cuando termina
 * de cargar (o si falla, para no dejar el brillo para siempre) y la foto aparece con un fundido.
 * Las fotos que ya estaban en caché se marcan al instante, sin parpadeo.
 */
const SELECTOR = [
  '.hero__arch > img',
  '.about__photo > img',
  '.treatment__photo > img',
  '.zoom__frame > img',
  '.step__photo > img',
  '.compare > img',
  '.compare__before > img',
  '.contact__photo > img',
].join(',');

export function initSkeleton() {
  document.querySelectorAll(SELECTOR).forEach((img) => {
    const done = () => img.classList.add('is-loaded');
    if (img.complete) {
      done();
      return;
    }
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
}
