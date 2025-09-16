# Velora

## Clone the Repository
git clone https://github.com/Swatita6111/Velora.git
cd Velora
git fetch
git checkout development

## Setup PostgreSQL Databases

Open pgAdmin or psql.

### Create two databases:
CREATE DATABASE product_order_db;
CREATE DATABASE customer_db;

## Configure Environment Variables

Create .env files in both backend services:

Product & Order Service .env

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=<your_postgres_username>
DB_PASSWORD=<your_postgres_password>
DB_NAME=product_order_db

RABBITMQ_URL=amqp://guest:guest@localhost:5672


Customer Service .env

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=<your_postgres_username>
DB_PASSWORD=<your_postgres_password>
DB_NAME=customer_db

RABBITMQ_URL=amqp://guest:guest@localhost:5672

## Start RabbitMQ
# Windows
rabbitmq-server.bat

# Linux/macOS
rabbitmq-server


## Run Backend Services

The system consists of three backend services:

Product & Order Service – manages products and orders
Customer Service – manages user registration, login, and profile
Gateway Service – acts as a central entry point and coordinates communication

You can run each service separately or Run only Gateway Service

Product & Order Service

cd backend/product-order-service
npm install
npm run start:dev   # Runs on localhost:3002


Customer Service

cd backend/customer-service
npm install
npm run start:dev   # Runs on localhost:3001


Gateway Service

cd backend/gateway-service
npm install
npm run start:dev   # Runs on localhost:3000


## Run Frontend
cd frontend
npm install
npm run dev


Open: http://localhost:3000

## Usage Order

Start RabbitMQ.
Start Backend Services.
Start Frontend.
Test the system: register, login, browse products, add to cart, checkout, and view order history.

## Notes

Ensure the databases exist before starting the backend.

.env must match your PostgreSQL credentials.

Backend logs show RabbitMQ events for debugging.

You can add initial products via Postman or the frontend.