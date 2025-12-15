// Role-agnostic routes - accessible by both admin and regular users
export const SHARED = {
  // Base profile route
  PROFILE_HOME: "/profile-home",

  // Shared profile routes (both admin and users)
  INTRODUCTION: "introduction",
  NOTES: "notes",
  NOTE_VIEW: "note",
  NOTE_ADD: "add",
  NOTE_EDIT: "edit",

  // Full paths for navigation
  PROFILE_INTRODUCTION: "/profile-home/introduction",
  PROFILE_NOTES: "/profile-home/notes",
  PROFILE_NOTE_VIEW: "/profile-home/note",
  PROFILE_NOTE_ADD: "/profile-home/add",
  PROFILE_NOTE_EDIT: "/profile-home/edit",
} as const;
