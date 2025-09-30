import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // make sure you have index.css (optional for styling)

// Mount the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Register Service Worker for offline/PWA support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(reg => {
        console.log("✅ Service Worker registered:", reg);
      })
      .catch(err => {
        console.log("❌ Service Worker registration failed:", err);
      });
  });
}