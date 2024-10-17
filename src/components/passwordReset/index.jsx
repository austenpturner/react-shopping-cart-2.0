import { useState } from "react";
import styles from "./passwordReset.module.scss";
import CommonForm from "../commonForm";
import { passwordResetControls } from "../../config/accountUpdateConfig";
import { PulseLoader } from "react-spinners";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getErrorMessage } from "../../util/getErrorMessage";

const initialState = {
  userEmail: "",
};

export default function PasswordReset() {
  const [userEmail, setUserEmail] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  function handleEmailInput(e) {
    setUserEmail({ ...userEmail, [e.target.name]: e.target.value });
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setSuccessMsg("");
    setErrorMsg("");
    const email = userEmail.userEmail;

    console.log(email);

    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setSuccessMsg(`Reset link sent to ${email}.`);
      setErrorMsg("");
      setUserEmail(initialState);
    } catch (error) {
      setErrorMsg(getErrorMessage(error.code, "updatePassword"));
      console.log(error.code);
      setLoading(false);
    }
  }

  return (
    <div className={styles.passwordResetModal}>
      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className={styles.successMsg}>{successMsg}</p>}
      {loading && <PulseLoader color="#a0a0a0" size={5} />}
      <div>
        <CommonForm
          formControls={passwordResetControls}
          btnText="reset password"
          formData={userEmail}
          setFormData={handleEmailInput}
          onSubmit={handleEmailSubmit}
          className="passwordUpdate"
        />
      </div>
    </div>
  );
}
