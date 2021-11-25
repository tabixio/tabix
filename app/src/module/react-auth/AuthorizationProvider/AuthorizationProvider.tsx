import React from 'react';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface Props {
  children: React.ReactNode;
}

/**
 * Provide isAuthorized function to all AuthorizedRoutes.
 */
export default function AuthorizationProvider({ children, ...rest }: Props & AuthContextValue) {
  return <AuthContext.Provider value={rest}>{children}</AuthContext.Provider>;
}
