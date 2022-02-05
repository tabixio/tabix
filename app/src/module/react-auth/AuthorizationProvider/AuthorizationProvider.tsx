import React from 'react';
import history from 'history';

export interface AuthorizationProviderProps {
  isLoggedIn: () => boolean;
  /** Function that should check user and if role provided then must check user role to. */
  isAuthorized?: (role?: any) => boolean;
  /** For LoggedInRoute */
  redirectTo: history.LocationDescriptor;
  /** For NotLoggedInRoute */
  notLoggedInRedirectTo: history.LocationDescriptor;
}

export const AuthorizationContext = React.createContext<AuthorizationProviderProps>({
  isLoggedIn: () => true,
  isAuthorized: () => true,
  redirectTo: '',
  notLoggedInRedirectTo: '',
});

/**
 * Provide isAuthorized function to all AuthorizedRoutes.
 */
export default function AuthorizationProvider({
  children,
  ...rest
}: React.PropsWithChildren<AuthorizationProviderProps>): JSX.Element {
  return <AuthorizationContext.Provider value={rest}>{children}</AuthorizationContext.Provider>;
}
