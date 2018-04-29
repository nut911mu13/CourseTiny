# Coursetiny CRUD

## POST /auth/signup

Sign up new user.

* Content-Type: application/json

```json
{
    "email": "test@example.com",
    "password": "password 1234 lol ezez!!!!",
    "firstName": "John",
    "lastName": "Doe",
    "mobileNumber": "089-111-2222",
    "sex": "male",
    "birthDay": "1992-03-21"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{}
```

---
### Example response

* Status: 400
* Content-Type: application/json; charset=utf-8

Returns the error message if sign up fail

```json
{
    "error": "email exists"
}
```

## POST /auth/signin

Sign in user.

* Content-Type: application/json

```json
{
    "email": "test@example.com",
    "password": "password 1234 lol ezez!!!!",
    "rememberMe": true
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{}
```

### Example response

* Status: 401
* Content-Type: application/json; charset=utf-8

Returns the error message if not authorized.

```json
{
    "error": "wrong password"
}
```

## GET /auth/signout

Sign out user.

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{}
```

## POST /auth/verify

Verify user email from token.

* Content-Type: application/json

```json
{
    "token": "123456789"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object

```json
{}
```

### Example response

* Status: 400
* Content-Type: application/json; charset=utf-8

Returns the error message if token not found or invalid

```json
{
    "error": "invalid token"
}
```
## GET /auth/check

Check user authorization

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{
    "userId": 1,
    "profilePhoto": "some/url/profile.jpg"
}
```

### Example response

* Status: 401
* Content-Type: application/json; charset=utf-8

Returns the error message if not sign in.

```json
{
    "error": "unauthorized"
}
```
## POST /auth/forgetpassword

generate reset password code &
send an email for resetting password

* Content-Type: application/json

```json
{
    "email": "test@example.com"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{}
```

### Example response

* Status: 400
* Content-Type: application/json; charset=utf-8

Returns the error message if email is not found.

```json
{
    "error": "email is not found."
}
```
