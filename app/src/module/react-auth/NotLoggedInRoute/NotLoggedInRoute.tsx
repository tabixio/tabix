import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router';
import { AuthorizationContext } from '../AuthorizationProvider';
import RouteRedirect from '../RouteRedirect';
import { RedirectProps } from '../LoggedInRoute';

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is not logged in, else render `Redirect`.
 */
export default function NotLoggedInRoute({
  redirectTo,
  ...props
}: RouteProps & RedirectProps): JSX.Element {
  const { isLoggedIn, notLoggedInRedirectTo } = useContext(AuthorizationContext);

  if (isLoggedIn()) {
    return <RouteRedirect {...props} to={redirectTo || notLoggedInRedirectTo} />;
  }
  return <Route {...props} />;
}
