# TechStore

Tienda de tecnología de demostración construida con React. Permite explorar el catálogo de DummyJSON, consultar detalles, gestionar un carrito y simular el cierre de una compra.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

Vite mostrará la dirección local para abrir la aplicación. Para generar y servir una compilación de producción:

```bash
npm run build
npm run preview
```

Las pruebas de operaciones del carrito se ejecutan con:

```bash
npm test
```

## Tecnologías

- React 18 y JavaScript con JSX
- Hooks de React: `useState`, `useEffect`, `useContext`, `useMemo` y `useCallback`
- React Router DOM para navegación de cliente
- React-Bootstrap y Bootstrap para la interfaz responsive
- Font Awesome Free Solid para iconografía
- Vite para desarrollo y compilación
- Node.js Test Runner para pruebas ligeras

## Funcionalidades

- Catálogo real con filtro por categoría, estados de carga, error y sin resultados.
- Vista de detalle con imagen tolerante a errores, descripción, rating y stock.
- Selector de unidades local al detalle; valida cantidades mínimas y stock disponible.
- Carrito global sin duplicados, con controles de stock, subtotales y total.
- Checkout con resumen, eliminación individual, opción de vaciar y estado de carrito vacío.
- Compra simulada con identificador de orden y confirmación; no procesa pagos ni usa backend.
- Navegación responsive, diseño adaptable y controles accesibles con etiquetas y textos alternativos.

## API

El servicio centralizado `src/services/productsApi.js` consume DummyJSON mediante `fetch` y `async/await`:

- `GET https://dummyjson.com/products`: catálogo.
- `GET https://dummyjson.com/products/{id}`: detalle individual.
- `GET https://dummyjson.com/products/category/{category}`: catálogo filtrado.
- `GET https://dummyjson.com/products/category-list`: opciones del filtro.

El servicio valida las respuestas y distingue los fallos HTTP, de red y de formato; las solicitudes de componentes se pueden cancelar al abandonar una vista.

## Estructura

```text
src/
├── components/
│   ├── AddItemButton/
│   ├── Brief/
│   ├── CartWidget/
│   ├── Checkout/
│   ├── Item/
│   ├── ItemDetail/
│   ├── ItemDetailContainer/
│   ├── ItemList/
│   ├── ItemListContainer/
│   ├── ItemQuantitySelector/
│   └── NavBar/
├── context/CartContext.jsx
├── pages/                 # Home, detalle y checkout
├── services/productsApi.js
├── styles/app.css
├── App.jsx
└── main.jsx

tests/cartLogic.test.js
```

## Arquitectura y decisiones

- **Pages** conectan rutas con la experiencia de catálogo, detalle y checkout.
- **Containers** coordinan peticiones y estados asíncronos; `ItemList` e `Item` presentan el catálogo sin lógica de red.
- **ItemQuantitySelector** mantiene el borrador de cantidad local. La cantidad solo llega al carrito cuando el usuario confirma agregar.
- **CartContext** centraliza `cartItems`, `addItem`, `removeItem`, `clearCart`, `getItemQuantity`, `totalQuantity` y `total`. Los productos se identifican por ID; agregar el mismo producto aumenta su cantidad y se rechazan cantidades inválidas o superiores al stock. Cantidad total y monto se derivan del estado, y el resumen reutiliza el total del contexto.
- El checkout simulado valida el carrito, crea un número de orden de demostración y lo vacía. No hay servidor ni persistencia entre recargas.
- La interfaz utiliza componentes reales de React-Bootstrap, Bootstrap y estilos propios acotados para la identidad visual y el diseño móvil.

## Componentes obligatorios

`NavBar`, `CartWidget`, `ItemListContainer`, `ItemList`, `Item`, `ItemDetailContainer`, `ItemDetail`, `ItemQuantitySelector`, `AddItemButton`, `CartContext`, `Checkout` y `Brief` están implementados como componentes separados, con responsabilidades específicas.
