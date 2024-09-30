export function isStrongPassword(password) {
  const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
  return passwordRegex.test(password);
}
