import { useSelector } from "react-redux";
import Button from "../../components/button/index";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UIContext } from "../../context/uiContext";
import "./styles.scss";
import AccountOverview from "../../components/accountOverview/accountOverview";
import FavoritesList from "../../components/favoritesList/favoritesList";

export default function AccountPage() {
  const navigate = useNavigate();
  const loading = useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const { uiDispatch } = useContext(UIContext);
  const [currentView, setCurrentView] = useState(<AccountOverview />);

  function handleLoginRedirect() {
    navigate("/login", { state: { from: "/account" } });
  }

  function handleShowLogoutConfirmation() {
    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: null,
        type: "logoutConfirmation",
      },
    });
  }

  function handleChangeView(viewType) {
    switch (viewType) {
      case "overview":
        setCurrentView(<AccountOverview />);
        break;
      case "favorites":
        setCurrentView(<FavoritesList />);
        break;
      default:
        setCurrentView(<AccountOverview />);
    }
  }

  const viewTypes = ["overview", "password", "orders", "reviews", "favorites"];

  const pageContent = (
    <div>
      {!user ? (
        <div>
          <p>Please log in to access your account.</p>
          <Button
            text={"log in"}
            type={"login"}
            handleAction={handleLoginRedirect}
          />
        </div>
      ) : (
        <div className="page-content">
          <div className="view-container">
            <ul className="view-list">
              {viewTypes.map((type, index) => {
                return (
                  <li key={index} onClick={() => handleChangeView(type)}>
                    {type}
                  </li>
                );
              })}
            </ul>
            <div className="current-view">{currentView}</div>
          </div>
          {/* <Button
            text={"sign out"}
            type={"logout"}
            handleAction={handleShowLogoutConfirmation}
          /> */}
        </div>
      )}
    </div>
  );

  return (
    <div className="page-container account-page">
      <h1 className="page-header account-page-header">Account Details</h1>
      {loading ? <p className="page-loading">Loading... </p> : pageContent}
    </div>
  );
}
