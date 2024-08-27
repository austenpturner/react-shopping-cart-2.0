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

    if (registerUser) {
      error = await handleUserRegister(email, password, userCredentials);
    } else {
      error = await handleUserLogin(email, password);
    }

    if (!error) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    } else {
      setErrorMessage(getErrorMessage(error));
    }
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
