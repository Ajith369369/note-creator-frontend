// Barrel file for route constants

// Role-agnostic shared routes (best practice)
export { SHARED_ROUTES } from "./sharedRoutes";

// Role-specific routes
export { ADMIN } from "./adminRoutes"; // Legacy - for backward compatibility
export { SUPER_ADMIN } from "./superAdminRoutes";
export { USER } from "./userRoutes";

// Combined frontend routes
export { FRONTEND_ROUTES } from "./frontendRoutes";

// User roles and configuration (matching backend)
export {
  getAllUserConfigs,
  getUserConfig,
  getUserConfigByEmail,
  getUserConfigByRoleKey,
  getUserDefaultRoute,
  getUserEmail,
  getUserLabel,
  getUserPassword,
  getUserUrlPrefix,
  USER_CONFIG,
  USER_ROLES,
} from "./userCredentials";

// Public routes
export { PUBLIC_ROUTES } from "./publicRoutes";
