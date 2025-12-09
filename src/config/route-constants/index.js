// Barrel file for route constants

// Role-specific routes
export { ADMIN } from "./adminRoutes";
export { DOCTOR } from "./doctorRoutes";
export { PATIENT } from "./patientRoutes";
export { SUPER_ADMIN } from "./superAdminRoutes";

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
