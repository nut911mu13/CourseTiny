# Coursetiny CRUD

## GET /courses/

get all course.

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns list of courses

```json
{
    "courses": [
        {
            "id": 112,
            "title": "อบรมการท่องเที่ยว",
            "cover": "/img/tour.jpg",
            "startDate": "10-02-2018",
            "endDate": "25-02-2018",
            "location": "Siamcenter, Bangkok",
            "description": "Lorem ipsum lol lol 555+",
            "user": {
                "id": 1,
                "firstName": "John",
                "lastName": "Doe"
            }
        },
        {
            "id": 113,
            "title": "อบรมจับโปเกม่อน",
            "cover": "/img/pikachu.jpg",
            "startDate": "15-02-2018",
            "endDate": "30-02-2018",
            "location": "Siamcenter, Bangkok",
            "description": "Lorem ipsum lol lol 555+",
            "user": {
                "id": 1,
                "firstName": "John",
                "lastName": "Doe"
            }
        }
    ]
}
```

## POST /courses

Create new course

* Content-Type: application/json

```json
{
    "title": "อบรมการท่องเที่ยว",
    "cover": "/img/tour.jpg",
    "startDate": "10-02-2018",
    "endDate": "25-02-2018",
    "location": "Siamcenter, Bangkok",
    "description": "Lorem ipsum lol lol 555+",
    "tickets": [
        {
            "name": "Early Bird",
            "detail": "some detail",
            "startDate": "11-01-2018",
            "endDate": "15-01-2018",
            "price": 1500,
            "quantity": 20,
            "remaining": 15
        },
        {
            "name": "Regular",
            "detail": "some detail",
            "startDate": "16-01-2018",
            "endDate": "09-01-2018",
            "price": 2500,
            "quantity": 50,
            "remaining": 46
        }
    ]
}
```

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8
Returns the course object.
```json
{
    "id": 113,
    "title": "อบรมการท่องเที่ยว",
    "cover": "/img/tour.jpg",
    "startDate": "10-02-2018",
    "endDate": "25-02-2018",
    "location": "Siamcenter, Bangkok",
    "description": "Lorem ipsum lol lol 555+",
    "tickets": [
        {
            "id": 122,
            "name": "Early Bird",
            "detail": "some detail",
            "startDate": "11-01-2018",
            "endDate": "15-01-2018",
            "price": 1500,
            "quantity": 20,
            "remaining": 15
        },
        {
            "id": 123,
            "name": "Regular",
            "detail": "some detail",
            "startDate": "16-01-2018",
            "endDate": "09-01-2018",
            "price": 2500,
            "quantity": 50,
            "remaining": 46
        }
    ]
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

* Status: 400
* Content-Type: application/json; charset=utf-8

Returns the error message if create fail.

```json
{
    "error": "title is too long"
}
```

## GET /courses/:title

### Example response

* Status: 200
* Content-Type: application/json; charset=utf-8

Returns selected course

```json
{
    "id": 112,
    "title": "อบรมการท่องเที่ยว",
    "cover": "/img/tour.jpg",
    "startDate": "10-02-2018",
    "endDate": "25-02-2018",
    "location": "Siamcenter, Bangkok",
    "description": "Lorem ipsum lol lol 555+",
    "tickets": [
        {
            "id": 122,
            "name": "Early Bird",
            "detail": "some detail",
            "startDate": "11-01-2018",
            "endDate": "15-01-2018",
            "price": 1500,
            "quantity": 20,
            "remaining": 15
        },
        {
            "id": 123,
            "name": "Regular",
            "detail": "some detail",
            "startDate": "16-01-2018",
            "endDate": "09-01-2018",
            "price": 2500,
            "quantity": 50,
            "remaining": 46
        }
    ],
    "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe"
    }
}
```

### Example response

* Status: 404
* Content-Type: application/json; charset=utf-8

Returns the error message if selected course is not exist

```json
{
    "error": "course not found"
}
```

## PATCH /courses/:title

Update courses data.

* Content-Type: application/json

```json
{
    "title": "อบรมการท่องเที่ยว",
    "cover": "/img/tour.jpg",
    "startDate": "10-02-2018",
    "endDate": "25-02-2018",
    "location": "Siamcenter, Bangkok",
    "description": "Lorem ipsum lol lol 555+"
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
