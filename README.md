# Blackrose Task

This project is a dummy full‑stack application demonstrating authentication, real‑time data visualization, and CRUD operations. The backend is built with FastAPI (using SQLite and CSV file handling) and the frontend is built with React. The backend is hosted on Render and the frontend on Vercel (or Netlify).

---

## Table of Contents

- [Features](#features)
- [Local Setup Instructions](#local-setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Testing Steps](#testing-steps)
  - [Authentication](#authentication)
  - [Real-Time Data Visualization](#real-time-data-visualization)
  - [CSV CRUD Operations](#csv-crud-operations)

- [Hosted Application Links](#hosted-application-links)


---

## Features

- **Authentication:**  
  - User registration and login endpoints using FastAPI.
  - JWT tokens are issued for authenticated sessions and stored in the database.

- **Random Number Generator:**  
  - A background task generates a random number every second and stores it in a SQLite database.
  - A WebSocket endpoint streams these numbers in real time.

- **CSV CRUD Operations:**  
  - Endpoints allow for Create, Read, Update, and Delete operations on a CSV file.
  - The CSV file uses the following format and headers:
    ```
    user, broker, API key, API secret, pnl, margin, max_risk
    user_1, BrokerA, APIKEY_1294, APISECRET_83978, 3911.21, 32134.43, 2.63
    user_2, BrokerB, APIKEY_2481, APISECRET_48637, -3670.28, 39863.92, 9.79
    user_3, BrokerB, APIKEY_7580, APISECRET_92061, -1349.18, 37607.74, 0.36
    user_4, BrokerC, APIKEY_1819, APISECRET_66637, 1114.96, 42650.44, 2.59
    user_5, BrokerA, APIKEY_9241, APISECRET_77485, 1779.82, 36279.78, 4.47
    user_6, BrokerB, APIKEY_3843, APISECRET_67949, 677.96, 2226.61, 6.31
    user_7, BrokerA, APIKEY_4889, APISECRET_50033, -3227.61, 43271.03, 9.89
    user_8, BrokerB, APIKEY_2998, APISECRET_64865, 513.78, 5138.49, 0.98
    user_9, BrokerB, APIKEY_5588, APISECRET_29626, -2203.73, 12033.94, 6.42
    user_10, BrokerC, APIKEY_8492, APISECRET_68319, 212.89, 40958.06, 5.69
    user_11, BrokerB, APIKEY_9496, APISECRET_51317, 1567.69, 6536.02, 8.64
    user_12, BrokerA, APIKEY_6808, APISECRET_74291, -4358.3, 24420.21, 5.7
    ```
  - A backup mechanism creates a backup before each write, and a restore endpoint is provided.

- **Concurrency Management:**  
  - File locking is implemented for CSV operations to handle simultaneous modifications.

- **Frontend:**  
  - A dark-themed React application with a login/registration flow.
  - A dashboard displays a real‑time chart (via Chart.js) and a paginated table of random numbers.
  - A CSV Editor interface to manage CSV data and a Recovery UI to restore data from backup.

---

## Local Setup Instructions

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/notinrange/blackrose-task-backend.git
   cd backend


## Install Dependencies

```bash
pip install -r requirements.txt
```

## Initialize the Database and CSV File

- The backend automatically initializes the SQLite database (`backend.db`) and the CSV file (`backend_table.csv`) with sample data if they do not exist.
- Ensure your project directory has write permissions.

## Run the Backend Server

```bash
uvicorn app.main:app --reload
```

The backend will run on [http://localhost:8000](http://localhost:8000).

---

# Frontend Setup

## Clone the Repository

```bash
git clone https://github.com/notinrange/blackrose-task-frontend
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the frontend root with:

```ini
REACT_APP_API_BASE_URL=http://localhost:8000
```

This variable points your frontend API calls to your local backend.

## Run the Frontend Development Server

```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

---

# Testing Steps

## Authentication

### Register a New User

Use the frontend registration page or send a POST request to `/register` with:

```json
{
  "username": "testuser",
  "password": "testpass"
}
```

Verify that you receive a success message.

### Login

Use the frontend login page or send a POST request to `/login` with:

```json
{
  "username": "testuser",
  "password": "testpass"
}
```

Verify that you receive a JWT token. The token should be stored in `localStorage` and used in subsequent requests.

## Real-Time Data Visualization

### Random Number Generation

- The backend generates a random number every second and stores it in the database.

### WebSocket Streaming

- Connect to the `/ws/numbers` endpoint using your JWT token.
- Confirm that the React chart (using Chart.js) updates in real-time with the new numbers.

### Paginated Table

- The `DataTable` component fetches random numbers via the `/numbers` endpoint.
- Verify that pagination works and displays the specified number of records per page.

## CSV CRUD Operations

### Fetch CSV Data

- Use the CSV Editor or send a GET request to `/csv` to retrieve current CSV records.

### Create a New CSV Record

Use the CSV Editor to add a record with fields matching:

```css
user, broker, API key, API secret, pnl, margin, max_risk
```

### Update an Existing CSV Record

- Modify a record via the CSV Editor, identified by the `user` field.

### Delete a CSV Record

- Delete a record via the CSV Editor.

### Restore CSV Backup

- Use the Recovery UI or call the `/csv/restore` endpoint to restore the CSV from backup.

---




---

# Hosted Application Links

- **Backend:** [https://blackrose-task-backend.onrender.com](https://blackrose-task-backend.onrender.com)
- **Frontend:** [https://task-blackrose.vercel.app/](https://task-blackrose.vercel.app/)

# When you logged in there is no lines shown because render.com in free plan does not allow establish a secure WebSocket connection 







https://github.com/user-attachments/assets/aa505aaa-64ce-4919-90ac-3b9971bd3611



