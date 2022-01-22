import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router } from "react-router-dom";

import "typeface-roboto";

declare global {
  interface Window {
    electron: any;
  }
}
export {};

ReactDOM.render(
  <div className="rounded-full" style={{ borderRadius: "100px" }}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
