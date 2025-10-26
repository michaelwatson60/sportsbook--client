import { useEffect } from 'react';
import { useState, useCallback, createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import {
  selectColors,
  selectTheme,
} from '../redux/reducers/configs/configs.slice';
import i18n from 'i18next';

export const ThemeContext = createContext({});

export const THEMES = {
  DARK: 'dark',
  PURPLE: 'purple',
  WHITE_BLUE: 'white-blue',
};

const { DARK, WHITE_BLUE } = THEMES;

const ThemeProvider = ({ children }) => {
  const serverTheme = useSelector(selectTheme);
  const serverColors = useSelector(selectColors);
  const [dir, setDir] = useState(i18n.dir());

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || serverColors || serverTheme || DARK,
  );

  const toggleMode = useCallback(() => {
    setTheme(prev => {
      const nextMode = prev === WHITE_BLUE ? serverTheme || DARK : WHITE_BLUE;
      localStorage.setItem('theme', nextMode);
      return nextMode;
    });
  }, [serverTheme]);

  useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', i18n.dir());
    setDir(i18n.dir());

    i18n.on('languageChanged', () => {
      document.documentElement.setAttribute('dir', i18n.dir());
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        mode: theme,
        toggleMode,
      }}>
      <StyledThemeProvider theme={{ mode: theme, dir }}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
