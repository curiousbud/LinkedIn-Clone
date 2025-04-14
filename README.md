# LinkedIn Clone – MERN Stack Project

A full-stack LinkedIn Clone built using the MERN stack. This project replicates key LinkedIn features including user authentication, profile management, posting updates, and establishing professional connections.

## Table of Contents

- [LinkedIn Clone – MERN Stack Project](#linkedin-clone--mern-stack-project)
  - [About the Project](#about-the-project)
    - [Features](#features)
    - [Tech Stack](#tech-stack)
    - [Screenshots](#screenshots)
  - [In Progress](#in-progress)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
      - [1. Clone the Repository:](#1-clone-the-repository)
    - [2. Set Up the Server:](#2-set-up-the-server)
    - [3. Set Up the Client](#3-set-up-the-client)
    - [4. Running the Project](#4-running-the-project)
    - [5. Now, open http://localhost:3000 in your browser to see the application.](#5-now-open-httplocalhost3000-in-your-browser-to-see-the-application)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)


## About the Project

This **LinkedIn Clone** is a MERN stack web application that offers the core functionalities of LinkedIn. The application enables users to sign up, create or edit their profiles, share posts, and network with other professionals.

### Features

- **User Authentication:** Secure signup, login, and logout functionalities.
- **Profile Management:** Create, update, and view professional profiles.
- **Post Creation:** Share posts, articles, and media updates with your network.
- **Networking:** Send connection requests and manage your network.
- **Responsive Design:** Mobile-friendly layout built with React.
- **RESTful API:** Express and MongoDB power the backend for efficient data handling.

### Tech Stack

- **Client:** React.js, HTML5, CSS3, JavaScript (ES6+)
- **Server:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose for object data modeling)
- **Authentication:** JWT (JSON Web Tokens)
- **HTTP Requests:** Axios

### Screenshots

## In Progress


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or access to a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- A code editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))

### Installation

#### 1. Clone the Repository:

```bash
git clone https://github.com/curiousbud/LinkedIn-Clone.git
cd LinkedIn-Clone
```

### 2. Set Up the Server:
  1. Navigate to the server directory:
 ```bash
  cd server
```

  2. Install the server dependencies:
  ```bash
  npm install
  ```
  
 3.  Create a .env file in the server directory with the following variables (update the values accordingly):
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  ```
  
### 3. Set Up the Client
  1. Open a new terminal and navigate to the client directory:
  ```bash
  cd ../client
  ```
  
  2. Install the client dependencies:
  ```bash
  npm install
  ```
  
  3. Create a .env file in the client directory if needed:
  ```env
  REACT_APP_API_URL=http://localhost:5000
  ```
### 4. Running the Project
  1. Start the Server
    From the server directory, run:
```bash
      npm run dev
      This starts the backend server on the port specified in your .env file (default is 5000).
```

  2. Start the Client
    From the client directory, run:
```bash
      npm run dev
      This launches the React development server (default port is 5173).
```

### 5. Now, open http://localhost:5173 in your browser to see the application.

## Project Structure
  Here's a high-level overview of the project organization:

  ```bash
  LinkedIn-Clone/
  ├── client/               # React frontend
  │   ├── public/
  │   ├── src/
  │   ├── .env (optional)
  │   └── package.json
  ├── server/               # Express backend
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   ├── utils/
  │   ├── .env
  │   └── package.json
  └── README.md
  ```
## Contributing
Contributions are welcome! To contribute!:
  1. Fork the repository.
  2. Create a new branch (git checkout -b feature/YourFeature).
  3. Commit your changes (git commit -m "Add new feature").
  4. Push to your branch (git push origin feature/YourFeature).
  5. Open a Pull Request.

For any changes, please open an issue first to discuss what you would like to change.

## License
Distributed under the [MIT](LICENSE). See the LICENSE file for more details.

## Contact
For any questions or feedback, please reach out:
GitHub: [curiousbud]([curiousbud (Khan Areeb Khalid)](https://github.com/curiousbud)).

Email: akareeb6622gmail.com


