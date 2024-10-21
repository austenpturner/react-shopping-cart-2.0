import { useSelector } from "react-redux";
import Button from "../../components/button/index";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import "./styles.scss";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import useWindowResize from "../../hooks/useWindowResize";
import { UIContext } from "../../context/uiContext";
import { views } from "../../config/accountViews";

export default function AccountPage() {
  const navigate = useNavigate();
  const loading = useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const { width } = useWindowResize();
  const { state, uiDispatch } = useContext(UIContext);

  const viewTypeRef = useRef(null);
  const viewListRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        state.accountViewListOpen &&
        viewListRef.current &&
        !viewListRef.current.contains(event.target) &&
        !viewTypeRef.current.contains(event.target) &&
        width < 768
      ) {
        uiDispatch({
          type: "ACCOUNT_VIEW_LIST_OPEN",
          payload: false,
        });
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [state.accountViewListOpen]);

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
      uiDispatch({
        type: "ACCOUNT_VIEW_LIST_OPEN",
        payload: false,
      });
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
      uiDispatch({
        type: "ACCOUNT_VIEW_LIST_OPEN",
        payload: false,
      });
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
      uiDispatch({
        type: "ACCOUNT_VIEW_LIST_OPEN",
        payload: true,
      });
    } else {
      uiDispatch({
        type: "ACCOUNT_VIEW_LIST_OPEN",
        payload: false,
      });
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
            onClick={() =>
              uiDispatch({
                type: "ACCOUNT_VIEW_LIST_OPEN",
                payload: !state.accountViewListOpen,
              })
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              uiDispatch({
                type: "ACCOUNT_VIEW_LIST_OPEN",
                payload: !state.accountViewListOpen,
              })
            }
            ref={viewTypeRef}
          >
            <span>{getCurrentViewType()}</span>
            {state.accountViewListOpen ? <FaCaretUp /> : <FaCaretDown />}
          </p>
          {state.accountViewListOpen ? (
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
      {loading ? <p className="page-loading">Loading... </p> : pageContent}
    </div>
  );
}
