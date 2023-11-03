# User API Spec

## Register User

Endpoint : POST /api/users

Request Body:

```json
{
  "username": "deni",
  "password": "secret",
  "name": "Deni Irawan"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "deni",
    "name": "Deni Irawan"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username Already Registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "deni",
  "password": "secret"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "unique token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or Password wrong!"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :
-Authorization : token

Request Body :

```json
{
  "name": "Deni Irawan",
  "password": "new password"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "deni",
    "name": "Deni Irawan"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :
-Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "deni",
    "name": "Deni Irawan"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/logout

Headers :
-Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Error:

```json
{
  "errors": "Unauthorized"
}
```
