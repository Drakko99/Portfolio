# Diseño, librerías y fuentes

Consulta realizada el 13 de septiembre de 2026. La selección se basa en las capacidades documentadas y su encaje con este portfolio; no pretende ser un ranking de popularidad.

## Decisiones

Se conserva la identidad oscura, roja y ámbar del proyecto. El efecto futurista se concentra en contornos iluminados, reflejos al pasar el puntero, una retícula ambiental y transiciones breves. Los textos permanecen quietos y legibles. Los efectos no bloquean la navegación ni añaden pantallas de carga.

| Opción revisada | Qué aporta | Decisión para este proyecto |
| --- | --- | --- |
| [Motion para React](https://motion.dev/docs/react-accessibility) | Animación declarativa y herramientas para respetar movimiento reducido. | Mantener la dependencia existente para rutas y apertura de tarjetas; duración cero cuando se solicita reducir efectos. |
| [Radix Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu) | Menús, casillas, navegación con teclado y gestión del foco. Admite comportamiento modal o no modal. | Utilizar la dependencia existente para Contacto, apariencia y navegación móvil. Los menús son no modales para no bloquear el desplazamiento de la página. |
| [React Bits: Spotlight Card](https://reactbits.dev/components/spotlight-card) | Referencia de iluminación radial que sigue al puntero sobre una tarjeta. | Aplicar el patrón con un componente CSS propio y pequeño. Se desactiva al reducir efectos o usar alto contraste. |
| [Magic UI: Shimmer Button](https://magicui.design/docs/components/shimmer-button) | Referencia de brillo y luz alrededor de un botón. | Implementar un reflejo propio al pasar el puntero o enfocar; evitar un brillo giratorio permanente en todos los controles. |
| [Aceternity: Moving Border](https://ui.aceternity.com/components/moving-border) | Referencia de un borde con luz en movimiento. | Reservar la idea para un posible CTA destacado futuro. En esta entrega se usan contornos y reflejos CSS sin añadir otra dependencia de animación. |

No se ha copiado el código fuente de esos componentes visuales. Las implementaciones de `GlowSurface`, fondo y botones son propias. No se instalan catálogos completos por un efecto aislado. GSAP y Lenis se retiran al no tener usos activos; Motion y el desplazamiento nativo cubren la interacción necesaria. Three, React Three Fiber y Drei se retiran junto al fondo WebGL para reducir JavaScript y evitar un contexto gráfico y un bucle de renderizado para una decoración ambiental.

Las fuentes Space Grotesk y Space Mono se sirven desde el propio proyecto mediante Fontsource; la página ya no solicita tipografías a Google Fonts. Los paquetes de pruebas se mantienen exclusivamente como dependencias de desarrollo.

## Accesibilidad aplicada

- [Motion](https://motion.dev/docs/react-accessibility) documenta `MotionConfig` y `useReducedMotion`: se combinan con la preferencia propia de reducir efectos, también aplicada al CSS.
- [WCAG: contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) establece 4,5:1 para texto habitual y 3:1 para texto grande. Se han comprobado numéricamente pares de colores base; esto no equivale a medir todos los estados renderizados.
- [WCAG: contenido al pasar el puntero o enfocar](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) sirve como referencia para permitir cerrar los detalles con Escape y mantenerlos utilizables mientras se interactúa con la tarjeta. El botón ofrece la alternativa de teclado y táctil.

También se añaden un salto al contenido, títulos por ruta, foco visible, etiquetas de formularios, avisos de pestañas nuevas, zonas de desplazamiento accesibles con teclado y ocultación semántica de las rutas que están saliendo. La navegación móvil conserva Contacto y las opciones de apariencia.

## Información de los proyectos

Se revisaron los README y archivos públicos mediante la API pública de GitHub. No se accedió a datos privados ni se añadieron acreditaciones de LinkedIn sin verificar.

| Proyecto / fuente | Evidencia empleada | Ajuste del portfolio |
| --- | --- | --- |
| [Juego del Impostor](https://github.com/Drakko99/juego_impostor) y [ficha de Google Play](https://play.google.com/store/apps/details?id=com.drakko99.juego_impostor) | Juego local pasando un móvil, 3–12 jugadores, categorías/palabras personalizadas; Flutter, Dart y SQLite en el repositorio. | Corregir la descripción anterior de multijugador en tiempo real. Mantener enlaces visibles al código y a la publicación. La ficha de Google Play se pudo consultar y corresponde a Drakko99. |
| [MonitorStockTS](https://github.com/Drakko99/MonitorStockTS) | README: comprobaciones periódicas, configuración por entorno, Axios/Cheerio y Playwright; aviso en consola al recuperar stock. | Describir el comportamiento real, sin atribuirle notificaciones instantáneas o canales externos inexistentes. |
| [Game Library Web](https://github.com/Drakko99/game-library-web) | `package.json`, árbol y `app/page.tsx` de la rama principal: base Next.js y pantalla inicial de la plantilla. | Mantener el proyecto como exploración en fase inicial. No presentar un catálogo terminado que no aparece en el código público. |

Si Game Library tiene una rama más avanzada, un repositorio privado o una demo diferente, esa es la información que falta para ampliar su ficha. Para convertir los proyectos en estudios de caso también vendrían bien capturas reales y decisiones técnicas personales: problema, alternativa descartada y resultado conseguido. No se han inventado métricas de usuarios, rendimiento o impacto.

## Ideas que encajan para una siguiente iteración visual

1. Un borde animado únicamente en el CTA principal, tomando como referencia Moving Border, con velocidad lenta y alternativa estática.
2. Capturas reales del Impostor dentro de una composición de móvil, manteniendo enlaces y descripción fuera de la imagen.
3. Una ficha ampliada por proyecto con decisiones técnicas y capturas, cuando haya material suficiente.

El halo opcional del cursor ya está implementado. No sustituye el puntero del sistema y se desactiva en táctil, alto contraste y movimiento reducido. Evitaría perseguidores con retraso, partículas continuas detrás del texto y desplazamiento secuestrado: mi valoración es que distraen del contenido y complican este objetivo de accesibilidad.

## Dependencias y navegador

La auditoría de producción señaló avisos en React Router 6: [redirección mediante rutas manipuladas](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) y [deserialización en hidratación SSR](https://github.com/advisories/GHSA-337j-9hxr-rhxg). La entrega actualiza React Router a 7.18.3, por encima de la versión corregida indicada por los avisos. El portfolio utiliza rutas declarativas en cliente; no se afirma que ambos escenarios fueran explotables en esta aplicación.

La [documentación oficial del navegador de ChatGPT](https://learn.chatgpt.com/docs/browser#security-and-user-controls) indica que Configuración → Cloud browser permite gestionar permisos por sitio. El intento de abrir `http://127.0.0.1:5173/experience` devolvió un bloqueo por una preferencia guardada; no apareció una nueva solicitud al usuario. No se intentó sortearlo con otro puerto, URL o navegador. Para completar la revisión visual hay que cambiar ese permiso y volver a abrir el proyecto con el navegador autorizado.
