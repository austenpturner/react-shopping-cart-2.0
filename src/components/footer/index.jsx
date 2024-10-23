import styles from "./footer.module.scss";
import { copyright, footerLinks } from "../../config/footer";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import { socials } from "../../config/socials";
import Button from "../button";

export default function Footer() {
  const navigate = useNavigate();
  const { state, uiDispatch } = useContext(UIContext);

  function handleAccountNavigate() {
    uiDispatch({
      type: "UPDATE_ACCOUNT_VIEW_TYPE",
      payload: "overview",
    });
    sessionStorage.setItem("currentAccountViewType", "overview");
    navigate("/account");
  }

  return (
    <footer>
      <div className={styles.socials}>
        <ul>
          {socials.map((social) => {
            return (
              <li key={social.id}>
                <Button
                  icon={<social.icon />}
                  type="social"
                  // handleAction={() => navigate(social.link)}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.menu}>
        <ul>
          {footerLinks.map((link) => {
            return (
              <li
                key={link.id}
                onClick={
                  link.name === "account"
                    ? handleAccountNavigate
                    : () => navigate(link.link)
                }
                tabIndex={
                  state.modal.isVisible ||
                  state.overlayVisible ||
                  state.accountViewListOpen
                    ? "-1"
                    : "0"
                }
              >
                {link.name}
              </li>
            );
          })}
        </ul>
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
