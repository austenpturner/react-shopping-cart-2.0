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
    case "TOGGLE_OVERLAY":
      return {
        ...state,
        overlayVisible: action.payload,
      };
    default:
      return state;
  }
}

const initialState = { buttonText: {}, overlayVisible: false };

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
