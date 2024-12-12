import zxcvbn from "zxcvbn";

const validateEmail = (value) => {
  if (!value) return "ელ.ფოსტა სავალდებულოა.";
  if (!/.+@.+\..+/.test(value))
    return "გთხოვთ, შეიყვანოთ სწორი ელფოსტის მისამართი.";
  return "";
};

/**
 * Validate a password
 * @param {string} value the password to validate
 * @param {boolean} [advanced=false] whether to check for advanced password requirements
 * @returns {string} an error message, or an empty string if the password is valid
 */
const validatePassword = (value, advanced = false) => {
  if (advanced) {
    if (!value) return "პაროლი სავალდებულოა.";
    if (value.length < 8) return "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს.";
    if (!/[A-Z]/.test(value)) return "პაროლში უნდა იყოს მინიმუმ ერთი დიდი ასო.";
    if (!/[0-9]/.test(value)) return "პაროლში უნდა იყოს მინიმუმ ერთი ციფრი.";
    if (!/[!@#$%^&*(),.?":{}|<>_ -]/.test(value))
      return "პაროლი უნდა შეიცავდეს მინიმუმ ერთ სიმბოლოს... მაგ: ( ! @ # $ % ^ & * ( ) , . ? : ' \" { } | < > _ - )";

    return "";
  } else {
    if (!value) return "პაროლი სავალდებულოა.";
    if (value.length < 8) return "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს";
    return "";
  }
};

/**
 * Calculates the strength of a given password
 * @param {string} password the password to evaluate
 * @returns {array} an array of [score, message], where score is an integer from 0 to 4 and message is a string
 *                    describing the strength of the password
 */
function getPasswordStrength(password) {
  const passwordStrength = zxcvbn(password); // Get password strength
  const score = passwordStrength.score; // Password strength score from 0 to 4

  if (password.length < 1) return [null, ""]; // No strength if password is empty

  let message = "";
  if (score < 1) message = "ძალიან სუსტი"; // Very weak
  else if (score === 1) message = "სუსტი"; // Weak
  else if (score === 2) message = "ძლიერი"; // Strong
  else if (score === 3) message = "ძალიან ძლიერი"; // Very strong
  else message = "ძალიან ძლიერი"; // Very strong (if score is 4)

  return [score, message]; // Return an array of score and message
}

export { validateEmail, validatePassword, getPasswordStrength };
