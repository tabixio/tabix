import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router';
import { AuthorizationContext, AuthorizationProviderProps } from '../AuthorizationProvider';
import RouteRedirect from '../RouteRedirect';

export type RedirectProps = Partial<Pick<AuthorizationProviderProps, 'redirectTo'>>;

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is logged in, else render `Redirect`.
 */
export default function LoggedInRoute({
  redirectTo,
  ...props
}: RouteProps & RedirectProps): JSX.Element {
  const { isLoggedIn, redirectTo: contextRedirectTo } = useContext(AuthorizationContext);
  if (!isLoggedIn()) {
    return <RouteRedirect {...props} to={redirectTo || contextRedirectTo} />;
  }
  return <Route {...props} />;
}
