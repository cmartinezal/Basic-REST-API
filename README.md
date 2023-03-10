# Basic-REST-API

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#project-achitecture">Project Achitecture</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
       <ul>
          <li><a href="#swagger-documentation">Swagger Documentation</a></li>
          <li><a href="#authorization-endpoints">Authorization Endpoints</a></li>
          <li><a href="#rest-api-endpoints">REST API Endpoints</a></li>
       </ul>
    <li>
        <a href="#example-get-all-users">Example: Get all users</a>
        <ul>
          <li><a href="#1-get-token-with-user-data">1. Get token with user data</a></li>
          <li><a href="#2-access-to-get-all-users-secured-endpoint">2. Access to Get all users secured endpoint</a></li>
       </ul>
    </li>
  </ol>
</details>

## About The Project

This project creates basic REST API to manage users implemented in NodeJS and documented with Swagger that uses JWT authentication.

To simplify the project, the implementation has been done from the server side without using any database.

A JSON file is used to save data and mock up the database layer, although this logic can be transferred to other databases.

## Project Achitecture

This project uses a 3 layer architecture:

![Project architecture](https://user-images.githubusercontent.com/84383847/215305163-7fc9cf27-1d46-44cc-a94a-913778577060.png)


- **1. Controller:** Handles the requests and responses for our endpoints.
- **2. Service Layer:** Defines business logic and exports the methods that are used by the controller.
- **3.  Data Access Layer:** This is the layer that interacts with the Database or in our case the local JSON file that mimics our Database.

## Getting Started

### Prerequisites

npm must be installed.\
To download the latest version of npm, on the command line, run the following command:

```sh
    npm install -g npm@latest
```

### Installation

To install the project we have to install npm and execute the following commands:

```sh
    npm install
    npm start
```
## Usage

### Swagger Documentation

<img width="1459" alt="Swagger documentation" src="https://user-images.githubusercontent.com/84383847/215305025-388ad447-4ff8-4f00-8c38-15671211be02.png">

- Swagger Web: ```http://localhost:3000/api/docs```

- JSON: ```http://localhost:3000/api/docs.json```

### Authorization Endpoints

The authorization is based in OAuth 2.0.\
The access token is required to access to users secured enpoints.\
The refresh token exists to enable authorization servers to use short lifetimes for access tokens without needing to involve the user when the token expires.

<img width="1448" alt="Authorization Endpoints" src="https://user-images.githubusercontent.com/84383847/215026384-c64327d2-fb73-4b64-a6c7-f76bcb9d3bc6.png">

The requests can be performed to the following urls:

- *POST* ```http://localhost:3000/api/v1/auth/token```
- *POST* ```http://localhost:3000/api/v1/auth/refresh```

### REST API Endpoints

<img width="1448" alt="User Endpoints" src="https://user-images.githubusercontent.com/84383847/214256720-7cdbb197-3f02-4710-ac0c-4d4efb85c6b5.png">

The requests can be performed to the following urls:

- *GET*  ```http://localhost:3000/api/users```
- *GET*  ```http://localhost:3000/api/users/:userId```
- *POST* ```http://localhost:3000/api/users```
- *PUT*  ```http://localhost:3000/api/users/:userId```
- *DELETE*  ```http://localhost:3000/api/users/:userId```

## Example: Get all users

### 1. Get token with user data

Use endpoint POST api/v1/auth/token.
You can use this test user to authorize:

- email: ```bettysloan@email.com```
- password: ```password1```
  
A JWT will be issued for the test user specified:

 <img width="1408" alt="Token request" src="https://user-images.githubusercontent.com/84383847/215018551-9fa6ae57-0e14-4893-9994-a9e90d9985f5.png">

Copy the value of access_token in Authorization to allow Swagger to send the Authorization header required in the secured enpoints:

<img width="421" alt="Authorization with token" src="https://user-images.githubusercontent.com/84383847/215019554-bc6d7fad-4105-4113-9896-35614996d5fb.png">

### 2. Access to Get all users secured endpoint

As we can see the authorization header is sent in the request and we can access to the secure endpoint:

<img width="1430" alt="Get all users example" src="https://user-images.githubusercontent.com/84383847/215019280-d5080f0d-e52c-4986-bf96-e8685a66ecab.png">
