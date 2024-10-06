<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


## Description

Este proyecto es un ejemplo de una API construida con NestJS que incluye:
- Registro de usuario (`signup`)
- Autenticación (`login`)
- Endpoint protegido (`getPosts`)


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Documentación de los Endpoints
```bash
http://localhost:7000/auth/signup
```


#### 1. Signup (POST /auth/signup) 
Registra un nuevo usuario usando la API externa https://fakestoreapi.com/users.

<b>URL</b>
```bash
http://localhost:7000/auth/signup
```
Método: <b>POST</b>

Headers
- Content-Type: <b>application/json</b>

<b>body (JSON)</b>
```json
  {
    "email": "john@gmail.com",
    "username": "johnd",
    "password": "m38rmF$",
    "username": "johnd",
    "name": "John Doe"
    "phone": "1-570-236-7033"
  }
```

<b>Respuesta esperada (JSON)</b>
```json
  {
    "id": 1,
    "email": "John@gmail.com",
    "username": "johnd",
    "name": "John Doe",
    "phone": "1-570-236-7033"
  }
```

#### 2. Login (POST /auth/login)

Inicia sesión con las credenciales del usuario y devuelve un token JWT que se usará para acceder a endpoints protegidos.

<b>URL</b>
```bash
http://localhost:7000/auth/login
```
Método: <b>POST</b>

Headers
- Content-Type: <b>application/json</b>

<b>body (JSON)</b>
```json
  {
      "username": "ed",
      "password": "83r5^_"
  }
```
<b>Respuesta esperada (JSON)</b>
```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
            "_id": "6702b4486184883d4c6522a2",
            "email": "ed@gmail.com",
            "username": "ed",
            "name": "Ed",
            "phone": "3016453022",
            "__v": 0
    }
  }
```

#### 3. Get Products (Endpoint Protegido) (GET /auth/products)

<b>URL</b>
```bash
http://localhost:7000/auth/products
```
Método: <b>GET</b>

Headers
- Authorization: Bearer ```<access_token> ``` (Reemplaza ```<access_token> ``` con el token obtenido al hacer login).

- Content-Type: <b>application/json</b>

<b>Respuesta esperada (JSON)</b>
```json
  [
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest...",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    },
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket...",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_UL1500_.jpg",
      "rating": {
        "rate": 4.1,
        "count": 259
      }
    }
    // Más productos...
]
```


#### 4. Get Product By Id (Endpoint Protegido) (GET /auth/products/:id)

<b>URL</b>
```bash
http://localhost:7000/auth/products/:id
```
Método: <b>GET</b>

Headers
- Authorization: Bearer ```<access_token> ``` (Reemplaza ```<access_token> ``` con el token obtenido al hacer login).

- Content-Type: <b>application/json</b>

<b>Respuesta esperada (JSON) para : ``` http://localhost:7000/auth/products/2 ```</b>
```json
  {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      "rating": {
        "rate": 4.1,
        "count": 259
      }
  }
```




#### 5. Dar "Me gusta" a un producto (Endpoint Protegido) (POST /auth/products/:id/like)

<b>URL</b>
```bash
 http://localhost:7000/auth/products/:id/like
```
Método: <b>POST</b>

Headers
- Authorization: Bearer ```<access_token> ``` (Reemplaza ```<access_token> ``` con el token obtenido al hacer login).

- Content-Type: <b>application/json</b>

<b>Respuesta esperada (JSON) para : ``` http://localhost:7000/auth/products/2/like ```</b>
```json
    {
       message: 'Producto marcado como me gusta'
     }
```


#### 6. Quitar "Me gusta" a un producto (Endpoint Protegido) (DELETE /auth/products/:id/like)

<b>URL</b>
```bash
 http://localhost:7000/auth/products/:id/like
```
Método: <b>DELETE</b>

Headers
- Authorization: Bearer ```<access_token> ``` (Reemplaza ```<access_token> ``` con el token obtenido al hacer login).

- Content-Type: <b>application/json</b>

<b>Respuesta esperada (JSON) para : ``` http://localhost:7000/auth/products/2/like ```</b>
```json
   {
     message: 'Me gusta eliminado' 
   }
```



#### 7. Dar "Me gusta" a un producto (Endpoint Protegido) (POST /auth/checkout)

<b>URL</b>
```bash
 http://localhost:7000/auth/products/checkout
```
Método: <b>POST</b>

Headers
- Authorization: Bearer ```<access_token> ``` (Reemplaza ```<access_token> ``` con el token obtenido al hacer login).

- Content-Type: <b>application/json</b>

<b>body (JSON)</b>
```json
  {
    "products": [
      { "id": 1, "quantity": 2, "price": 50.0 },
      { "id": 2, "quantity": 1, "price": 100.0 }
    ],
    "totalItems": 3,
    "priceTotal": 200.0
  }
```



<b>Respuesta esperada (JSON) para : ``` http://localhost:7000/auth/products/checkout```</b>
```json
  {
      "message": "Venta realizada correctamente"
  }
```





## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
