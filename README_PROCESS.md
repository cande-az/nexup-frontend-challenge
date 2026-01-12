# Proceso de Desarrollo - Nexup Frontend Challenge

Proceso de desarrollo del challenge técnico, pensamientos, orden y decisiones que fui tomando al implementarlo.

---

## 🚀 Cómo Ejecutar el Proyecto

#### Desarrollo

##### ⏩️ Frontend App

```bash
# Iniciar app en desarrollo
npm start
```

##### ⏩️ Server JSON

```bash
# Iniciar server json
npm run server
```

- El frontend se ejecuta por defecto en `http://localhost:3000`
- El servidor JSON se ejecuta por defecto en `http://localhost:3001`

#### Testing

```bash
# Ejecutar tests
npm test
```

---

## 📁 Estructura del Proyecto

```
nexup-frontend-challenge/
├── public/                 # Plantilla
├── src/                    # Plantilla
└── json-server/            # SERVIDOR MOCK
```

---
## 🔏 Resumen
Este challenge me tomó aproximadamente dos horas. Lo fui haciendo en los tiempos muertos que tenía entre tareas.

Mi estrategia fue usar json-server para simular bien el backend y poder aplicar buenas prácticas en el front. La idea era no caer en meter toda la lógica del lado del cliente, porque muchas de esas cosas normalmente se resuelven del otro lado.

En cuanto a los estilos, los hice directamente en cada componente con `styled-components`, era lo mas sencillo para no crear tantos archivos. También tome la decision de mostrar las categorías en lista en vez de dropdown, como para que se pareciera mas a una app real.

Lo único que no llegué a implementar fue lo de stock, el resto quedó prácticamente todo hecho.

## 📝 Proceso de Desarrollo

### Commit 1: Creacion de JSON Server

Lo primero que hice fue configurar json-server para simular una API REST. Instalé axios para hacer las peticiones HTTP y creé una carpeta `json-server/` con un `db.json` lleno de productos de ejemplo (frutas, verduras, carnes con diferentes estados y precios).

La verdad es que podría haber empezado con datos hardcodeados directamente en el código, pero hacerlo así desde el principio me ahorra tiempo después cuando tenga que implementar los componentes, ya voy a estar trabajando con llamadas reales a una API (aunque sea mock), así que no voy a tener que refactorizar nada más adelante. Además, si después quiero agregar más funcionalidades como filtros o búsquedas, ya tengo la estructura lista para hacerlo.

> **Nota:** Los 50 productos del `db.json` los generé usando un prompt en ChatGPT. Le pasé la interfaz de `Product` para que generara datos consistentes y así ahorrar tiempo en crearlos manualmente.

### Commit 2: Implementación de Componentes y Lógica de Negocio

Después de tener el servidor mock listo, me puse a armar la interfaz. Creé los componentes principales: `ProductManager` que es el contenedor principal, `ProductList` que muestra los productos en un grid, y `ProductItem` que es cada tarjeta individual de producto. También agregué `CategoryFilter` en un sidebar, aunque todavía no está conectado a la lógica de filtrado.

Para manejar el estado y las peticiones a la API, creé un hook personalizado `useProducts` usando SWR. Esto me permite tener loading, error y los datos de productos de forma automática, sin tener que escribir tanto código base (ideal en este caso que es una prueba técnica). También armé la función `getProducts` en la capa de API que usa axios y construye los query strings para los filtros.

La verdad podría haber usado useState y useEffect directamente, pero SWR me ahorra mucho código y además me da caché automático, así que si cambio de filtro (categoría) y vuelvo, no tiene que hacer otra petición. Además, si después quiero agregar más funcionalidades como búsqueda full text, ya tengo la base lista.

Para los estilos, elegí usar `styled-components` directamente en cada componente en lugar de crear archivos CSS separados. Esto me permite tener los estilos unificados con el componente, reduciendo la cantidad de archivos en la prueba técnica. Como estilos base, agregué `normalize.css` para resetear estilos del navegador y un `index.css` con variables CSS para colores y tipografía que se pueden reutilizar en los styled-components.

> **Nota:** También creé una función utilitaria `buildQueryString` que construye query strings a partir de objetos de filtros genéricos. Aunque es una función simple, me permite tener una forma reutilizable de construir los parámetros de URL para las peticiones a la API, y solo incluye los parámetros que tienen valor (evita agregar `?category=undefined` por ejemplo). Es una pequeña abstracción que hace el código más limpio.

### Commit 3: Filtro de Categorías y Mejoras Visuales

Completé la funcionalidad del filtro de categorías conectándolo con el estado y sincronizándolo con la URL usando query parameters. Agregué colores diferenciados por categoría en los productos, un badge "Inactive" para productos inactivos, y manejo de estados de loading/error. También implementé ordenamiento por nombre ascendente por defecto.

Después refactoricé las funciones relacionadas con categorías a `utils/category.ts` para tener mejor organización del código y reutilizar la utilidad `buildQueryString` que ya tenía. Esto hace el código más mantenible y evita duplicación.

> **✅ Hasta acá ya se cumplió el challenge en cuanto a objetivos base y el agregar API.**

> **Nota:** Para la sincronización con la URL usé APIs nativas del navegador en lugar de React Router para mantener las dependencias mínimas. La documentación de las funcionalidades `utils` la hice con chat, para ahorrar tiempo.

### Commit 4: búsqueda fulltext

Metí la búsqueda fulltext como extra opcional del challenge. Armé el componente SearchInput con un botoncito para limpiar, y un hook useSearch que maneja el estado con debounce de 300ms para no spamear la API. Además el hook sincroniza el texto de búsqueda con la URL usando el parámetro q.

Para no repetir lógica, hice unas utilidades genéricas en `utils/url.ts` (`readUrlParam` y `writeUrlParam`) que sirven tanto para categoría como para búsqueda, así no duplico código al leer/escribir params en la URL.

En `ProductManager` dejé búsqueda y categoría como excluyentes: si el usuario busca, limpio la categoría, y si elige categoría, limpio la búsqueda. La idea es que no se pisen los filtros y sea más claro para el usuario. Los filtros los armo con `useMemo` para no recalcular al pedo.

> **Nota:** el debounce evita una request por cada tecla. Y lo de `popstate` es para que el back/forward del navegador mantenga el estado alineado con la URL (esto lo sumé como plus; no lo probé ultra a fondo).