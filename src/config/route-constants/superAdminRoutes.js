// Super Admin Routes (relative paths - will be nested under /superadmin in AppRoutes)
// SaaS Platform Owner Routes
export const SUPER_ADMIN = {
  // Overview
  DASHBOARD: "dashboard",

  // Organizations (Tenants)
  ORGANIZATIONS_ALL: "organizations/all",

  // Users & Roles
  USERS_ADMINS: "users/admins",
  USERS_DOCTORS: "users/doctors",

  // Plans & Billing
  PLANS_SUBSCRIPTION_PLANS: "plans/subscription-plans",
  PLANS_ACTIVE_SUBSCRIPTIONS: "plans/active-subscriptions",
  PLANS_INVOICES: "plans/invoices",

  // Security & Compliance
  SECURITY_AUDIT_LOGS: "security/audit-logs",
  SECURITY_ACCESS_POLICIES: "security/access-policies",
  SECURITY_DATA_RETENTION: "security/data-retention",

  // Support & Feedback
  SUPPORT_TICKETS: "support/tickets",
  SUPPORT_FEEDBACK: "support/feedback",
};
