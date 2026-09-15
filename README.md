# Portfolio de Adrián Rodríguez del Río

React + TypeScript + Vite. Interfaz oscura con acentos rojos y ámbar, navegación entre páginas, consola interactiva y cronología profesional.

## Ejecutar

Usa Node 22.18+ o Node 24. Desde esta carpeta:

```bash
npm ci
npm run dev
```

Abre la dirección que muestre Vite. No requiere claves, cuentas, backend ni variables de entorno.

## Comprobar

```bash
npm run build
npm run lint
npm test
npm run test:interactions
npm audit --omit=dev
```

`npm test` ejecuta diez pruebas de fechas y comandos. `test:interactions` monta los componentes React reales en Happy DOM y ejecuta comprobaciones semánticas con axe-core. No abre un navegador ni mide posiciones, solapamientos, colores renderizados o rendimiento. Las carpetas temporales de estas pruebas se eliminan al terminar correctamente.

`npm run preview` sirve la compilación de `dist` para una revisión local. Para publicar, sirve `dist` con un alojamiento que redirija las rutas de la SPA a `index.html`: al recargar `/projects`, `/experience` o `/stack`, el servidor debe devolver la aplicación. La configuración actual presupone publicación en la raíz del dominio. Si se publica en una subcarpeta, hay que ajustar tanto `base` de Vite como `basename` del router.

## Paginas

| Contenido | Archivo |
| --- | --- |
| Perfil, experiencia, proyectos y redes | `src/data/portfolioData.ts` |
| Áreas del stack y ejemplos de uso | `src/pages/TechStackPage.tsx` |
| Apariencia, distribución y puntos de adaptación | `src/index.css` |
| Posición del eje y tarjetas | `src/pages/ExperiencePage.css` |
| Fechas, orden y compresión de huecos | `src/utils/timeline.ts` |
| Respuestas de la consola | `src/utils/terminal.ts` |
| Rutas, títulos y transiciones | `src/App.tsx` |
| Menús de contacto, navegación y apariencia | `src/components/Navbar.tsx` |

Las fechas del eje utilizan `startDate` y `endDate` en formato `AAAA-MM`; `null` significa trabajo vigente. `period` es la etiqueta legible de cada tarjeta. Mantén ambos datos coherentes al editar experiencias. El año final del trabajo vigente se calcula automáticamente.

La consola admite `help`, `about`, `skills`, `projects`, `contact` y `clear`. También tiene botones rápidos e historial con flechas. No ejecuta JavaScript ni comandos del sistema.

El menú del icono de ojo permite activar alto contraste, reducir efectos o el halo difuso opcional alrededor del cursor. Las preferencias se guardan en `localStorage` con la clave `drakko-display`; si el almacenamiento no está disponible, la página sigue funcionando. Se respeta además el movimiento reducido del sistema. El cursor del dispositivo permanece visible.

