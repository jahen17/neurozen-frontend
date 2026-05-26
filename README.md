# NeuroZen Frontend

Frontend web application for **NeuroZen**, an academic psychological appointment management platform.

This project connects to the **NeuroZen Backend API** and allows users to manage patients, psychologists, and appointments through a simple web interface.

---

## Project Overview

NeuroZen Frontend is a web interface built with HTML, CSS, and JavaScript.  
It consumes a REST API using the Fetch API and displays real data from a PostgreSQL database through the backend service.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- Git & GitHub
- Live Server for local development

---

## Features

- Dashboard page
- Patient management module
- Psychologist management module
- Appointment management module
- Dynamic data loading from backend API
- Patient registration
- Psychologist registration
- Appointment creation
- Appointment status update
- Delete actions
- Responsive layout

---

## Project Structure

```txt
neurozen-frontend/
│
├── assets/
│   └── img/
│
├── css/
│   └── styles.css
│
├── js/
│   ├── api.js
│   ├── appointments.js
│   ├── patients.js
│   └── psychologists.js
│
├── pages/
│   ├── appointments.html
│   ├── patients.html
│   └── psychologists.html
│
├── index.html
├── .gitignore
└── README.md
```

---

## Backend Requirement

This frontend requires the backend API to be running locally.

Backend repository:

```txt
https://github.com/jahen17/neurozen-backend-api
```

Default API URL:

```js
const API_BASE_URL = 'http://localhost:3000/api';
```

This value is located in:

```txt
js/api.js
```

---

## How to Run

Clone the repository:

```bash
git clone https://github.com/jahen17/neurozen-frontend.git
```

Enter the project folder:

```bash
cd neurozen-frontend
```

Open the project with VS Code:

```bash
code .
```

Run the project using the **Live Server** extension.

Main page:

```txt
index.html
```

---

## Pages

### Dashboard

```txt
index.html
```

General presentation of the NeuroZen platform.

### Patients

```txt
pages/patients.html
```

Allows users to view, create, and delete patients.

### Psychologists

```txt
pages/psychologists.html
```

Allows users to view, create, and delete psychologists.

### Appointments

```txt
pages/appointments.html
```

Allows users to view appointments, create new appointments, update status, and delete appointments.

---

## Learning Goals

Through this project, I practiced:

- Structuring a frontend project
- Connecting frontend with a REST API
- Using JavaScript Fetch API
- Handling forms with JavaScript
- Rendering dynamic data in tables
- Working with backend and database integration
- Creating basic responsive layouts
- Documenting a frontend repository

---

## Author

**Henry Jaredt Montes Ramos**  
Software Engineering Student  
Lima, Peru

LinkedIn: [Henry Jaredt Montes Ramos](https://www.linkedin.com/in/henry-jaredt-montes-ramos-33835327a)

---

## Status

First version completed for portfolio purposes. Future improvements may include authentication views, better UI components, search filters, pagination, and deployment.
