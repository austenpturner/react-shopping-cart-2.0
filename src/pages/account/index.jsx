import { useSelector } from "react-redux";
import Button from "../../components/button/index";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles.scss";
import AccountOverview from "../../components/accountOverview/accountOverview";
import FavoritesList from "../../components/favoritesList/favoritesList";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import useWindowResize from "../../hooks/useWindowResize";

export default function AccountPage() {
  const navigate = useNavigate();
  const loading = useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const [currentView, setCurrentView] = useState(<AccountOverview />);
  const [currentViewType, setCurrentViewType] = useState("overview");
  const [showViewTypes, setShowViewTypes] = useState(false);
  const { width } = useWindowResize();

  function handleLoginRedirect() {
    navigate("/login", { state: { from: "/account" } });
  }

  function handleChangeView(viewType) {
    setCurrentViewType(viewType);
    if (width < 768) {
      setShowViewTypes(false);
    }
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

  useEffect(() => {
    if (width >= 768) {
      setShowViewTypes(true);
    } else {
      setShowViewTypes(false);
    }
  }, [width]);

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
            <p
              className="current-view-type"
              onClick={() => setShowViewTypes(!showViewTypes)}
            >
              <span>{currentViewType}</span>
              {showViewTypes ? <FaCaretUp /> : <FaCaretDown />}
            </p>
            {showViewTypes ? (
              <ul className="view-list">
                {viewTypes.map((type, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleChangeView(type)}
                      className={
                        currentViewType === type && width >= 768
                          ? "current"
                          : ""
                      }
                    >
                      {type}
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
            <div className="current-view">{currentView}</div>
          </div>
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
