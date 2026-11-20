# Documentacion detallada del codigo

## Backend

### server.js

Punto de entrada de Express. Configura JSON y CORS, conecta MongoDB y monta los cuatro
routers principales. Sirve `backend/uploads` como archivos estaticos de `/images`.

### config/db.js

Exporta `connectDB`. Llama a `mongoose.connect` con `MONGO_URL` y registra el resultado
de la conexion.

### middleware/auth.js

Lee el encabezado `token`, verifica el JWT y asigna `req.body.userId`. Si falta el token
o no es valido, devuelve una respuesta controlada sin continuar.

### models/foodModel.js

Define el documento `food`: nombre, descripcion, precio, imagen y categoria. Todos los
campos son obligatorios. El modelo se reutiliza mediante `mongoose.models.food`.

### models/userModel.js

Define el documento `user`: nombre, correo unico, contraseña cifrada, rol y carrito.
El rol predeterminado es `user`. `cartData` predeterminado es `{}` y no se minimiza.

### models/orderModel.js

Define el documento `order`: usuario, productos, importe, direccion, estado, fecha y
payment. El estado inicial es `Food Processing`, la fecha inicial se genera con
`Date.now` y payment empieza en `false`.

### controllers/userController.js

- `createToken`: firma el identificador con JWT.
- `registerUser`: valida correo y longitud, cifra la contraseña y crea el usuario.
- `loginUser`: busca el correo, compara el hash y devuelve token y rol.

### controllers/cartController.js

- `addToCart`: crea o incrementa la cantidad de un producto.
- `removeFromCart`: reduce la cantidad y elimina el producto al llegar a cero.
- `getCart`: devuelve `cartData` del usuario autenticado.

### controllers/foodController.js

- `addFood`: guarda la imagen y crea el producto tras comprobar rol admin.
- `listFood`: devuelve todos los documentos de producto.
- `removeFood`: elimina la imagen y el documento tras comprobar rol admin.

### controllers/orderController.js

- `placeOrder`: crea el pedido, vacia el carrito y crea una sesion Stripe.
- `verifyOrder`: confirma el pago o elimina el pedido cancelado.
- `userOrders`: obtiene pedidos del usuario autenticado.
- `listOrders`: obtiene todos los pedidos si el usuario es administrador.
- `updateStatus`: cambia el estado si el usuario es administrador.

### routes

- `userRoute.js`: registro y acceso.
- `cartRoute.js`: todas las rutas usan autenticacion.
- `foodRoute.js`: Multer guarda imagenes y aplica autenticacion a alta y baja.
- `orderRoute.js`: autenticacion en operaciones privadas y administracion.

## Frontend

### main.jsx

Monta React, BrowserRouter y el proveedor de contexto.

### App.jsx

Controla el popup de login y declara las rutas `/`, `/cart`, `/order`, `/verify`
y `/myorders`.

### context/StoreContext.jsx

Contiene `cartItems`, `food_list`, `token` y `url`. Añade, elimina y sincroniza productos
con el backend. `getTotalCartAmount` suma precio por cantidad.

### components/Navbar/Navbar.jsx

Navegacion principal, acceso, cierre de sesion y enlace a pedidos.

### components/Header/Header.jsx

Portada principal y acceso visual al menu.

### components/ExploreMenu/ExploreMenu.jsx

Representa categorias y actualiza la categoria seleccionada.

### components/FoodDisplay/FoodDisplay.jsx

Filtra `food_list` segun categoria y representa `FoodItem`.

### components/FoodItem/FoodItem.jsx

Muestra producto, descripcion, precio e imagen. Permite cambiar su cantidad.

### components/LoginPopup/LoginPopup.jsx

Cambia entre inicio de sesion y registro, envia credenciales y guarda el JWT.

### components/AppDownload/AppDownload.jsx

Presenta el bloque de descarga de aplicaciones.

### components/Footer/Footer.jsx

Presenta descripcion, enlaces, redes sociales y copyright.

### pages/Home/Home.jsx

Administra la categoria global y compone portada, menu y productos.

### pages/Cart/Cart.jsx

Muestra productos del carrito y calcula subtotal, envio y total.

### pages/PlaceOrder/PlaceOrder.jsx

Recoge entrega, impide pedidos invalidos y crea la sesion de Stripe.

### pages/Verify/Verify.jsx

Lee los parametros de Stripe y confirma el pedido.

### pages/MyOrders/MyOrders.jsx

Consulta y representa los pedidos del usuario.

### utils/translations.js

Centraliza traducciones de nombres, categorias y descripciones.

## Panel administrador

### main.jsx

Monta React, BrowserRouter y el contexto administrativo.

### App.jsx

Declara las rutas `/`, `/add`, `/list` y `/orders`.

### context/StoreContext.jsx

Guarda y restaura `token` y `admin` desde `localStorage`.

### components/Login/Login.jsx

Inicia sesion y permite continuar solo si el usuario devuelve rol `admin`.

### components/Navbar/Navbar.jsx

Barra superior del panel.

### components/Sidebar/Sidebar.jsx

Navegacion hacia alta, listado y pedidos.

### pages/Add/Add.jsx

Recoge imagen, nombre, descripcion, precio y categoria, y envía `FormData`.

### pages/List/List.jsx

Obtiene productos y permite eliminarlos.

### pages/Orders/Orders.jsx

Obtiene pedidos, muestra sus datos y permite cambiar estado.
