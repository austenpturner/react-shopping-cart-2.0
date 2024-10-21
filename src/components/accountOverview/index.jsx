import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../commonForm";
import {
  nameUpdateControls,
  passwordUpdateControls,
} from "../../config/accountUpdateConfig";
import { useState } from "react";
import styles from "./accountOverview.module.scss";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getErrorMessage } from "../../util/getErrorMessage";
import { updateUser } from "../../store/slices/usersSlice";
import { PulseLoader } from "react-spinners";
import { isStrongPassword } from "../../util/isStrongPassword";

const initialState = {
  current: "",
  new: "",
  confirm: "",
};

export default function AccountOverview() {
  const user = useSelector((state) => state.users.currentUser);
  const auth = getAuth();
  const nameArr = user.username.split(" ");
  const [nameUpdate, setNameUpdate] = useState({
    firstname: nameArr[0],
    lastname: nameArr[1],
  });
  const [passwordUpdate, setPasswordUpdate] = useState(initialState);

  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [usernameSuccessMsg, setUsernameSuccessMsg] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const dispatch = useDispatch();

  function handleNameUpdate(e) {
    setNameUpdate({ ...nameUpdate, [e.target.name]: e.target.value });
  }

  function handlePasswordUpdate(e) {
    setPasswordUpdate({ ...passwordUpdate, [e.target.name]: e.target.value });
  }

  async function handleNameSubmit(e) {
    e.preventDefault();
    if (usernameLoading) return;
    setUsernameSuccessMsg("");
    setUsernameErrorMsg("");
    setUsernameLoading(true);
    if (nameUpdate.firstname === "" || nameUpdate.lastname === "") {
      setUsernameErrorMsg("Please fill out both fields.");
      setUsernameLoading(false);
      return;
    } else if (
      nameUpdate.firstname === nameArr[0] &&
      nameUpdate.lastname === nameArr[1]
    ) {
      setUsernameErrorMsg("Please change first or last name to update.");
      setUsernameLoading(false);
      return;
    }
    try {
      const currentUser = auth.currentUser;
      await updateProfile(currentUser, {
        displayName: `${nameUpdate.firstname} ${nameUpdate.lastname}`,
      });
      dispatch(
        updateUser({
          username: `${nameUpdate.firstname} ${nameUpdate.lastname}`,
        })
      );
      setUsernameSuccessMsg("Name updated successfully.");
      setUsernameErrorMsg("");
      setUsernameLoading(false);
    } catch (error) {
      setUsernameErrorMsg(getErrorMessage(error.code, "updateName"));
      setUsernameLoading(false);
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    if (passwordLoading) return;
    setPasswordSuccessMsg("");
    setPasswordErrorMsg("");
    if (passwordUpdate.new !== passwordUpdate.confirm) {
      setPasswordErrorMsg("Passwords must match. Please try again.");
      return;
    }
    if (!isStrongPassword(passwordUpdate.new)) {
      setPasswordErrorMsg(
        "Password must be at least 6 characters and contain at least one letter and number."
      );
      return;
    }
    setPasswordLoading(true);
    try {
      const credentials = EmailAuthProvider.credential(
        user.email,
        passwordUpdate.current
      );
      await reauthenticateWithCredential(user, credentials);
      await updatePassword(user, passwordUpdate.new);
      setPasswordLoading(false);
      setPasswordSuccessMsg("Password updated successfully.");
      setPasswordErrorMsg("");
      setPasswordUpdate(initialState);
    } catch (error) {
      setPasswordErrorMsg(getErrorMessage(error.code, "updatePassword"));
      setPasswordLoading(false);
    }
  }

  return (
    <>
      <h1 className={`page-header ${styles.welcomeMsg}`}>{`Welcome, ${
        nameArr[0] || `shopper`
      }!`}</h1>
      <p className={styles.accountEmail}>
        Email: <span>{user.email}</span>
      </p>
      <div className={styles.formContainer}>
        <p className={`page-subheader ${styles.usernameHeader}`}>username:</p>
        <CommonForm
          formControls={nameUpdateControls}
          formData={nameUpdate}
          setFormData={handleNameUpdate}
          onSubmit={handleNameSubmit}
          btnText="update"
          className="nameUpdate"
        />
        <div className={styles.msgContainer}>
          {usernameErrorMsg && (
            <p className={`error ${styles.resultMsg}`}>{usernameErrorMsg}</p>
          )}
          {usernameSuccessMsg && (
            <p className={`success ${styles.resultMsg}`}>
              {usernameSuccessMsg}
            </p>
          )}
          {usernameLoading && <PulseLoader color="#a0a0a0" size={5} />}
        </div>
      </div>
      <div className={styles.passwordUpdateContainer}>
        <p className={`page-subheader ${styles.passwordHeader}`}>password:</p>
        <CommonForm
          formControls={passwordUpdateControls}
          btnText="update"
          formData={passwordUpdate}
          setFormData={handlePasswordUpdate}
          onSubmit={handlePasswordSubmit}
          className="passwordUpdate"
        />
        <div className={styles.msgContainer}>
          {passwordErrorMsg && (
            <p className={`error ${styles.resultMsg}`}>{passwordErrorMsg}</p>
          )}
          {passwordSuccessMsg && (
            <p className={`success ${styles.resultMsg}`}>
              {passwordSuccessMsg}
            </p>
          )}
          {passwordLoading && <PulseLoader color="#a0a0a0" size={5} />}
        </div>
      </div>
    </>
  );
}
