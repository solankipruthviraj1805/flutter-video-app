import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

export const Colors = {
  light: {
    background: '#F8F9FA',
    card: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    primary: '#E11D48',
    border: '#E5E7EB',
    chipBackground: '#E5E7EB',
    chipActive: '#111827',
    chipActiveText: '#FFFFFF',
  },
  dark: {
    background: '#0F172A',
    card: '#1E293B',
    textPrimary: '#F9FAFB',
    textSecondary: '#94A3B8',
    primary: '#F43F5E',
    border: '#334155',
    chipBackground: '#334155',
    chipActive: '#F43F5E',
    chipActiveText: '#FFFFFF',
  },
};

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
  theme: ThemeType;
  colors: typeof Colors.light;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: Colors[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
