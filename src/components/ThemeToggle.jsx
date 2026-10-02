import { useState } from "react";

const KEY = "personal_link_hub_theme";
export function initTheme() {
  let t = "light";
  try {
    t = localStorage.getItem(KEY) ||
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch { /* ignore */ }
  document.documentElement.dataset.theme = t;
  return t;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
    setTheme(next);
  };
  return (
    <button type="button" className="icon-btn" onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
