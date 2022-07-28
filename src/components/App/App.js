import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "../store";
import classes from "./App.module.scss";
import logo from "../../img/logo.svg";

import TransferFilter from "../TransferFilter";
import ButtonsFilter from "../ButtonsFilter";
import Tickets from "../Tickets";

const App = () => {
  return (
    <Provider store={store}>
      <main className={classes.app}>
        <div className={classes["app-wrapper"]}>
          <img
            className={classes["app-logo"]}
            src={logo}
            alt="Aviasales Logo"
          ></img>
          <section className={classes["app-main"]}>
            <TransferFilter />
            <div className={classes["app-results"]}>
              <ButtonsFilter />
              <Tickets />
            </div>
          </section>
        </div>
      </main>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App;
