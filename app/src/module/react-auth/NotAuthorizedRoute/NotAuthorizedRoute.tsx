import React from 'react';
import { Route, RouteProps, Redirect, withRouter, RouteComponentProps } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface Props {
  role: any;
}

const AuthRoute = withRouter(
  ({
    isAuthorized,
    notLoggedInRedirectTo,
    location,
    routeProps,
    role,
  }: AuthContextValue & RouteComponentProps & Props & { routeProps: RouteProps }) => {
    const authorized = typeof isAuthorized === 'function' ? isAuthorized(role) : isAuthorized;

    if (authorized) {
      const { component, render, children, ...rest } = routeProps;
      const to =
        typeof notLoggedInRedirectTo === 'string'
          ? { pathname: notLoggedInRedirectTo, state: location.state }
          : notLoggedInRedirectTo;

      return (
        <Route {...rest}>
          <Redirect to={to} />
        </Route>
      );
    }

    return <Route {...routeProps} />;
  }
);

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is not authorized, else render `Redirect`.
 */
export default class NotAuthorizedRoute extends React.Component<Props & RouteProps> {
  private renderRoute = (context: AuthContextValue) => {
    const { role, ...routeProps } = this.props;
    return <AuthRoute {...context} routeProps={routeProps} role={role} />;
  };

  render() {
    return <AuthContext.Consumer>{this.renderRoute}</AuthContext.Consumer>;
  }
}
