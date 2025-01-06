# Matrix Operations API

A RESTful API for performing given matrix operations on CSV files.

## Table of Contents
- [Project Structure](#project-structure)
- [Main Components](#main-components)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Getting Started](#getting-started)
- [Usage Example](#usage-example)

## Project Structure

Main project files and directories:
- `src/` - Source code directory
  - `server.ts` - Main entry point for the application
  - `routes/`
    - `matrixRoutes.ts` - Defines the routes for matrix operations
  - `controllers/`
    - `matrixController.ts` - Handles the logic for each route
  - `utils/`
    - `matrixOperations.ts` - Contains the core matrix operation functions
    - `handleMatrixOperations.ts` - Contains the function the controller uses in handling the matrix
  - `middlewares/`
    - `errorHandler.ts` - Global error handling middleware
    - `fileUpload.ts` - File upload middleware using multer
  - `types/`
    - `matrixOperations.ts` - Defines type for matrix operation
- `tests/`
  - `matrixOperations.test.ts` - Contains unit tests for matrix operations
- `swagger.yaml` - API documentation in OpenAPI format
- `package.json` - Project configuration and dependencies

## Main Components

### Server Configuration (server.ts)
- Express application initialization
- Multer middleware setup for file uploads
- Swagger documentation serving
- Matrix routes registration
- Error handling middleware
- Server startup on port 8088

### Routes (matrixRoutes.ts)
Defines endpoints for matrix operations:
- Echo
- Invert
- Flatten
- Sum
- Multiply

### Controllers (matrixController.ts)
- Generic matrix operation handler
- Request validation
- File processing
- Error response handling

### Matrix Operations (matrixOperations.ts and handleMatrixOperations.ts)
Core functionality including:
- Matrix file reading and validation
- Matrix inversion
- Matrix flattening
- Element sum calculation
- Element multiplication
- Input validation

### Error Handling Middleware (errorHandler.ts)
Global middleware for:
- Error logging
- Response formatting
- HTTP status code mapping

### File Upload Middleware (fileUpload.ts)
Multer configuration for:
- CSV file filtering
- File size limits
- Upload directory management

### types (matrixOperations.ts)
For defining matrix operation type

## API Endpoints

All endpoints accept CSV file uploads and return plain text responses.

Available endpoints:
- POST `/echo`: Returns the input matrix as a string
- POST `/invert`: Returns the inverted matrix
- POST `/flatten`: Returns the flattened matrix
- POST `/sum`: Returns the sum of all elements
- POST `/multiply`: Returns the product of all elements

## Error Handling

### 400 Bad Request
Returned for:
- Missing file uploads
- Non-square matrices
- Non-numeric values in matrices

### 500 Internal Server Error
- Returned for unexpected server errors
- Includes error logging for debugging

## Testing

Comprehensive unit tests cover:
- Valid square matrices of various sizes
- Single element matrices
- Invalid matrix scenarios

Run tests with:
```bash
npm test
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Access the application:
- API: http://localhost:8088
- Documentation: http://localhost:8088/api-docs

## Usage Example

Using curl to test the API:

```bash
curl -X POST "http://localhost:8088/{endpoint name e.g echo}" -H "accept: text/plain" -H "Content-Type: multipart/form-data" -F "file=@/path/to/matrix.csv
```

Matrix CSV file format example:
```csv
1,2,3
4,5,6
7,8,9
```