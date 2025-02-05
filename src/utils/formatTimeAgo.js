import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale"; //
import { ka } from "date-fns/locale";

/**
 * Formats a given ISO date string into a string representing the time elapsed since the date.
 * @param {string} dateString - The ISO date string to format.
 * @param {Object} [locale=ka] - The locale to use for formatting (default is Georgian).
 * @returns {string} - The formatted time elapsed string.
 */
function formatTimeAgo(dateString, locale = ka) {
  if (!dateString) return "N/A";
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true, // Adds "ago" or equivalent
    locale: locale, // Use Georgian language
  });
}

export default formatTimeAgo;
