/**
 * Formats a given ISO date string into a specified locale and options.
 * @param {string} isoDate - The ISO date string to format.
 * @param {string} [locale='ka-GE'] - The locale to use for formatting (default is Georgian).
 * @param {Object} [options={}] - Formatting options for the date.
 * @returns {string} - The formatted date string.
 */
function formatDate(isoDate, locale = "ka-ge", options = {}) {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  if (!isoDate) return;

  // Use defaultOptions if no user options are provided
  const finalOptions =
    Object.keys(options).length === 0 ? defaultOptions : options;

  // Convert ISO date string to Date object
  const date = new Date(isoDate);

  // Format the date using toLocaleString
  return date.toLocaleString(locale, finalOptions);
}

export default formatDate;
