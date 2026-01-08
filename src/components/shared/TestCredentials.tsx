import {
  USER_CONFIG,
  USER_ROLES,
} from "@/config/route-constants/userCredentials";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

// Type definitions
type Credentials = {
  email: string;
  password: string;
};

type RoleOption = {
  id: string;
  label: string;
};

type TestCredentialsProps = {
  isMobile?: boolean;
};

// Filter USER_CONFIG to exclude SUPER_ADMIN and SHARED
const FILTERED_USER_CONFIG = Object.values(USER_CONFIG).filter(
  (config) =>
    config.role !== USER_ROLES.SUPER_ADMIN && config.role !== USER_ROLES.SHARED
);

// Convert USER_CONFIG to format needed for TestCredentials component
// Maps urlPrefix (e.g., "admin") to credentials
const USER_CREDENTIALS: Record<string, Credentials> = Object.fromEntries(
  FILTERED_USER_CONFIG.map((config) => [
    config.urlPrefix, // Use urlPrefix as key (e.g., "admin")
    {
      email: config.email,
      password: config.password,
    },
  ])
);

// Generate USER_ROLE_OPTIONS from filtered USER_CONFIG
const USER_ROLE_OPTIONS: RoleOption[] = FILTERED_USER_CONFIG.map((config) => ({
  id: config.urlPrefix, // Use urlPrefix as id (e.g., "admin")
  label: config.label,
}));

const TestCredentials = ({ isMobile = false }: TestCredentialsProps) => {
  const [selectedRole, setSelectedRole] = useState<string>(() => {
    // Initialize from localStorage or default to admin (first available option)
    const savedRole = localStorage.getItem("testCredentialsSelectedRole");
    const defaultRole = USER_ROLE_OPTIONS[0]?.id || "admin";
    return savedRole && USER_ROLE_OPTIONS.some((opt) => opt.id === savedRole)
      ? savedRole
      : defaultRole;
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Save selected role to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("testCredentialsSelectedRole", selectedRole);
  }, [selectedRole]);

  const copyToClipboard = async (
    text: string,
    field: string
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const selectedCredentials = USER_CREDENTIALS[selectedRole];
  const selectedRoleInfo = USER_ROLE_OPTIONS.find(
    (option) => option.id === selectedRole
  );

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedRole(e.target.value);
  };

  if (isMobile) {
    return (
      <div className="w-full max-w-md mb-4 transition-opacity duration-300">
        <div className="bg-white/5 border border-white/15 backdrop-blur-2xl p-4 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center mb-3">
            <h2 className="text-xl font-bold text-white mb-0.5">
              Test Credentials
            </h2>
            <p className="text-xs text-slate-200/80 text-center">
              Quick access for testing
            </p>
          </div>

          {/* Mobile Role Selection Dropdown */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-200 mb-1.5">
              Select User Role
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="appearance-none w-full px-3 py-2 pr-8 border border-white/40 rounded-xl bg-white/90 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 transition duration-300 hover:border-emerald-300 cursor-pointer text-sm shadow-inner shadow-white/20"
              >
                {USER_ROLE_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="h-4 w-4 text-slate-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Mobile Selected Role Credentials */}
          {selectedCredentials && (
            <div className="bg-white/5 border border-white/15 rounded-xl p-2.5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white text-sm">
                  {selectedRoleInfo?.label}
                </h3>
                <div className="text-xs bg-emerald-500/20 text-emerald-100 border border-emerald-200/40 px-2 py-1 rounded-full">
                  {selectedRole.toUpperCase()}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-white/10 border border-white/15 rounded-lg p-2 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-4 w-4 text-slate-300" />
                    <div>
                      <span className="text-xs text-slate-200/80">Email:</span>
                      <div className="font-mono text-xs text-white">
                        {selectedCredentials.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        selectedCredentials.email,
                        `${selectedRole}-email`
                      )
                    }
                    className="p-1 hover:bg-white/10 rounded transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Copy email"
                    type="button"
                  >
                    <ClipboardDocumentIcon className="h-3 w-3 text-slate-300 hover:text-emerald-400 transition-colors" />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-white/10 border border-white/15 rounded-lg p-2 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <LockClosedIcon className="h-4 w-4 text-slate-300" />
                    <div>
                      <span className="text-xs text-slate-200/80">
                        Password:
                      </span>
                      <div className="font-mono text-xs text-white">
                        {selectedCredentials.password}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        selectedCredentials.password,
                        `${selectedRole}-password`
                      )
                    }
                    className="p-1 hover:bg-white/10 rounded transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Copy password"
                    type="button"
                  >
                    <ClipboardDocumentIcon className="h-3 w-3 text-slate-300 hover:text-emerald-400 transition-colors" />
                  </button>
                </div>
              </div>

              {copiedField && copiedField.startsWith(selectedRole) && (
                <div className="mt-2 p-1.5 bg-emerald-500/20 border border-emerald-200/40 rounded-lg transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center space-x-1 text-xs text-emerald-100">
                    <CheckCircleIcon className="h-3 w-3" />
                    <span className="font-medium">
                      {copiedField.endsWith("email")
                        ? "Email copied!"
                        : "Password copied!"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="w-full my-4 bg-white/5 border border-white/15 backdrop-blur-2xl p-3 rounded-3xl shadow-2xl relative z-10 transition-opacity duration-300">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-1">Test Credentials</h2>
        <p className="text-sm text-slate-200/80 text-center">
          Click to copy credentials for testing
        </p>
      </div>

      {/* Role Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-200 mb-1.5">
          Select User Role
        </label>
        <div className="relative">
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="appearance-none w-full px-4 py-2 pr-10 border border-white/40 rounded-xl bg-white/90 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 transition duration-300 hover:border-emerald-300 cursor-pointer shadow-inner shadow-white/20"
          >
            {USER_ROLE_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="h-5 w-5 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Selected Role Credentials */}
      {selectedCredentials && (
        <div className="bg-white/5 border border-white/15 rounded-xl p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white text-lg">
              {selectedRoleInfo?.label || selectedRole}
            </h3>
            <div className="text-xs bg-emerald-500/20 text-emerald-100 border border-emerald-200/40 px-3 py-1 rounded-full font-medium">
              {selectedRole.toUpperCase()}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white/10 border border-white/15 rounded-lg p-2.5 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-slate-300" />
                <div>
                  <span className="text-sm font-medium text-slate-200/80">
                    Email:
                  </span>
                  <div className="text-sm font-mono text-white mt-0.5">
                    {selectedCredentials.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    selectedCredentials.email,
                    `${selectedRole}-email`
                  )
                }
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                title="Copy email"
                type="button"
              >
                <ClipboardDocumentIcon className="h-5 w-5 text-slate-300 hover:text-emerald-400 transition-colors" />
              </button>
            </div>

            <div className="flex items-center justify-between bg-white/10 border border-white/15 rounded-lg p-2.5 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <LockClosedIcon className="h-5 w-5 text-slate-300" />
                <div>
                  <span className="text-sm font-medium text-slate-200/80">
                    Password:
                  </span>
                  <div className="text-sm font-mono text-white mt-0.5">
                    {selectedCredentials.password}
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    selectedCredentials.password,
                    `${selectedRole}-password`
                  )
                }
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                title="Copy password"
                type="button"
              >
                <ClipboardDocumentIcon className="h-5 w-5 text-slate-300 hover:text-emerald-400 transition-colors" />
              </button>
            </div>
          </div>

          {copiedField && copiedField.startsWith(selectedRole) && (
            <div className="mt-3 p-1.5 bg-emerald-500/20 border border-emerald-200/40 rounded-lg transition-all duration-300 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center space-x-2 text-sm text-emerald-100">
                <CheckCircleIcon className="h-4 w-4" />
                <span className="font-medium">
                  {copiedField.endsWith("email")
                    ? "Email copied to clipboard!"
                    : "Password copied to clipboard!"}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 p-2 bg-emerald-500/20 border border-emerald-200/40 rounded-lg transition-opacity duration-300">
        <p className="text-xs text-emerald-100 text-center">
          <strong>Note:</strong> These are test credentials for development
          purposes only.
        </p>
      </div>
    </div>
  );
};

export default TestCredentials;
