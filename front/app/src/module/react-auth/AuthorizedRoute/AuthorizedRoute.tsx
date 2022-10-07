import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router';
import { AuthorizationContext } from '../AuthorizationProvider';
import RouteRedirect from '../RouteRedirect';
import { RedirectProps } from '../LoggedInRoute';

export interface AuthorizedRouteProps extends RouteProps, RedirectProps {
  role: any;
}

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is authorized, else render `Redirect`.
 */
export default function AuthorizedRoute({
  role,
  redirectTo,
  ...routeProps
}: AuthorizedRouteProps): JSX.Element {
  const { isAuthorized, redirectTo: contextRedirectTo } = useContext(AuthorizationContext);
  const authorized = isAuthorized ? isAuthorized(role) : true;
  if (!authorized) {
    return <RouteRedirect {...routeProps} to={redirectTo || contextRedirectTo} />;
  }
  return <Route {...routeProps} />;
}
