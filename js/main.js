/*
 * main.js — punto de entrada (type="module").
 * Cada módulo expone un init que comprueba que sus elementos existan,
 * así un componente ausente nunca rompe a los demás.
 */
import { initTheme } from './modules/theme.js';
import { initNav } from './modules/nav.js';
import { initFab } from './modules/fab.js';
import { initReveal } from './modules/reveal.js';
import { initSlider } from './modules/slider.js';
import { initParallax } from './modules/parallax.js';

const root = document.documentElement;

// Confirma a theme-init.js que el módulo cargó (cancela su red de seguridad)
root.classList.add('js');
root.setAttribute('data-js-ready', '');

initTheme();
initNav();
initFab();
initReveal();
initSlider();
initParallax();
