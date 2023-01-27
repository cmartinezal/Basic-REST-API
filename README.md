# Basic-REST-API

This project creates basic REST API to manage users implemented in node.js and documented with Swagger that uses JWT authentication.

To simplify the project, the implementation has been done from the server side without using any database.

A JSON file is used to save data and mock up the database layer, althought this logic can be transferred to other databases.


## Achitecture

This project uses a 3 layer architecture: 

![Diagrama sin título drawio](https://user-images.githubusercontent.com/84383847/215024085-cb5886c2-fb97-4d9b-8f63-7620999e374a.png)

- **1. Controller:** Handles the requests and responses for our endpoints.
- **2. Service Layer:** Defines business logic and exports the methods that are used by the controller.
- **3.  Data Access Layer:** This is the layer that interacts with the Database or in our case the local JSON file that mimics our Database.


## Installation

To install the project we have to install npm and execute the following commands:

```sh
    npm install
    npm start
```

## Swagger documentation

<img width="1464" alt="Screenshot 2023-01-27 at 13 36 38" src="https://user-images.githubusercontent.com/84383847/215017358-4d0591d6-613d-4bee-99d4-335474cb9194.png">


* Swagger Web: ```http://localhost:3000/api/docs```

* JSON: ```http://localhost:3000/api/docs.json```
    
## Authorization Endpoints

The authorization is based in OAuth 2.0.<br>
The access token is required to access to users secured enpoints.<br>
The refresh token exists to enable authorization servers to use short lifetimes for access tokens without needing to involve the user when the token expires.

<img width="1448" alt="Screenshot 2023-01-27 at 14 50 26" src="https://user-images.githubusercontent.com/84383847/215026384-c64327d2-fb73-4b64-a6c7-f76bcb9d3bc6.png">


The requests can be performed to the following urls:

* *POST* ``` http://localhost:3000/api/v1/auth/token```
* *POST* ```http://localhost:3000/api/v1/auth/refresh```
    

## REST API Endpoints

<img width="1448" alt="Screenshot 2023-01-24 at 17 28 44" src="https://user-images.githubusercontent.com/84383847/214256720-7cdbb197-3f02-4710-ac0c-4d4efb85c6b5.png">

The requests can be performed to the following urls:

* *GET*  ```http://localhost:3000/api/users```
* *GET*  ```http://localhost:3000/api/users/:userId```
* *POST* ```http://localhost:3000/api/users```
* *PUT*  ```http://localhost:3000/api/users/:userId```
* *DELETE*  ```http://localhost:3000/api/users/:userId```


## Example: Get all users

### 1. Get token with user data

Use endpoint POST api/v1/auth/token.<br>
You can use this test user to authorize:
  - email: ```bettysloan@email.com```
  - password: ```password1```
  
A JWT will be issued for the test user specified:<br>

 <img width="1408" alt="Screenshot 2023-01-27 at 13 49 31" src="https://user-images.githubusercontent.com/84383847/215018551-9fa6ae57-0e14-4893-9994-a9e90d9985f5.png">


Copy the value of access_token in Authorization to allow Swagger to send the Authorization header required in the secured enpoints:<br>

<img width="421" alt="Screenshot 2023-01-27 at 13 51 30" src="https://user-images.githubusercontent.com/84383847/215019554-bc6d7fad-4105-4113-9896-35614996d5fb.png">


### 2. Access to Get all users secured endpoint

As we can see the authorization header is sent in the request and we can access to the secure endpoint:

<img width="1430" alt="Screenshot 2023-01-27 at 13 55 40" src="https://user-images.githubusercontent.com/84383847/215019280-d5080f0d-e52c-4986-bf96-e8685a66ecab.png">


