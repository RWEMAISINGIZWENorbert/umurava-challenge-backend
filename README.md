
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

- **Sign up**:  
  `POST http://localhost:8000/user/register`
- **Login**:    
  `POST http://localhost:8000/user/login`
- **Update user**:  
  `PUT http://localhost:8000/user/update` (auth required)
- **Logout**:  
  `GET http://localhost:8000/user/logout` (auth required)

**Admin default credentials:**
- Email: `admin@hotmail.com`
- Password: `admin123`

### Challenge Routes

- **View all challenges**:  
  `GET http://localhost:8000/challenge/challenges` (auth required)
- **Search challenges**:  
  `GET http://localhost:8000/challenge/search/:key` (auth required)
- **View one challenge by ID**:  
  `GET http://localhost:8000/challenge/challenge/:id` (auth required)
- **View limited challenges**:  
  `GET http://localhost:8000/challenge/limitedChallenges/:id` (auth required)
- **Total number of all challenges**:  
  `GET http://localhost:8000/challenge/allChallenges` (auth required)
- **Total number of open challenges**:  
  `GET http://localhost:8000/challenge/openChallenges` (auth required)
- **Total number of closed challenges**:  
  `GET http://localhost:8000/challenge/closedChallenges` (auth required)
- **Get challenges by admin**:  
  `GET http://localhost:8000/challenge/admin/:adminId` (auth required)
- **Get challenges by status**:  
  `GET http://localhost:8000/challenge/status/:status` (auth required)
- **Create new challenge**:  
  `POST http://localhost:8000/challenge/create` (auth required)
- **Edit challenge by ID**:  
  `PUT http://localhost:8000/challenge/edit/:id` (auth required)
- **Update delete status**:  
  `PUT http://localhost:8000/challenge/update-delete/:id` (auth required)
- **Delete challenge permanently**:  
  `DELETE http://localhost:8000/challenge/delete-p/:id` (auth required)

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
