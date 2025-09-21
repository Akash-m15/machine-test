Here’s a polished **README.md** based on your detailed developer brief:

````markdown
# MERN Task Management Application

## **Objective**

This project is a **MERN stack** application designed to manage agents and their assigned tasks. The main objectives are:

1. Admin user login
2. Agent creation & management
3. Uploading and distributing task lists via CSV

---

## **Features**

### 1. User Login

- Login form with **Email** and **Password**
- Authenticate users using **JSON Web Tokens (JWT)**
- On successful login, redirect to the **dashboard**
- On failure, show appropriate error messages

### 2. Add Agents

- Add new agents with the following details:
  - Name
  - Email
  - Mobile number (with country code)
  - Password
- Edit and delete agent details
- Assign tasks to agents

### 3. Upload CSV & Distribute Lists

- Upload a CSV file containing:
  - FirstName (Text)
  - Phone (Number)
  - Notes (Text)
- File validation: Only `.csv`, `.xlsx`, `.xls` accepted
- Validate CSV format
- Distribute tasks equally among **agents**:
  - Example: 25 tasks among 5 agents → each gets 5 tasks
  - If not divisible, remaining tasks are assigned sequentially
- Store tasks in **MongoDB**
- Display tasks for each agent on the frontend

---

## **Technical Requirements**

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js 
- **Authentication**: JWT with refresh tokens , Rate-Limiting
- **Validation**: Input and CSV validation using Zod

- Proper error handling and clean, readable code
- `.env` file for configuration:
  - Database connection string
  - JWT secret

---

## **Installation & Setup**

1. **Clone the repository**

```bash
git clone https://github.com/Akash-m15/machine-test
cd mern-task-dashboard
````

2. **Install dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Create `.env` in backend**

```env
MONGO_DB_URL="your-mongo-db-url"
JWT_SECRET_KEY=jwtsecretkey
NODE_ENV = development

JWT_ACCESS_SECRET=supersecretaccesskey
JWT_REFRESH_SECRET=supersecretrefreshkey
ACCESS_TOKEN_EXP="45m"
REFRESH_TOKEN_EXP="7d"
```

4. **Run the application**

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
```

The app should be running at `http://localhost:3000`.

---

## **Backend API Routes**

### Auth

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| POST   | /auth/login   | Login user           |
| POST   | /auth/refresh | Get new access token |

### Agents

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| GET    | /agents        | Get all agents       |
| POST   | /agents/create | Create a new agent   |
| GET    | /agents/:id   | Get agent details    |
| PUT    | /agents/:id   | Update agent details |
| DELETE | /agents/:id   | Delete agent         |

### Tasks

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| POST   | /tasks/upload          | Upload CSV and distribute tasks |
| GET    | /tasks                 | Get all tasks                   |
| GET    | /tasks/agent/:agentId | Get tasks for a specific agent  |
| PUT    | /tasks/:id            | Update a task                   |
| DELETE | /tasks/:id            | Delete a task                   |

---

## **Frontend Pages**

* `Dashboard.tsx` → Agent management and CSV upload
* `Tasks.tsx` → View all tasks, upload CSV
* `Agent.tsx` → View tasks for a specific agent
* `EditAgent.tsx` → Edit agent information

Do you want me to do that next?
```
