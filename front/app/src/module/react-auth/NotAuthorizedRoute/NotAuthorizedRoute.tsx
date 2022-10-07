import React, { useContext } from 'react';
import { Route } from 'react-router';
import { AuthorizationContext } from '../AuthorizationProvider';
import RouteRedirect from '../RouteRedirect';
import { AuthorizedRouteProps } from '../AuthorizedRoute';

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is not authorized, else render `Redirect`.
 */
export default function NotAuthorizedRoute({
  role,
  redirectTo,
  ...routeProps
}: AuthorizedRouteProps): JSX.Element {
  const { isAuthorized, notLoggedInRedirectTo } = useContext(AuthorizationContext);
  const authorized = isAuthorized ? isAuthorized(role) : true;
  if (authorized) {
    return <RouteRedirect {...routeProps} to={redirectTo || notLoggedInRedirectTo} />;
  }
  return <Route {...routeProps} />;
}
