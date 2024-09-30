import { useEffect, useState } from "react";
import CommonForm from "../../components/commonForm";
import { loginFormControls } from "../../config/formConfig";
import { registerFormControls } from "../../config/formConfig";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogin from "../../hooks/useLogin";
import useRegister from "../../hooks/useRegister";
import Button from "../../components/button";
import { getErrorMessage } from "../../util/getErrorMessage";
import useCartSync from "../../hooks/useCartSync";
import "./styles.scss";
import useFavoriteActions from "../../hooks/useFavoriteActions";
import { isStrongPassword } from "../../util/isStrongPassword";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function LoginPage() {
  const [registerUser, setRegisterUser] = useState(false);
  const [userCredentials, setUserCredentials] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useAuth();
  const handleUserLogin = useLogin();
  const handleUserRegister = useRegister();
  useCartSync();
  const { handleAddToFavorites } = useFavoriteActions();

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function switchRegisterUser() {
    setRegisterUser(!registerUser);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userCredentials;
    let error;
    let result;

    if (!isStrongPassword(password)) {
      setErrorMessage(
        "Password must be at least 6 characters and contain at least one letter and number."
      );
      return;
    }

    if (registerUser) {
      error = await handleUserRegister(email, password, userCredentials);
      if (error) {
        console.log(error);
        setErrorMessage(getErrorMessage(error, "register"));
        return;
      }
    } else {
      result = await handleUserLogin(email, password);
      if (!result || typeof result === "string") {
        console.log(result);
        setErrorMessage(getErrorMessage(result, "login"));
        return;
      }
    }

    const pendingFavorite = JSON.parse(localStorage.getItem(`pendingFavorite`));
    const loginUser = result;

    if (pendingFavorite) {
      await handleAddToFavorites(pendingFavorite, loginUser);
      localStorage.removeItem(`pendingFavorite`);
    }

    const redirectTo = location.state?.from || "/";
    navigate(redirectTo);
  }

  useEffect(() => {
    setErrorMessage(null);
  }, [registerUser]);

  const loginPageElements = (
    <div>
      {registerUser ? (
        <div className="form-container">
          <CommonForm
            formControls={registerFormControls}
            formData={userCredentials}
            setFormData={handleCredentials}
            onSubmit={handleSubmit}
            btnText={"submit"}
          />
        </div>
      ) : (
        <div className="form-container">
          <CommonForm
            formControls={loginFormControls}
            formData={userCredentials}
            setFormData={handleCredentials}
            onSubmit={handleSubmit}
            btnText={"submit"}
          />
        </div>
      )}
      <p className="login-page-error-message">
        {errorMessage ? errorMessage : ""}
      </p>
      <div
        className={!registerUser ? "register-btn-container" : "btn-container"}
      >
        {!registerUser ? (
          <>
            <p>{`Don't have an account?`}</p>
            <Button
              text={"register"}
              handleAction={switchRegisterUser}
              type={"register"}
            />
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <Button
              text={"log in"}
              handleAction={setRegisterUser}
              type={"login"}
            />
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="login-page-component">
      <h1 className="page-header">{`${
        registerUser ? "Register" : "Log In"
      }:`}</h1>
      {loading ? (
        <p className="page-loading">Loading... </p>
      ) : (
        loginPageElements
      )}
    </div>
  );
}
