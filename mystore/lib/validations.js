const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email);
}

export function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}
