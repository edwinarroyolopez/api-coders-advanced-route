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
    "name": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "phone": "1-570-236-7033"
  }
```

<b>Respuesta esperada (JSON)</b>
```json
  {
    "id": 1,
    "email": "John@gmail.com",
    "username": "johnd",
    "name": {
        "firstname": "John",
        "lastname": "Doe"
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

3. Get Posts (Endpoint Protegido) (GET /auth/posts)




## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
