/**
 * Date utility functions for formatting dates in various formats
 * @module utils/dateUtils
 */

/**
 * Formats the current date as an ISO date string (YYYY-MM-DD)
 * Used for storing dates in the database/API
 *
 * @returns {string} ISO date string in format YYYY-MM-DD
 *
 * @example
 * formatDate() // "2024-09-19"
 */
export const formatDate = (): string => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};

/**
 * Formats a date and time for display in IST timezone
 * Format: "Sept 19, 2024 • 06:44 PM (IST)"
 *
 * @param {string | Date} [dateInput] - Optional date string (YYYY-MM-DD) or Date object. If not provided, uses current date/time.
 * @returns {string} Formatted date and time string
 *
 * @example
 * formatDateForDisplay() // "Sept 19, 2024 • 06:44 PM (IST)" (current date/time)
 * formatDateForDisplay("2024-09-19") // "Sept 19, 2024 • 06:44 PM (IST)" (specific date with current time)
 */
export const formatDateForDisplay = (dateInput?: string | Date): string => {
  // Get date/time in IST - use provided date or current date
  let dateToFormat: Date;
  
  if (dateInput) {
    if (typeof dateInput === "string") {
      // If it's an ISO date string (YYYY-MM-DD), parse it and use current time
      const parsedDate = new Date(dateInput);
      if (isNaN(parsedDate.getTime())) {
        // Invalid date, fall back to current date
        dateToFormat = new Date();
      } else {
        // Use the provided date but with current time
        const now = new Date();
        parsedDate.setHours(now.getHours());
        parsedDate.setMinutes(now.getMinutes());
        parsedDate.setSeconds(now.getSeconds());
        dateToFormat = parsedDate;
      }
    } else {
      dateToFormat = dateInput;
    }
  } else {
    dateToFormat = new Date();
  }

  // Format: "Sept 19, 2024 • 06:44 PM (IST)"
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Use Intl.DateTimeFormat to get formatted parts
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const parts = formatter.formatToParts(dateToFormat);

  const monthPart = parts.find((p) => p.type === "month")?.value || "";
  const dayPart = parts.find((p) => p.type === "day")?.value || "";
  const yearPart = parts.find((p) => p.type === "year")?.value || "";
  const hourPart = parts.find((p) => p.type === "hour")?.value || "";
  const minutePart = parts.find((p) => p.type === "minute")?.value || "";
  const dayPeriodPart =
    parts.find((p) => p.type === "dayPeriod")?.value.toUpperCase() || "";

  // Map month abbreviation to full month name (e.g., "Sep" -> "Sept")
  const monthIndex = monthNames.findIndex((m) => m.startsWith(monthPart));
  const month = monthIndex !== -1 ? monthNames[monthIndex] : monthPart;

  return `${month} ${dayPart}, ${yearPart} • ${hourPart}:${minutePart} ${dayPeriodPart} (IST)`;
};
