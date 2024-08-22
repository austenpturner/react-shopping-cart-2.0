import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/styles/styles.scss";
import { Provider } from "react-redux";
import store from "./store/index.js";
import UIProvider from "./context/uiContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UIProvider>
      <App />
    </UIProvider>
  </Provider>
);
