
import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [theme, setThemeState] = useState<Theme>("dark");

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("preferredTheme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("preferredTheme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
