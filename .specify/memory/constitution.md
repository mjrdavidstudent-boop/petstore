# Petstore Constitution

## Core Principles

### 1. Clear Tier Separation
The backend owns business rules, validation, and persistence. The frontend owns presentation and user interaction. The two tiers communicate only through REST APIs.

### 2. Contract-First Interfaces
API endpoints should be defined and agreed before frontend wiring. The request and response shapes are the source of truth for implementation.

### 3. Testable Changes
New backend behavior should be covered by focused unit tests. UI changes should be verified with at least a smoke-level check or documented manual validation.

### 4. PostgreSQL as the Persistent Store
All durable data must live in PostgreSQL. Schema changes should be explicit and reproducible. Seed data should not depend on manual database editing.

### 5. Keep Scope Tight
The app should stay a single backend plus a single frontend. Extra infrastructure should only be added when it solves a real problem.

## Technology Stack

| Layer | Technology | Guidance |
|------|------------|----------|
| Backend | Java | 17+ |
| Backend Framework | Spring Boot | 3.x |
| Data Access | Spring Data JPA | Latest stable |
| Database | PostgreSQL | 15+ |
| Frontend | React | 18+ |
| Frontend Build | Vite | Latest stable |
| Styling | Tailwind CSS + MUI | Current stable |
| Backend Tests | JUnit 5 + Mockito + Spring Boot Test | Bundled with Spring Boot |
| Frontend Tests | React Testing Library | If added |

## Workflow

- Keep implementation aligned with the current spec folder under `specs/`.
- Prefer small, reviewable changes.
- Update docs when behavior or environment assumptions change.
- Keep the frontend and backend independently runnable.

## Governance

This document is the local reference for project conventions. If it conflicts with ad hoc notes, this file wins.
