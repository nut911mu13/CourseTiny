# Coursetiny API
**All routes are prefixed with /api**
## auth
### sign up a user
> POST /auth/signup

##### example send data
json
```json
{
    "email": "abc@abc.com",
    "password": "123456",
    "firstName": "john",
    "lastName": "doe",
    "mobileNumber": "0891233333",
    "sex": "male",
    "birthday": "1992-12-12"
}
```
### sign in a user
> POST /auth/signin
##### example send data
json
```json
{
	    "email": "abc@abc.com",
	    "password": 123456,
	    "remember": false
}
```
### sign out a user
> GET /auth/signout
### check user authorization
> GET /auth/check
## courses
### get course tickets
> GET /courses/:id/tickets
### get course by title
> GET /courses/:title
### list all courses
> GET /courses
### create course
> POST /courses
##### example send data
multi-part formdata
```json
{
    "cover": [file],
    "title": "aaaaa",
    "startDate": "2018-02-23",
    "endDate": "2018-02-28",
    "location": "somewhere",
    "description": "some text",
    "category": 1,
    "tickets": [
        {
            "name": "Early Bird",
            "detail": "some detail",
            "startDate": "2018-01-16",
            "endDate": "2018-01-17",
            "price": 1500,
            "quantity": 20
        },
        {
            "name": "Regular",
            "detail": "some detail",
            "startDate": "2018-01-16",
            "endDate": "2018-01-17",
            "price": 2500,
            "quantity": 50
        }
    ]
}
```
## user
### update user profile
> PATCH/user/:id
##### example send data
json
```json
{
  "username": "test",
  "firstName": "aaaaa",
  "lastName": "aabbbb",
  "birthday": "1992-10-19",
  "sex": "male",
  "mobileNumber": "0891233627"
}
```
### update user profile photo
> POST/user/:id/profile-photo
##### example send data
multi-part formdata
```json
{
 "profilePhoto": [file]
}
```
### update user profile basic
> PATCH /user/:id/basic
##### example send data
json
```json
{
  "aboutMe": "tetst",
  "website": "https://test.com"
}
```
### update user password
> PATCH /user/:id/password
##### example send data
json
```json
{
  "oldPassword": "12345678",
  "password": "1111111111"
}
```
### create user education
> POST /user/:id/education
##### example send data
multi-part formdata
```json
{
  "university": "silpakorn",
  "facility": "art",
  "degree": "bachelor",
  "educationPhoto": [file]
}
```
### create user experience
> POST /user/:id/experience
##### example send data
json
```json
{
  "company": "test",
  "position": "test",
  "startMonth": "2",
  "startYear": "2011",
  "endMonth": "",
  "endYear": "",
  "isCurrent": 1
}
```
### create user skill
> POST /user/:id/skills
##### example send data
json
```json
{
  "name": "test",
  "level": "test"
}
```
### create or replace user id card
> POST /user/:id/idcard
##### example send data
multi-part formdata
```json
{
  "number": "1234151515155",
  "titleId": 1,
  "firstName": "john",
  "lastName": "doe",
  "maritalStatusId": 1,
  "currentAddress": "aa aaa csdsd",
  "idCardAddress": "aa aaa csdsd",
  "idCardPhoto": [file]
}
```
### create or replace user bank
> POST /user/:id/bank
##### example send data
multi-part formdata
```json
{
  "bankId": "1",
  "branch": "aaaa",
  "accountNo": "12242342-34234234",
  "bookPhoto": [file]
}
```
### update user education
> PATCH /user/:id/education/:eduId
##### example send data
multi-part formdata
```json
{
  "university": "silpakorn",
  "facility": "art",
  "degree": "bachelor",
  "educationPhoto": [file]
}
```
### update user experience
> PATCH /user/:id/experience/:expId
##### example send data
json
```json
{
  "company": "11",
  "position": "aa",
  "startMonth": "2",
  "startYear": "2011",
  "endMonth": "5",
  "endYear": "2013",
  "isCurrent": 0
}
```
### update user skill
> PATCH /user/:id/skills/:skillId
##### example send data
json
```json
{
  "name": "dotA2",
  "level": "hight"
}
```
### delete user education
> DELETE /user/:id/education/:eduId
### delete user experience
> DELETE /user/:id/experience/:expId
### delete user skill
> DELETE /user/:id/skills/:skillId
### get user orders
> GET /user/:id/orders
### get user courses
> GET /user/courses
### get user information
> GET /user/:id

## categories
Get categories list
> GET /categories

## form options
Get id card form option list
> GET /forms/idcard



## order
### get order information
> GET /orders/:id
### create order
> POST /orders
##### example send data
json
```json
{
    "tickets": [
      {
        "id": 54,
        "amount": 1
      },
      {
        "id": 55,
        "amount": 2
      }
    ]
}
```
### confirm order
> PATCH /orders/:id
##### example send data
json
```json
{
  "BuyerFirstName": "aaa",
  "BuyerLastName": "bbb",
  "BuyerEmail": "abc@edc.com",
  "BuyerMobileNumber": "0891112222",
  "tickets": [
    {
      "same": false,
      "id": 54,
      "firstName": "abb",
      "lastName": "bbssb",
      "email": "as@edc.com",
      "mobileNumber": "0891112224",
    },
    {
      "same": true,
      "id": 55,
      "firstName": "",
      "lastName": "",
      "email": "",
      "mobileNumber": "",
    }
  ]
}
```
### delete order
> DELETE /orders/:id
