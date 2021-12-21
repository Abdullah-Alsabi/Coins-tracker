# Coins-Tracker

//description 

## User Stories
- **Sign Up:** As an anon I can sign up in the platform so that I can create a portfolio.
- **Sign In:** As a user I can sign in to the platform so that I can check my portfolios and update them.
- **Sign Out:** As a user I can sign out from the platform so no one else can see my portfolios.
- **Change Password:** As a user I can change my password.
- **Add Portfolios** As a user I can add a portfolio.
- **View Portfolio** As a user I can view my Portfolio.
- **Delete Portfolio** As a user I can delete my portfolio.
- **Add transaction** As a user I can add transactions to my portfolios.
- **View transaction** As a user I can view my transaction.
- **Delete transaction** As a user I can delete my transaction.
- **View Coins Table** As any type of users I can see the coins table.
- **View Coin Details** As any type of users I can see each coin details.

## Admin Stories 
- **View Users** an admin I can view all users.
- **Admin Delete User** As an admin I can delete users.


## Client / Frontend

### React Router Routes (React App)

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`              | HomePage             | public `<Route>`           | Home page                                                    |
| `/signup`        | SignUp               | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup|
| `/signin`        | SignIn               | anon only `<AnonRoute>`    | Signin form, link to signup, navigate to homepage after login|
|  n/a         | NavBar               | user only `<PrivateRoute>`    | Signout button , remove the cookie , navigate to homepage after signout|
|  n/a         | NavBar               | anon only `<AnonRoute>`    | Signin button , and signup button   |
|  n/a         | NavBar               | Admin only `<AdminRoute>`    | Admin button  ,navigate to adminpage   |
| `/admin`         | Admin                | Admin only `<AdminRoute>`  | Shows all users                                              |
| n/a     | Admin                | Admin only `<AdminRoute>`  |Delete user                                                 |
| `/coins`         | Coins                | public `<Route>`           | Shows all coins in a Table                                   |
| `/coin`          | Coin                 | public `<Route>`           | Shows all coin details                                       |
| `/portfolios` | AllPortfolios            | user only `<PrivateRoute>` | Show all portfolios                              |
| `/portfolios/:id` | Portfolio            | user only `<PrivateRoute>` | Show the details of a Portfolio                              |
| `/addportfolio` | AddPortfolio         | user only `<PrivateRoute>` | Add portfolio                                                |
| n/a | n/a                  | user only `<PrivateRoute>` | Delete Portfolio                                             |
| `/portfolios/transaction/:id` | Transaction        | user only `<PrivateRoute>` | Show the details of a transaction                  |
| `/portfolios/:id/addtransaction` | AddTransaction     | user only `<PrivateRoute>` | Add transaction to a portfolio                      |
| n/a | n/a                  | user only `<PrivateRoute>` | Delete transaction                               |

### Components
- HomePage
- SignUp
- SignIn
- SignInAdmin
- Profile
- Admin
- Coins
- Coin
- Portfolio
- AddPortfolio
- Transaction
- AddTransaction
- Search
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
    required: false,
    default: [0],
  },
}
```

Portfolio model

```
{
  portfolioName: {
    type: String,
    required: [true, " portfolioName should be provided"],
    default: "Portfolio",
  },
  totalCost: {
    type: Number,
    required: [false, " totalCost is optional"],
    default: 0,
  },
  transactions: {
    type: [TransactionSchema],
    default: [],
  },
}
```

Transaction model

```
{
  coinName: {
    type: String,
    required: [true, " Username should be provided"],
    default: "Transaction",
  },
  tranType: {
    type: String,
    required: [true, "Transaction Type should be provided"],
    default: "buy",
  },
  tranAmount: {
    type: Number,
    required: [true, "Transaction amount should be provided"],
    default: 0,
  },
  tranPrice: {
    type: Number,
    required: [true, "Transaction price should be provided"],
    default: 0,
  },
}
```

Admin model

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

[Deployed App Link](https://coins-tracker.herokuapp.com/)

[Slides Link](https://docs.google.com/presentation/d/1tFRBQ0PcVpWOL1erzwcQQqggeh93GpQfA5njHgv4CkA/edit?usp=sharing)

[Figma Link](https://www.figma.com/file/NOe3rOCYJQvPHFyPScir6R/Abdullah's-co-team-library?node-id=0%3A1)

