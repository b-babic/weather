import React from 'react';

import {ThemeContext} from 'theme/context';

function useTheme() {
  const theme = React.useContext(ThemeContext);

  return theme;
}

export default useTheme;
