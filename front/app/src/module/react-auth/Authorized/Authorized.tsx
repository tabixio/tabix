import React, { useContext } from 'react';
import { AuthorizationContext } from '../AuthorizationProvider';

export interface AuthorizedProps {
  role?: any;
  /**
   * Invert result from AuthorizationProvider.isAuthorized for render children.
   * Example: `not role={ANONYMOUS}` - render children if user not ANONYMOUS.
   */
  not?: boolean;
}

/**
 * Used with `AuthorizationProvider`.
 * Render `children` if user is logged in and authorized, else render nothing.
 */
export default function Authorized({
  role,
  not,
  children,
}: React.PropsWithChildren<AuthorizedProps>): JSX.Element | null {
  const { isAuthorized } = useContext(AuthorizationContext);
  const authorized = isAuthorized ? isAuthorized(role) : true;
  const result = (!not && authorized) || (not && !authorized) ? (children as JSX.Element) : null;
  if (result === undefined) return null;
  return result;
}
