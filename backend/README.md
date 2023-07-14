## Live Link: https://cow-auth.onrender.com

## Application Routes:

### Auth (user)

- https://cow-auth.onrender.com/api/v1/auth/login (POST)✔

```javascript
{
    "phoneNumber": "423756874524",
    "password": "000000"
}
```

- https://cow-auth.onrender.com/api/v1/auth/signup (POST)✔

```javascript
{
    "password": "123456",
    "role": "buyer",
    "name": {
        "firstName": "alam",
        "lastName": "md"
    },
    "phoneNumber": "84563280142",
    "address": "Comilla",
    "budget": 0,
    "income": 0
}
```

- https://cow-auth.onrender.com/api/v1/auth/refresh-token (POST)✔

### Auth (admin)

- https://cow-auth.onrender.com/api/v1/admins/create-admin (POST)✔

```javascript
{
    "password": "123456",
    "role": "admin",
    "name": {
        "firstName": "Mr.",
        "lastName": "Admin"
    },
    "phoneNumber": "08802374638",
    "address": "Uganda"
}
```

- https://cow-auth.onrender.com/api/v1/admins/login (POST)✔

```javascript
 {
    "phoneNumber": "5678584533546",
    "password":"mydream"
 }
```

### User

- https://cow-auth.onrender.com/api/v1/users/user-create (POST) | anyone✔
- https://cow-auth.onrender.com/api/v1/users (GET) | admin✔
- https://cow-auth.onrender.com/api/v1/users/649a4cd6dc4cacc734f5cbd4 (Single GET) | admin✔
- https://cow-auth.onrender.com/api/v1/users/649a4cd6dc4cacc734f5cbd4 (PATCH) |admin✔
- https://cow-auth.onrender.com/api/v1/users/649a4cd6dc4cacc734f5cbd4 (DELETE) |admin✔✔

### Cows

- https://cow-auth.onrender.com/api/v1/cows/cow-create (POST) | seller✔
- https://cow-auth.onrender.com/api/v1/cows (GET) | seller | buyer | admin✔
- https://cow-auth.onrender.com/api/v1/cows/649aaf347bb434c94760cf10 (Single GET) seller | buyer | admin✔
- https://cow-auth.onrender.com/api/v1/cows/649aaf347bb434c94760cf10 (PATCH) seller ✔
- https://cow-auth.onrender.com/api/v1/cows/649aaf347bb434c94760cf10 (DELETE) seller ✔

### Orders

- https://cow-auth.onrender.comapi/v1/orders/order-create (POST) | buyer ✔
- https://cow-auth.onrender.comapi/v1/orders (GET) | seller | buyer | admin✔

## Extra part

### Admin

- https://cow-auth.onrender.com/api/v1/admins/create-admin (POST) | any one can create✔

### My profile

- https://cow-auth.onrender.com/api/v1/users/my-profile (GET) | seller | buyer✔
- https://cow-auth.onrender.com/api/v1/users/my-profile (PATCH) | seller | buyer✔

### Order

- https://cow-auth.onrender.comapi/v1/orders/649aaee492bcbdba29c80ddb (GET) | admin✔
