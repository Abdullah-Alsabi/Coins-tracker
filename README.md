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
- **Admin Edit User** As an admin I can edit users profile


## Client / Frontend

### React Router Routes (React App)

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`              | HomePage             | public `<Route>`           | Home page                                                    |
| `/signup`        | SignUp           | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup|
| `/signin`         | SignIn           | anon only `<AnonRoute>`    | Signin form, link to signup, navigate to homepage after login |
| `/admin`         | Admin           | Admin only `<AdminRoute>`    | Shows all users |
| `/admin/:id`         | Admin           | Admin only `<AdminRoute>`    |Edit user info |
| `/coins`         | Coins            | public `<Route>`           | Shows all coins in a Table                                   |
| `/coin`         | Coin            | public `<Route>`           | Shows all coin details                                   |
| `/portfolio/add` | AddPortfolio     | user only `<PrivateRoute>` | Add portfolio                                                |
| `/portfolio/:id` | Portfolio        | user only `<PrivateRoute>` | Show the details of a Portfolio                              |
| `/portfolio/:id` | n/a                  | user only `<PrivateRoute>` | Delete Portfolio                                             |
| `/portfolio/addtransaction` | AddTransaction     | user only `<PrivateRoute>` | Add transaction to a portfolio                                                |
| `/portfolio/edittransaction/:id` | EditTransaction     | user only `<PrivateRoute>` | Edit transaction                                               |
| `/portfolio/transaction/:id` | Transaction        | user only `<PrivateRoute>` | Show the details of a transaction                              |
| `/portfolio/transaction/:id` | n/a                  | user only `<PrivateRoute>` | Delete transaction                                             |

### Components

- SigninPage
- SignupPage
- ProfilePage
- HomePage
- CoinsPage
- CoinPage
- PortfolioPage(With Edit)
- AddPortfolioPage
- TransactionPage(With Out Edit)
- AddTransactionPage
- Navbar
- Footer


## Server / Backend

### Models

User model

```
{
  userName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true,isValid},
  password: {type: String, required: true},
  favorites: [{type: Schema.Types.ObjectId,ref:'Exit'}]
  userAgreement: {type: boolean, required: true, default: false}
}
```

Exit model

```
 {
   name: {type: String, required: true},
   img: {type: String},
   aproachLat: {type: Number, required: true}
   aproachLong: {type: Number, required: true}
   aproachDescription: {type: String}
   exitLat: {type: Number, required: true}
   exitLong: {type: Number, required: true}
   exitDescription: {type: String}
   landiZoneLat: {type: Number, required: true}
   landingZoneLong: {type: Number, required: true}
   landingZoneDescription: {type: String}
   creator: {type: Schema.Types.ObjectId,ref:'User'}
   altitud: {type: number}
   
 }
```

### Backend routes

| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`     |                                                              | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup` | {name, email, password}                                      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {username, password}                                         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout` | (empty)                                                      | 204            | 400          | Logs out the user                                            |
| POST        | /api/exit      | {name, img, aproachLat, aproachLong, aproachDescription, exitLat, exitLong, exitDescription, landingZoneLat, landingZoneLong, landingZoneDescription, altitude} |                |              | Used to create one exit point document, using current logged in user id as a creator. |
| PUT         | /api/exit/:id  | {name, img, aproachLat, aproachLong, aproachDescription, exitLat, exitLong, exitDescription, landingZoneLat, landingZoneLong, landingZoneDescription, altitude} |                |              | Used to update one exit point document by id                 |
| GET         | /api/exit/:id  |                                                              |                |              | Used to get one exit point document by id                    |
| DELETE      | /api/exit/:id  |                                                              |                |              | Used to delete one exit point document by id                 |
| GET         | /api/user      |                                                              |                |              | Used to get current user's profile. Id of the user is coming form the req.session.currentUser |
| PUT         | /api/user      | {username, email, password}                                  |                |              | Used to update current user's profile. Id of the user is coming form the req.session.currentUser |


### Links


[Trello board Link](https://trello.com/b/vm8ebCHu/final-project-kanban) 

[Github repository Link](https://github.com/Abdullah-Alsabi/Final-Project)

[Deployed App Link](http://heroku.com/)

[Slides Link](https://docs.google.com/presentation/d/1AEQgQgVEEf4n3ua5D9rTpcHKUKW4q-CpHiId2PsPtJw/edit?usp=sharing)

[Figma Link](https://www.figma.com/file/NOe3rOCYJQvPHFyPScir6R/Abdullah's-co-team-library?node-id=0%3A1)

