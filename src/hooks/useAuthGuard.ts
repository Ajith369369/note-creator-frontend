import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// #region Multi-line Comment
/**
 * const useAuthGuard = () => {: This defines a custom hook called useAuthGuard. In React, custom hooks are functions that allow you to extract and reuse stateful logic across components.
 * The useAuthGuard hook checks if the user is authenticated via the Redux state.
 * If the user is not authenticated, it uses React Router's useNavigate to redirect the user to a 404 Page Not Found page.
 * It rechecks authentication status whenever isAuthenticated or navigate changes.
 */
// #endregion
const useAuthGuard = () => {
  // #region Multi-line Comment
  /**
   * const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);: The useSelector hook is provided by React-Redux. It allows you to access the Redux store within a React component.
   * Here, the component is accessing the isAuthenticated value from the Redux store.
   * The state.auth.isAuthenticated refers to the isAuthenticated flag inside the auth slice of the Redux state.
   * This flag typically indicates whether the user is authenticated (logged in) or not.
   */
  // #endregion
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // #region Multi-line Comment
  /**
   * const navigate = useNavigate();: useNavigate is a hook from React Router.
   * It provides a function (navigate) that allows us to programmatically change the route in your application.
   * This is used to redirect the user to a different page if they are not authenticated.
   */
  // #endregion
  const navigate = useNavigate();
  const location = useLocation();

  // #region Multi-line Comment
  /**
   * useEffect(() => {: This useEffect hook runs side effects in React components.
   * It watches for changes in the authentication status (isAuthenticated) and runs the effect if there is a change.
   * The useEffect hook accepts two arguments: a function to run as the effect, and an array of dependencies (in this case, [isAuthenticated, navigate]).
   * Whenever the values in the dependency array change, the effect will run again.
   */
  // #endregion
  useEffect(() => {
    // #region Multi-line Comment
    /**
     * if (!isAuthenticated) {: This checks if the user is not authenticated (i.e., isAuthenticated is false).
     * If the user is not authenticated, it will perform the next action.
     */
    // #endregion
    if (!isAuthenticated) {
      // Public routes that don't require authentication
      const publicRoutes = [
        "/",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
      ];
      const currentPath = location.pathname;

      // Only redirect if not already on a public route (prevents race condition during logout)
      if (!publicRoutes.includes(currentPath)) {
        // #region Multi-line Comment
        /**
         * Redirect to NotFoundPage if not authenticated.
         * navigate('*');: This is a call to the navigate function provided by useNavigate.
         * It navigates the user to the route corresponding to the wildcard (*), which is a catch-all route in the application. It is a 404 Page Not Found page.
         * This effectively redirects unauthenticated users to a Page Not Found if they attempt to access a route that requires authentication.
         */
        // #endregion
        navigate("*");
      }
    }

    // #region Multi-line Comment
    /**
     * }, [isAuthenticated, navigate]);: The second argument to useEffect is the dependency array.
     * The effect will run whenever isAuthenticated or navigate changes.
     * This ensures that when isAuthenticated changes (e.g., the user logs in or logs out), the hook will check the authentication status and possibly redirect the user.
     */
    // #endregion
  }, [isAuthenticated, navigate, location.pathname]);
};

// #region Multi-line Comment
/**
 * export default useAuthGuard;: This exports the useAuthGuard hook so it can be used in other components of the application.
 * By using this hook in different components, we can guard routes by checking if the user is authenticated before allowing access.
 */
// #endregion
export default useAuthGuard;
