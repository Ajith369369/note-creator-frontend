# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



Creating documentation for a Note Creator app involves detailing the app's purpose, features, installation instructions, usage guidelines, and any other relevant information. Here’s a structured approach to documenting your Note Creator app:

---

# Note Creator App Documentation

## Overview

The Note Creator app allows users to create, view, edit, and delete notes. It's a simple application designed to manage personal notes efficiently with a user-friendly interface.

## Project Structure

├── note-app/
│   ├── app/
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   ├── projectModel.js
│   │   │   └── ...
│   │   ├── views/
│   │   │   ├── index.ejs
│   │   │   ├── login.ejs
│   │   │   └── ...
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   ├── projectController.js
│   │   │   └── ...
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   └── index.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── ...
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── ...
│   │   ├── public/
│   │   │   ├── css/
│   │   │   │   ├── style.css
│   │   │   ├── js/
│   │   │   │   ├── script.js
│   │   │   ├── images/
│   │   │   └── ...
│   │   ├── utils/
│   │   │   ├── helpers.js
│   │   │   └── ...
│   │   ├── .env
│   │   ├── package.json
│   │   ├── server.js
│   │   └── ...
└── ...


## Features

- **Create Notes:** Add new notes with titles and content.
- **View Notes:** View a list of all notes and individual note details.
- **Edit Notes:** Modify existing notes.
- **Delete Notes:** Remove notes that are no longer needed.
- **Search and Filter:** Find notes using search functionality.
- **Sort Notes:** Organize notes based on various criteria.

## Technologies Used

- **Frontend:** React
- **Backend:** JSON Server (for mocking a REST API)
- **Styling:** Bootstrap (for styling)
- **State Management:** Redux (for state management)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/yourusername/note-creator-app.git
cd note-creator-app
```

### Install Dependencies

Install the required dependencies for both frontend and backend.

```bash
npm install
```

### Setup JSON Server

To mock the backend API, you'll use JSON Server.

1. **Install JSON Server:**

   ```bash
   npm install -g json-server
   ```

2. **Create a `db.json` File:**

   Add initial data to the `db.json` file in the root directory:

   ```json
   {
     "notes": [
       {
         "id": 1,
         "title": "Sample Note",
         "content": "This is a sample note."
       }
     ]
   }
   ```

3. **Start JSON Server:**

   ```bash
   json-server --watch db.json --port 5000
   ```

### Run the App

1. **Start the React App:**

   ```bash
   npm start
   ```

2. **Visit the App:**

   Open your browser and go to `http://localhost:3000`.

## Usage

### Creating a Note

1. Navigate to the "Create Note" page.
2. Enter a title and content for your note.
3. Click the "Save" button to add the note.

### Viewing Notes

1. Navigate to the "Notes" page to view the list of all notes.
2. Click on a note title to view its details.

### Editing a Note

1. Navigate to the "Edit Note" page.
2. Modify the title or content as needed.
3. Click the "Save" button to update the note.

### Deleting a Note

1. Navigate to the "Notes" page.
2. Click the "Delete" button next to the note you wish to remove.
3. Confirm the deletion.

### Searching and Filtering

1. Use the search bar to filter notes by title or content.
2. Apply filters to narrow down the list of notes.

### Sorting Notes

1. Use the sorting options to arrange notes in ascending or descending order based on title or creation date.

## API Endpoints

### Notes

- **GET /notes** - Retrieve a list of all notes.
- **GET /notes/:id** - Retrieve a specific note by ID.
- **POST /notes** - Create a new note.
- **PUT /notes/:id** - Update an existing note.
- **DELETE /notes/:id** - Delete a specific note by ID.

## Configuration

### Environment Variables

If you need to configure environment variables for your app, create a `.env` file in the root directory and add the necessary variables.

### vercel.json
The `vercel.json` file is a configuration file used by Vercel, a popular hosting platform, to customize the behavior of your deployed application. The specific configuration you've shared defines a rewrite rule, which is a way to route requests to specific files in your application.

The `vercel.json` rewrite rule ensures that all requests to your application are routed to `index.html`, enabling client-side routing in a Single Page Application (SPA). This prevents 404 errors when users navigate directly to different routes and ensures the correct handling of URLs by your frontend code.

#### Breakdown of the Configuration

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

##### 1. **`"rewrites"`:**
   - The `rewrites` property in `vercel.json` is an array of objects. Each object defines a rewrite rule that tells Vercel how to handle requests to certain URLs.

##### 2. **`"source": "/(.*)"`:**
   - The `source` property specifies the URL pattern to match incoming requests. 
   - `"/(.*)"` is a regular expression pattern that matches any URL path. 
     - `"/"` matches the root URL.
     - `"(.*)"` is a capturing group that matches any character (`.`) zero or more times (`*`), effectively capturing the entire path after the root.
   - In essence, this pattern will match any route, whether it's `/about`, `/contact`, or any other path.

##### 3. **`"destination": "/index.html"`:**
   - The `destination` property specifies the file that the matched requests should be routed to.
   - In this case, all matched requests are directed to `/index.html`.

#### What Does This Configuration Do?

- **Single Page Application (SPA) Routing:**
  - This configuration is often used in Single Page Applications (SPAs), like those built with React, Vue, or Angular.
  - SPAs typically use client-side routing, where the JavaScript code on the client side handles different routes (e.g., `/about`, `/contact`).
  - However, when a user navigates directly to a route like `/about` by typing it in the browser or refreshing the page, the server receives the request and needs to know how to handle it.
  - Without this rewrite rule, the server would look for a file named `/about` on the server, which usually doesn't exist in SPAs, leading to a 404 error.

- **How It Works:**
  - This rule ensures that every request, no matter the path, is routed to `/index.html`.
  - Once `/index.html` is loaded, the SPA's JavaScript code (like React Router) takes over, reads the actual path (e.g., `/about`), and displays the correct content.

## Troubleshooting

- **App Not Loading:** Ensure that JSON Server is running on the specified port and that your React app is configured to use the correct API URL.
- **API Errors:** Check the browser console and server logs for error messages.

## Contributing

To contribute to the Note Creator app, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request for review.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact [ajithks98086@gmail.com](mailto:ajithks98086@gmail.com).

