# TodoApp-ExpressJS-API

The Todo App API is a comprehensive solution for managing todo tasks with user authentication. It is built using Express, Node.js, and MongoDB. The API provides a set of routes that enable users to create, update, and delete tasks, as well as perform authentication operations.

## Routes

### Auth Route

- `POST /api/auth/signin`: Sign in a user.
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/signout`: Sign out the current user.
- `POST /api/auth/refresh`: Refresh user tokens.

### User Route

- `GET /api/user/:username`: Get the profile of a specific user.
- `DELETE /api/user/:username`: Delete a user.
- `PUT /api/user/:username`: Update user profile information such as username and bio.
- `PATCH /api/user/:username`: Update user password.

### Todo Route

- `GET /api/todo/:username`: Get the todo list for a specific user.
- `POST /api/todo/:username`: Create a new task for a user.
- `GET /api/todo/:username/:task`: Get the details of a specific task.
- `DELETE /api/todo/:username/:task`: Delete a task.
- `PUT /api/todo/:username/:task`: Update task information such as title, description, and notes.
- `PATCH /api/todo/:username/:task`: Resolve or unresolve a task.

## Getting Started

To get started with the Todo App API, follow these steps:

1. Clone the repository: `git clone https://github.com/TheDayDreamer01/TodoApp-ExpressJS-API.git`
2. Navigate to the project directory: `cd todoapp-expressjs-api`
3. Install the dependencies: `npm install`
4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     NODE_ENV=development
     PORT=3000
     MONGODB_URI=mongodb://localhost/todo_app
     JWT_SECRET=your-secret-key
     ```
   - Modify the values as per your configuration.
5. Start the server: `npm start`

The API server will start running on `http://localhost:3000`. You can test the routes using a tool like Postman or any HTTP client.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).