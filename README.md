# CodeZera - Social Web Application

A full-featured social web application built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Local, Google OAuth, JWT)
- Session Management
- File Uploads
- Background Job Processing
- Email Notifications
- Responsive UI with EJS Templates
- MongoDB Database Integration

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript), Node-Sass
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Passport.js (Local, Google OAuth, JWT)
- **Session Management:** Express Session with MongoDB Store
- **File Upload:** Multer
- **Background Jobs:** Kue
- **Email:** Nodemailer

## Prerequisites

- Node.js (v12 or higher)
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codezera
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
- Make sure MongoDB is running on your system
- The application uses MongoDB at `mongodb://127.0.0.1/codezera_dev`

4. Configure environment variables:
- Create a `.env` file in the root directory
- Add necessary environment variables (if any)

## Running the Application

1. Start the development server:
```bash
npm start
```

2. The application will be available at `http://localhost:8000`

## Project Structure

```
codezera/
├── assets/         # Static files (CSS, JS, images)
├── config/         # Configuration files
├── controllers/    # Route controllers
├── mailers/        # Email templates and logic
├── models/         # Database models
├── routes/         # Application routes
├── uploads/        # User uploaded files
├── views/          # EJS view templates
├── workers/        # Background job workers
├── index.js        # Application entry point
└── package.json    # Project dependencies
```

## Authentication Methods

- **Local Authentication:** Username and password
- **Google OAuth:** Sign in with Google
- **JWT:** JSON Web Token authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
