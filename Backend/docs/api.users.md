# Coursetiny CRUD

## GET /user

get all user data. [admin only]

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns as same as below api but all users in db.

## GET /user/:id

get user data.

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the select user object.

```json
{
    "user": {
        "id": 1,
        "email": "test@test.com",
        "username": "tester",
        "firstName": "test",
        "lastName": "ter",
        "birthday": "1994-10-21",
        "sex": "male",
        "mobile_number": "222222222",
        "profile_photo": "some/url/profile.jpg",
        "aboutMe": "testsetsetset",
        "website": "https://test.com",
        "active": 1,
        "has_basic_info": 1,
        "has_edu_exp_info": 0,
        "has_id_card_info": 0,
        "has_bank_account_info": 0,
        "role": 1,
        "education": [
            {
                "id": 1,
                "university": "test university",
                "facility": "test facility",
                "degree": "degree",
                "education_photo": "some/url/aa.jpg"
            },
            {
                "id": 2,
                "university": "some university",
                "facility": "some facility",
                "degree": "very hight degree",
                "education_photo": "some/url/bb.jpg"
            }
        ],
        "experiece": [
            {
                "id": 1,
                "company": "csi",
                "position": "programmer",
                "startMonth": 2,
                "startYear": 2017,
                "endMonth": null,
                "endYear": null,
                "currentCompany": 1
            }
        ],
        "skills": [
            {
                "id": 1,
                "name": "dotA",
                "level": "very well"
            },
            {
                "id": 1,
                "name": "dotB",
                "level": "very great"
            }
        ],
        "idCard": {
            "number": "1129900176222",
            "title": 1,
            "firstName": "somchai",
            "lastName": "jaidee",
            "maritalStatus": 1,
            "idCardaddress": "moo 4 bal bal",
            "currentAddress": "moo 4 bal bal",
            "idCardPhoto": "some/url/aa.jpg"
        },
        "payment": {
            "bankId": 1,
            "branch": "tanamnon",
            "accountNo": "1213-123123-12312",
            "bookPhoto": "some/url/s.jpg"
        }
    }
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

### Example response

* Status: 403
* Content-Type: application/json; charset=utf-8

Returns the error message if not have permission.

```json
{
    "error": "forbidden"
}
```

## PATCH /user/:id

Update user data.

* Content-Type: application/json

```json
{
    "fistName": "Tony",
    "lastName": "Stack",
    "username": "tester",
    "mobileNumber": "088-888-9999",
    "email": "test@tyetset.com",
    "birthday": "2000-12-11",
    "sex": "female"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{}
```

## PATCH /user/:id/avatar

Update user avatar data.

* Content-Type: application/formdata

```json
{
    "file": "/picture.jpg"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{
    "src": "path/to/picture.jpg"
}
```

## PATCH /user/:id/password

Update user password.

* Content-Type: application/json

```json
{
    "password": "111111111223424",
    "oldPassword": "235235235235",
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{}
```
## GET /user/basic

Update user basic data.

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{
    "aboutMe": "hi my name is tony",
    "website": "https://test.com"
}
```
## PATCH /user/basic

Update user basic data.

* Content-Type: application/json

```json
{
    "aboutMe": "hi my name is tony",
    "website": "https://test.com"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{}
```
## GET /user/resume

get user education data.

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{
    "education": [
        {
            "id": 1,
            "university": "silpakorn",
            "facility": "art",
            "degree": "bachelor",
            "educationPhoto": "some/url/photo.jpg"
        },
        {
            "id": 2,
            "university": "ratthanathibeth",
            "facility": "-",
            "degree": "hight school",
            "educationPhoto": "some/url/photo.jpg"
        }
    ],
    "experience": [
        {
            "id": 1,
            "company": "csi",
            "position": "position",
            "startMonth": "1",
            "startYear": "2017",
            "endMonth": null,
            "endYear": null,
            "isCurrent": false
        },
        {
            "id": 2,
            "company": "isc",
            "position": "position",
            "startMonth": "1",
            "startYear": "2017",
            "endMonth": null,
            "endYear": null,
            "isCurrent": false
        }
    ],
    "skills": [
        {
            "id": 1,
            "name": "DotA",
            "level": "high"
        },
        {
            "id": 2,
            "name": "LoL",
            "level": "high"
        }
    ]
}
```

## POST /user/education

add user education data.

* Content-Type: application/json

```json
{
    "university": "silpakorn",
    "facility": "art",
    "degree": "bachelor",
    "educationPhoto": "some/url/photo.jpg"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{
    "insertId": 1
}
```

## POST /user/experience

add user experiece data.

* Content-Type: application/json

```json
{
    "company": "company",
    "position": "position",
    "startMonth": "1",
    "startYear": "2017",
    "endMonth": null,
    "endYear": null,
    "isCurrent": false
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{
    "insertId": 1
}
```

## POST /user/skills

add user skill data.

* Content-Type: application/json

```json
{
    "name": "DotA",
    "level": "high"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{
    "insertId": 1
}
```

## POST /user/idcard

add user id data.

* Content-Type: application/json

```json
{
    "number": "1112223334445",
    "titleId": 2,
    "firstName": "somchai",
    "lastName": "jaidee",
    "maritalStatusId": 1,
    "currentAddress": "324",
    "idCardAddress": "sdasdasd",
    "idCardPhoto": "some.jpg"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{}
```

## POST /user/payment

add user id data.

* Content-Type: application/json

```json
{
    "bank": 1,
    "branch": "tanamnon",
    "accountNo": "1231254152125",
    "bookPhoto": "account.jpg"
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns the empty object.

```json
{}
```
