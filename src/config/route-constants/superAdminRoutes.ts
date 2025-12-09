// Super Admin Routes (relative paths - will be nested under /superadmin)
export const SUPER_ADMIN = {
  DASHBOARD: "dashboard",
  ORGANIZATIONS_ALL: "organizations/all",
  USERS_ADMINS: "users/admins",
  USERS_DOCTORS: "users/doctors",
  PLANS_SUBSCRIPTION_PLANS: "plans/subscription-plans",
  PLANS_ACTIVE_SUBSCRIPTIONS: "plans/active-subscriptions",
  PLANS_INVOICES: "plans/invoices",
  SECURITY_AUDIT_LOGS: "security/audit-logs",
  SECURITY_ACCESS_POLICIES: "security/access-policies",
  SECURITY_DATA_RETENTION: "security/data-retention",
  SUPPORT_TICKETS: "support/tickets",
  SUPPORT_FEEDBACK: "support/feedback",
} as const;
