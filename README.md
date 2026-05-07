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

## Deploy To Render With Supabase

Deploy the backend and frontend as separate Render services.

### Backend

1. Create a Supabase project and copy the PostgreSQL connection details.
2. In Render, create a web service from the `backend/` folder using the Dockerfile.
3. Set these environment variables in Render:
	- `SPRING_DATASOURCE_URL` to the Supabase JDBC URL, for example `jdbc:postgresql://<host>:5432/postgres?sslmode=require`
	- `SPRING_DATASOURCE_USERNAME` to the Supabase database user
	- `SPRING_DATASOURCE_PASSWORD` to the Supabase database password
	- `CORS_ALLOWED_ORIGINS` to your frontend URL on Render
	- `SERVER_PORT` to `8080`
4. Deploy the service and note the backend URL.

### Frontend

1. Create a static site in Render from the `frontend/` folder.
2. Set `VITE_API_BASE_URL` to the deployed backend URL, for example `https://petstore-backend.onrender.com`.
3. Deploy the site.

### Important Notes

- Do not use the Render database block for this setup. Supabase is the database provider.
- The backend should point only to Supabase for persistence.
- Keep the frontend and backend as separate Render services.

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
