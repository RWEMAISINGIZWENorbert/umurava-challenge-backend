
# Umurava Challenge Backend API

A robust RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing all types of challenges (not just coding) and user authentication. This backend powers the Umurava Challenge platform, enabling users to register, log in, and participate in a variety of challenges, while providing admins with tools to manage challenges and users securely.

## 🚀 Features

- User registration and authentication (JWT-based)
- Admin and talent user roles
- Secure password hashing (bcryptjs)
- Challenge CRUD operations
- Challenge status automation (via cron jobs)
- Role-based access control (middleware)
- CORS and cookie management
- Environment-based configuration

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (via Mongoose)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variables
- **node-cron** for scheduled tasks

## Getting Started

### Prerequisites
- Node.js v16+
- MongoDB instance (local or cloud)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd umurava-challenge-backend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env to set DB_URL, SECRET_KEY_ACCESS_TOKEN, etc.
```

### Running the Server

```bash
# For development (with hot reload)
npm run dev

# For production
npm run build
npm start
```

The server will run on `http://localhost:8000` by default (configurable via `.env`).

## API Endpoints

### User Routes
- `POST /user/register` — Register a new user
- `POST /user/login` — User login
- `PUT /user/update` — Update user profile (auth required)
- `GET /user/logout` — Logout (auth required)

**Admin default credentials:**
- Email: `admin@hotmail.com`
- Password: `admin123`

### Challenge Routes
- `GET /challenge/challenges` — View all challenges (auth required)
- `GET /challenge/challenge/:id` — View a challenge by ID (auth required)
- `GET /challenge/limitedChallenges/:limit` — View limited number of challenges (auth required)
- `GET /challenge/allChallenges` — Total number of all challenges (auth required)
- `GET /challenge/openChallenges` — Total number of open challenges (auth required)
- `GET /challenge/closedChallenges` — Total number of closed challenges (auth required)
- `POST /challenge/create` — Create a new challenge (auth required)
- `PUT /challenge/edit/:id` — Edit a challenge by ID (auth required)
- `PUT /challenge/update-delete/:id` — Update delete status (auth required)
- `DELETE /challenge/delete-p/:id` — Permanently delete a challenge (auth required)

## Project Structure

```
src/
  config/           # Database connection
  controllers/      # Route controllers
  middleware/       # Auth middleware
  models/           # Mongoose models
  routes/           # Express routes
  utils/            # Utility functions
  index.ts          # App entry point
```

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```
PORT=8000
DB_URL=your_mongodb_connection_string
SECRET_KEY_ACCESS_TOKEN=your_jwt_secret
```

## License

This project is licensed under the ISC License.

---
## 👥 Author
- **Rwema Isingizwe Norbert**
- GitHub: (https://github.com/RWEMAISINGIZWENorbert)
