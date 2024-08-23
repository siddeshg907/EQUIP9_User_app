# User Info App

This is a web application with user authentication, featuring registration and login pages, and a protected home page that displays user profile information only when logged in.


## Deployed Link
**MERN** https://equip9-user-app-1.onrender.com

 
## Tech Stack:

### Frontend:
- React.Js
- Tailwind CSS

### Backend:

- Express.js
- Node.js
- MongoDB
- Firebase Storage
- bycrpt
- jsonwebtoken



## Setup Instructions
1. Clone the repository from GitHub.
2. Navigate to the project directory in the terminal.
3. Install dependencies:
```bash
npm install
```
4. Start the backend development server from root directory:
```bash
npm run start
npm run server (nodemon)
```
5. Start the frontend  development server from /frontend:
```bash
npm run dev
```

6. Access the application in your web browser.


## Frontend

### Features Implemented
1. *Home Page
   - You can see the Logout Button to logout on extreme right.
   - You can see the card with greeting user with profile and name and mobile number displayed 
   
2. *Register Page
   - Inputs for getting user details like name,mobile,profile picture etc.

3. *Login Page
   - Login user by mobile and password
   - Redirect to Home page.
   - Gives JWT token authentication.

## Backend

### Features Implemented
1. *Firebase Storage
   - Storage bucket to keep the images uploaded of profile picture of users.
   
2. *User Route
   - Implemented the user register login route with bycrpt ,hashing password and middleware of authentication by JWT token. 

3. *Mongo DB
   - Used Mongo Data base to store user information.


# *Thank You*