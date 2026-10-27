/*
 * Casos clínicos: pestañas por tipo de caso + comparador antes/después.
 * El comparador se arrastra con el puntero (ratón o dedo) o con el teclado
 * (un input range oculto que también lee el lector de pantalla).
 * La primera vez que aparece hace un barrido corto para enseñar que se puede deslizar.
 * Sin JS se ven todos los casos con el comparador fijo a la mitad.
 */
const SWEEP = [50, 74, 30, 50];

export function initCases() {
  const tablist = document.querySelector('[data-cases-tabs]');
  const panels = [...document.querySelectorAll('[data-case]')];
  if (panels.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compares = panels.map((panel) => setupCompare(panel.querySelector('[data-compare]')));

  if (tablist) setupTabs(tablist, panels, (index) => {
    const compare = compares[index];
    if (compare && !reducedMotion.matches) compare.sweep();
  });

  // Barrido de pista: una sola vez, cuando el comparador visible entra en pantalla
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const visible = compares.find((compare, i) => compare && !panels[i].hidden);
        if (visible) visible.sweep();
      },
      { threshold: 0.6 }
    );
    compares.forEach((compare) => compare && observer.observe(compare.element));
  }
}

function setupTabs(tablist, panels, onChange) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];

  const select = (index, focus) => {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (focus) tabs[index].focus();
    onChange(index);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i, false));
    tab.addEventListener('keydown', (event) => {
      const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      let next = null;
      if (event.key in keys) next = (i + keys[event.key] + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      event.preventDefault();
      select(next, true);
    });
  });

  // Estado inicial: solo el primer caso visible (sin JS se ven todos)
  panels.forEach((panel, i) => { panel.hidden = i !== 0; });
}

function setupCompare(element) {
  if (!element) return null;
  const range = element.querySelector('[data-compare-range]');
  let frame = 0;
  let touched = false;

  const set = (value) => {
    const pos = Math.min(100, Math.max(0, value));
    element.style.setProperty('--pos', `${pos}%`);
    if (range) range.value = String(Math.round(pos));
  };

  const fromPointer = (event) => {
    const rect = element.getBoundingClientRect();
    set(((event.clientX - rect.left) / rect.width) * 100);
  };

  element.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    touched = true;
    cancelAnimationFrame(frame);
    element.setPointerCapture(event.pointerId);
    element.classList.add('is-dragging');
    fromPointer(event);
  });
  element.addEventListener('pointermove', (event) => {
    if (element.hasPointerCapture(event.pointerId)) fromPointer(event);
  });
  const release = () => element.classList.remove('is-dragging');
  element.addEventListener('pointerup', release);
  element.addEventListener('pointercancel', release);

  if (range) {
    range.addEventListener('input', () => {
      touched = true;
      cancelAnimationFrame(frame);
      set(Number(range.value));
    });
  }

  // Recorre SWEEP con easing suave; se cancela si la persona toma el control
  const sweep = () => {
    if (touched) return;
    cancelAnimationFrame(frame);
    const segment = 650;
    const start = performance.now();
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    const tick = (now) => {
      const elapsed = now - start;
      const i = Math.min(Math.floor(elapsed / segment), SWEEP.length - 2);
      const t = Math.min((elapsed - i * segment) / segment, 1);
      set(SWEEP[i] + (SWEEP[i + 1] - SWEEP[i]) * ease(t));
      if (elapsed < segment * (SWEEP.length - 1)) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  };

  set(50);
  return { element, sweep };
}
