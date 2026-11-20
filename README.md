# Asador Andaluz / Tomato

Aplicacion MERN completa para mostrar platos, gestionar un carrito, realizar pedidos,
pagar con Stripe y administrar el catalogo desde un panel separado.

## Contenido

- [Arquitectura](#arquitectura)
- [Tecnologias](#tecnologias)
- [Estructura](#estructura)
- [Configuracion](#configuracion)
- [Ejecucion local](#ejecucion-local)
- [Backend](#backend)
- [Frontend](#frontend)
- [Panel administrador](#panel-administrador)
- [Flujo de compra](#flujo-de-compra)
- [Compilacion](#compilacion)
- [Documentacion detallada](#documentacion-detallada)

## Arquitectura

```text
Cliente React --> API Express --> MongoDB
                    |              |
                    +--> Stripe    +--> Usuarios, productos y pedidos
                    +--> uploads
Panel React --------+
```

El cliente y el panel se comunican con el backend mediante Axios. Express valida las
peticiones, Mongoose guarda los datos en MongoDB y Stripe crea sesiones de pago.

## Tecnologias

| Parte | Tecnologias |
| --- | --- |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Multer, Stripe |
| Frontend | React, React Router, Context API, Axios, React Toastify, Vite |
| Admin | React, React Router, Context API, Axios, React Toastify, Vite |

## Estructura

```text
backend/
  config/db.js              Conexion con MongoDB
  controllers/              Logica de usuarios, productos, carrito y pedidos
  middleware/auth.js        Validacion JWT
  models/                   Esquemas Mongoose
  routes/                   Endpoints HTTP
  uploads/                  Imagenes de productos
  server.js                 Punto de entrada del servidor

frontend/src/
  assets/                   Imagenes y datos del catalogo
  components/               Componentes reutilizables
  context/                  Estado global y llamadas al API
  pages/                    Paginas del router
  utils/translations.js     Traducciones al español

admin/src/
  assets/                   Recursos visuales
  components/               Inicio de sesion y navegacion
  context/                  Sesion administrativa
  pages/                    Alta, listado y pedidos
```

## Configuracion

Crea `backend/.env`:

```dotenv
PORT=4000
MONGO_URL=mongodb://localhost:27017/asador_andaluz
JWT_SECRET=clave_secreta_larga
SALT=10
STRIPE_SECRET_KEY=sk_test_...
```

- `PORT`: puerto del servidor; si no se define usa `4000`.
- `MONGO_URL`: cadena de conexion MongoDB.
- `JWT_SECRET`: firma y verifica los tokens.
- `SALT`: numero de rondas usadas por Bcrypt.
- `STRIPE_SECRET_KEY`: clave privada de Stripe.

Las URL remotas estan configuradas en:

- `frontend/src/context/StoreContext.jsx`
- `admin/src/App.jsx`
- `backend/controllers/orderController.js`

## Ejecucion local

```bash
cd backend && npm ci
npm run server

cd ../frontend && npm ci
npm run dev

cd ../admin && npm ci
npm run dev
```

Puertos habituales:

- Backend: `http://localhost:4000`
- Cliente: `http://localhost:5173`
- Administrador: `http://localhost:5174`

## Backend

`server.js` habilita Express y CORS, conecta MongoDB y registra:

- `/api/food`
- `/api/user`
- `/api/cart`
- `/api/order`
- `/images`

### Modelos

- `user`: nombre, correo unico, contraseña cifrada, rol y carrito.
- `food`: nombre, descripcion, precio, imagen y categoria.
- `order`: usuario, productos, importe, direccion, estado, fecha y pago.

El modelo `user` usa `mongoose.models.user` para evitar registrar dos veces el modelo
durante recargas. El modelo `order` establece la fecha mediante `Date.now` como funcion,
por lo que Mongoose crea una fecha nueva en cada documento.

### Seguridad

`middleware/auth.js` lee el encabezado `token`, verifica el JWT con `JWT_SECRET` y añade
el identificador autenticado en `req.body.userId`.

Las operaciones administrativas comprueban `role === "admin"` antes de continuar.

### API

| Metodo | Ruta | Requisitos | Funcion |
| --- | --- | --- | --- |
| POST | `/api/user/register` | - | Crear usuario |
| POST | `/api/user/login` | - | Iniciar sesion |
| GET | `/api/food/list` | - | Listar productos |
| POST | `/api/food/add` | JWT + admin | Crear producto |
| POST | `/api/food/remove` | JWT + admin | Eliminar producto |
| POST | `/api/cart/add` | JWT | Añadir unidad |
| POST | `/api/cart/remove` | JWT | Quitar unidad |
| POST | `/api/cart/get` | JWT | Obtener carrito |
| POST | `/api/order/place` | JWT | Crear pedido y Stripe |
| POST | `/api/order/verify` | - | Confirmar o cancelar pago |
| POST | `/api/order/userorders` | JWT | Pedidos del usuario |
| GET | `/api/order/list` | JWT + admin | Todos los pedidos |
| POST | `/api/order/status` | JWT + admin | Cambiar estado |

Las respuestas controladas usan `{ success: true, ... }` o
`{ success: false, message: "..." }`.

## Frontend

`src/main.jsx` crea la raiz React, registra `BrowserRouter` y envolvera la aplicacion
con `StoreContextProvider`.

### Rutas

| Ruta | Componente |
| --- | --- |
| `/` | Catalogo principal |
| `/cart` | Carrito |
| `/order` | Datos de entrega y pago |
| `/verify` | Confirmacion de Stripe |
| `/myorders` | Pedidos del usuario |

### Estado global

`StoreContext.jsx` expone el catalogo, el carrito, el token y las operaciones de añadir,
eliminar y calcular el subtotal. Al iniciar carga el token de `localStorage`, obtiene
los productos y sincroniza el carrito del usuario.

### Componentes

- `Navbar`: navegacion, acceso y perfil.
- `Header`: portada.
- `ExploreMenu`: filtros por categoria.
- `FoodDisplay`: listado filtrado.
- `FoodItem`: tarjeta y cantidades.
- `LoginPopup`: registro y acceso.
- `Footer`: enlaces e informacion.

## Panel administrador

Solo acepta cuentas cuyo rol sea `admin`.

| Ruta | Funcion |
| --- | --- |
| `/` | Inicio de sesion |
| `/add` | Crear producto e subir imagen |
| `/list` | Consultar y eliminar productos |
| `/orders` | Consultar pedidos y cambiar estado |

El contexto conserva `token` y `admin` en estado React y `localStorage`.

## Flujo de compra

1. El usuario inicia sesion o se registra.
2. El frontend obtiene los productos.
3. Se añade el producto al carrito.
4. Se abre el formulario de entrega.
5. El backend crea el pedido y vacia el carrito.
6. Stripe crea la sesion de pago.
7. El usuario vuelve a `/verify`.
8. El backend confirma el pago o elimina el pedido cancelado.
9. El usuario consulta el pedido en `/myorders`.

## Estados de pedido

- `Food Processing`: preparado.
- `Out for delivery`: en reparto.
- `Delivered`: entregado.

## LocalStorage

- `token`: JWT del usuario o administrador.
- `admin`: marca local del acceso administrativo.

## Compilacion

```bash
cd frontend && npm run build
cd admin && npm run build
```

Las salidas se generan en `dist/`.

## Documentacion detallada

Consulte [DOCUMENTACION_CODIGO.md](DOCUMENTACION_CODIGO.md).
