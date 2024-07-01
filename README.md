# Temp Money App

Temp Money App is a learning project that showcases the use of the MERN stack (MongoDB, Express, React, Node.js) along with several dependencies. This application simulates a basic money transfer system, providing functionalities like user signup, signin, balance check, and money transfer.

## Live Demo

🚀 [Live Demo](https://temp-money.vercel.app)

- Frontend deployed on Vercel
- Backend deployed on Render

## Features

- User Authentication (Signup, Signin, Logout)
- View User Balance
- Search and Send Money to Other Users
- Protected Routes

## Technologies Used

### Backend

- **Node.js**
- **Express**
- **MongoDB (Mongoose)**
- **JWT for Authentication**
- **Zod for Schema Validation**
- **Helmet for Security**
- **CORS for Cross-Origin Requests**
- **Rate Limiting**

### Frontend

- **React**
- **React Context API for State Management**
- **React Router for Routing**
- **Axios for HTTP Requests**
- **Styled Components for Styling**
- **Tailwind CSS for Utility-First Styling**
- **React Loading Skeleton for Loading Placeholders**

## Dependencies

### Backend Dependencies

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Backend

1. Clone the repository and navigate to the backend directory:

    ```bash
    git clone https://github.com/yourusername/temp-money-app.git
    cd temp-money-app/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the backend directory and add your environment variables:

    ```env
    DB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the frontend directory and add your environment variables:

    ```env
    REACT_APP_API_URL=http://localhost:3000/api/v1
    ```

4. Start the frontend development server:

    ```bash
    npm run dev
    ```