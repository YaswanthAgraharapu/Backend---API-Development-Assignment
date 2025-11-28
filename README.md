# Task Management Backend API

A backend API for managing employees and tasks, built for the ProU Technology Internship Coding Challenge.

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB
- **JSON Web Tokens (JWT)**: For authentication
- **express-validator**: For request data validation

## Setup and Run Instructions

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd backend-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. Replace the values with your own.
    ```
    MONGO_URI=mongodb://localhost:27017/task_management
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Run the server:**
    ```bash
    npm start
    ```
    For development with automatic restarts:
    ```bash
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.

## API Endpoints

**Base URL**: `http://localhost:5000/api`

### Authentication

#### `POST /auth/login`
- **Description**: Generates a JWT for authenticating protected routes. In this demo, it doesn't require a username/password.
- **Response Example**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Employees

#### `GET /employees`
- **Description**: Retrieves a list of all employees.
- **Response Example**:
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109cb",
      "name": "Jane Doe",
      "role": "Frontend Developer",
      "email": "jane.doe@example.com"
    }
  ]
  ```

#### `POST /employees`
- **Description**: Creates a new employee. (Requires authentication)
- **Headers**: `x-auth-token: <your_jwt>`
- **Request Body**:
  ```json
  {
    "name": "John Smith",
    "role": "Backend Developer",
    "email": "john.smith@example.com"
  }
  ```
- **Response Example**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109cc",
    "name": "John Smith",
    "role": "Backend Developer",
    "email": "john.smith@example.com"
  }
  ```

### Tasks

#### `GET /tasks`
- **Description**: Retrieves all tasks. Can be filtered by `status` or `employee` ID.
- **Query Parameters**:
  - `status` (e.g., `?status=In%20Progress`)
  - `employee` (e.g., `?employee=60d0fe4f5311236168a109cb`)
- **Response Example**:
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109cd",
      "title": "Build API endpoints",
      "description": "Implement all CRUD operations for tasks.",
      "status": "In Progress",
      "employee": {
        "_id": "60d0fe4f5311236168a109cc",
        "name": "John Smith",
        "email": "john.smith@example.com"
      }
    }
  ]
  ```

#### `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`
- **Description**: Create, update, and delete tasks. (All require authentication)
- **Headers**: `x-auth-token: <your_jwt>`

## Assumptions Made
- A user can get a JWT token from a dummy `/api/auth/login` endpoint to access protected routes. In a real-world scenario, this would involve user registration and password verification.
- The `Employee` email is unique.
- Task statuses are limited to 'To Do', 'In Progress', and 'Done'.