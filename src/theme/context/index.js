import React from 'react';
// Theme
import {theme} from 'theme';

const ThemeContext = React.createContext(theme);

const ThemeProvider = props => (
  <ThemeContext.Provider value={props.theme}>
    {props.children}
  </ThemeContext.Provider>
);

ThemeProvider.defaultProps = {
  theme,
};

export {ThemeContext, ThemeProvider};
