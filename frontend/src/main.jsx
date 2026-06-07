import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import { registerSW } from "virtual:pwa-register";
import { precacheStaticImages } from "./utils/staticAssets";

const runWhenIdle = (callback) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 4000 });
  } else {
    window.setTimeout(callback, 2000);
  }
};

const setupOfflineAssets = () => {
  if (navigator.onLine) {
    precacheStaticImages();
  }
};

registerSW({
  immediate: false,
  onRegisteredSW() {
    runWhenIdle(setupOfflineAssets);
  },
});

window.addEventListener("load", () => {
  runWhenIdle(setupOfflineAssets);
});

window.addEventListener("online", setupOfflineAssets);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
