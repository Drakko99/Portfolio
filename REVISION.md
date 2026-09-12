# Revisión 2 — proporciones y cronología compacta

Esta versión sustituye la propuesta anterior. Se corrigen los cambios de proporción señalados y se recupera el hover en ordenador.

## Cambios y justificación

| Archivo | Cambio | Motivo |
| --- | --- | --- |
| `src/components/Navbar.tsx` | Ancho máximo de 760 px, menos padding vertical, enlaces y Contact de 14 px. | Equilibrar el tamaño del texto con la barra y reducir su superficie vacía. |
| `src/components/Footer.tsx`, `src/index.css` | Footer de altura mínima 36 px en escritorio, una fila y ancho máximo 1000 px. En móvil, dos líneas y 56 px. | Evitar una franja demasiado alta y ancha. |
| `src/App.tsx`, páginas Home, Projects y Stack | La altura disponible descuenta una única vez la altura del footer. El contenedor de rutas crece mediante flex. | Evitar sumar un footer por debajo de un contenedor que ya ocupaba toda la pantalla. En esas tres páginas solo cambia la clase de altura. |
| `src/pages/ExperiencePage.css` | Título de 32–44 px, tarjetas de 200–250 px, padding de 14 px, conectores comunes de 44 px. | Recuperar una composición compacta y mantener la misma distancia del eje a las tarjetas de ambos lados. |
| `src/pages/ExperiencePage.tsx` | Hover con ratón y puntero preciso; botón para teclado y táctil; Escape para cerrar. | Recuperar la interacción de escritorio solicitada, sin depender del hover en pantallas táctiles. |
| `src/utils/timeline.ts` | Orden por fecha final descendente, con desempate por inicio. | Mostrar Be Call vigente primero, después UNED, INTECCA y finalmente IP Informática. |
| `src/utils/timeline.ts` | Se unen periodos solapados antes de buscar huecos. Los huecos vacíos de más de 6 meses se comprimen a 2 meses de ancho visual. | Reducir el vacío 2020–2024 sin comprimir el tiempo trabajado ni falsear el solapamiento Be Call/UNED. |
| `src/pages/ExperiencePage.tsx`, CSS | Se elimina el texto explicativo y el ancho mínimo que forzaba desplazamiento horizontal. | La cronología usa el ancho disponible en escritorio. Por debajo de 900 px pasa a vertical. |
| `tests/` y dependencias de desarrollo | Siete pruebas temporales con los datos reales y un escenario de interacciones en Happy DOM. | Verificar las regresiones concretas: orden, compresión, solapamiento y hover. Happy DOM no forma parte del bundle de la web. |

## Cómo se representa el tiempo

De izquierda a derecha, el eje va del presente al pasado. Las barras siguen delimitando los meses de cada trabajo y sus conectores nacen en el centro de cada intervalo. Los meses finales son inclusivos.

A septiembre de 2026, el hueco agosto 2020–enero 2024 abarca 42 meses. Su ancho pasa a equivaler a dos meses. Un pequeño `//` señala el corte, sin añadir texto explicativo sobre la página. El hueco de tres meses entre INTECCA y Be Call se conserva completo. Los periodos trabajados conservan su escala relativa.

Solo se etiquetan los años con experiencia: 2026, 2025, 2024 y 2020, una vez cada uno en el eje de escritorio. No se introducen etiquetas 2021–2023 en el espacio comprimido ni años futuros. Las fechas completas siguen en las tarjetas. En móvil se muestra el año de inicio junto a cada tarjeta, en el mismo orden reciente a antiguo.

## Interacción de tarjetas

- Entrar con ratón abre detalles; salir los cierra.
- El botón permite abrir y mantener los detalles visibles en táctil o con teclado.
- Pulsar el botón de cerrar durante el hover cierra realmente la tarjeta hasta la siguiente entrada del ratón.
- Escape cierra los detalles.
- El contenido cerrado utiliza `inert` y `aria-hidden`. La animación de altura y opacidad respeta movimiento reducido.

La vista cerrada está diseñada para caber en una pantalla de escritorio habitual. No se oculta contenido con `overflow: hidden` para simular que cabe: en ventanas bajas, zoom alto o cuando los detalles necesitan más altura, puede existir scroll vertical necesario. La igualdad entre conectores se mantiene mediante las filas compartidas del grid.

## Validación realizada

- `npm run build`: TypeScript y compilación de producción correctos.
- `npm run lint`: sin errores.
- `npm test`: siete pruebas temporales correctas; usan el array de experiencias real.
- `npm run test:interactions`: escenario completo correcto en DOM simulado: cuatro tarjetas, orden, ausencia del texto eliminado, entrada/salida de hover, exclusión del toque, apertura por clic, persistencia, Escape, estado inert, cierre durante hover y reapertura.

El test de interacciones compila Experience con Vite para ejecutarlo con React y Happy DOM. Genera una carpeta temporal que se elimina al terminar. No abre un servidor ni utiliza un navegador.

**Limitación:** no se han medido posiciones ni inspeccionado capturas en un navegador real. La sesión anterior rechazó automáticamente el acceso del navegador al servidor local; esta versión no intenta eludir esa restricción. Las comprobaciones de DOM no verifican el diseño responsive ni sustituyen una revisión visual. El aviso de Vite sobre el tamaño del bundle principal continúa pendiente; no es un error de compilación.

## Ejecutar

Con Node 22.18+ o Node 24, desde la carpeta del proyecto:

```bash
npm ci
npm run dev
```

Comprobaciones incluidas:

```bash
npm run build
npm run lint
npm test
npm run test:interactions
```

El ZIP contiene código, lockfile y pruebas, sin `node_modules`, `dist` ni historial `.git`. Se mantienen las correcciones anteriores de compilación de Three.js. No se modifica el reset de Tailwind de nuevo: la compactación se aplica explícitamente a los componentes afectados.
