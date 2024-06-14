# Tienda de Ropa

Este proyecto es una tienda en línea con un catálogo de productos y un dashboard para
el administrador. Los productos se almacenan en una base de datos MongoDB en Atlas.

## Índice

  - [Estructura de archivos](#estructura-de-archivos)
  - [Configuración Inicial](#configuración-inicial)
  - [Modelos](#modelos)
  - [Rutas](#rutas)
  - [Controladores](#controladores)
  - [Despliegue](#despliegue)
  - [Recursos](#recursos)

## Estructura de archivos

Vamos a crear la estructura de archivos que vamos a necesitar para el proyecto. 

```
.
├── src
│   ├── config
│   │   ├── db.js
│   │   └── firebase.js (BONUS)
│   ├── controllers
│   │   ├── productController.js
│   │   └──authController.js (BONUS)
│   ├── models
│   │   └── Product.js
│   ├── routes
│   │   └── productRoutes.js
│   │   └── authRoutes.js (BONUS)
│   ├── middlewares (BONUS)
│   │   └── authMiddleware.js
│   └── index.js
├── test (BONUS)
│   └── productController.test.js
├── public
│   ├── styles.css
│   └── images (OPCIONAL)
├── .env
└── package.json

```

## Configuración Inicial

1. Base de Datos:

Crear un proyecto en MongoDB Atlas, un clúster y una base de datos.
Guardar la URI en .env:

```
MONGO_URI=<uri_bd_atlas>
```

2. Servidor:

Instalar dependencias:

```
npm install express mongoose dotenv
```

Crear src/index.js para configurar el servidor Express y conectar a MongoDB.

## Modelos

- Producto:
Crear src/models/Product.js para definir el esquema del producto con Mongoose.

## Rutas

- Producto:
Crear src/routes/productRoutes.js para definir rutas CRUD para productos.

## Controladores

- Producto:
Crear src/controllers/productController.js para manejar la lógica CRUD de productos.

## Despliegue

Desplegar en Render configurando el repositorio y las variables de entorno.

## Recursos

- Express: Express Documentation
- Mongoose: Mongoose Documentation
- MongoDB Atlas: MongoDB Atlas Documentation
- Render: https://render.com/