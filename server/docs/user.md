# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "akhsan",
  "password": "rahasia",
  "name": "99 Online"
}
```

Response Body Success

```json
{
  "data": {
    "username": "akhsan",
    "name": "99 Online"
  }
}
```

Response Body Error

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Response Body Success

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error

```json
{
  "error": "Username or Password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization: token

Request Body :

```json
{
  "name": "99 Online", // optional
  "password": "new password" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "akhsan",
    "name": "99 Online"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization: token

Response Body Success

```json
{
  "data": {
    "username": "akhsan",
    "name": "99 Online"
  }
}
```

Response Body Errors

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization: token

Response Body Success

```json
{
  "data": "OK"
}
```

Response Body Errors

```json
{
  "data": "Unauthorized"
}
```
