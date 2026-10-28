/*
 * intro-boot.js — arranca la intro de vidrio apenas llega, sin esperar a GSAP, Lenis ni main.js.
 * Va como módulo async justo después de la capa en index.html: en celulares con red lenta
 * main.js puede tardar segundos y la capa se quedaba difuminada sin animación mientras tanto.
 */
import { initGlassIntro } from './modules/glass-intro.js?v=2';

initGlassIntro();
