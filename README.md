# Portfolio de Adrián Rodríguez del Río

Portfolio personal para presentar mi perfil profesional, experiencia y proyectos de desarrollo. La interfaz está en inglés y combina neones rojos y naranjas sobre un fondo oscuro con parallax, transiciones suaves y una consola interactiva.

## Tecnologías

| Tecnología                               | Uso                                                           |
| ---------------------------------------- | ------------------------------------------------------------- |
| React y TypeScript                       | Componentes, estado y contratos de datos con tipos estrictos. |
| Vite                                     | Desarrollo local y compilación.                               |
| React Router                             | Navegación sin recargar el documento.                         |
| Tailwind CSS y CSS propio                | Integración de estilos, variables y diseño por página.        |
| Framer Motion                            | Transiciones y expansión de tarjetas.                         |
| Three.js, React Three Fiber y Drei Float | Escena WebGL, partículas y movimiento del fondo.              |
| Radix UI                                 | Menús accesibles por teclado.                                 |
| React Icons y Fontsource                 | Iconos y fuentes servidas desde la propia web.                |
| ESLint y Prettier                        | Análisis y formato del código.                                |
| Node Test Runner, Happy DOM y axe-core   | Pruebas de lógica, interacción y semántica accesible.         |

NestJS, Next.js, React Native, Expo, MySQL y Prisma pertenecen al proyecto destacado **Game Library**, no a las dependencias del portfolio.

## Páginas

- **Home (`/`)**: presentación a la izquierda y consola a la derecha en escritorio. Admite `help`, `about`, `projects`, `skills`, `contact` y `clear`, con historial mediante flechas. No ejecuta comandos del sistema.
- **Projects (`/projects`)**: descripción, tecnologías y repositorios o publicación de cada proyecto. Game Library reúne sus interfaces web y móvil y muestra su estado de desarrollo.
- **Experience (`/experience`)**: trabajos recientes primero, meses finales incluidos y huecos sin empleo de más de seis meses comprimidos. Tarjetas expandibles con ratón, botón y teclado; cronología vertical en móvil.
- **Stack (`/stack`)**: tecnologías agrupadas por áreas y enlaces a trabajos relacionados.
- **Página no encontrada**: ofrece un enlace de regreso al inicio.

La navegación común incluye contacto y preferencias de apariencia: alto contraste, movimiento reducido y halo opcional. Se respetan además el movimiento reducido y los colores forzados del sistema. Las preferencias se guardan localmente; la web sigue funcionando si el almacenamiento está bloqueado.

## Estructura

| Ruta                                 | Contenido                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| `index.html`                         | Documento inicial, idioma y metadatos.                                          |
| `public/`                            | Favicon de la pestaña del navegador.                                            |
| `src/main.tsx`                       | Entrada de React, fuentes y estilos.                                            |
| `src/App.tsx`                        | Rutas, estructura compartida, transiciones y página no encontrada.              |
| `src/pages/`                         | Las cuatro páginas y sus hojas CSS.                                             |
| `src/components/`                    | Navbar, Footer, Terminal, tarjetas, superficies luminosas, halo y escena WebGL. |
| `src/context/`                       | Preferencias compartidas y persistencia local.                                  |
| `src/hooks/`                         | Apertura de tarjetas, consultas de medios y visibilidad de la pestaña.          |
| `src/data/portfolioData.ts`          | Perfil, contacto, trabajos, proyectos y áreas tecnológicas.                     |
| `src/types/`                         | Interfaces TypeScript del contenido.                                            |
| `src/utils/`                         | Cálculos de cronología y respuestas de consola.                                 |
| `src/styles/`                        | Paleta, estilos globales, componentes compartidos y accesibilidad.              |
| `src/index.css`                      | Importaciones de estilos, con accesibilidad al final.                           |
| `tests/`                             | Pruebas; `fixtures/` contiene componentes para montajes aislados.               |
| `vite.config.ts`                     | Integración de React y Tailwind.                                                |
| `tsconfig*.json`                     | Configuración de tipos de aplicación y herramientas.                            |
| `eslint.config.js`                   | Reglas de análisis estático.                                                    |
| `package.json` y `package-lock.json` | Scripts, dependencias y versiones reproducibles.                                |

Los estilos específicos acompañan a cada página. Los componentes pequeños comparten reglas en `src/styles/components.css` para evitar duplicaciones. El fondo se dibuja con WebGL: no usa una imagen `hero.png`. Los iconos proceden de React Icons y las fuentes de Fontsource.

## Ejecutar en local

Requisitos: Node.js 22.18 o posterior de la rama 22, o Node.js 24, y npm. No requiere backend, claves ni variables de entorno.

```bash
npm ci
npm run dev
```

Abre la URL que indique Vite, normalmente `http://localhost:5173`.

Para comprobar la compilación de producción:

```bash
npm run build
npm run preview
```

La salida está en `dist/`. El alojamiento debe redirigir las rutas a `index.html` para permitir abrir directamente `/experience` o cualquier otra página. La configuración presupone publicación en la raíz del dominio; una subcarpeta requiere ajustar `base` de Vite y `basename` del router.

## Calidad y formato

```bash
npm run lint
npm test
npm run test:interactions
npm run format:check
```

`npm run format` aplica el formato consistente. Los comentarios están en español y la interfaz en inglés.

Las pruebas cubren fechas, solapamientos, huecos, consola, navegación, menús y tarjetas. Happy DOM simula el documento: no sustituye la comprobación en un navegador real de tamaños, contraste, animaciones y WebGL.

### Qué son las carpetas .qa-\*

Son compilaciones temporales de las pruebas de interacción, como `.qa-app-...` y `.qa-experience-...`. **QA** significa _Quality Assurance_.

Los scripts las borran al finalizar, incluso si una comprobación falla. Una interrupción brusca puede dejar restos. Se pueden borrar cuando no haya pruebas ejecutándose. Están excluidas de Git y no forman parte de la web publicada.

### Descargar el CV

El botón **Download CV** de Home utiliza un enlace HTML con el atributo `download`, sin instalar librerías ni cargar el documento al abrir la página.

1. Copia tu PDF en `public/cv/adrian-rodriguez-del-rio.pdf`.
2. Ejecuta `npm run dev` y prueba el botón. El archivo se sirve como `/cv/adrian-rodriguez-del-rio.pdf`; `public` no forma parte de la URL.

### Formación y cursos

La lista `education` en `src/data/portfolioData.ts` contiene nombre, entidad, fecha y estado. Para añadir formación futura, crea otra entrada con `status: 'in-progress'` cuando la empieces y cambia a `completed` al terminar. `credentialUrl` es opcional y solo debe apuntar a una credencial real. Los títulos se muestran traducidos al inglés.

El contenido se edita en `src/data/portfolioData.ts`. Las fechas de experiencia usan `YYYY-MM`; un final `null` representa un empleo vigente. Mantén la etiqueta `period` coherente con las fechas. Cada proyecto distingue su estado de publicación, código abierto o desarrollo.

La paleta está en `src/styles/tokens.css` y las dimensiones de las tarjetas en `src/pages/ExperiencePage.css`. `WebGLBackground.tsx` contiene la escena y `CursorHalo.tsx` el halo. Los efectos respetan las preferencias de accesibilidad; la escena se carga por separado y pausa el renderizado cuando la pestaña está oculta.
