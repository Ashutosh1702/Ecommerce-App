# Full-Stack E-commerce Backend

Welcome to the backend component of the E-commerce Web Application. This application provides robust APIs to manage users, products, carts, and order life cycles.

## Technology Stack

- **Node.js** & **Express.js** for handling APIs
- **MongoDB** via **Mongoose** for data storage
- **JWT** (JSON Web Tokens) for stateless authentication
- **Bcrypt.js** to hash user passwords safely
- **Multer** for standard file and image uploads

## Installation & Setup

1. Make sure you have NodeJS installed in your computer.
2. Ensure you have MongoDB running locally or have an external MongoDB connection string ready.
3. Open a terminal and navigate to the `Backend/` directory.

### Step 1. Install dependencies

```bash
npm install
```

### Step 2. Configure Environment

Rename or copy the provided `.env.example` file to exactly `.env`:

```bash
cp .env.example .env
```

Add your specific configuration details in the generated `.env` file such as `MONGODB_URI` and your custom `JWT_SECRET`.

### Step 3. Starting the Server

There are two primary modes to run this app:

**To run in development mode (auto-refresh script):**

```bash
npm run dev
```

**To run in production mode (standard run):**

```bash
npm start
```

## API Documentation

- **Users:** `/api/users` -> `[POST: Register, POST: /login]`
- **Profile:** `/api/users/profile` -> `[GET, PUT]`
- **Products:** `/api/products` -> `[GET: List all, POST: Admin Add]`
- **Cart:** `/api/cart` -> `[GET: View, POST: Add, PUT: Update, DELETE: Remove]`
- **Orders:** `/api/orders` -> `[POST: Create, GET: User orders]`

> Note: Administrative actions demand that the user log in has an `admin` role in the Database.

## Security

This application uses basic security mechanisms out of the box using:
- **Helmet**: Secures Express apps by setting various HTTP headers
- **Express-Rate-Limit**: Prevents brute force endpoint attacks

Enjoy using this E-commerce Base Configuration.
