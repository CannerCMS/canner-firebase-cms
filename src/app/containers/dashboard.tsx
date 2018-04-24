import * as React from 'react';
import * as firebase from 'firebase';
import {Layout, Menu} from 'antd';
import {RouteComponentProps} from 'react-router';
import {Link} from 'react-router-dom';
import {CMS} from '@canner/react-cms-core';
import logoWhite from 'assets/logo-word-white.png';
import schema from 'canner-schema';
import { LogoContainer, HeaderMenu } from 'app/components/dashboard';
import Focus from 'app/components/layouts/focus';
import Tabs from 'app/components/layouts/tabs';

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
    const {history} = this.props;

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
          <Sider width={200} style={{ background: '#001529', minHeight: "100vh" }}>
            <Menu theme="dark" mode="inline">
            {
              Object.keys(schema.cannerSchema).map(key => (
                <Menu.Item key={key}>
                  <Link to={`/dashboard/${key}`}>
                    {key.toLocaleUpperCase()}
                  </Link>
                </Menu.Item>
              ))
            }
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <CMS
                layouts={{Tabs, Focus}}
                history={history}
                schema={schema}
                baseUrl="/dashboard"
              />
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
