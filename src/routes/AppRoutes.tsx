import Admin from "@/admin/Admin";
import { Introduction, Layout } from "@/components/shared";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { ADMIN, PUBLIC_ROUTES, SHARED_ROUTES } from "@/config/route-constants";
import AddNote from "@/pages/add-note/AddNote";
import Auth from "@/pages/Auth";
import EditNote from "@/pages/edit-note/EditNote";
import Home from "@/pages/Home";
import NotesPage from "@/pages/notes-page/NotesPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ViewNote from "@/pages/ViewNote";
import { Navigate, Route, Routes } from "react-router-dom";

/**
 * AppRoutes - Main routing configuration
 *
 * Best Practices Applied:
 * 1. Role-agnostic routes for shared features (notes, introduction)
 * 2. Role-specific routes only for admin dashboard
 * 3. Index route for automatic redirect from /profile-home
 * 4. Protected routes with role-based access control
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path={PUBLIC_ROUTES.REGISTER} element={<Auth register />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<Auth />} />

      {/* Protected Routes - Shared by Admin and Users */}
      <Route path={SHARED_ROUTES.PROFILE_HOME} element={<Layout />}>
        {/* Index route - redirects to introduction */}
        <Route
          index
          element={<Navigate to={SHARED_ROUTES.INTRODUCTION} replace />}
        />

        {/* Shared routes - accessible by both admin and users */}
        <Route
          path={SHARED_ROUTES.INTRODUCTION}
          element={
            <ProtectedRoute>
              <Introduction />
            </ProtectedRoute>
          }
        />
        <Route
          path={SHARED_ROUTES.NOTES}
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={SHARED_ROUTES.NOTE_VIEW}
          element={
            <ProtectedRoute>
              <ViewNote />
            </ProtectedRoute>
          }
        />
        <Route
          path={SHARED_ROUTES.NOTE_ADD}
          element={
            <ProtectedRoute>
              <AddNote />
            </ProtectedRoute>
          }
        />
        <Route
          path={SHARED_ROUTES.NOTE_EDIT}
          element={
            <ProtectedRoute>
              <EditNote />
            </ProtectedRoute>
          }
        />

        {/* Admin-only route */}
        <Route
          path={ADMIN.DASHBOARD}
          element={
            <ProtectedRoute requireAdmin>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
