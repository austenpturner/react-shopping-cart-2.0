import { useSelector } from "react-redux";
import CommonForm from "../commonForm";
import {
  nameUpdateControls,
  usernameUpdateControls,
} from "../../config/accountUpdateConfig";
import { useState } from "react";
import styles from "./accountOverview.module.scss";

export default function AccountOverview() {
  const user = useSelector((state) => state.users.currentUser);
  const [usernameUpdate, setUsernameUpdate] = useState({
    username: user?.username || "",
  });
  const [nameUpdate, setNameUpdate] = useState({
    firstname: "Austen",
    lastname: "Turner",
  });

  function handleUsernameUpdate(e) {
    setUsernameUpdate({ ...usernameUpdate, [e.target.name]: e.target.value });
  }

  function handleNameUpdate(e) {
    setNameUpdate({ ...nameUpdate, [e.target.name]: e.target.value });
  }

  async function handleUsernameSubmit(e) {
    e.preventDefault();
    console.log(usernameUpdate);
  }

  async function handleNameSubmit(e) {
    e.preventDefault();
    console.log(nameUpdate);
  }

  return (
    <div className={styles.overviewContainer}>
      <h2 className="page-subheader">{`welcome, ${
        user.username || `user`
      }!`}</h2>
      <p className={styles.accountEmail}>
        email: <span>{user.email}</span>
      </p>
      <div className={styles.formContainer}>
        <CommonForm
          formControls={usernameUpdateControls}
          formData={usernameUpdate}
          setFormData={handleUsernameUpdate}
          onSubmit={handleUsernameSubmit}
          btnText={"update"}
          className="usernameInput"
        />
      </div>
      <div className={styles.formContainer}>
        <CommonForm
          formControls={nameUpdateControls}
          formData={nameUpdate}
          setFormData={handleNameUpdate}
          onSubmit={handleNameSubmit}
          btnText={"update"}
          className="nameInput"
        />
      </div>
    </div>
  );
}
