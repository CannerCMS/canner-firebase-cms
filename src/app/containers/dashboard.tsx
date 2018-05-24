import * as React from 'react';
import * as firebase from 'firebase';
import * as connector from 'canner-connector';
import * as resolver from 'canner-resolver';
import {Layout, Menu, Modal, Table} from 'antd';
import {RouteComponentProps} from 'react-router';
import {Link} from 'react-router-dom';
import {CMS} from 'canner';
import logoWhite from 'assets/logo-word-white.png';
import schema from 'canner-schema';
import { LogoContainer, HeaderMenu } from 'app/components/dashboard';
import Focus from 'app/components/layouts/focus';
import Tabs from 'app/components/layouts/tabs';
import firConfig from 'app/config/firebase';

const { Header, Sider, Content, Footer } = Layout;
interface Props extends RouteComponentProps<void> {
}

export default class Dashboard extends React.Component<Props> {
  state = {
    visible: false
  }

  componentWillMount() {
    const {history, location} = this.props;

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        history.push({
          pathname: "/login",
          state: { from: location }
        })
      }
    });
  }

  headerMenuOnClick = (menuItem: {key: string}) => {
    const {history} = this.props;
    if(menuItem.key === 'logout') {
      firebase.auth().signOut()
        .then(function() {
          history.push("/");
        })
    } else if(menuItem.key === "overview") (
      this.setState({
        visible: true
      })
    )
  }

  hideOverview = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const {history} = this.props;
    const firstKey = Object.keys(schema.cannerSchema)[0];
    const columns = [{
      title: 'Project ID',
      dataIndex: 'projectId',
      key: 'projectId',
    }, {
      title: 'Auth Domain',
      dataIndex: 'authDomain',
      key: 'authDomain',
    }, {
      title: 'Storage Bucket',
      dataIndex: 'storageBucket',
      key: 'storageBucket',
    }, {
      title: 'Database URL',
      dataIndex: 'databaseURL',
      key: 'databaseURL',
      render: ((text: string) => <a href={text} target="_blank">{text}</a>),
    }];
    return (
      <>
        <Layout>
          <Header className="header" style={{padding: "0 20px"}}>
            <LogoContainer>
              <img src={logoWhite} width={150}/>
            </LogoContainer>
            <HeaderMenu>
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
                selectedKeys={[]}
                onClick={this.headerMenuOnClick}
              >
                <Menu.Item key="overview">Overview</Menu.Item>
                <Menu.Item key="logout">Log out</Menu.Item>
              </Menu>
            </HeaderMenu>
          </Header>
          <Layout>
            <Sider width={200} style={{ minHeight: "100vh" }}>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[firstKey]}>
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
                  connector={connector.default.connector}
                  connectors={connector.default.connectors}
                  resolver={resolver.default}
                  baseUrl="/dashboard"
                />
              </Content>
              <Footer style={{textAlign: "center"}}>
                Powered by <a href="https://www.canner.io/">CannerIO</a>. License under Apache License 2.0
              </Footer>
            </Layout>
          </Layout>
        </Layout>
        <Modal
          width={"80%"}
          title="Overview Firebase"
          visible={this.state.visible}
          onCancel={this.hideOverview}
          footer={null}
        >
          <Table columns={columns} dataSource={[firConfig]} pagination={false} />
        </Modal>
      </>
    );
  }
}
