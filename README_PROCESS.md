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
