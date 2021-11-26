import React from 'react';
import history from 'history';

export interface AuthContextValue {
  isLoggedIn: (() => boolean) | boolean;
  /** If function then must check user and if role passed then must check user role to. */
  isAuthorized: ((role?: any) => boolean) | boolean;
  /** For LoggedInRoute */
  redirectTo: history.LocationDescriptor;
  /** For NotLoggedInRoute */
  notLoggedInRedirectTo: history.LocationDescriptor;
}

export default React.createContext<AuthContextValue>({
  isLoggedIn: false,
  isAuthorized: false,
  redirectTo: '',
  notLoggedInRedirectTo: '',
});
