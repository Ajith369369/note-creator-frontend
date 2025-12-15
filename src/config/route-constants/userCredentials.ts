// Match backend role values (uppercase with underscores)
export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
  SHARED: "SHARED",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface UserConfig {
  email: string;
  password: string;
  role: UserRole;
  label: string;
  urlPrefix: string;
  defaultDashboardRoute: string;
}

// Comprehensive user configuration for all roles
// Contains email, password, role, label, urlPrefix, and defaultDashboardRoute
export const USER_CONFIG: Record<UserRole, UserConfig> = {
  [USER_ROLES.SUPER_ADMIN]: {
    email: "superadmin@notecreator.com",
    password: "SuperAdminPswd",
    role: USER_ROLES.SUPER_ADMIN,
    label: "Super Admin",
    urlPrefix: "superadmin",
    defaultDashboardRoute: "/superadmin/introduction",
  },
  [USER_ROLES.ADMIN]: {
    email: "admin@gmail.com",
    password: "adminpswd",
    role: USER_ROLES.ADMIN,
    label: "Admin",
    urlPrefix: "admin",
    defaultDashboardRoute: "/admin/introduction",
  },
  [USER_ROLES.USER]: {
    email: "user@gmail.com",
    password: "userpswd",
    role: USER_ROLES.USER,
    label: "User",
    urlPrefix: "user",
    defaultDashboardRoute: "/user/introduction",
  },
  [USER_ROLES.SHARED]: {
    email: "",
    password: "",
    role: USER_ROLES.SHARED,
    label: "",
    urlPrefix: "shared",
    defaultDashboardRoute: "/shared/introduction",
  },
};

// Helper functions to access user config data
export const getUserConfig = (role: UserRole): UserConfig | null => {
  return USER_CONFIG[role] || null;
};

export const getUserEmail = (role: UserRole): string | null => {
  return USER_CONFIG[role]?.email || null;
};

export const getUserPassword = (role: UserRole): string | null => {
  return USER_CONFIG[role]?.password || null;
};

export const getUserLabel = (role: UserRole): string => {
  return USER_CONFIG[role]?.label || role;
};

export const getUserUrlPrefix = (role: UserRole): string | null => {
  return USER_CONFIG[role]?.urlPrefix || null;
};

export const getUserDefaultRoute = (role: UserRole): string => {
  return USER_CONFIG[role]?.defaultDashboardRoute || "/login";
};

// Get all user configs as an array (useful for iteration)
export const getAllUserConfigs = (): UserConfig[] => {
  return Object.values(USER_CONFIG);
};

// Get user config by email (useful for login)
export const getUserConfigByEmail = (
  email: string,
): UserConfig | undefined => {
  return Object.values(USER_CONFIG).find(
    (config) => config.email.toLowerCase() === email.toLowerCase(),
  );
};

// Get user config by role key (e.g., "SUPER_ADMIN" or "superadmin")
export const getUserConfigByRoleKey = (
  roleKey: string,
): UserConfig | null => {
  // Try direct role match first
  if (USER_CONFIG[roleKey as UserRole]) {
    return USER_CONFIG[roleKey as UserRole];
  }

  // Try case-insensitive match
  const normalizedKey = roleKey.toUpperCase();
  if (USER_CONFIG[normalizedKey as UserRole]) {
    return USER_CONFIG[normalizedKey as UserRole];
  }

  // Try to find by urlPrefix
  return (
    Object.values(USER_CONFIG).find(
      (config) => config.urlPrefix.toLowerCase() === roleKey.toLowerCase(),
    ) || null
  );
};

