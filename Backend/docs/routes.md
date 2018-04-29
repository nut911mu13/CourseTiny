# Routes

## Auth

- POST /auth/signup
- POST /auth/signin
- GET /auth/signout
- GET /auth/check
- POST /auth/verify
- POST /auth/checkemail
- GET /auth/forgetpassword?email=?
- POST /auth/forgetpassword

## Users
- GET /user
- GET /user/:id
- PATCH /user/:id
- PATCH /user/:id/avatar
- PATCH /user/:id/basic
- PATCH /user/:id/password
- POST /user/:id/education
- POST /user/:id/experience
- POST /user/:id/skills
- POST /user/:id/idcard
- POST /user/:id/bank
- PATCH /user/:id/education/:id
- PATCH /user/:id/experience/:id
- PATCH /user/:id/skills/:id
- DELETE /user/:id/education/:id
- DELETE /user/:id/experience/:id
- DELETE /user/:id/skills/:id
- GET /user/:id/orders
- GET /user/:id/courses

## Courses

- GET /courses
- POST /courses
- GET /courses/:title
- PATCH /courses/:title

## Order

- POST /orders
- GET /orders/:id
- PATCH /orders/:id

## Categories
- GET /categories
