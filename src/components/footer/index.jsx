import styles from "./footer.module.scss";
import { copyright, footerLinks } from "../../config/footer";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";

export default function Footer() {
  const navigate = useNavigate();
  const { state } = useContext(UIContext);

  return (
    <div className={`${styles.footer}`}>
      <ul>
        {footerLinks.map((link) => {
          return (
            <li
              key={link.id}
              onClick={() => navigate(link.link)}
              tabIndex={
                state.modal.isVisible || state.overlayVisible ? "-1" : "0"
              }
            >
              {link.name}
            </li>
          );
        })}
      </ul>
      <p>{copyright}</p>
    </div>
  );
}
