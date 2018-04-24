import * as React from 'react';
import * as firebase from 'firebase';
import {Layout, Menu} from 'antd';
import {RouteComponentProps} from 'react-router';
import logoWhite from 'assets/logo-word-white.png';
import { LogoContainer, HeaderMenu } from 'app/components/dashboard';

const { Header, Sider, Content, Footer } = Layout;

interface Props extends RouteComponentProps<void> {
}

export default class Dashboard extends React.Component<Props> {
  headerMenuOnClick = (menuItem: {key: string}) => {
    const {history} = this.props;
    if(menuItem.key === 'logout') {
      firebase.auth().signOut()
        .then(function() {
          history.push("/");
        })
    }
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <LogoContainer>
            <img src={logoWhite} width={100}/>
          </LogoContainer>
          <HeaderMenu>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
              onClick={this.headerMenuOnClick}
            >
              <Menu.Item key="logout">Log out</Menu.Item>
            </Menu>
          </HeaderMenu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>

          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              Content
            </Content>
            <Footer style={{textAlign: "center"}}>
              Built by <a href="https://www.canner.io/">CannerIO</a>. License under Apache License 2.0
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
