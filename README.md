# Bike Store API

A robust and scalable REST API for managing bikes and orders, built using TypeScript, Node.js, Express, Mongoose and MongoDB.

## Live Deployment Link

[Bike-Store-Server](https://bike-store-ebon.vercel.app/)

## Features

- Bike Management: Add, update, delete, and fetch bike details with strict validations.
- Order Management: Create and manage customer orders with automatic price calculations.
- Validation: Uses Generic for schema validation and ensures data integrity.
- TypeScript Support: Full TypeScript support for type safety and better developer experience.
- Environment Configuration: Manage sensitive information securely using dotenv.
- Code Quality: Integrated ESLint and Prettier for consistent code styling and linting.
- Development Tools:
  - Live reload with ts-node-dev.
  - Build with tsc.
  - Lint and format code using Prettier and ESLint.

## Tech Stack

**Dependencies:** Node, Express, mongoose, dotenv, cors

**Dependencies:** typescript, ts-node-dev, prettier, eslint-config-prettier, @typescript-eslint/_, @types/_

## Prerequisites

Ensure you have the following installed:

- Node.js (>=16.x)
- npm or yarn
- MongoDB (running locally or a hosted instance)

## Getting Started

## 1 Clone the Repository

```bash
git clone https://github.com/gopalbasak1/Bike-Store-Server.git
cd Bike-Store-Server
```

## 2 Install Dependencies

```bash
npm install
```

## 3 Environment Setup

Create a .env file in the root directory and configure the following variables:

```bash
(DATABASE_URL) MONGO_URI=<your-mongodb-connection-string>
PORT=<port-number>
```

## 4 Run the Project

- Development: Start the server with hot reloading:

```bash
npm run dev
```

- Production: Build and start the server: Start the server with hot reloading:

```bash
npm run build
npm start:prod
```

## 5 API Endpoints

- Bikes
  - GET /api/products: Fetch all bikes.
  - GET /api/products/:productId: Fetch a bike by ID.
  - POST /api/products: Add a new bike.
  - PATCH /api/products/:productId: Update bike details.
  - DELETE /api/products/:productId: Delete a bike.
- Orders
  - POST /api/orders: Place a new order.
  - GET /api/orders/revenue: Total revenue calculated from all orders.

## Scripts

- `npm run dev`: Run the server in development mode with hot reload.
- `npm run build`: Build the project using TypeScript.
- `npm run start:prod`: Run the production build.
- `npm run lint`: Run ESLint for linting TypeScript files.
- `npm run lint:fix`: Automatically fix linting issues.
- `npm run prettier`: Format files using Prettier.
- `npm run prettier:fix`: Fix and format files with Prettier.

## Project Structure

```bash
plaintext

src/
├── controllers/   # Request handlers
├── interfaces/    # TypeScript interfaces
├── models/        # Mongoose schemas
├── routes/        # API route definitions
├── server.ts      # Application entry point

```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.
