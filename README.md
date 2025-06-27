# Email Confirmation Sender App

This project is a full-stack web application that allows users to submit their name and email to receive a confirmation email. It consists of two parts:

- **Frontend:** An AngularJS single-page app that handles user input and displays feedback.
- **Backend:** A Node.js/Express server connected to a MySQL database that stores user data and sends confirmation emails.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Notes](#notes)
- [Author](#author)

---

## Features

- User registration form with validation.
- Stores user info in a MySQL database.
- Sends a confirmation email upon successful submission.
- Responsive UI with light/dark mode toggle.
- Loading spinner during form submission.
- Google reCAPTCHA integration to prevent spam.

---

## Technologies Used

- **Frontend:** AngularJS, HTML5, CSS3
- **Backend:** Node.js, Express.js, MySQL (mysql2), Nodemailer
- **Other:** Google reCAPTCHA, CORS, Body-parser

---

## Project Structure

    email-confirmation-app/
    │
    ├── email-sender-frontend/       # AngularJS frontend code
    │   ├── index.html
    │   ├── app.js
    │   └── style.css
    │
    ├── email-sender-backend/        # Node.js backend code
    │   ├── server.js
    │   ├── package.json
    │   └── package-lock.json
    │
    └── README.md                    # Project documentation (this file)

---

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- MySQL server installed and running
- Google reCAPTCHA v2 keys (site key and secret key)

### Backend Setup

1. Navigate to the backend folder:

    ```bash
    cd email-sender-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure MySQL credentials inside `server.js` (host, user, password, database).

4. Start the backend server:

    ```bash
    node server.js
    ```

### Frontend Setup

1. Navigate to the frontend folder:

    ```bash
    cd ../email-sender-frontend
    ```

2. Open `index.html` in your browser or serve with any static server.

---

## Usage

- Fill in your name and email.
- Complete the Google reCAPTCHA.
- Click **Send Confirmation**.
- You will receive a confirmation email if successful.

---

## Environment Variables

For security, it's recommended to use environment variables for sensitive information like:

- MySQL user and password
- Gmail credentials for Nodemailer
- Google reCAPTCHA secret key

Consider using `.env` files or other secrets management methods for production.

---

## Notes

- This project uses Gmail SMTP; you may need to enable "App Passwords" or "Less Secure Apps" in your Gmail account.
- The database table `users` must be created beforehand with columns `id` (auto-increment), `name`, and `email`.
- Google reCAPTCHA keys can be obtained from [Google reCAPTCHA admin](https://www.google.com/recaptcha/admin).

---

## Author

Aneesh Krishna — [GitHub](https://github.com/Aneesh495)

---

Feel free to open issues or submit pull requests if you want to contribute!
