import { ADMIN } from "./adminRoutes";
import { SUPER_ADMIN } from "./superAdminRoutes";
import { USER } from "./userRoutes";
import { SHARED } from "./sharedRoutes";

// Frontend Routes
export const FRONTEND_ROUTES = {
  ADMIN,
  USER,
  SUPER_ADMIN,
  SHARED
} as const;
