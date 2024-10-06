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
http://localhost:3000/auth/signup
```


#### 1. Signup (POST /auth/signup) 
Registra un nuevo usuario usando la API externa https://fakestoreapi.com/users.

<b>URL</b>
```bash
http://localhost:3000/auth/signup
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
    "name": "John Doe"
    },
    "phone": "1-570-236-7033"
  }
```

#### 2. Login (POST /auth/login)

Inicia sesión con las credenciales del usuario y devuelve un token JWT que se usará para acceder a endpoints protegidos.

<b>URL</b>
```bash
http://localhost:3000/auth/login
```
Método: <b>POST</b>

Headers
- Content-Type: <b>application/json</b>

<b>body (JSON)</b>
```json
  {
      "username": "mor_2314",
      "password": "83r5^_"
  }
```
<b>Respuesta esperada (JSON)</b>
```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
```

#### 3. Get Products (Endpoint Protegido) (GET /auth/products)

<b>URL</b>
```bash
http://localhost:3000/auth/products
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



## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
