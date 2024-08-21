import { useNavigate } from "react-router-dom";
import styles from "./main-nav.module.css";
import auth from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/users-slice";

export default function MainNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogOut() {
    if (confirm("Are you sure you want to log out?")) {
      signOut(auth);
      navigate("/")
        .then(() => {
          dispatch(setUser(null));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <nav className={styles.mainNav}>
      <ul>
        <li onClick={() => navigate("/")}>Products</li>
        <li onClick={() => navigate("/shopping-cart")}>Shopping Cart</li>
        <li onClick={handleLogOut}>Log Out</li>
      </ul>
    </nav>
  );
}
