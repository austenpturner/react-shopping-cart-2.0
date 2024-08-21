export function getErrorMessage(errorCode) {
  console.log(errorCode);

  switch (errorCode) {
    case "auth/email-already-in-use":
      return "That email is already in use. Try logging in?";
    case "auth/id-token-expired" ||
      "auth/id-token-revoked" ||
      "auth/insufficient-permission":
      return "An error occurred. Please contact support for help.";
    case "auth/internal-error":
      return "An error occurred. Please try again. If the problem persists, please contact support for help";
    case "auth/invalid-argument":
      return "Your entry was invalid. Please try again.";
    case "auth/invalid-display-name":
      return "Please enter a valid username.";
    case "auth/invalid-email":
      return "Please enter a valid email.";
    case "auth/missing-email":
      return "Please enter an email.";
    case "auth/invalid-password":
      return "Incorrect password. Please try again.";
    case "auth/missing-password":
      return "Please enter a password. It must be at least six characters.";
    case "auth/weak-password":
      return "Please enter a valid password. It must be at least six characters.";
    case "auth/invalid-credential":
      return "No user found with that email and password. Please try again.";
    case "auth/user-not-found":
      return "No user found with that email and password. Try registering?";
    default:
      return "An error occurred. Please try again. If the problem persists, please contact support for help.";
  }
}
