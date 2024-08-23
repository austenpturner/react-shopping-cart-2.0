import { Link, useNavigate } from "react-router-dom";
import styles from "./mainNav.module.scss";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout.js";
import Button from "../button/index.jsx";

export default function MainNav() {
  const loading = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.currentUser);
  const handleLogout = useLogout();

  function handleClick() {
    if (user && confirm("Are you sure you want to log out?")) {
      // console.log("log out requested");
      handleLogout();
    } else {
      navigate("/login");
    }
  }

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.navLinkList}>
        <li>
          <Link to={"/"}>Products</Link>
        </li>
        <li>
          <Link to={"cart"}>Cart</Link>
        </li>
        <li>
          <Link to={"account"}>Account</Link>
        </li>
        <li>
          {loading ? (
            <button></button>
          ) : (
            <Button
              handleAction={handleClick}
              text={user ? "Logout" : "Log in"}
              type={user ? "logout" : "login"}
            />
          )}
        </li>
      </ul>
    </nav>
  );
}
