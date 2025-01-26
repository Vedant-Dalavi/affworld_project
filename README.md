# **AffWorld Project**

Welcome to the **AffWorld Project**! This is a full-stack web application designed to manage tasks and user authentication. The project includes a React frontend and a Node.js backend, with features like user login, signup, and task management.

## **Live Demo**

You can access the live demo of the project here:
- https://affworld-project-q62w.vercel.app/

---

## **Features Implemented**

### **1. User Authentication**
- **Login**: Users can log in with their credentials.
- **Signup**: New users can create an account.

### **2. Task Management**
- **Task Page**: Authenticated users can view and manage their tasks.
- **Add/Edit/Delete Tasks**: Users can add new tasks, edit existing ones, or delete tasks.

### **3. Responsive Design**
- The application is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

### **4. Secure Routing**
- Protected routes ensure that only authenticated users can access the task management page.

---

## **Technologies Used**

### **Frontend**
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend.

### **Backend**
- **Node.js**: A JavaScript runtime for building the backend.
- **Express**: A web framework for Node.js.
- **MongoDB**: A NoSQL database for storing user and task data.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.

---

## **Steps to Run the Project Locally**

Follow these steps to set up and run the project on your local machine.

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/affworld-project.git
cd affworld-project

```

### **2. Set Up the Backend**
Navigate to the backend directory:

```bash
cd backend
Install dependencies:
```

```bash
npm install
```

Create a .env file in the backend directory and add the following environment variables:

```bash
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:

```bash
Copy
npm run dev
```
The backend will run on http://localhost:4000.

### **3. Set Up the Frontend**
Navigate to the client directory:

```bash
cd ../client
```
Install dependencies:

```bash
npm install
```
Create a .env file in the client directory and add the following environment variable:


```bash
VITE_API_BASE_URL=http://localhost:4000
```
Start the frontend development server:

```bash
npm run dev
```
The frontend will run on http://localhost:5173.

### **4. Access the Application**
Open your browser and navigate to:

Frontend: http://localhost:5173

Backend API: http://localhost:4000
