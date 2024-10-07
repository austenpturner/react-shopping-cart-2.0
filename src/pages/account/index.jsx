import { useSelector } from "react-redux";
import Button from "../../components/button/index";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import AccountOverview from "../../components/accountOverview/accountOverview";
import FavoritesList from "../../components/favoritesList/favoritesList";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import useWindowResize from "../../hooks/useWindowResize";
import PasswordChange from "../../components/passwordChange/passwordChange";
import Orders from "../../components/orders/orders";
import Reviews from "../../components/reviews/reviews";
import { UIContext } from "../../context/uiContext";

export default function AccountPage() {
  const navigate = useNavigate();
  const loading = useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const [currentViewType, setCurrentViewType] = useState(() => {
    return sessionStorage.getItem("currentViewType") || "overview";
  });
  const [showViewTypes, setShowViewTypes] = useState(false);
  const { width } = useWindowResize();
  const { state } = useContext(UIContext);

  function handleLoginRedirect() {
    navigate("/login", { state: { from: "/account" } });
  }

  function handleChangeView(name) {
    setCurrentViewType(name);
    sessionStorage.setItem("currentViewType", name);
    if (width < 768) {
      setShowViewTypes(false);
    }
  }

  useEffect(() => {
    if (width >= 768) {
      setShowViewTypes(true);
    } else {
      setShowViewTypes(false);
    }
  }, [width]);

  const views = [
    {
      name: "overview",
      component: <AccountOverview />,
    },
    {
      name: "password",
      component: <PasswordChange />,
    },
    {
      name: "orders",
      component: <Orders />,
    },
    {
      name: "review",
      component: <Reviews />,
    },
    {
      name: "favorites",
      component: <FavoritesList />,
    },
  ];

  const currentView = views.find(
    (view) => view.name === currentViewType
  )?.component;

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
              tabIndex={state.overlayVisible ? "-1" : "0"}
              onClick={() => setShowViewTypes(!showViewTypes)}
              onKeyDown={(e) =>
                e.key === "Enter" && setShowViewTypes(!showViewTypes)
              }
            >
              <span>{currentViewType}</span>
              {showViewTypes ? <FaCaretUp /> : <FaCaretDown />}
            </p>
            {showViewTypes ? (
              <ul className="view-list">
                {views.map((view, index) => {
                  return (
                    <li
                      key={index}
                      tabIndex={state.overlayVisible ? "-1" : "0"}
                      onClick={() => handleChangeView(view.name)}
                      className={
                        currentViewType === view.name && width >= 768
                          ? "current"
                          : ""
                      }
                      onKeyDown={(e) => {
                        e.key === "Enter" && handleChangeView(view.name);
                      }}
                    >
                      {view.name}
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
