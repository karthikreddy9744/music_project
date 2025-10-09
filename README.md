# Music Hub - A Full-Stack MEAN Application

Music Hub is a feature-rich, full-stack web application built with the **MEAN (MongoDB, Express, AngularJS, Node.js)** stack. It serves as a platform for users to discover, review, and discuss music, news, and festivals. The application features distinct roles for regular users and administrators, secure authentication, and integrations with modern services like AWS S3 and Google's Generative AI.

---

## Features

- **Secure Authentication:** JWT-based stateless authentication for a secure and scalable user experience.
- **Role-Based Access Control (RBAC):** Distinct permissions for **Users** (viewing, reviewing) and **Admins** (full CRUD on content).
- **Full CRUD Functionality:** Administrators can create, read, update, and delete Music, News, and Festival entries.
- **Interactive Review System:** Authenticated users can post ratings and comments on content.
- **Global Real-Time Search:** A navigation bar search that provides live results across all content types.
- **AI Chat Widget:** A real-time chat assistant powered by Google's Generative AI and Socket.io, available to logged-in users.
- **Admin Dashboard:** A protected page displaying site statistics and data visualizations using Chart.js.
- **Interactive Maps:** Festival locations are displayed on interactive maps using Leaflet.js.
- **Cloud Media Storage:** All user-uploaded media (e.g., artist images) is stored securely and efficiently on AWS S3.
- **Responsive Design:** A mobile-first interface built with Bootstrap 3 and custom SASS.

---

## Technology Stack

| Category         | Technology                                                  |
| ---------------- | ----------------------------------------------------------- |
| **Frontend**     | AngularJS (v1.8.3), Bootstrap 3, SASS, Leaflet.js, Chart.js |
| **Backend**      | Node.js, Express.js                                         |
| **Database**     | MongoDB with Mongoose ODM                                   |
| **Auth**         | JSON Web Tokens (JWT), bcrypt                               |
| **File Storage** | AWS S3, Multer                                              |
| **Real-time**    | Socket.io                                                   |
| **Deployment**   | Render                                                      |

---

## System Architecture

The project is built as a **monolithic application** where the Node.js/Express server has two primary responsibilities:

1.  **Exposing a RESTful API:** All backend logic is available through endpoints prefixed with `/api`.
2.  **Serving the Frontend:** The server also serves the static files (HTML, CSS, JS) for the AngularJS Single Page Application (SPA) and includes a "catch-all" route to enable client-side routing.

---

## Local Development Setup

### Prerequisites

- Node.js (v16.0.0 or higher)
- NPM (v8.0.0 or higher)
- MongoDB (local instance or a cloud service like MongoDB Atlas)
- AWS S3 Bucket and Credentials
- Google Generative AI API Key

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd music_project
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables. Replace the placeholder values with your actual credentials.

    ```env
    # Server Configuration
    PORT=3000
    NODE_ENV=development

    # Database
    DATABASE_URI=mongodb://127.0.0.1:27017/music-hub

    # Security
    JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY

    # AWS S3 Configuration
    AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
    AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
    S3_BUCKET_NAME=your-s3-bucket-name
    AWS_REGION=your-aws-region # e.g., us-east-1

    # Google AI
    GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```

4.  **Run the application:**
    This command will start the Node.js server with `nodemon` and concurrently watch for SASS file changes.
    ```bash
    npm run dev-full
    ```
    The application will be available at `http://localhost:3000`.

---

## Available Scripts

- `npm start`: Starts the server in production mode.
- `npm run dev`: Starts the server with `nodemon` for automatic restarts on file changes.
- `npm run build-css`: Compiles SASS files to CSS once.
- `npm run watch-css`: Watches SASS files and recompiles them on change.
- `npm run dev-full`: Runs the `dev` and `watch-css` scripts concurrently.
- `npm run seed`: (If available) Populates the database with initial data.

---

## Deployment

This application is configured for deployment on **Render**.

- **Service Type:** Web Service
- **Build Command:** `npm install && npm run build-css`
- **Start Command:** `npm start`

All environment variables must be added to the service's **Environment** tab in the Render dashboard.
