import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./assets/global.style";
import Router from "./routes";
import "./assets/fonts.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router />
        <GlobalStyle />
    </React.StrictMode>,
);

reportWebVitals();
