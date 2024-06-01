# NestJS Project: Library Management

This project is a RESTful API developed with NestJS that allows the management of authors, books, clients and sales. The API is designed following REST conventions and is documented using Swagger.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Execute the Project](#execute-the-project)
- [API Documentation](#api-documentation)
- [Available Scripts](#available-scripts)
- [Contribute](#contribute)
- [License](#license)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Vercel for deployment (optional)

## Facility

1. Clone the repository:

     ´´´bash
   git clone https://github.com/holas1356/Library.git
   cd Library
   ´´´

2.Install the dependencies:

   ´´´bash
   npm install
   ´´´

## Environment Variables

Create a `.env` file in the project root and add the following variables:

´´´env
DB_PORT="5432"
POSTGRES_USER="default"
POSTGRES_HOST="ejemplo"
POSTGRES_PASSWORD="ejemplo"
POSTGRES_DATABASE="ejemplo"
DB_SSL=true
´´´

## Execute the Project

1.Run the migrations to configure the database:

   ´´´bash
   npm run typeorm migration:run
   ´´´

2. Start the development server:

   ´´´bash
   npm run start:dev
   ´´´

   The API will be available in`http://localhost:4000`.

## API documentation

The API documentation is generated with Swagger. To access it, open `http://localhost:4000/api` in your browser.

## Available Scripts


- `start`: Start the server in production mode.
- `start:dev`: Start the server in development mode.
- `start:debug`: Start the server in debug mode.
- `build`: Compile the project.
- `test`: Run the tests.
- `typeorm migration:run`: Run database migrations.

## Contribute

1. Create a new branch (`git checkout -b feature/new-feature`)
2. Make the necessary changes and commit (`git commit -m 'Add new functionality'`)
3. Upload the changes (`git push origin feature/new-feature`)
4. Open a Pull Request
