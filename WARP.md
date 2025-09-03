# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Architecture Overview

This is a standard NestJS TypeScript application using the latest NestJS 11.x framework. The project follows NestJS conventions and architectural patterns:

### Core Structure
- **Entry Point**: `src/main.ts` - Bootstraps the NestJS application on port 3000 (or PORT env var)
- **Root Module**: `src/app.module.ts` - Main application module that imports all other modules
- **MVC Pattern**: Controllers handle HTTP requests, Services contain business logic
- **Dependency Injection**: NestJS uses decorators (@Injectable, @Controller) for DI container management

### Key Patterns
- **Modular Architecture**: The app uses NestJS modules to organize code into cohesive feature blocks
- **Decorator-Based**: Heavy use of TypeScript decorators for metadata definition (@Module, @Controller, @Get, etc.)
- **Provider System**: Services are registered as providers in modules for dependency injection
- **Testing Strategy**: Unit tests (.spec.ts) alongside components, E2E tests in separate `test/` directory

## Development Commands

### Building and Running
```bash
# Development with hot reload
npm run start:dev

# Debug mode with hot reload  
npm run start:debug

# Production build
npm run build
npm run start:prod

# Regular start (no watch)
npm run start
```

### Testing
```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:cov

# Run E2E tests
npm run test:e2e

# Debug tests
npm run test:debug
```

### Code Quality
```bash
# Lint and auto-fix TypeScript files
npm run lint

# Format code with Prettier
npm run format
```

## Configuration Details

### TypeScript Configuration
- Uses `nodenext` module resolution for modern Node.js compatibility
- Enables experimental decorators and metadata emission (required for NestJS)
- Strict null checks enabled, but relaxed implicit any rules
- Output directory: `./dist`

### Testing Setup
- **Unit Tests**: Jest with ts-jest transformer, tests in `src/` alongside source files
- **E2E Tests**: Separate Jest config in `test/jest-e2e.json`, uses supertest for HTTP testing
- **Coverage**: Collected from all TypeScript files, output to `../coverage`

### Linting and Formatting
- ESLint with TypeScript support and Prettier integration
- Custom rules: disabled explicit-any, warnings for floating promises and unsafe arguments  
- Prettier: single quotes, trailing commas

## Project-Specific Notes

### Adding New Features
When creating new modules, controllers, or services, follow NestJS CLI patterns:
```bash
# Generate new module
nest generate module feature-name

# Generate controller with service
nest generate controller feature-name
nest generate service feature-name
```

### Port Configuration
The application listens on port 3000 by default, but respects the `PORT` environment variable for deployment flexibility.

### Module Import Pattern
New modules should be imported into `app.module.ts` imports array to be available application-wide.
