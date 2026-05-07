# Petstore

A full-stack pet catalog and management app built with Spring Boot, PostgreSQL, React, Vite, Tailwind CSS, and MUI.

## Features

- CRUD API for pets
- PostgreSQL-backed persistence
- Responsive React gallery with search, species, and availability filters
- Create and edit dialogs for pet listings
- Custom visual design with a warmer editorial layout

## Project Structure

- `backend/` - Spring Boot API
- `frontend/` - React + Vite client

## Run Locally

### 1. Start PostgreSQL

```bash
docker compose up -d
```

### 2. Start the backend

```bash
cd backend
mvn spring-boot:run
```

The backend uses:

- `SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/petstore`
- `SPRING_DATASOURCE_USERNAME=petstore`
- `SPRING_DATASOURCE_PASSWORD=petstore`

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `frontend/.env` if the backend is hosted somewhere else.

## API

- `GET /api/pets`
- `GET /api/pets/{id}`
- `POST /api/pets`
- `PUT /api/pets/{id}`
- `DELETE /api/pets/{id}`

Optional filters for `GET /api/pets`:

- `search`
- `species`
- `available=true|false`
