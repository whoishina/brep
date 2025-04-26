# Bun Fullstack Application

A modern fullstack web application built with Bun, React, Elysia, and Prisma.

## System Requirements

- [Bun](https://bun.sh) (JavaScript runtime and package manager)
- Node.js (for development tools)

## Getting Started

1. Install dependencies:
```bash
bun install
```

2. Generate Prisma client:
```bash
bun prisma:generate
```

## Development

Run the development server:
```bash
bun dev
```

This will start both the frontend and backend servers concurrently.

## Available Scripts

- `bun dev` - Start development servers (frontend + backend)
- `bun build` - Build both frontend and backend for production
- `bun start` - Start production servers
- `bun ui:dev` - Start frontend development server
- `bun app:dev` - Start backend development server
- `bun lint` - Run ESLint

## Project Structure

```
.
├── src/                # Source code
│   ├── app/           # Backend application (Elysia)
│   ├── ui/            # Frontend application (React)
│   └── prisma/        # Database schema and migrations
├── docker/            # Docker configuration
├── public/            # Static assets
└── dist/              # Build output
```

## Technologies Used

### Backend
- [Bun](https://bun.sh) - JavaScript runtime
- [Elysia](https://elysiajs.com) - Web framework
- [Prisma](https://www.prisma.io) - ORM and database toolkit
- TypeScript - Programming language

### Frontend
- React 19
- Vite - Build tool
- TailwindCSS - Styling
- Radix UI - Component library
- React Query - Data fetching
- React Router - Routing

### Development Tools
- ESLint - Code linting
- TypeScript - Type checking
- Docker - Containerization

## License

MIT