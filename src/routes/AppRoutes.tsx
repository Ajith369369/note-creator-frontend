import { Layout, SuspenseWrapper } from "@/components/shared";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { ADMIN, PUBLIC_ROUTES, SHARED } from "@/config/route-constants";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/Home"));
const Auth = lazy(() => import("@/pages/Auth"));
const Introduction = lazy(() => import("@/components/shared/Introduction"));
const NotesPage = lazy(() => import("@/pages/notes-page/NotesPage"));
const ViewNote = lazy(() => import("@/pages/ViewNote"));
const AddNote = lazy(() => import("@/pages/add-note/AddNote"));
const EditNote = lazy(() => import("@/pages/edit-note/EditNote"));
const Admin = lazy(() => import("@/admin/Admin"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

/**
 * AppRoutes - Main routing configuration
 *
 * Best Practices Applied:
 * 1. Role-agnostic routes for shared features (notes, introduction)
 * 2. Role-specific routes only for admin dashboard
 * 3. Index route for automatic redirect from /profile-home
 * 4. Protected routes with role-based access control
 * 5. Lazy loading with Suspense for better performance
 */
const AppRoutes = () => {
  return (
    <SuspenseWrapper>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path={PUBLIC_ROUTES.REGISTER} element={<Auth register />} />
        <Route path={PUBLIC_ROUTES.LOGIN} element={<Auth />} />

        {/* Protected Routes - Shared by Admin and Users */}
        <Route path={SHARED.PROFILE_HOME} element={<Layout />}>
          {/* Index route - redirects to introduction */}
          <Route
            index
            element={<Navigate to={SHARED.INTRODUCTION} replace />}
          />

          {/* Shared routes - accessible by both admin and users */}
          <Route
            path={SHARED.INTRODUCTION}
            element={
              <ProtectedRoute>
                <Introduction />
              </ProtectedRoute>
            }
          />
          <Route
            path={SHARED.NOTES}
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={SHARED.NOTE_VIEW}
            element={
              <ProtectedRoute>
                <ViewNote />
              </ProtectedRoute>
            }
          />
          <Route
            path={SHARED.NOTE_ADD}
            element={
              <ProtectedRoute>
                <AddNote />
              </ProtectedRoute>
            }
          />
          <Route
            path={SHARED.NOTE_EDIT}
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
    </SuspenseWrapper>
  );
};

export default AppRoutes;
