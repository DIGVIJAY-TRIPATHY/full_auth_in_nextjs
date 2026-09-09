# Next.js Full-Stack Authentication System

> A production-minded authentication system built with Next.js, MongoDB, JWTs, and email verification.

This project demonstrates a complete, full-stack user authentication workflow. It lets users create an account, verify their email address, sign in securely, access protected pages, retrieve their own account data, and sign out. The application pairs a Next.js frontend with server-side route handlers, MongoDB persistence, JWT-based sessions, SMTP email delivery, and route middleware.

The name **StudyHub** is used only as the current UI brand. This repository's primary goal is the authentication system—not a course-management or learning platform.

## Contents

- [Features](#features)
- [How it works](#how-it-works)
- [Technology](#technology)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available commands](#available-commands)
- [Routes and API](#routes-and-api)
- [Project structure](#project-structure)
- [Authentication flow](#authentication-flow)
- [Scope and roadmap](#scope-and-roadmap)
- [Security notes](#security-notes)
- [License](#license)

## Features

- Account registration with username, email address, and password.
- Password hashing with `bcryptjs` before credentials are stored.
- Email verification links sent through an SMTP provider (configured for Mailtrap).
- One-hour verification-token expiry.
- Login restricted to verified accounts.
- Signed JWT session token stored in an HTTP-only cookie.
- Middleware-based protection for the home and profile routes.
- Protected endpoint for retrieving the signed-in user's details without their password.
- Logout endpoint that clears the session cookie.
- Profile screen that can retrieve and link to the current user's identifier.
- Client-side status feedback through toast notifications.

## How it works

```text
Sign up
  → password is hashed and user is saved in MongoDB
  → a verification token and one-hour expiry are saved
  → an email containing the verification link is sent
  → user opens the link and their account is marked verified
  → verified user signs in
  → server creates a one-day JWT in an HTTP-only `token` cookie
  → middleware permits access to protected routes
```

## Technology

| Area | Tools used |
| --- | --- |
| Framework | Next.js 16 with the App Router |
| Language | TypeScript and JavaScript |
| UI | React 19, Tailwind CSS 4, Geist fonts |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Tokens (`jsonwebtoken`) and `bcryptjs` |
| Email | Nodemailer using Mailtrap SMTP settings |
| HTTP client | Axios |
| Notifications | React Hot Toast |
| Code quality | ESLint |

## Getting started

### Prerequisites

Install the following before running the application:

- Node.js 20 or newer
- npm (included with Node.js)
- A MongoDB deployment, local or hosted
- A Mailtrap SMTP inbox/account, or another SMTP service with matching settings

### Installation

1. Clone the repository and enter the project folder.

   ```bash
   git clone <your-repository-url>
   cd full_auth_in_nextjs
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root and populate it using the variables below.

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### First-run checklist

1. Open `/signup` and create an account.
2. Open the verification email delivered to the configured SMTP inbox.
3. Follow its verification link.
4. Sign in at `/login`.
5. Open `/profile`, select **Get User Details**, and use the displayed identifier if needed.

## Environment variables

Create `.env.local` at the repository root. Do not commit it; environment files are ignored by Git.

```dotenv
# MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority

# Use a long, unpredictable secret in production
TOKEN_SECRET=replace-with-a-long-random-secret

# Public base URL used to build email verification links
DOMAIN=http://localhost:3000

# SMTP configuration (Mailtrap credentials shown as placeholders)
MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your-mailtrap-username
MAILTRAP_SMTP_PASS=your-mailtrap-password
MAILTRAP_SMTP_MAIL=no-reply@example.com
```

For deployments, change `DOMAIN` to the publicly accessible HTTPS URL of the application. The name `MAILTRAP_*` reflects the current code, though the values may point to a compatible SMTP provider.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Runs the application in development mode. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Serves the production build after `npm run build`. |
| `npm run lint` | Runs ESLint checks. |

## Routes and API

### Pages

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | StudyHub landing screen | Authenticated users only |
| `/signup` | Create an account | Public |
| `/login` | Sign in to an existing verified account | Public |
| `/verifyemail?token=<token>` | Verify an account via its email link | Public |
| `/profile` | View the account area and retrieve the current user ID | Authenticated users only |
| `/profile/[id]` | Displays the selected profile identifier | Authenticated users only |

### API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/users/signup` | Validates input, creates a user, hashes the password, and sends a verification email. |
| `POST` | `/api/users/login` | Validates credentials and verification status, then sets the session cookie. |
| `POST` | `/api/users/verifyemail` | Validates an active verification token and marks the user as verified. |
| `GET` | `/api/users/me` | Returns the current user record without the password field. |
| `GET` | `/api/users/logout` | Clears the session cookie. |

### Request examples

Create an account:

```http
POST /api/users/signup
Content-Type: application/json

{
  "username": "learner01",
  "email": "learner@example.com",
  "password": "a-strong-password"
}
```

Sign in after verifying the account:

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "learner@example.com",
  "password": "a-strong-password"
}
```

## Project structure

```text
src/
├── app/
│   ├── api/users/             # Authentication and account API routes
│   ├── login/                 # Login page
│   ├── signup/                # Registration page
│   ├── verifyemail/           # Email verification result page
│   ├── profile/               # Protected profile pages
│   ├── layout.tsx             # Root layout, fonts, and toast provider
│   └── page.tsx               # Landing page
├── dbConfig/
│   └── dbConfig.ts            # MongoDB connection helper
├── helpers/
│   ├── getDataFromToken.ts    # JWT decoding helper
│   └── mailer.ts              # SMTP email and token creation helper
├── models/
│   └── user.model.js          # Mongoose user schema
└── middleware.ts              # Route access control
```

## Authentication flow

### Registration and verification

1. The signup page submits a username, email, and password to the signup API.
2. The API checks required fields and prevents duplicate email accounts.
3. The password is salted and hashed with `bcryptjs`.
4. A user is created with `isVerified: false`.
5. A hashed verification token, valid for one hour, is stored on the user record.
6. Nodemailer sends a verification link based on `DOMAIN`.
7. The verification endpoint checks that the token exists and has not expired, then sets `isVerified` to `true`.

### Login and protected access

1. The login API verifies the supplied password against the stored hash.
2. Unverified users cannot obtain a session.
3. For verified users, the API signs a JWT containing the user ID, username, and email; it expires after one day.
4. The JWT is set as the `token` HTTP-only cookie.
5. Middleware redirects unauthenticated visitors from `/` and `/profile/*` to `/login`.
6. The `/api/users/me` endpoint verifies the cookie token to find the current user.

## Scope and roadmap

This repository intentionally focuses on authentication. It is not intended to include domain-specific product features such as courses, payments, or content management. The next major authentication feature is password recovery: the data model and mail helper already include reset-token fields, but the reset-password routes and screens have not yet been implemented.

Suggested next steps:

- Add a forgot-password request page and password-reset confirmation flow.
- Add server-side validation for email format, password strength, and username rules.
- Improve the authenticated home screen and profile experience.
- Add automated unit, integration, and end-to-end tests.
- Add rate limiting, audit logging, and production observability.
- Add a reusable account-settings page that displays profile information beyond the ID.

## Security notes

This project includes important building blocks—hashed passwords, verification-gated login, expiring verification tokens, HTTP-only session cookies, and middleware-protected UI routes. Before a public production deployment, review and strengthen the following:

- Set cookie options such as `secure`, `sameSite`, and an explicit lifetime for the production environment.
- Protect API routes independently; UI middleware alone is not a complete authorization boundary.
- Never log tokens or expose verification tokens in the UI.
- Use a strong, unique `TOKEN_SECRET` and production-grade secret management.
- Validate and normalize all user input server-side.
- Use HTTPS and configure the production `DOMAIN` precisely.
- Add rate limiting and account-lockout protections around authentication endpoints.

## License

This project is released under the [MIT License](LICENSE).

---

Built as a reusable **Next.js full-stack authentication** foundation. The current UI uses the StudyHub name as a presentation label.
