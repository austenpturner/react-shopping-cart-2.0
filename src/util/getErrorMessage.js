const generalErrors = {
  "auth/network-request-failed": "Network error, please try again.",
  "auth/weak-password":
    "Please enter a valid password. It must be at least six characters.",
  "auth/internal-error":
    "An error occurred, please try again. If the problem persists, please contact support.",
  "auth/invalid-argument": "Your entry was invalid. Please try again.",
};

const specificErrors = {
  login: {
    "auth/invalid-credential":
      "No user found with that email and password. Please try again.",
    "auth/user-not-found":
      "No user found with that email and password. Have you registered?",
    "auth/invalid-email": "Please enter a valid email.",
    "auth/missing-email": "Please enter your email.",
    "auth/invalid-password": "Incorrect password. Please try again.",
    "auth/missing-password": "Please enter a password.",
  },
  register: {
    "auth/email-already-in-use":
      "That email is already in use. Try logging in?",
    "auth/invalid-display-name": "Please enter a valid username.",
    "auth/invalid-email": "Please enter a valid email.",
    "auth/missing-email": "Please enter your email.",
    "auth/missing-password": "Please enter a password.",
  },
  updatePassword: {
    "auth/invalid-credential":
      "Current password is incorrect, please try again.",
    "auth/invalid-password": "Incorrect password. Please try again.",
    "auth/missing-password": "Please enter your current password.",
  },
};

export function getErrorMessage(errorCode, context) {
  console.log(errorCode, context);

  return (
    specificErrors[context]?.[errorCode] ||
    generalErrors[errorCode] ||
    "An error occurred. Please try again."
  );
}
