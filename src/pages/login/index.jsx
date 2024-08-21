import { useDispatch } from "react-redux";
import Form from "../../components/form";
import { setUser } from "../../store/slices/users-slice";
import { loginFormControls } from "../../config/formConfig";
import { useState } from "react";
import auth from "../../firebase/firebaseConfig.js";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState(initialState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function loginOnSubmit(event) {
    event.preventDefault();
    setError("");
    const { email, password } = userCredentials;
    signInWithEmailAndPassword(auth, email, password);
    navigate("/").catch((error) => {
      setError(error);
      // OR get error.code and set up personalized messages
    });
  }

  function handlePasswordReset() {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert(`Email sent to ${email} with password reset instructions.`);
    // customize email under firebase site => authentication => templates
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }));
    } else {
      dispatch(setUser(null));
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  // console.log(auth);

  if (isLoading) {
    return (
      <div className="page">
        <p>Loading... </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Login</h1>
      <div>
        <Form
          formControls={loginFormControls}
          formData={userCredentials}
          setFormData={setUserCredentials}
          onSubmit={loginOnSubmit}
          btnText={"log in"}
        />
        {error ? <p>{error}</p> : null}
      </div>
      <button onClick={handlePasswordReset}>Forgot password?</button>
    </div>
  );
}
