# Note Creator Frontend

A modern, full-featured note-taking application built with React, TypeScript, and Vite. This frontend application provides a beautiful, responsive interface for creating, managing, and organizing personal notes with image support via Cloudinary.

## Overview

The Note Creator app is a comprehensive note-taking solution that allows users to create, view, edit, and delete notes with rich content including images. It features user authentication, role-based access control (admin functionality), and a modern UI built with Tailwind CSS.

## Features

### Core Features

- **User Authentication**: Secure registration and login with JWT-based authentication
- **Create Notes**: Add new notes with title, content, and optional cover images
- **View Notes**: Browse all your notes in an elegant grid layout with previews
- **Edit Notes**: Update existing notes with real-time preview
- **Delete Notes**: Remove notes with confirmation
- **Image Upload**: Upload and manage note cover images via Cloudinary
- **Search Functionality**: Search notes by title or content
- **Admin Dashboard**: Admin users can view all users, manage accounts, and view statistics
- **Responsive Design**: Fully responsive UI that works on all devices
- **Protected Routes**: Route protection based on authentication status and user roles

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **State Management**: Redux Toolkit with Redux Persist for state management
- **Modern UI**: Tailwind CSS for styling with custom gradients and animations
- **Loading States**: Elegant loading spinners and state management
- **Toast Notifications**: User-friendly notifications using react-toastify
- **Date Formatting**: Beautiful date display using date-fns
- **Chart Visualization**: Admin dashboard with Chart.js for data visualization

## Technologies Used

### Core Framework

- **React** 19.2.1 - UI library
- **TypeScript** 5.9.3 - Type safety
- **Vite** 7.2.4 - Build tool and dev server

### State Management & Routing

- **Redux Toolkit** 2.11.1 - State management
- **Redux Persist** 6.0.0 - State persistence
- **React Router DOM** 6.26.1 - Client-side routing

### Styling & UI

- **Tailwind CSS** 3.4.18 - Utility-first CSS framework
- **React Icons** 5.3.0 - Icon library
- **Font Awesome** 6.6.0 - Additional icons
- **Heroicons** 2.2.0 - Icon components

### Data & API

- **Axios** 1.7.4 - HTTP client
- **Chart.js** 4.5.1 - Data visualization
- **React Chart.js 2** 5.3.1 - React wrapper for Chart.js

### Utilities

- **date-fns** 3.6.0 - Date formatting and manipulation
- **React Toastify** 10.0.5 - Toast notifications
- **React Hook Form** 7.68.0 - Form handling

### Development Tools

- **ESLint** 9.39.1 - Code linting
- **Prettier** 3.7.4 - Code formatting
- **TypeScript ESLint** 8.18.1 - TypeScript linting
- **Concurrently** 9.2.1 - Run multiple scripts
- **Chokidar CLI** 3.0.0 - File watching

## Project Structure

```plain
note-creator-frontend/
├── src/
│   ├── admin/                    # Admin dashboard components
│   │   ├── Admin.tsx
│   │   └── constants.ts
│   ├── assets/                   # Static assets
│   │   └── images/               # Image assets
│   ├── components/               # Reusable components
│   │   └── shared/
│   │       ├── Header.tsx
│   │       ├── Introduction.tsx
│   │       ├── Layout.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── ProtectedRoute.tsx
│   │       ├── Sidebar.tsx
│   │       ├── SuspenseWrapper.tsx
│   │       ├── TestCredentials.tsx
│   │       └── index.ts
│   ├── config/                   # Configuration files
│   │   └── route-constants/     # Route definitions
│   ├── hooks/                    # Custom React hooks
│   │   └── useScrollToTop.ts
│   ├── pages/                    # Page components
│   │   ├── add-note/
│   │   │   ├── AddNote.tsx
│   │   │   └── components/
│   │   │       └── AddNoteForm.tsx
│   │   ├── edit-note/
│   │   │   ├── EditNote.tsx
│   │   │   └── components/
│   │   │       └── EditNoteForm.tsx
│   │   ├── notes-page/
│   │   │   ├── NotesPage.tsx
│   │   │   └── components/
│   │   │       └── NotesList.tsx
│   │   ├── Auth.tsx              # Authentication page
│   │   ├── Home.tsx              # Home page
│   │   ├── NotFoundPage.tsx     # 404 page
│   │   └── ViewNote.tsx          # View single note
│   ├── redux/                     # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.ts      # Auth state
│   │   │   └── noteSlice.ts      # Note state
│   │   └── store.ts              # Store configuration
│   ├── routes/                    # Route components
│   │   ├── AdminRoutes.tsx
│   │   ├── AppRoutes.tsx
│   │   ├── SuperAdminRoutes.tsx
│   │   └── UserRoutes.tsx
│   ├── services/                  # API services
│   │   ├── api/
│   │   │   ├── adminAPI.ts
│   │   │   ├── authAPI.ts
│   │   │   ├── index.ts
│   │   │   └── noteAPI.ts
│   │   ├── axiosHTTPClientWrapper.ts
│   │   └── nc_serverUrl.ts       # Backend URL configuration
│   ├── types/                     # TypeScript type definitions
│   │   └── static.d.ts
│   ├── utils/                     # Utility functions
│   │   ├── dateUtils.ts          # Date formatting utilities
│   │   ├── imageUtils.ts         # Image URL utilities (Cloudinary)
│   │   └── index.ts              # Barrel export
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts             # Vite type definitions
├── docs/                          # Documentation
├── dist/                          # Build output
├── node_modules/                  # Dependencies
├── .gitignore
├── eslint.config.js              # ESLint configuration
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── package-lock.json
├── postcss.config.js             # PostCSS configuration
├── README.md                      # This file
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── vercel.json                    # Vercel deployment config
└── vite.config.ts                # Vite configuration
```

## Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Backend API** running (see [note-creator-backend](https://github.com/Ajith369369/note-creator-backend))

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Ajith369369/note-creator-frontend.git
cd note-creator-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Backend URL

Update the backend server URL in `src/services/nc_serverUrl.ts`:

```typescript
// For local development
export const serverUrl = "http://localhost:3000";

// For production (uncomment when deploying)
// export const serverUrl = 'https://note-creator-backend.onrender.com'
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## Available Scripts

### Development

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm run start:prod` - Build and preview production build

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run lint:watch` - Watch files and lint on changes
- `npm run typecheck` - Type check TypeScript without emitting files
- `npm run typecheck:watch` - Watch mode for type checking
- `npm run watch` - Run lint and typecheck in watch mode concurrently
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Validation

- `npm run validate:build` - Build and validate production build

### Deployment

- `npm run deploy:vercel` - Deploy to Vercel
- `npm run deploy:netlify` - Deploy to Netlify
- `npm run deploy` - Run deployment script (Linux/Mac)
- `npm run deploy:win` - Run deployment script (Windows)

## Usage

### Authentication

1. **Register**: Navigate to the registration page and create a new account
2. **Login**: Use your credentials to log in
3. **Session**: Your session is stored and persists across page refreshes

### Creating a Note

1. Navigate to the "Add Note" page (requires authentication)
2. Enter a title and content for your note
3. Optionally upload a cover image (supports PNG, JPG, JPEG)
4. Click "Save Note" to create the note
5. Images are automatically uploaded to Cloudinary

### Viewing Notes

1. Navigate to the "Notes" page to see all your notes
2. Notes are displayed in a responsive grid layout
3. Click "Read More" to view full note details
4. Use the search bar to filter notes by title or content

### Editing a Note

1. Click the edit button on any note card
2. Modify the title, content, or image
3. Preview changes in real-time
4. Click "Update Note" to save changes

### Deleting a Note

1. Click the delete button on any note card
2. Confirm the deletion
3. The note will be permanently removed

### Admin Features

Admin users have access to:

- **Dashboard**: View all users with statistics
- **User Management**: Delete users and their associated notes
- **Analytics**: View user activity and note statistics

## API Integration

The frontend communicates with the backend API at the configured `serverUrl`. All API calls are made through the `axiosHTTPClientWrapper` service.

### API Endpoints Used

#### Authentication

- `POST /register` - User registration
- `POST /login` - User login

#### Notes

- `POST /notes/user/add` - Create a new note (requires auth)
- `GET /notes/user/all?search={query}` - Get all user's notes (requires auth)
- `GET /notes/user/:id` - Get a specific note
- `PUT /notes/user/edit/:id` - Update a note (requires auth)
- `DELETE /notes/user/delete/:id` - Delete a note (requires auth)

#### Admin

- `GET /profile-home/admin` - Get admin dashboard data (requires auth + admin role)
- `DELETE /profile-home/admin/user/delete/:id` - Delete user and notes (requires auth + admin role)

### Authentication

All protected endpoints require a JWT token in the Authorization header:

```typescript
{
  "Authorization": "Bearer <token>"
}
```

The token is stored in `sessionStorage` after successful login.

## Image Handling

### Cloudinary Integration

- Images are uploaded directly to Cloudinary via the backend
- The frontend receives Cloudinary URLs for display
- The `imageUtils.ts` utility handles Cloudinary URL processing
- Supports PNG, JPG, and JPEG formats
- Maximum file size: 5MB

### Image Display

Images are displayed using the `getNoteImageUrl()` utility function which:

- Accepts Cloudinary URLs directly
- Returns the URL as-is for display
- Handles undefined/null values gracefully

## Environment Configuration

### Backend URL Configuration

The backend URL is configured in `src/services/nc_serverUrl.ts`:

```typescript
export const serverUrl = "http://localhost:3500"; // Development
// export const serverUrl = 'https://note-creator-backend.onrender.com' // Production
```

### Vercel Configuration

The `vercel.json` file configures SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This ensures all routes are handled by the React Router on the client side.

## State Management

### Redux Store Structure

- **authSlice**: Manages authentication state (user info, token)
- **noteSlice**: Manages note-related state (notes list, form state)

### Redux Persist

State is persisted to localStorage using Redux Persist, ensuring:

- User session persists across page refreshes
- Form state is preserved during navigation

## Routing

### Route Structure

- **Public Routes**: Home, Authentication, NotFound
- **User Routes**: Add Note, Edit Note, View Note, Notes List
- **Admin Routes**: Admin Dashboard
- **Protected Routes**: All user and admin routes require authentication

### Route Protection

Routes are protected using the `ProtectedRoute` component which:

- Checks authentication status
- Redirects to login if not authenticated
- Validates user roles for admin routes

## Styling

### Tailwind CSS

The application uses Tailwind CSS for styling with:

- Custom color palette (emerald, slate, cyan)
- Responsive design utilities
- Custom gradients and animations
- Dark theme optimized

### Component Styling

- Modern glassmorphism effects
- Smooth transitions and hover effects
- Responsive grid layouts
- Mobile-first approach

## TypeScript

The project is fully typed with TypeScript:

- Strict type checking enabled
- Type definitions for all components
- Type-safe API calls
- Interface definitions for data models

## Deployment

### Vercel Deployment

1. Build the project: `npm run build`
2. Deploy: `npm run deploy:vercel`
3. Configure environment variables if needed

### Build Output

The production build is output to the `dist/` directory and includes:

- Optimized JavaScript bundles
- Minified CSS
- Static assets
- Production-ready HTML

## Troubleshooting

### Common Issues

1. **Backend Connection Errors**
   - Ensure the backend server is running
   - Check the `serverUrl` configuration
   - Verify CORS settings on the backend

2. **Authentication Issues**
   - Clear `sessionStorage` and try logging in again
   - Check that the token is being stored correctly
   - Verify backend authentication endpoints

3. **Image Upload Failures**
   - Verify Cloudinary configuration on the backend
   - Check file size (max 5MB)
   - Ensure file format is supported (PNG, JPG, JPEG)

4. **Build Errors**
   - Run `npm run typecheck` to identify TypeScript errors
   - Run `npm run lint` to find linting issues
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Contributing

To contribute to the Note Creator Frontend:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and linting: `npm run lint && npm run typecheck`
5. Commit your changes: `git commit -m "Add your feature"`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add comments for complex logic

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or issues, please contact [ajithks98086@gmail.com](mailto:ajithks98086@gmail.com).

## Related Projects

- [note-creator-backend](https://github.com/Ajith369369/note-creator-backend) - Express.js backend API
