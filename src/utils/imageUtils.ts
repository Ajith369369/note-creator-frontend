/**
 * Image utility for handling Cloudinary image URLs
 * Returns Cloudinary URL directly if present, otherwise undefined
 * @param noteImage - Cloudinary URL string (can be string, null, or undefined)
 * @returns Cloudinary URL or undefined
 */
export const getNoteImageUrl = (
  noteImage?: string | null
): string | undefined => {
  if (!noteImage || typeof noteImage !== "string") {
    return undefined;
  }

  // Cloudinary URLs are already complete URLs, return as-is
  return noteImage;
};
