# CSV CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) application that allows users to perform operations on a CSV-formatted file through a web interface.

## Backend Setup

1. Install Node.js and npm if you haven't already. You can download them from https://nodejs.org/

2. Clone this repository to your local machine.

3. Navigate to the `csv-crud-app` folder:

4. Install the dependencies:

npm install

5. Start the backend server:

The backend server will be running at http://localhost:3000

## Frontend Setup

1. Make sure the backend server is running as per the instructions in the "Backend Setup" section.

2. Navigate to the `frontend` folder:

cd frontend

3. Start the frontend application:

http-server

The frontend application will be accessible at http://localhost:8080

## Testing

As mentioned in the assignment the backend have the unit tests to ensure the application works correctly.

### Backend Tests

1. Navigate to the `csv-crud-app` folder (if you are not already there):

2. Run the tests:

Do make sure to delete all the contents inside the data/data.csv file before running the command below.

jest data.test.js

## Endpoints

The backend provides the following REST API endpoints:

- `GET /api/data`: Retrieve all data from the CSV file.
- `POST /api/data`: Add new data to the CSV file.
- `PUT /api/data/:id`: Update existing data in the CSV file based on the provided `id`.
- `DELETE /api/data/:id`: Delete data from the CSV file based on the provided `id`.

## Contributing

If you find any issues with the application or want to suggest improvements, feel free to open an issue or submit a pull request.
