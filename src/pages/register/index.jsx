import Form from "../../components/form";
import { registerFormControls } from "../../config/formConfig";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/users-slice";

const initialState = {
  username: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState(initialState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleRegisterFormSubmit(event) {
    event.preventDefault();
    setError("");
    const { email, password } = userCredentials;

    createUserWithEmailAndPassword(auth, email, password);
    navigate("/").catch((error) => {
      setError(error.message);
      // OR get error.code and set up personalized messages
    });
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

  // console.log(userCredentials);

  if (isLoading) {
    return (
      <div className="page">
        <p>Loading... </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Register</h1>
      <div>
        <Form
          formControls={registerFormControls}
          formData={userCredentials}
          setFormData={setUserCredentials}
          onSubmit={handleRegisterFormSubmit}
          btnText={"sign up"}
        />
        {error ? <p>{error}</p> : null}
      </div>
      <p>
        Already have an account?
        <button onClick={() => navigate("/login")}>Log in</button>
      </p>
    </div>
  );
}
