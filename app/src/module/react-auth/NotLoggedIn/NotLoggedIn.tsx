import React from 'react';
import AuthContext, { AuthContextValue } from '../AuthContext';

/**
 * Used with `AuthorizationProvider`.
 * Render `children` if user is not logged in, else render nothing.
 */
export default class NotLoggedIn extends React.Component {
  private renderChildren = ({ isLoggedIn }: AuthContextValue) => {
    const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;
    return loggedIn ? null : this.props.children;
  };

  render() {
    return <AuthContext.Consumer>{this.renderChildren}</AuthContext.Consumer>;
  }
}
