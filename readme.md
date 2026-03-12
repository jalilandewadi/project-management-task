

## Overview

This project implements a RESTful backend API for managing **Users, Projects, and Daily Progress Reports (DPR)**.
It is built using **Node.js, Express.js, MySQL, and Sequelize ORM**, with **JWT-based authentication** and **role-based access control**.

The system allows administrators and managers to create and manage projects while workers can submit daily progress reports.

---

# Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **Sequelize ORM**
* **JWT Authentication**
* **bcryptjs (Password Hashing)**
* **Postman (API Testing)**
* **dotenv (Environment Variables)**

---

# Features

## Authentication

* Register new users
* Login with email and password
* JWT token authentication

## Role-Based Access Control

Three roles are supported:

* **Admin**
* **Manager**
* **Worker**

Permissions:

| Action         | Admin | Manager | Worker |
| -------------- | ----- | ------- | ------ |
| Create Project | ✓     | ✓       | ✗      |
| Update Project | ✓     | ✓       | ✗      |
| Delete Project | ✓     | ✗       | ✗      |
| Create DPR     | ✓     | ✓       | ✓      |
| View Projects  | ✓     | ✓       | ✓      |

---

# Database Schema

## Users Table

| Field         | Type      | Description              |
| ------------- | --------- | ------------------------ |
| id            | INT       | Primary Key              |
| name          | VARCHAR   | User name                |
| email         | VARCHAR   | Unique email             |
| password_hash | VARCHAR   | Hashed password          |
| role          | ENUM      | admin / manager / worker |
| created_at    | TIMESTAMP | Account creation time    |

---

## Projects Table

| Field       | Type      | Description                  |
| ----------- | --------- | ---------------------------- |
| id          | INT       | Primary Key                  |
| name        | VARCHAR   | Project name                 |
| description | TEXT      | Project description          |
| start_date  | DATE      | Project start date           |
| end_date    | DATE      | Project end date             |
| status      | ENUM      | planned / active / completed |
| created_by  | INT       | FK → users.id                |
| created_at  | TIMESTAMP | Creation time                |

---

## Daily Reports Table

| Field            | Type      | Description       |
| ---------------- | --------- | ----------------- |
| id               | INT       | Primary Key       |
| project_id       | INT       | FK → projects.id  |
| user_id          | INT       | FK → users.id     |
| date             | DATE      | Report date       |
| work_description | TEXT      | Work done         |
| weather          | VARCHAR   | Weather condition |
| worker_count     | INT       | Number of workers |
| created_at       | TIMESTAMP | Creation time     |

---

# Project Folder Structure

```
backend-intern-task
│
config
 └ db.js
│
controllers
 ├ authController.js
 ├ projectController.js
 └ dprController.js
│
middleware
 ├ authMiddleware.js
 └ roleMiddleware.js
│
models
 ├ user.js
 ├ project.js
 └ dailyReport.js
│
routes
 ├ authRoutes.js
 ├ projectRoutes.js
 └ dprRoutes.js
│
sql
 └ schema.sql
│
.env.example
server.js
package.json
README.md
```

---

# Setup Instructions

## 1 Install Dependencies

```
npm install
```

---

## 2 Configure Environment Variables

Create a `.env` file in the project root:

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=intern_task

JWT_SECRET=supersecretkey
```

---

## 3 Create MySQL Database

Login to MySQL and run:

```
CREATE DATABASE intern_task;
```

---

## 4 Run SQL Schema

Execute the schema file:

```
mysql -u root -p intern_task < sql/schema.sql
```

This will create:

* users table
* projects table
* daily_reports table

---

## 5 Start the Server

Run the development server:

```
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

# API Endpoints

## Authentication

### Register User

POST `/auth/register`

Example Request:

```
{
"name": "Admin User",
"email": "admin@test.com",
"password": "123456",
"role": "admin"
}
```

---

### Login

POST `/auth/login`

Example Request:

```
{
"email": "admin@test.com",
"password": "123456"
}
```

Response:

```
{
"token": "JWT_TOKEN",
"user": {
"id": 1,
"name": "Admin User",
"role": "admin"
}
}
```

---

# Projects APIs

## Create Project

POST `/projects`

Authorization required (Admin / Manager)

Example:

```
{
"name": "Bridge Construction",
"description": "Building a new highway bridge",
"start_date": "2026-03-12",
"end_date": "2026-10-12"
}
```

---

## Get All Projects

GET `/projects`

Optional query parameters:

```
/projects?status=active&limit=10&offset=0
```

---

## Get Project by ID

GET `/projects/:id`

Returns full project details.

---

## Update Project

PUT `/projects/:id`

Example:

```
{
"end_date": "2026-12-01"
}
```

---

## Delete Project

DELETE `/projects/:id`

Only **Admin** can delete projects.

---

# Daily Progress Reports (DPR)

## Create DPR

POST `/projects/:id/dpr`

Example:

```
{
"date": "2026-03-12",
"work_description": "Foundation work completed",
"weather": "Sunny",
"worker_count": 15
}
```

---

## Get DPRs for Project

GET `/projects/:id/dpr`

Returns all daily reports for that project.

---

# Authentication Flow

1. User registers or logs in
2. Server generates JWT token
3. Client sends token in request header

Example header:

```
Authorization: Bearer <JWT_TOKEN>
```

Protected routes verify this token before allowing access.

---

# Error Handling

The API returns standard HTTP status codes:

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

