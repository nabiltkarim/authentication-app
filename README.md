# Easygenerator-Assignment

This project contains both backend and frontend services i.e. `authentication-service` and `client-service`.

### Procedure to run

1. Install `docker` and `docker-compose`.
2. Run `sudo docker-compose up -d`.
3. This will trigger the building and running of all three docker services i.e. backend, frontend and mongodb.
4. Wait for all services to successfully start.
5. Go to any preferred browser and paste this url `http://localhost:8080` and hit enter.

## Signup

Initially the mongodb is clean and there aren't any users. Therefore, the signup should trigger the creation of a new user. The form has its own validations following the criterias given in the test and after successfully inputting the values correctly, it sends a `POST` request to `/users/signup` endpoint in `authentication-service`. If the user already exists, then it will throw a `DuplicateException` which frontend will display appropriately.

### Signin

After signing up, login with that user in the login form in the browser. This sends a `POST` request to `/auth/login` endpoint in `authentication-service`. The login endpoint is protected by `LocalAuthGuard` and validates incoming user requests. The login endpoint returns a JWT Token which is needed to further make protected API calls.

### Homepage

After logging in, it shows the application page with a welcome note. If we try to access the homepage directly without logging in, it will redirect users to signin page. If user is already logged in, we will fetch the user's name and show in the application page

### Logout

Clicking on logging out, it will remove the existing user's session and prompt to login page again.

### Cleanup

Run `docker-compose down`

