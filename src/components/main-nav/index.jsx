import { useNavigate } from "react-router-dom";
import styles from "./main-nav.module.css";

export default function MainNav() {
  const navigate = useNavigate();
  return (
    <nav className={styles.mainNav}>
      <ul>
        <li onClick={() => navigate("/")}>Products</li>
        <li onClick={() => navigate("/shopping-cart")}>Shopping Cart</li>
      </ul>
    </nav>
  );
}
