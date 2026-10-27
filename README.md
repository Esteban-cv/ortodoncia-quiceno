# Dra. Laura Vanessa Quiceno — Ortodoncia

Sitio web de una sola página (HTML5 + CSS3 + JavaScript ES6+), sin frameworks y sin build. Todo es autoalojado: fuentes, íconos y las dos librerías de animación (GSAP y Lenis, en `js/vendor/`). Listo para Render o Cloudflare Pages.

## Estructura

```
ortodoncia-quiceno/
├── index.html
├── css/styles.css            tokens, base, componentes, tema oscuro, movimiento
├── js/
│   ├── theme-init.js         síncrono en <head>: tema + clase "js" antes del primer pintado
│   ├── main.js               punto de entrada (type="module")
│   └── modules/
│       ├── theme.js          botón de tema claro/oscuro
│       ├── nav.js            header sticky, menú móvil, enlace activo
│       ├── fab.js            botón flotante de WhatsApp
│       ├── reveal.js         entrada sutil de elementos
│       ├── slider.js         casos clínicos (scroll nativo + botones)
│       ├── parallax.js       parallax sutil del hero
│       ├── parallax-layers.js parallax por capas de "Sonríe con confianza" (GSAP ScrollTrigger)
│       └── smooth-scroll.js  scroll suave con Lenis y enlaces internos
│   └── vendor/               gsap.min.js y ScrollTrigger.min.js (GSAP 3.15), lenis.min.js (Lenis 1.3)
├── assets/
│   ├── fonts/                Montserrat (titulares, la misma del logo) y DM Sans (cuerpo), subconjunto latin, woff2
│   ├── images/               imágenes PLACEHOLDER (ver "Imágenes")
│   └── logo/                 logo en SVG y PNG (ver sección "Logo")
├── favicon.svg               ícono del sitio (sonrisa con brackets)
├── apple-touch-icon.png      ícono para iPhone/iPad (180 × 180)
├── robots.txt
├── _headers                  cabeceras de seguridad y caché (Cloudflare Pages)
├── render.yaml               Blueprint de Render con las mismas cabeceras
└── README.md
```

## Ejecutar en local

Usa un servidor local (los módulos ES no cargan con doble clic sobre `index.html`):

```bash
cd ortodoncia-quiceno
python3 -m http.server 8000
# abrir http://localhost:8000
```

Si abres el archivo con doble clic, el sitio sigue siendo legible (el contenido queda visible y la navegación por anclas funciona), pero el menú móvil, el slider, el tema y el parallax no estarán activos.

## Desplegar en Render (plan gratuito)

El repositorio trae `render.yaml` (Blueprint): un sitio estático gratuito, sin build, que publica la raíz y aplica las mismas cabeceras de seguridad y caché que `_headers`.

1. Entra a [render.com](https://render.com) con tu cuenta de GitHub.
2. **New → Blueprint** → elige el repositorio `ortodoncia-quiceno` → **Apply**.
3. Render publica el sitio en `https://ortodoncia-quiceno.onrender.com` (o un nombre parecido si ese ya existe) y lo vuelve a publicar con cada push a `main`.

Los sitios estáticos de Render no se duermen (eso solo pasa con los servicios web gratuitos).

## Desplegar en Cloudflare Pages

**Subida directa:** Workers & Pages → Create → Pages → *Upload assets* → arrastra la carpeta `ortodoncia-quiceno`.

**Con Git:** sube la carpeta a un repositorio y créalo como proyecto Pages con:

- Framework preset: **None**
- Build command: *(vacío)*
- Build output directory: **`/`** (la raíz del proyecto)

Cloudflare aplica `_headers` automáticamente.

## Logo

Logo definitivo: monograma **LQ** con la sonrisa y brackets (el alambre de ortodoncia), nombre "DRA. LAURA QUICENO" y "ODONTOLOGÍA ESPECIALIZADA" en Montserrat. Vino tinto `#5C1329` sólido y dorado `#E9D6A2` parejo, sin degradados ni sombras. Todo es vector (texto convertido a trazos), así que no depende de ninguna fuente.

Está fragmentado en piezas para usarlo por separado, cada una en dorado (para fondos vino u oscuros) y en vino (para fondos claros), en SVG y PNG transparente (`assets/logo/`):

| Pieza | Para qué sirve |
|---|---|
| `logo-completo-*` | Versión apilada: pie de página, tarjetas, publicaciones, firma |
| `logo-horizontal-*` | Encabezado de la página, correos, documentos |
| `logo-monograma-*` | Foto de perfil, sellos, marcas de agua |
| `logo-sonrisa-*` | Solo la sonrisa con brackets: adornos y separadores |
| `logo-nombre-*` | Solo el nombre y la especialidad |
| `icono-app.svg`, `icono-app-512.png`, `apple-touch-icon.png` | Íconos (monograma dorado sobre cuadrado vino) |

En la página, las piezas `horizontal`, `completo`, `monograma` y `sonrisa` están incrustadas como símbolos SVG al inicio de `index.html` y usan `currentColor`: el color lo decide el CSS (`.brand`, `.ornament`, `.cta-band__mark`). Para usar una pieza en otro lugar: `<svg viewBox="0 0 W H"><use href="#logo-sonrisa"/></svg>` con el ancho y alto de su símbolo, y asigna `color` en CSS.

Uso:

- Deja alrededor del logo un espacio libre mínimo equivalente a la altura de un bracket.
- Por debajo de ~32 px de alto usa el monograma o el ícono: el nombre deja de leerse.
- No cambies el color del logo ni agregues sombras o degradados.

## Paleta (conectada con el logo)

| Uso | Claro | Oscuro |
|---|---|---|
| Fondo | crema `#FAF5EC` | vino casi negro `#1D0911` |
| Marca y titulares | vino `#5C1329` | dorado `#E9D6A2` |
| Banda (proceso) | vino `#5C1329` | vino `#5C1329` |
| Botones de WhatsApp | dorado `#E9D6A2`, texto `#3A0C1A` | igual |
| Pie de página | `#3E0D1D` | `#14060B` |

Todos los pares de texto y fondo superan contraste AA (el menor medido es 6,9:1). Los tokens están al inicio de `css/styles.css`.

## Imágenes

Las imágenes actuales son **placeholders** (en tonos vino y crema) con la etiqueta REEMPLAZAR. Sustitúyelas conservando el mismo nombre y la misma proporción; no hay que tocar el CSS.

| Archivo | Proporción | Tamaño recomendado | Uso |
|---|---|---|---|
| `assets/images/hero.jpg` | 4:5 | 1200 × 1500 px | Hero (marco en arco; es la imagen LCP) |
| `assets/images/doctora.jpg` | 4:5 | 1000 × 1250 px | Retrato en "La doctora" |
| `assets/images/parallax-consultorio.jpg` | 16:9 | 1600 × 900 px o más | Fondo de la sección parallax (se tiñe de vino; hoy es un recorte desenfocado de la lámpara del consultorio) |
| `assets/images/consultorio.jpg` | 4:3 | 1200 × 900 px | Contacto y ubicación |
| `assets/images/caso-1.jpg`, `caso-2.jpg`, `caso-3.jpg` | 4:3 | 1200 × 900 px | Casos clínicos |

- Comprime cada una a menos de ~200 KB (por ejemplo con Squoosh, https://squoosh.app, o `cwebp -q 78`).
- Si cambias a WebP, actualiza la extensión en `index.html` (busca `REEMPLAZAR_IMAGEN`; cada imagen tiene un comentario con sus datos).
- **Actualiza también el texto `alt`** de cada imagen para describir la foto real.
- **Casos clínicos:** no publiques fotos sin consentimiento firmado del paciente. No hay fotos de "antes y después" en este sitio.
- Las imágenes tienen caché de 1 día (`_headers`) para que el cambio se vea pronto. Las fuentes tienen caché de 1 año.

## Marcadores que debes sustituir antes de publicar

Busca `POR CONFIRMAR` en todo el proyecto (`index.html`):

| Marcador | Dónde aparece |
|---|---|
| `[NÚMERO POR CONFIRMAR]` | Registro profesional (sección "La doctora" y pie de página) |
| `[INSTAGRAM POR CONFIRMAR]` | Contacto. Al tener el perfil, conviértelo en un enlace `<a>` con `rel="noopener noreferrer"` |
| `[DÍAS DE ATENCIÓN POR CONFIRMAR]` | Horario (Preguntas frecuentes y Contacto) |
| `[DESCRIPCIÓN DEL CASO POR CONFIRMAR]` | Pie de cada caso clínico (×3) |

Otros datos a revisar:

- El número de WhatsApp aparece como `573178932327` en los enlaces `wa.me` y como `+573178932327` en `tel:` y en los datos estructurados (JSON-LD). Si cambia, reemplaza en todo `index.html`.
- Horario: el sitio dice "8:00 a. m. a 5:00 p. m." porque CONFIG indicaba "8am - 5pm" sin días.
- El enlace "Cómo llegar" abre una búsqueda en Google Maps con la dirección "Carrera 16 #13a-54, Cali, Valle del Cauca, Colombia". Compruébalo en un celular; si el pin no cae exacto, usa el enlace "Compartir" de la ubicación en Google Maps y pégalo en el `href`.

## Integraciones pendientes (cuando tengas el dominio)

- `<link rel="canonical" href="https://TU-DOMINIO/">` en `<head>`.
- `og:image` y `twitter:image` con URL absoluta de una imagen de 1200 × 630 px (por ejemplo, una foto de la doctora).
- `sitemap.xml` y la línea `Sitemap:` en `robots.txt`.
- Si se activan analítica, mapa embebido u otros servicios externos, hay que ampliar la política CSP en `_headers`.

## Decisiones de diseño y de configuración

- **Tema:** el sitio abre siempre en claro (preferencia de marca). El tema oscuro es opcional: lo activa el visitante con el botón y se recuerda en su navegador.
- **Dorado `#E9D6A2`:** solo en los botones de WhatsApp y en el logo sobre fondos oscuros. El texto sobre dorado es vino oscuro.
- **Parallax del hero:** de unos 22 px como máximo. Se desactiva en pantallas menores a 48 em y con `prefers-reduced-motion`.
- **Sección "Sonríe con confianza" (parallax por capas):** entre Tratamientos y Proceso. Una puerta en arco (el arco de la marca) se abre hacia el consultorio; detrás se mueven, a distinta velocidad, la foto, la sonrisa con brackets del logo y el título. Es una adaptación del componente de capas de Osmo (React + GSAP + Lenis) a este sitio sin React: la lógica está en `js/modules/parallax-layers.js` y las capas son `[data-parallax-layer="1…4"]` en `index.html`. Con `prefers-reduced-motion` o sin JavaScript queda como una composición estática.
- **Scroll suave (Lenis):** solo con rueda o trackpad; en celulares el scroll sigue siendo el nativo. Se apaga con `prefers-reduced-motion`. Los enlaces del menú siguen respetando el header y mueven el foco a la sección.
- **Tarjetas de tratamientos:** cada una abre con el arco de la marca y el aparato dibujado con el bracket del logo, dos datos para comparar (tipo y visibilidad) y un enlace de WhatsApp con el nombre del tratamiento ya escrito en el mensaje.
- **Íconos:** WhatsApp es un símbolo SVG propio (`#icon-whatsapp`, de Simple Icons); el ícono de la sección parallax es `smile-plus` de Lucide, incrustado. No se carga Font Awesome: la CSP de `_headers` bloquea hojas de estilo externas.
- **Botón verde de WhatsApp:** `#1A7F45` (en lugar de `#25D366`) para que el texto blanco cumpla contraste AA.
- **¿Por qué no React, shadcn, Tailwind ni TypeScript?** El sitio es HTML estático sin build. Migrarlo (por ejemplo, Next.js + `npx shadcn@latest init`, que crea `components/ui/` y configura Tailwind y TypeScript) implicaría reescribir todo el sitio y añadir un paso de build en Cloudflare. Si algún día se migra, el componente original va en `components/ui/parallax-scrolling.tsx`, que es la carpeta que espera la CLI de shadcn para sus componentes.
- **Sin formulario ni reservas:** el contacto va por WhatsApp, teléfono y correo, como indica CONFIG.
- **Sin precios ni promesas de resultados o tiempos:** la sección de preguntas frecuentes lo dice con claridad.
- **Red de seguridad sin JS:** si el módulo `main.js` no se ejecuta, `theme-init.js` quita la clase `js` a los 4 segundos y todo el contenido queda visible.

## Estado

**Implementado:** todas las secciones de CONFIG, tema oscuro opcional, menú móvil accesible, slider de casos sin autoplay, FAQ con `<details>`, botón flotante de WhatsApp, "Cómo llegar", SEO básico, datos estructurados (`Dentist`), `_headers`, `robots.txt`.

**Verificado en Chromium (Playwright):** 76 comprobaciones, entre ellas sin scroll horizontal de 320 a 1700 px, sin errores de consola ni de red, imágenes cargadas, menú (abrir, Escape, foco, enlaces), slider (botones y contador), tema (cambio, persistencia, etiqueta), FAQ con ratón y teclado, parallax, enlace activo, sin JavaScript, `prefers-reduced-motion`, anclas y objetivos táctiles de al menos 44 px. Contraste AA calculado para los pares de color de ambos temas.

**Requiere pruebas reales:** Safari y Firefox, iPhone y Android físicos, lector de pantalla (VoiceOver o TalkBack), `Cómo llegar` en el celular, WhatsApp en dispositivos reales, auditoría Lighthouse con las fotos reales y el sitio publicado (no se afirma ninguna puntuación), y el despliegue en Cloudflare Pages.
