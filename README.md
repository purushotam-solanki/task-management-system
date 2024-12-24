# Task Management System (TMS)

A comprehensive Task Management System developed with Node.js and Express to facilitate efficient task handling, assignment, and role-based access control (RBAC) for admin and user roles.

---

## Technologies Used

- **Node.js**: v20.14.0
- **NPM**: v10.7.0
- **Express.js**: RESTful API framework
- **MongoDB**: NoSQL database for data storage
- **JWT Authentication**: Token-based authentication for role-based access control

---

## Features

- **Task Management**: Create, read, update, delete and get all tasks.
- **User Management**: Admins can create users with role assignment.
- **Role-Based Access Control (RBAC)**:
  - Admin: Manage all tasks and users.
  - User: Manage their tasks.
- **Comment Management**: Add and retrieve comments for tasks.
- **Secure APIs**: Endpoints protected with JWT authentication.
- **Pagination and Filtering**: Fetch tasks and users with customizable filters and pagination.
- **Error Handling**: Comprehensive error handling and logging for reliability.

---
## Role Based Access Control 
### Admin Permissions

### Task Management

| Action                 | Permission                  |
|------------------------|-----------------------------|
| Create task            | Yes                         |
| Update task of any user| Yes                         |
| Delete task of any user| Yes                         |
| View particular task   | Yes                         |
| Get all tasks          | Yes                         |

### Comment Management

| Action                                    | Permission                  |
|-------------------------------------------|-----------------------------|
| Create comment on any task                | Yes                         |
| Update comment of any user on any task    | Yes                         |
| Delete comment of any user on any task    | Yes                         |
| View particular comment                   | Yes                         |
| View all comments of a particular task    | Yes                         |

### User Management

| Action               | Permission       |
|----------------------|------------------|
| Create user          | Yes              |
| Update user          | Not in this scope|
| Delete user          | Not in this scope|
| View any user        | Not in this scope|
| View all users       | Not in this scope|

---

## User Permissions

### Task Management

| Action                 | Permission                                  |
|------------------------|---------------------------------------------|
| Create task            | Yes                                         |
| Update task            | Only tasks created by the user themselves   |
| Delete task            | Only tasks created by the user themselves   |
| View particular task   | Yes                                         |
| Get all tasks          | Yes                                         |

### Comment Management

| Action                                    | Permission                                  |
|-------------------------------------------|---------------------------------------------|
| Create comment                            | Only on tasks created by or accessible to the user |
| Update comment                            | Only comments created by the user themselves |
| Delete comment                            | Only comments created by the user themselves |
| View particular comment                   | Yes                                         |
| View all comments of a particular task    | Only tasks created by or accessible to the user |

## Getting Started

### Prerequisites

- Node.js v20.14.0 or later
- NPM v10.7.0 or later
- MongoDB instance (local or cloud-based)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/purushotam-solanki/task-management-system.git
   cd task-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following content:

   ```env
   PORT=3003
   NODE_ENV=development

   # Cookie options
   TRANSMIT_COOKIE_OVER_SECURE_NETWORK=false

   # MongoDB connection
   MONGODB_URL=mongodb+srv://psolanki0004:cg8IChDYkmq0A1g0@taskmanager.sz0tf.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager

   # JWT secrets for admin
   ADMIN_JWT_ACCESS_TOKEN_SECRET=adminthisisaccesstokensecret
   ADMIN_JWT_REFRESH_TOKEN_SECRET=adminthisisrefreshtokensecret

   # JWT secrets for users
   USER_JWT_ACCESS_TOKEN_SECRET=userthisisaccesstokensecret
   USER_JWT_REFRESH_TOKEN_SECRET=userthisisrefreshtokensecret

   # Token expiration settings
   ADMIN_JWT_ACCESS_EXPIRATION_MINUTES=500
   ADMIN_JWT_REFRESH_EXPIRATION_DAYS=2
   USER_JWT_ACCESS_EXPIRATION_MINUTES=300
   USER_JWT_REFRESH_EXPIRATION_DAYS=2

   # OTP expiration
   LOGIN_OTP_EXP_MINUTES=5
   ```

4. Run the application:

   ```bash
   npm start
   ```

   Or for development with nodemon:

   ```bash
   npm run dev
   ```
---

# API Endpoints

## Auth Endpoints

### 1. Send OTP
**Endpoint:** `api/v1/auth/send-otp`  
**Description:** Used by users and admins to send OTP for login purposes.  
**Method:** POST  

### 2. Verify OTP
**Endpoint:** `api/v1/auth/verify-otp`  
**Description:** Verifies the sent OTP, logging the user into the system.  
**Method:** POST  

### 3. Signup
**Endpoint:** `api/v1/auth/signup`  
**Description:** Registers a new admin.  
**Method:** POST  

### 4. Logout
**Endpoint:** `api/v1/auth/logout`  
**Description:** Invalidates the access token and clears cookies.  
**Method:** POST  

---

## Task Endpoints

### 1. Get All Tasks
**Endpoint:** `api/v1/tasks/`  
**Description:** Fetches all tasks.  
**Method:** GET  
**Middleware:**  
- `auth(allPermissions.GET_ALL_TASKS)`  
- `validate(taskReqValidationSchema.getAllTasks)`  

### 2. Create Task
**Endpoint:** `api/v1/tasks/`  
**Description:** Creates a new task.  
**Method:** POST  
**Middleware:**  
- `auth(allPermissions.CREATE_TASK)`  
- `validate(taskReqValidationSchema.createTask)`  

### 3. Get Task with Comments
**Endpoint:** `api/v1/tasks/:taskId`  
**Description:** Fetches a specific task along with its comments.  
**Method:** GET  
**Middleware:**  
- `auth(allPermissions.GET_TASK)`  
- `validate(taskReqValidationSchema.getTask)`  

### 4. Update Task
**Endpoint:** `api/v1/tasks/:taskId`  
**Description:** Updates the details of a specific task.  
**Method:** PATCH  
**Middleware:**  
- `auth(allPermissions.UPDATE_TASK)`  
- `validate(taskReqValidationSchema.updateTask)`  

### 5. Delete Task
**Endpoint:** `api/v1/tasks/:taskId`  
**Description:** Deletes a specific task.  
**Method:** DELETE  
**Middleware:**  
- `auth(allPermissions.DELETE_TASK)`  
- `validate(taskReqValidationSchema.deleteTask)`  

---

## Comment Endpoints

### 1. Get All Comments
**Endpoint:** `api/v1/comments/`  
**Description:** Fetches all comments.  
**Method:** GET  
**Middleware:**  
- `auth(allPermissions.ALL_COMMENT)`  
- `validate(commentReqValidationSchema.getAllComments)`  

### 2. Add Comment
**Endpoint:** `api/v1/comments/`  
**Description:** Adds a new comment.  
**Method:** POST  
**Middleware:**  
- `auth(allPermissions.ADD_COMMENT)`  
- `validate(commentReqValidationSchema.addComment)`  

### 3. Get Comment
**Endpoint:** `api/v1/comments/:commentId`  
**Description:** Fetches a specific comment.  
**Method:** GET  
**Middleware:**  
- `auth(allPermissions.GET_COMMENT)`  
- `validate(commentReqValidationSchema.getComment)`  

### 4. Update Comment
**Endpoint:** `api/v1/comments/:commentId`  
**Description:** Updates the details of a specific comment.  
**Method:** PATCH  
**Middleware:**  
- `auth(allPermissions.UPDATE_COMMENT)`  
- `validate(commentReqValidationSchema.updateComment)`  

### 5. Delete Comment
**Endpoint:** `api/v1/comments/:commentId`  
**Description:** Deletes a specific comment.  
**Method:** DELETE  
**Middleware:**  
- `auth(allPermissions.DELETE_COMMENT)`  
- `validate(commentReqValidationSchema.deleteComment)`  

---
# Project Structure

```plaintext
task-management-system
├── src/                     # Source files
│   ├── controllers/         # API request handlers
│   │   ├── task.controller.js
│   │   ├── comment.controller.js
│   │   ├── user.controller.js
│   │   └── auth.controller.js
│   ├── lib/                 # Utility libraries
│   │   ├── config/
│   │   │   ├── cookies.js
│   │   │   ├── cors.js
│   │   │   └── envConfig.js
│   │   ├── constants/
│   │   │   ├── index.js
│   │   │   ├── roles.js
│   │   ├── utils/
│   │   │   ├── ApiError.js
│   │   │   ├── catchAsync.js
│   │   │   └── pick.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── error.js
│   │   └── validate.js
│   ├── models/              # MongoDB models
│   │   ├── task.model.js
│   │   ├── comment.model.js
│   │   ├── user.model.js
│   │   └── authToken.model.js
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── task.routes.js
│   │   │   ├── comment.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── auth.routes.js
│   ├── services/            # Business logic
│   │   ├── task.service.js
│   │   ├── comment.service.js
│   │   ├── user.service.js
│   │   └── authToken.service.js
│   ├── validations/         # Request validation schemas
│   │   ├── task.validation.js
│   │   ├── comment.validation.js
│   │   ├── user.validation.js
│   │   └── authToken.validation.js
│   └── app.js               # Main application file
│   └── index.js             # MongoDB connection and process handlers
```
---
### Accessing the APIs

- The APIs will be available at: `http://localhost:<PORT>`
- [Postman Collection](https://www.postman.com/dev444-0170/workspace/task-management-system/collection/25930372-3198fd67-ab33-49c4-ab05-5c55dfe001c9?action=share&creator=25930372)

