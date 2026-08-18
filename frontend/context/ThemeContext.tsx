import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const lightTheme = {
  background: '#F3F4F6',
  card: '#fff',
  text: '#111',
  textSecondary: '#555',
  border: '#EFEFEF',
  icon: '#333'
};

export const darkTheme = {
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  border: '#2A2A2A',
  icon: '#DDDDDD'
};

const ThemeContext = createContext({
  isDark: false,
  colors: lightTheme,
  toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('darkMode').then(v => {
      if (v === 'true') setIsDark(true);
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    AsyncStorage.setItem('darkMode', String(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ isDark, colors: isDark ? darkTheme : lightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
