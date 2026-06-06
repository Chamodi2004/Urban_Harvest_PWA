import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import { registerSW } from "virtual:pwa-register";
import { precacheStaticImages } from "./utils/staticAssets";

const cacheImagesWhenOnline = () => {
  if (navigator.onLine) {
    precacheStaticImages();
  }
};

registerSW({
  immediate: true,
  onRegisteredSW() {
    cacheImagesWhenOnline();
  },
});

cacheImagesWhenOnline();
window.addEventListener("online", cacheImagesWhenOnline);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);