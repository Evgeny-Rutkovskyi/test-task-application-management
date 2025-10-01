# test-task

---

## Technologies

- **NestJS** — backend API
- **PostgreSQL** — database (through Docker)
- **TypeORM + Zod** — ORM and validation

---

## Quick start

---

## What you need to get started

### Cloning a repository

```bash
git clone https://github.com/Evgeny-Rutkovskyi/test-task-application-management.git
cd test-task-application-management
```

### Install:

- [Node.js](https://nodejs.org/) (LTS версія)
- [Docker](https://www.docker.com/products/docker-desktop/) — for database and RabbitMQ

---

## Running in development mode

### 1. Install dependencies

```bash
npm install
```

---

### 2. .env must contain the following variables:

```bash
PORT=3001

NODE_ENV=dev

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=tasks
DB_SYNCHRONIZE=false
DB_SSL=false

RABBITMQ_URL=amqp://localhost:5672
```

### 3. Start database and RabbitMQ

Launch Docker Desktop, then run the command in the project terminal:

```bash
docker-compose up --build -d
```

The database is available at `localhost:5432`.
After that, run the command:

```bash
npm run migration:run
```

### 4. Run the application in dev mode

```bash
npm run start:dev
```

---
