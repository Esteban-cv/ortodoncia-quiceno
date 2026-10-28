/*
 * theme-init.js — se carga de forma síncrona en <head> (sin defer).
 * Motivo: aplicar el tema y la clase "js" ANTES del primer pintado,
 * para evitar el parpadeo del tema incorrecto y para que el contenido
 * solo se oculte (reveal) cuando JavaScript realmente está activo.
 */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // El sitio abre siempre en claro (preferencia de marca).
  // El tema oscuro solo se aplica si la persona lo eligió antes.
  var saved = null;
  try {
    saved = window.localStorage.getItem('theme');
  } catch (e) {
    // localStorage bloqueado (modo privado, políticas del navegador): se ignora.
  }
  if (saved === 'dark') {
    root.setAttribute('data-theme', 'dark');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#1D0911');
  }

  // Esqueleto del texto de la portada mientras llegan las fuentes.
  // En conexiones rápidas dura milisegundos; en lentas se ve el brillo en vez del salto
  // de tipografía. Tope de 2,5 s: el texto nunca queda oculto más que eso.
  if (document.fonts && document.fonts.load && window.Promise) {
    root.classList.add('fonts-loading');
    var showText = function () {
      root.classList.remove('fonts-loading');
    };
    window.setTimeout(showText, 2500);
    // Las reglas @font-face están en styles.css, que aún no se ha leído: se piden al terminar el HTML
    document.addEventListener('DOMContentLoaded', function () {
      Promise.all([
        document.fonts.load('700 1em "Montserrat"'),
        document.fonts.load('400 1em "DM Sans"')
      ]).then(showText, showText);
    });
  }

  // Intro de vidrio con el logo (js/modules/glass-intro.js): solo la primera vez por sesión
  // y nunca con movimiento reducido. La clase se pone aquí para que la capa tape la página
  // desde el primer pintado, sin destello del contenido antes de la animación.
  var seen = false;
  try {
    seen = window.sessionStorage.getItem('intro-visto') === '1';
  } catch (e) {
    seen = false; // sin almacenamiento (algunos navegadores de apps) igual se muestra
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!seen && !reduce) root.classList.add('intro-on');

  // Red de seguridad: si main.js (módulo ES) no llega a ejecutarse, por ejemplo
  // al abrir index.html con doble clic (file://) donde el navegador bloquea módulos,
  // se quita la clase "js" para que todo el contenido quede visible y navegable.
  window.setTimeout(function () {
    if (!root.hasAttribute('data-js-ready')) root.classList.remove('js');
    // La intro tiene su propio tope; solo se quita aquí si su módulo ni siquiera arrancó
    if (!root.hasAttribute('data-intro-ready')) root.classList.remove('intro-on');
  }, 4000);
})();
