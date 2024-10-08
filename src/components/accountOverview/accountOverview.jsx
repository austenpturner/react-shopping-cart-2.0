import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../commonForm";
import { nameUpdateControls } from "../../config/accountUpdateConfig";
import { useState } from "react";
import styles from "./accountOverview.module.scss";
import { getAuth, updateProfile } from "firebase/auth";
import { getErrorMessage } from "../../util/getErrorMessage";
import { updateUser } from "../../store/slices/usersSlice";
import { PulseLoader } from "react-spinners";

export default function AccountOverview() {
  const user = useSelector((state) => state.users.currentUser);
  const auth = getAuth();
  const nameArr = user.username.split(" ");
  const [nameUpdate, setNameUpdate] = useState({
    firstname: nameArr[0],
    lastname: nameArr[1],
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleNameUpdate(e) {
    setNameUpdate({ ...nameUpdate, [e.target.name]: e.target.value });
  }

  async function handleNameSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setSuccessMsg("");
    setLoading(true);
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
      setSuccessMsg("Name updated successfully.");
      setErrorMsg("");
      setLoading(false);
    } catch (error) {
      setErrorMsg(getErrorMessage(error.code, "updateName"));
      setLoading(false);
    }
  }

  return (
    <>
      {" "}
      <h2 className="page-subheader">{`welcome, ${
        user.username?.split(" ")[0] || `shopper`
      }!`}</h2>
      <p className={styles.accountEmail}>
        email: <span>{user.email}</span>
      </p>
      <div className={styles.formContainer}>
        <CommonForm
          formControls={nameUpdateControls}
          formData={nameUpdate}
          setFormData={handleNameUpdate}
          onSubmit={handleNameSubmit}
          btnText={"update"}
          className="nameInput"
        />
        {errorMsg && <p className="error">{errorMsg}</p>}
        {successMsg && <p className={styles.successMsg}>{successMsg}</p>}
        {loading && <PulseLoader color="#a0a0a0" size={5} />}
      </div>{" "}
    </>
  );
}
