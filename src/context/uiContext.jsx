import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

export const UIContext = createContext(null);

function uiReducer(state, action) {
  switch (action.type) {
    case "SET_BUTTON_TEXT":
      return {
        ...state,
        buttonText: {
          ...state.buttonText,
          [action.payload.id]: action.payload.text,
        },
      };
    case "SET_BUTTON_INITIAL_STATE":
      return {
        ...state,
        buttonText: initialState.buttonText,
      };
    case "TOGGLE_MOBILE_NAV":
      return {
        ...state,
        openMobileNav: action.payload,
      };
    case "TOGGLE_OVERLAY":
      return {
        ...state,
        overlayVisible: action.payload,
      };
    case "SHOW_MODAL":
      return {
        ...state,
        modal: {
          isVisible: true,
          content: action.payload.content,
          type: action.payload.type,
        },
        overlayVisible: true,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        modal: {
          isVisible: false,
          content: null,
          type: null,
        },
        overlayVisible: false,
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "SEARCH_SUBMITTED":
      return {
        ...state,
        search: {
          ...state.search,
          searchSubmitted: action.payload.searchSubmitted,
          searchInProgress: action.payload.searchInProgress,
          searchResults: action.payload.searchResults,
        },
      };
    default:
      return state;
  }
}

const initialState = {
  buttonText: {},
  openMobileNav: false,
  overlayVisible: false,
  modal: {
    isVisible: false,
    content: null,
    type: null,
  },
  selectedCategory: null,
  search: {
    searchSubmitted: "",
    searchInProgress: false,
    searchResults: [],
  },
};

export default function UIProvider({ children }) {
  const [state, uiDispatch] = useReducer(uiReducer, initialState);

  useEffect(() => {
    if (state.overlayVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [state.overlayVisible]);

  return (
    <UIContext.Provider value={{ state, uiDispatch }}>
      {children}
    </UIContext.Provider>
  );
}

UIProvider.propTypes = {
  children: PropTypes.object,
};
