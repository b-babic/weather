import React from 'react';
import FallbackComponent from './fallback';

class ErrorBoundary extends React.Component {
  state = {error: null, hasError: false};

  static defaultProps = {
    FallbackComponent: FallbackComponent,
  };

  static getDerivedStateFromError(error) {
    return {error, hasError: true};
  }

  componentDidCatch(error, info) {
    if (typeof this.props.onError === 'function') {
      this.props.onError.call(this, error, info.componentStack);
    }

    if (error instanceof Promise) {
      // we have a promise so lets update our state
      this.setState({isLoading: true});
      // once the promise has resolved we can update our state again and grab the data
      error.then(data => this.setState({error}));
    }
  }

  resetError = () => {
    this.setState({error: null, hasError: false});
  };

  render() {
    const {FallbackComponent} = this.props;

    return this.state.hasError ? (
      <FallbackComponent
        error={this.state.error}
        resetError={this.resetError}
      />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
