// src/main.jsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // ✅ Global styles
import ShopContextProvider from "./Components/Context/ShopContext";

createRoot(document.getElementById("root")).render(
  <ShopContextProvider>
     <App />
  </ShopContextProvider>
 
);
