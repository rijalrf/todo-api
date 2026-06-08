# API Documentation - Todos Express API

This document provides a comprehensive guide to the API endpoints available in the Todos Express API.

## Base URL
The base URL for all endpoints is `http://localhost:3000` (or as configured in your `.env` file).

## Authentication
Most endpoints require authentication using a Bearer Token.

### Register
Register a new user.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth required:** No
- **Request Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "status": 201,
      "message": "user registered successfully",
      "data": {
        "id": 1,
        "name": "User Name",
        "email": "user@example.com"
      }
    }
    ```

### Login
Login to get access and refresh tokens.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth required:** No
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "login successfully",
      "data": {
        "access_token": "eyJhbG...",
        "token_type": "Bearer",
        "expired_in": 1234567890
      }
    }
    ```
- **Note:** A `rt` (refresh token) cookie is also set.

### Refresh Token
Refresh the access token using a refresh token.

- **URL:** `/auth/token`
- **Method:** `POST`
- **Auth required:** No
- **Request Body:**
  ```json
  {
    "grant_type": "refresh_token",
    "refresh_token": "your_refresh_token"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "token created successfully",
      "data": {
        "access_token": "eyJhbG...",
        "token_type": "Bearer",
        "expired_in": 1234567890
      }
    }
    ```

### Logout
Logout and invalidate the refresh token.

- **URL:** `/auth/logout`
- **Method:** `DELETE`
- **Auth required:** Yes (Bearer Token)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "logout successfully"
    }
    ```

---

## Todos

### Get All Todos
Get a paginated list of todos.

- **URL:** `/todos`
- **Method:** `GET`
- **Auth required:** Yes (Bearer Token)
- **Query Parameters:**
  - `page` (optional, default: 1)
  - `limit` (optional, default: 5)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todos retrieved successfully",
      "data": [...],
      "meta": {
        "totalData": 10,
        "totalPages": 2,
        "currentPage": 1
      }
    }
    ```

### Get All Todos with Items
Get all todos including their nested items.

- **URL:** `/todosanditems`
- **Method:** `GET`
- **Auth required:** Yes (Bearer Token)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todos and items retrieved successfully",
      "data": [
        {
          "id": 1,
          "title": "Todo Title",
          "todoItems": [...]
        }
      ]
    }
    ```

### Get Todo by ID
Get a specific todo by its ID.

- **URL:** `/todos/:id`
- **Method:** `GET`
- **Auth required:** Yes (Bearer Token)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todo found",
      "data": { ... }
    }
    ```

### Create Todo
Create a new todo.

- **URL:** `/todos`
- **Method:** `POST`
- **Auth required:** Yes (Bearer Token)
- **Request Body:**
  ```json
  {
    "title": "New Todo",
    "description": "Optional description"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "status": 201,
      "message": "Todo created successfully",
      "data": { ... }
    }
    ```

### Update Todo
Update an existing todo.

- **URL:** `/todos/:id`
- **Method:** `PUT`
- **Auth required:** Yes (Bearer Token)
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "completed": true
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todo updated successfully",
      "data": { ... }
    }
    ```

### Update Todo Status
Update the completion status of a todo.

- **URL:** `/todos/:id`
- **Method:** `PATCH`
- **Auth required:** Yes (Bearer Token)
- **Request Body:**
  ```json
  {
    "completed": true
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todo status updated successfully",
      "data": { ... }
    }
    ```

### Update Todo and Items
Update a todo and replace its items.

- **URL:** `/todosItems/:id`
- **Method:** `PUT`
- **Auth required:** Yes (Bearer Token)
- **Request Body:**
  ```json
  {
    "title": "Todo Title",
    "description": "Description",
    "todoItems": [
      { "title": "Item 1", "description": "Desc 1" },
      { "title": "Item 2", "description": "Desc 2" }
    ]
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todo and items updated successfully",
      "data": { ... }
    }
    ```

### Delete Todo
Delete a todo.

- **URL:** `/todos/:id`
- **Method:** `DELETE`
- **Auth required:** Yes (Bearer Token)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todo deleted successfully"
    }
    ```

---

## Todo Items

### Get Items for Todo
Get all items belonging to a specific todo.

- **URL:** `/todos/:todoId/items`
- **Method:** `GET`
- **Auth required:** Yes (Bearer Token)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todo items retrieved successfully",
      "data": [...]
    }
    ```

### Create Todo Item
Create a new item for a specific todo.

- **URL:** `/todos/:todoId/items`
- **Method:** `POST`
- **Auth required:** Yes (Bearer Token)
- **Request Body:**
  ```json
  {
    "title": "New Item",
    "description": "Optional description"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "status": 201,
      "message": "Todo item created successfully",
      "data": { ... }
    }
    ```

### Update Todo Item
Update an existing todo item.

- **URL:** `/todos/items/:id`
- **Method:** `PUT`
- **Auth required:** Yes (Bearer Token)
- **Request Body:**
  ```json
  {
    "title": "Updated Item Title",
    "description": "Updated description",
    "completed": true
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todo item updated successfully",
      "data": { ... }
    }
    ```

### Update Todo Item Status
Update the completion status of a todo item.

- **URL:** `/todos/items/:id`
- **Method:** `PATCH`
- **Auth required:** Yes (Bearer Token)
- **Request Body:**
  ```json
  {
    "completed": true
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todo item status updated successfully",
      "data": { ... }
    }
    ```

### Delete Todo Item
Delete a specific todo item.

- **URL:** `/todos/items/:id`
- **Method:** `DELETE`
- **Auth required:** Yes (Bearer Token)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "Todo item deleted successfully"
    }
    ```

---

## Users

### Get All Users
Get a list of all registered users.

- **URL:** `/users`
- **Method:** `GET`
- **Auth required:** No
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "success retrieve user list",
      "data": [...]
    }
    ```

### Get User by ID
Get a specific user by their ID.

- **URL:** `/users/:id`
- **Method:** `GET`
- **Auth required:** No
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": 200,
      "message": "success retrieve user",
      "data": { ... }
    }
    ```

---

## Utilities

### Health Check
Check the health status of the API.

- **URL:** `/health`
- **Method:** `GET`
- **Auth required:** No
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": "UP",
      "timestamp": "2026-06-08T13:00:00.000Z"
    }
    ```

### Text Hashing
Generate a SHA-256 hash of the provided text.

- **URL:** `/hash`
- **Method:** `POST`
- **Auth required:** No
- **Request Body:**
  ```json
  {
    "text": "text to hash"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    "hashed_string_here"
    ```
