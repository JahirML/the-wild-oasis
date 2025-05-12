import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  function toggleDarkMode() {
    setIsDark((dark) => !dark);
  }

  useEffect(
    function () {
      if (isDark) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light");
      }
    },
    [isDark]
  );

  return (
    <DarkModeContext.Provider
      value={{
        isDark,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("Darkmode context was used outside of dark mode provider");

  return context;
}

export { DarkModeProvider, useDarkMode };
