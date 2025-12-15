import { SHARED } from "@/config/route-constants";
import type { RootState } from "@/redux/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

/**
 * ProtectedRoute component for role-based route protection
 *
 * @param children - The component to render if access is granted
 * @param requireAdmin - If true, only admin users can access this route
 *
 * @example
 * // Admin-only route
 * <ProtectedRoute requireAdmin>
 *   <AdminDashboard />
 * </ProtectedRoute>
 *
 * @example
 * // Regular authenticated route
 * <ProtectedRoute>
 *   <NotesPage />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isAdminAuthenticated = useSelector(
    (state: RootState) => state.auth.isAdminAuthenticated
  );

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check admin access if required
  if (requireAdmin && !isAdminAuthenticated) {
    // Redirect non-admin users to introduction page
    return <Navigate to={SHARED.PROFILE_INTRODUCTION} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
