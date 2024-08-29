import { useSelector } from "react-redux";
import Button from "../../components/button/index";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";

export default function AccountPage() {
  const navigate = useNavigate();
  const loading = useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const { uiDispatch } = useContext(UIContext);

  function handleLoginRedirect() {
    navigate("/login", { state: { from: "/account" } });
  }

  function handleShowLogoutConfirmation() {
    // console.log(product);
    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: null,
        type: "logoutConfirmation",
      },
    });
  }

  function getSubheaderText() {
    if (!user) {
      return `Please log in to access your account.`;
    } else {
      return `Welcome, ${user.username || `user`}!`;
    }
  }

  return (
    <div className="page-container account-page">
      <h1 className="page-header account-page-header">Account Details</h1>
      {loading ? (
        <p className="page-loading">Loading... </p>
      ) : (
        <h2 className="page-subheader">{getSubheaderText()}</h2>
      )}
      {user ? (
        <Button
          text={"logout"}
          type={"logout"}
          handleAction={handleShowLogoutConfirmation}
        />
      ) : (
        <Button
          text={"log in"}
          type={"login"}
          handleAction={handleLoginRedirect}
        />
      )}
    </div>
  );
}
