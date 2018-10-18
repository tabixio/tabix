import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { Flex } from 'reflexy';
import { Authorized } from '@vzh/react-auth';
import { routePaths } from 'routes';
import css from './NavBar.css';

interface Props extends RouteComponentProps<any> {}

class NavBar extends React.Component<Props> {
  private signOut = () => {
    const { history } = this.props;
    history.push(routePaths.signOut.path);
  };

  render() {
    // @todo : need move to menu
    return (
      <Flex component={Layout.Header} alignItems="center">
        <Link to={routePaths.home.path} className={css.brand} />

        <Flex grow justifyContent="flex-end">
          <Authorized>
            <Button
              type="primary"
              icon="logout"
              size="large"
              className={css.item}
              onClick={this.signOut}
            >
              Sign Out
            </Button>
            {/* <Menu theme="dark" mode="horizontal" onClick={this.signOut}>
              <Menu.Item>
                <Icon type="logout" theme="outlined" />
                <span>Sign Out</span>
              </Menu.Item>
            </Menu> */}
          </Authorized>
          {/* <Flex alignItems="center" component={Link} to={routePaths.signOut.path} className={css['item']}>
          <Icon type="logout" theme="outlined" />
          <div>Sign Out</div>
        </Flex> */}
        </Flex>
      </Flex>
    );
  }
}

export default withRouter(NavBar);
