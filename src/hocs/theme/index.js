import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
// Hooks
import {useTheme} from 'hooks';

function withTheme(WrappedComponent) {
  const WithThemeComponent = ({forwardedRef, ...props}) => {
    const theme = useTheme();

    return <WrappedComponent ref={forwardedRef} theme={theme} {...props} />;
  };

  WithThemeComponent.displayName = `withTheme(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;
  hoistNonReactStatics(WithThemeComponent, WrappedComponent);
  // eslint-disable-next-line
  return React.forwardRef((props, ref) => (
    <WithThemeComponent forwardedRef={ref} {...props} />
  ));
}

export default withTheme;
