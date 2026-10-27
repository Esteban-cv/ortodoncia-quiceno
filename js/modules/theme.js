/*
 * Tema claro/oscuro.
 * El tema inicial lo aplica theme-init.js antes del primer pintado;
 * aquí solo se conecta el botón y se mantiene sincronizada la interfaz.
 */
const STORAGE_KEY = 'theme';
const THEME_COLORS = { light: '#FAF5EC', dark: '#1D0911' };

export function initTheme() {
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');

  const getTheme = () => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  const applyTheme = (theme, persist) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);

    // El nombre accesible describe la acción que ocurrirá al activarlo
    button.setAttribute('aria-label', theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro');

    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        // Almacenamiento bloqueado: el tema funciona en esta visita, sin recordarse.
      }
    }
  };

  applyTheme(getTheme(), false);

  button.addEventListener('click', () => {
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark', true);
  });
}
