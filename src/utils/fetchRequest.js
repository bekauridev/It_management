import { BASE_URL } from "../config/config";

/**
 * Sends a request to the backend server at the given URL with the specified options.
 *
 * @param {string} url - The relative URL to send the request to.
 * @param {string} method - The HTTP method (e.g., "GET", "POST", "PATCH", "DELETE").
 * @param {object} [body] - Optional body to send with the request (for POST/PUT).
 * @param {boolean} [useCredentials=true] - Whether to include credentials (cookies).
 * @param {AbortSignal} [signal] - Optional AbortSignal to cancel the request.
 * @returns {Promise<object>} - The response data from the server.
 */
export const fetchRequest = async (
  url,
  method,
  body,
  useCredentials = true,
  signal // Add signal as an optional parameter
) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Add the body to the request if provided
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Include credentials if specified
  if (useCredentials) {
    options.credentials = "include";
  }

  // Attach the signal to the request if provided
  if (signal) {
    options.signal = signal;
  }

  try {
    const res = await fetch(`${BASE_URL}/${url}`, options);

    // Check if the response is in JSON format
    const contentType = res.headers.get("Content-Type");
    let data = null;

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    }

    if (!res.ok) {
      throw new Error(data?.message || "An error occurred");
    }

    // Return a consistent structure, even if data is null
    return data || { data: null };
  } catch (error) {
    // Differentiate between an abort error and others
    if (error.name === "AbortError") {
      console.log("Request aborted");
    }
    throw error; // Re-throw the error for further handling
  }
};
