import React from 'react';
import ErrorMessage from 'components/ErrorMessage';
import rollbar from 'utils/rollbar';

const MISSING_ERROR = 'Error was swallowed during propagation.';

export const withErrorBoundary = <BaseProps extends object>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  type HocProps = object;
  type HocState = {
    readonly error: Error | null | undefined;
  };

  return class Hoc extends React.Component<HocProps, HocState> {
    // eslint-disable-next-line react/static-property-placement
    static displayName = `withErrorBoundary(${BaseComponent.name})`;

    static readonly WrappedComponent = BaseComponent;

    // eslint-disable-next-line react/state-in-constructor
    readonly state: HocState = {
      error: undefined,
    };

    componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) });
      this.logError(error, info);
    }

    // eslint-disable-next-line class-methods-use-this
    logError = (error: Error | null, info: object) => {
      rollbar.log(error || 'Error', info);
    };

    render() {
      const { children, ...restProps } = this.props;
      const { error } = this.state;

      if (error) {
        return <BaseComponent {...(restProps as BaseProps)} />;
      }

      return children;
    }
  };
};

export const ErrorMessageWithErrorBoundary = withErrorBoundary(ErrorMessage);
