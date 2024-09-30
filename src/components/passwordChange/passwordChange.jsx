import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { passwordUpdateControls } from "../../config/accountUpdateConfig";
import CommonForm from "../commonForm";
import { useState } from "react";
import Button from "../button";
import styles from "./passwordChange.module.scss";
import { getErrorMessage } from "../../util/getErrorMessage";
import { isStrongPassword } from "../../util/isStrongPassword";

const initialState = {
  current: "",
  new: "",
  confirm: "",
};

export default function PasswordChange() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [changePassword, setChangePassword] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePasswordUpdate(e) {
    setPasswordUpdate({ ...passwordUpdate, [e.target.name]: e.target.value });
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    if (passwordUpdate.new !== passwordUpdate.confirm) {
      setErrorMsg("Passwords must match. Please try again.");
      return;
    }
    if (!isStrongPassword(passwordUpdate.new)) {
      setErrorMsg(
        "Password must be at least 6 characters and contain at least one letter and number."
      );
      return;
    }
    setLoading(true);
    try {
      const credentials = EmailAuthProvider.credential(
        user.email,
        passwordUpdate.current
      );
      await reauthenticateWithCredential(user, credentials);
      await updatePassword(user, passwordUpdate.new);
      setLoading(false);
      setSuccessMsg("Password updated successfully.");
      setErrorMsg("");
      setPasswordUpdate(initialState);
    } catch (error) {
      setErrorMsg(getErrorMessage(error.code, "updatePassword"));
      setLoading(false);
    }
    console.log(passwordUpdate);
  }

  return (
    <div className={styles.accountPasswordView}>
      <h2 className="page-subheader">account password</h2>
      <Button
        text="change password"
        handleAction={() => setChangePassword(true)}
      />
      <div
        className={styles.passwordUpdateContainer}
        data-visible={changePassword ? true : false}
      >
        {errorMsg && <p>{errorMsg}</p>}
        {successMsg && <p>{successMsg}</p>}
        {loading && <p>Loading... </p>}
        <CommonForm
          formControls={passwordUpdateControls}
          btnText="update password"
          formData={passwordUpdate}
          setFormData={handlePasswordUpdate}
          onSubmit={handlePasswordSubmit}
          className="passwordUpdate"
        />
      </div>
    </div>
  );
}
