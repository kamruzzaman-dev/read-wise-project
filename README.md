# [read wise](https://read-wise-project-b2dcz168v-yebenling-zaman.vercel.app/)

_A simple book reading, rating, or reviewing system._

### Description

- Users can listing their books and share, and rating, reviewing other books.
- users can add books on their wishlist and read soon page.
- Users can login custom authentication or google Oauth authentication.

### Languages/Technologies (Backend)

- Typescript
- cookie-parser
- bcrypt
- cors
- dotenv
- express
- google-auth-library
- http-status
- jsonwebtoken
- mongoose
- zod

### Languages/Technologies (Frontend)

- Typescript
- react
- radix-ui
- tailwind
- reduxjs
- reduxjs-toolkit
- redux-logger
- class-variance-authority
- date-fns
- gapi-script
- lucide-react
- react-day-picker
- react-google-login

### Run

You need to start the server first. In the [server](./backend/) directory, execute the following commands:

```
$ yarn
$ yarn dev
```

Then, to spawn clients, go to the [client](./frontend/) directory and execute the following commands:

```
$ yarn
$ yarn dev
```

### Screenshots

Some screenshots of the project from different types of users are available in the [screenshots](./screenshots/) directory.

#### The login screen:

![](./screenshots/login.png)

#### The signup screen:

![](./screenshots/signup.png)

#### home page:

![](./screenshots/home_page.jpg)
![](./screenshots/home_book.jpg)

#### Books page with search, filtering:

![](./screenshots/book_filter.png)

#### List books this system (only login user):

![](./screenshots/add_book.png)

#### Wish List (login can user add):

![](./screenshots/wishlist.png)

#### Read soon (user can set for future and update reading status):

![](./screenshots/readsoon.png)

#### Delete Book (upload user only can delete):

![](./screenshots/delete_book.png)

#### Edit Book (upload user only can update or edit):

![](./screenshots/edit_book.png)

#### comment Book (authenticate user only can review):

![](./screenshots/comment.png)

#### Book details (anyone can view):

![](./screenshots/book.png)

### user account

If the database is up and running (take 2/3 min), use the following credentials to login as a user:

```
username: kamruzzaman@gmail.com
password: 123456
```

### Authors

This project was authored by [Md Kamruzzaman](https://github.com/YeBenLing-ZAMAN/).
