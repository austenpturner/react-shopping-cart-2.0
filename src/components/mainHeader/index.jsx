import MainNav from "../mainNav";
import styles from "./header.module.scss";

export default function MainHeader() {
  return (
    <header className={styles.mainHeader}>
      <h4>React Cart App</h4>
      <MainNav />
    </header>
  );
}
