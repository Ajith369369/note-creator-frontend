// Role-agnostic routes - accessible by both admin and regular users
export const SHARED = {
  // Shared profile routes (both admin and users)
  INTRODUCTION: "introduction",
  NOTES: "notes",
  NOTE_VIEW: "note",
  NOTE_ADD: "add",
  NOTE_EDIT: "edit",

  // Full paths for navigation
  PROFILE_INTRODUCTION: "/profile/introduction",
  PROFILE_NOTES: "/profile/notes",
  PROFILE_NOTE_VIEW: "/profile/note",
  PROFILE_NOTE_ADD: "/profile/add",
  PROFILE_NOTE_EDIT: "/profile/edit",
} as const;
