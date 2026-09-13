import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import App from "./App";
import "./index.css";

const lenis = new Lenis({
  lerp: 0.09,
  smoothWheel: true,
});
function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

declare global {
  interface Window {
    __lenis: Lenis;
  }
}
window.__lenis = lenis;