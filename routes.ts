/*
An array of public routes that don't require authentication. 
You can add any route that should be accessible without logging in.
These routes will be excluded from the authentication middleware, 
allowing users to access them freely.
@type {string[]}
*/

export const PublicRoutes =
["/", "/about", "/contact", "/auth/new-verification"];


/*
An array of routes that are used for authentication purposes, 
such as login and registration pages. These routes will also be excluded from 
the authentication middleware, allowing users to access them without being authenticated.
These routes will redirect logged-in users to the home page, 
preventing them from accessing the login or registration pages again.
@type {string[]}
*/
export const AuthRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
];

/*
The prefix for authentication-related API routes. 
This is used to identify which API routes are related to authentication 
and should be handled by the authentication middleware.
@type {string}
*/
 
export const apiAuthPrefix = "/api/auth";

/*
The default route to redirect users to after they have successfully logged in. 
This is typically a protected page that requires authentication, 
such as a dashboard or settings page.
@type {string}
*/

export const DEFAULT_LOGIN_REDIRECT = "/settings";