import { useNavigate } from "react-router-dom";
import MainNav from "../mainNav";
import styles from "./header.module.scss";

export default function MainHeader() {
  const navigate = useNavigate();
  return (
    <header className={styles.mainHeader}>
      <h4 onClick={() => navigate("/")}>React Cart App</h4>
      <MainNav />
    </header>
  );
}
