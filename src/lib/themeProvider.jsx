import React, { createContext, useState, useEffect } from 'react';
export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('luxo');
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  return (<ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>);
}