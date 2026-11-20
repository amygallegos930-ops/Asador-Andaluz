# Backend

API Express con MongoDB y Stripe.

```bash
npm ci
npm run server
```

Variables necesarias en `.env`:

```dotenv
PORT=4000
MONGO_URL=mongodb://localhost:27017/asador
JWT_SECRET=clave_secreta
SALT=10
STRIPE_SECRET_KEY=sk_test_...
```

Las rutas protegidas usan `token` en el encabezado HTTP. Los modelos usan Mongoose y
los archivos subidos se sirven desde `/images`.
