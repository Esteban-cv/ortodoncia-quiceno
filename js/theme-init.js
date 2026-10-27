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

  // Red de seguridad: si main.js (módulo ES) no llega a ejecutarse, por ejemplo
  // al abrir index.html con doble clic (file://) donde el navegador bloquea módulos,
  // se quita la clase "js" para que todo el contenido quede visible y navegable.
  window.setTimeout(function () {
    if (!root.hasAttribute('data-js-ready')) root.classList.remove('js');
  }, 4000);
})();
