# Online Store Project

## Description
This project is a demonstration of an online store, showcasing the workings of a fully functional front-end and back-end. It is not responsive and is designed to illustrate the core functionalities of a store. The inspiration for this project was derived from our DBMS project, KRSR.

### Features
- **Frontend:** Built using React.js and VITE, styled with CSS, Bootstrap, and Google Icons.
- **Backend:** Developed with Python's Flask framework, using JWT tokens for authentication and user login.
- **Database:** Implemented with MySQL, utilizing SQLAlchemy ORM for database operations, and Bycrypt for password hashing to enhance security.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [API Endpoints](#api-endpoints)
4. [Database Schema](#database-schema)
5. [Security Measures](#security-measures)
6. [Contributing](#contributing)

## Technologies Used
- **Frontend:**
  - React.js
  - VITE
  - CSS
  - Bootstrap
  - Google Icons
  - Google Fonts
- **Backend:**
  - Flask (Python)
  - JWT Tokens
  - SQLAlchemy ORM
  - Bycrypt
- **Database:**
  - MySQL

## Installation
### Prerequisites
- Node.js create-vite
- Python 3.12
- MySQL server



### Aditional information on Usage soon coming

## API Endpoints

### Authentication

- **POST** `/login`: User login
  - **Request Body:**
    ```json
    {
      "username": "example_user",
      "password": "example_password"
    }
    ```
  - **Response:**
    ```json
    {
      "username": "example_user",
      "key": "hashed_password",
      "timestamp": "2024-06-07T00:00:00",
      "role": "customer"
    }
    ```
  - **Headers:**
    ```
    Authorization: <JWT Token>
    Access-Control-Expose-Headers: Authorization
    ```

- **POST** `/register`: User registration
  - **Request Body:**
    ```json
    {
      "username": "example_user",
      "full_name": "Example User",
      "password": "example_password",
      "contact": "1234567890",
      "address": "123 Example St",
      "email": "user@example.com"
    }
    ```
  - **Response:** Redirects to login page

### Products

- **GET** `/call/product/<id>`: Get all products in a category
  - **Response:**
    ```json
    {
      "name": "Category Name",
      "items": [
        {
          "p_id": 1,
          "item": "Product Name",
          "description": "Product Description",
          "price": 100.00,
          "stock": 10
        }
      ]
    }
    ```

### Cart

- **POST** `/call/cart`: Add item to cart
  - **Request Body:**
    ```json
    {
      "user": "example_user",
      "p_id": 1,
      "quantity": 2
    }
    ```
  - **Response:**
    ```json
    {
      "status": "Item added to cart"
    }
    ```

- **GET** `/show_cart/<username>`: Show items in cart
  - **Response:**
    ```json
    [
      {
        "username": "example_user",
        "name": "Product Name",
        "description": "Product Description",
        "price": 100.00,
        "quantity": 2
      }
    ]
    ```

### User Details

- **GET** `/show_details/<username>`: Show user details
  - **Response:**
    ```json
    {
      "username": "example_user",
      "contact": "1234567890",
      "address": "123 Example St",
      "email": "user@example.com",
      "full_name": "Example User"
    }
    ```

- **PATCH** `/change_details`: Change user details
  - **Request Body:**
    ```json
    {
      "username": "example_user",
      "key": "hashed_password",
      "new_contact": "0987654321",
      "new_address": "321 New St",
      "new_email": "new_email@example.com",
      "new_full_name": "New Name",
      "new_password": "new_password",
      "new_username": "new_username"
    }
    ```
  - **Response:**
    ```json
    {
      "username": "new_username",
      "key": "new_hashed_password",
      "timestamp": "2024-06-07T00:00:00",
      "role": "customer"
    }
    ```
  - **Headers:**
    ```
    Authorization: <New JWT Token>
    Access-Control-Expose-Headers: Authorization
    ```

### Token Validation

- **POST** `/validate_token`: Validate JWT token
  - **Request Body:**
    ```json
    {
      "username": "example_user",
      "key": "hashed_password"
    }
    ```
  - **Response:**
    ```json
    {
      "entry": "valid"
    }
    ```

### Checkout

- **PUT** `/checkout`: Checkout and clear cart
  - **Request Body:**
    ```json
    {
      "username": "example_user",
      "key": "hashed_password"
    }
    ```
  - **Response:**
    ```json
    {
      "entry": "success"
    }
    ```
  - **Headers:**
    ```
    Authorization: <JWT Token>
    ```

# Database Schema

## Database Name: `krsr_store`

### Tables and Columns

#### admin
- `contact` (varchar(255))
- `id` (int, auto_increment, primary key)
- `store_name` (varchar(255))
- `user_id` (int)

#### cart
- `customer_id` (int)
- `id` (int, auto_increment, primary key)
- `product_id` (int)
- `quantity` (int)

#### category
- `description` (varchar(255))
- `id` (int, auto_increment, primary key)

#### customer
- `address` (varchar(255))
- `contact` (varchar(255))
- `id` (int, auto_increment, primary key)
- `user_id` (int)

#### invoice
- `admin_id` (int)
- `customer_id` (int)
- `date` (date)
- `id` (int, auto_increment, primary key)
- `revenue` (double)

#### product
- `category_id` (int)
- `description` (varchar(9000))
- `id` (int, auto_increment, primary key)
- `name` (varchar(255))
- `price` (double)
- `quantity` (int)

#### user
- `email` (varchar(255))
- `full_name` (varchar(255))
- `id` (int, auto_increment, primary key)
- `password` (varchar(255))
- `role` (varchar(255))
- `username` (varchar(255))

### Column Attributes

- **Primary Key**: `id` columns in each table are primary keys and have the `auto_increment` attribute.
- **Nullable**: Columns without specific nullable constraints allow `NULL` values.
- **Character Set**: All `varchar` columns use the `utf8mb4` character set.
- **Collation**: All `varchar` columns use the `utf8mb4_0900_ai_ci` collation.
- **Privileges**: Columns have privileges for `select`, `insert`, `update`, and `references`.

### Please certain usecases have been remove due to the sacle of this project such as ADMIN access.

## Security Measures

    - Bycrypt Hashing function was used to hash, store and validate passwords
    - JWT tokens are made for a serverless session for a user to access and checkout the products

## Contributors

    - Rijusmit Biswas IIIT-Delhi Computer Science JUNIOR