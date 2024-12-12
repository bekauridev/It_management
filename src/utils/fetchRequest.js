import { BASE_URL } from "../config/config";

/**
 * Sends a request to the backend server at the given URL with the specified options.
 *
 * @param {string} url - The relative URL to send the request to.
 * @param {string} method - The HTTP method (e.g., "GET", "POST", "PATCH", "DELETE").
 * @param {object} [body] - Optional body to send with the request (for POST/PUT).
 * @param {boolean} [useCredentials=true] - Whether to include credentials (cookies).
 * @returns {Promise<object>} - The response data from the server.
 */
export const fetchRequest = async (
  url,
  method,
  body,
  useCredentials = true
) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Conditionally add body to the request if it's provided

  if (body) {
    options.body = JSON.stringify(body);
  }

  // Conditionally include credentials if specified
  if (useCredentials) {
    options.credentials = "include";
  }

  const res = await fetch(`${BASE_URL}/${url}`, options);

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "An error occurred");
  }

  return data;
};
