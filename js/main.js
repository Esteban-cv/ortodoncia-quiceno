/*
 * main.js — punto de entrada (type="module").
 * Cada módulo expone un init que comprueba que sus elementos existan,
 * así un componente ausente nunca rompe a los demás.
 */
import { initGlassIntro } from './modules/glass-intro.js?v=1';
import { initSkeleton } from './modules/skeleton.js?v=10';
import { initTheme } from './modules/theme.js';
import { initNav } from './modules/nav.js';
import { initFab } from './modules/fab.js';
import { initReveal } from './modules/reveal.js';
import { initCases } from './modules/cases.js?v=9';
import { initParallax } from './modules/parallax.js';
import { initZoomParallax } from './modules/zoom-parallax.js?v=4';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initStickyFooter } from './modules/sticky-footer.js?v=7';

const root = document.documentElement;

// Confirma a theme-init.js que el módulo cargó (cancela su red de seguridad)
root.classList.add('js');
root.setAttribute('data-js-ready', '');

// La intro arranca antes que todo: es lo primero que se ve
initGlassIntro();

// Luego: marca las fotos que ya cargaron antes de que nada más se ejecute
initSkeleton();
initTheme();
initNav();
initFab();
initReveal();
initCases();
initParallax();
initZoomParallax();
initSmoothScroll();
initStickyFooter();
