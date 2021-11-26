import React from 'react';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface Props {
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
export default class Authorized extends React.Component<Props> {
  private renderChildren = ({ isAuthorized }: AuthContextValue) => {
    const { role, not, children } = this.props;
    const authorized = typeof isAuthorized === 'function' ? isAuthorized(role) : isAuthorized;
    return ((!not && authorized) || (not && !authorized)) && children;
  };

  render() {
    return <AuthContext.Consumer>{this.renderChildren}</AuthContext.Consumer>;
  }
}
