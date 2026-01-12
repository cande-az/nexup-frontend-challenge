# Proceso de Desarrollo - Nexup Frontend Challenge

Proceso de desarrollo del challenge técnico, pensamientos,orden y decisiones que fui tomando al implementarlo.

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
