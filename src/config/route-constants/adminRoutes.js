// Admin Routes (relative paths - will be nested under /admin in AppRoutes)
export const ADMIN = {
  // Dashboard
  DASHBOARD: "dashboard",
  HEADER: "header",

  // Patients
  PATIENTS_ALL: "patients/all",
  PATIENTS_FAMILY_PROFILES: "patients/family-profiles",

  // Doctors & Staff
  DOCTORS: "doctors",

  // Appointments
  APPOINTMENTS_CALENDAR: "appointments/calendar",
  APPOINTMENTS_LIST: "appointments/list",
  APPOINTMENTS_REQUESTS: "appointments/requests",
  APPOINTMENTS_OPD_SLOTS: "appointments/opd-slots",

  // Health Records (PHR)
  HEALTH_RECORDS_UPLOADED_REPORTS: "health-records/uploaded-reports",
  HEALTH_RECORDS_PRESCRIPTIONS: "health-records/prescriptions",
  HEALTH_RECORDS_DOCUMENTS: "health-records/documents",

  // Billing & Payments
  BILLING_INVOICES: "billing/invoices",
  BILLING_PAYMENTS: "billing/payments",
  BILLING_PAYMENT_HISTORY: "billing/payment-history",
  BILLING_FEE_STRUCTURE: "billing/fee-structure",
  BILLING_PHARMACY: "billing/pharmacy-billing",

  // Dispense Medicines
  DISPENSE_MEDICINES: "dispense-medicines",

  // Communication
  COMMUNICATION_TEMPLATES: "communication/templates",

  // Reports & Analytics
  REPORTS_APPOINTMENT_SUMMARY: "reports/appointment-summary",
  REPORTS_PATIENT_GROWTH: "reports/patient-growth",
  REPORTS_USAGE_STATS: "reports/usage-stats",

  // Settings
  SETTINGS_ORGANIZATION_PROFILE: "settings/organization-profile",
  SETTINGS_WORKING_HOURS: "settings/working-hours",
  SETTINGS_CHANGE_PLAN: "settings/change-plan",
};
