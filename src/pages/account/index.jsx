import { useSelector } from "react-redux";
import Button from "../../components/button/index";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import useWindowResize from "../../hooks/useWindowResize";
import { UIContext } from "../../context/uiContext";
import { views } from "../../config/accountViews";

export default function AccountPage() {
  const navigate = useNavigate();
  const loading = useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const [showViewTypes, setShowViewTypes] = useState(false);
  const { width } = useWindowResize();
  const { state, uiDispatch } = useContext(UIContext);

  const viewTypeRef = useRef(null);
  const viewListRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        showViewTypes &&
        viewListRef.current &&
        !viewListRef.current.contains(event.target) &&
        !viewTypeRef.current.contains(event.target)
      ) {
        setShowViewTypes(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showViewTypes]);

  function handleLoginRedirect() {
    navigate("/login", { state: { from: "/account" } });
  }

  function handleChangeView(name) {
    uiDispatch({
      type: "UPDATE_ACCOUNT_VIEW_TYPE",
      payload: name,
    });
    sessionStorage.setItem("currentAccountViewType", name);
    if (width < 768) {
      setShowViewTypes(false);
    }
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

  function handleClickLogInOutBtn() {
    if (width < 768) {
      setShowViewTypes(false);
    }
    if (user) {
      handleShowLogoutConfirmation();
      uiDispatch({ type: "TOGGLE_MOBILE_NAV", payload: false });
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (width >= 768) {
      setShowViewTypes(true);
    } else {
      setShowViewTypes(false);
    }
  }, [width]);

  function getViewComponent(viewType) {
    const CurrentView = views.find((view) => view.name === viewType)?.component;
    return <CurrentView />;
  }

  function getCurrentView() {
    const savedView = sessionStorage.getItem("currentAccountViewType");
    if (savedView) {
      return getViewComponent(savedView);
    } else {
      return getViewComponent(state.currentAccountViewType);
    }
  }

  function getCurrentViewType() {
    const savedViewType = sessionStorage.getItem("currentAccountViewType");
    if (savedViewType) {
      return savedViewType;
    } else {
      return state.currentAccountViewType;
    }
  }

  const pageContent = (
    <>
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
        <div className="view-container">
          <p
            className="current-view-type"
            tabIndex={state.overlayVisible ? "-1" : "0"}
            onClick={() => setShowViewTypes(!showViewTypes)}
            onKeyDown={(e) =>
              e.key === "Enter" && setShowViewTypes(!showViewTypes)
            }
            ref={viewTypeRef}
          >
            <span>{getCurrentViewType()}</span>
            {showViewTypes ? <FaCaretUp /> : <FaCaretDown />}
          </p>
          {showViewTypes ? (
            <ul className="view-list" ref={viewListRef}>
              {views.map((view, index) => {
                return (
                  <li
                    key={index}
                    tabIndex={state.overlayVisible ? "-1" : "0"}
                    onClick={() => handleChangeView(view.name)}
                    className={
                      getCurrentViewType() === view.name && width >= 768
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
              <li>
                {loading ? (
                  <button></button>
                ) : (
                  <Button
                    handleAction={handleClickLogInOutBtn}
                    text={"sign out"}
                    type={"logout"}
                  />
                )}
              </li>
            </ul>
          ) : (
            ""
          )}
          <div className="current-view">{getCurrentView()}</div>
        </div>
      )}
    </>
  );

  return (
    <div className="page-container account-page">
      <h1 className="page-header account-page-header">Account Details</h1>
      {loading ? <p className="page-loading">Loading... </p> : pageContent}
    </div>
  );
}
