import React, { useContext } from 'react';
import { AuthorizationContext } from '../AuthorizationProvider';

/**
 * Used with `AuthorizationProvider`.
 * Render `children` if user is not logged in, else render nothing.
 */
export default function NotLoggedIn({ children }: React.PropsWithChildren<{}>): JSX.Element | null {
  const { isLoggedIn } = useContext(AuthorizationContext);
  const result = isLoggedIn() ? null : (children as JSX.Element);
  if (result === undefined) return null;
  return result;
}
