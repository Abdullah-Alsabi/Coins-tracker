# Coins-Tracker


## User Stories
- **Sign Up:** As an anon I can sign up in the platform so that I can create a portfolio.
- **Sign In:** As a user I can sign in to the platform so that I can check my portfolios and update them.
- **Sign Out:** As a user I can sign out from the platform so no one else can see my portfolios.
- **Add Portfolios** As a user I can add a portfolio.
- **View Portfolio** As a user I can view my Portfolio.
- **Delete Portfolio** As a user I can delete my portfolio.
- **Add transaction** As a user I can add transactions to my portfolios.
- **Edit transaction** As a user I can edit my transaction.
- **View transaction** As a user I can view my transaction.
- **Delete transaction** As a user I can delete my transaction.
- **View Coins Table** As any type of users I can see the coins table.
- **View Coin Details** As any type of users I can see each coin details.

## Admin Stories 
- **View Users** an admin I can view all users.
- **Admin Edit User** As an admin I can edit users profile.


## Client / Frontend

### React Router Routes (React App)

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`              | HomePage             | public `<Route>`           | Home page                                                    |
| `/signup`        | SignUp               | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup|
| `/signin`        | SignIn               | anon only `<AnonRoute>`    | Signin form, link to signup, navigate to homepage after login|
|  n/a         | NavBar               | user only `<PrivateRoute>`    | Signout button , remove the cookie , navigate to homepage after signout|
| `/admin`         | Admin                | Admin only `<AdminRoute>`  | Shows all users                                              |
| `/admin/:id`     | Admin                | Admin only `<AdminRoute>`  |Edit user info                                                |
| `/coins`         | Coins                | public `<Route>`           | Shows all coins in a Table                                   |
| `/coin`          | Coin                 | public `<Route>`           | Shows all coin details                                       |
| `/portfolio/:id` | Portfolio            | user only `<PrivateRoute>` | Show the details of a Portfolio                              |
| `/portfolio/add` | AddPortfolio         | user only `<PrivateRoute>` | Add portfolio                                                |
| `/portfolio/:id` | n/a                  | user only `<PrivateRoute>` | Delete Portfolio                                             |
| `/portfolio/transaction/:id` | Transaction        | user only `<PrivateRoute>` | Show the details of a transaction                  |
| `/portfolio/addtransaction` | AddTransaction     | user only `<PrivateRoute>` | Add transaction to a portfolio                      |
| `/portfolio/edittransaction/:id` | EditTransaction     | user only `<PrivateRoute>` | Edit transaction                              |
| `/portfolio/transaction/:id` | n/a                  | user only `<PrivateRoute>` | Delete transaction                               |

### Components
- HomePage
- SignUp
- SignIn
- Admin
- Coins
- Coin
- Portfolio
- AddPortfolio
- Transaction
- AddTransaction
- EditTransaction
- NavBar
- Footer
- Loading
- ErrorMessage



## Server / Backend

### Models

User model

```
{
  userName: {
    type: String,
    unique: true,
    required: [true, " Username should be provided and unique"],
  },
  email: {
    type: String,
    required: [true, "email should be provided and unique"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "isInvalid"],
  },
  password: {
    type: String,
    minlength: [8, "minemum password length is 8"],
    required: [true, "password should be provided"],
  },
  Portfolios: {
    type: [PortfolioSchema],
    default: [],
  },
}
```

Portfolio model

```
{
  portfolioName: {
    type: String,
    unique: true,
    required: [true, " portfolioName should be provided"],
  },
  totalCost: {
    type: Number,
    required: [false, " totalCost is optional"],
  },
  transactions: {
    type: [TransactionSchema],
    default: [],
  },
}
```

Transaction model

//Not Finished yet
```
{
  transactionName: {
    type: String,
    unique: true,
    required: [true, " Username should be provided"],
  },
   transactionType: {
    type: String,
    required: [true, " Username should be provided"],
  },
}
```

### Backend routes

| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`     |                                                              | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/users/signup` | {userName, email, password}                                      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in cookie |
| POST        | `/users/signin`  | {username, password}                                         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in cookie |
| POST        | `/users/signout` | (empty)                                                      | 204            | 400          | Logs out the user                                            |


### Links


[Trello board Link](https://trello.com/b/vm8ebCHu/final-project-kanban) 

[Github repository Link](https://github.com/Abdullah-Alsabi/Final-Project)

[Deployed App Link](http://heroku.com/)

[Slides Link](https://docs.google.com/presentation/d/1AEQgQgVEEf4n3ua5D9rTpcHKUKW4q-CpHiId2PsPtJw/edit?usp=sharing)

[Figma Link](https://www.figma.com/file/NOe3rOCYJQvPHFyPScir6R/Abdullah's-co-team-library?node-id=0%3A1)

