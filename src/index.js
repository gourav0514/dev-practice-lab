import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./timer/app.js";
import App from "./country/app.js";
import "./country/style.css";

//For Timer
// const root = createRoot(document.getElementById("root"));

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

//For Country Game
const root = createRoot(document.getElementById("country"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
