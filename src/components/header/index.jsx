import MainNav from "../main-nav";
import styles from "./header.module.css";

export default function MainHeader() {
  return (
    <header className={styles.mainHeader}>
      <h4>React Shopping Cart App</h4>
      <MainNav />
    </header>
  );
}
