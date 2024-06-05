
# Eventify Backend Server

This is the backend server for the Eventify website, an event management platform. The backend is built with Node.js, Express, and MongoDB, providing a RESTful API for performing CRUD operations on event data. Additionally, it utilizes JWT (JSON Web Tokens) for securing POST and DELETE operations.

## Features

- RESTful API for event management
- CRUD operations on events
- JWT authentication for POST and DELETE operations
- JWT authentication for USER
- CORS support for cross-origin requests
- MongoDB as the database

## Technologies Used

- Node.js
- Express
- MongoDB
- CORS
- JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB
### Installation
1. **Clone the repository:**
   git clone https://github.com/bhabna01/Eventify-server.git
2. **Navigate to the project directory:**
   cd eventify-server
3. **Install the dependencies:**
   npm install  
###  Configuration
 **.env file:**
   Set up .env file
   PORT=5000
   MONGO_URI=mongodb+srv://abier18fab:kt4g2deVcPlSkEJZ@cluster0.evk8oe9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

### Running the server
Start the development server:npm start


### Dependencies

- express: Fast, unopinionated, minimalist web framework for Node.js
- mongodb: MongoDB object modeling tool designed to work in an asynchronous environment
- cors: Express middleware to enable CORS
- dotenv: Module that loads environment variables from a .env file into process.env
- jsonwebtoken: Implementation of JSON Web Tokens for generating and verifying tokens

### Live Server
https://eventify-server-amber.vercel.app/

