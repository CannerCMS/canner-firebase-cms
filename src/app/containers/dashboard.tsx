import * as React from 'react';
import * as firebase from 'firebase';
import * as connector from 'canner-connector';
import * as resolver from 'canner-resolver';
import styled from 'styled-components';
import {Layout, Menu, Modal, Table, Badge, Avatar, Icon, Spin} from 'antd';
import {RouteComponentProps} from 'react-router';
import {CMS} from 'canner';
import logoWhite from 'assets/logo-word-white.png';
import schema from 'canner-schema';
import { LogoContainer, HeaderMenu } from 'app/components/dashboard';
import Focus from 'app/components/layouts/focus';
import Tabs from 'app/components/layouts/tabs';
import firConfig from 'app/config/firebase';
const confirm = Modal.confirm;
const MenuText = styled.span`
  color: rgba(255, 255, 255, .65);
  &:hover {
    color: #fff;
  }
`;

const UserName = styled.span`
  margin-left: 8px;
`

const AvatarWithIcon = styled(Avatar)`
  .anticon {
    margin-right: 0 !important;
  }
`

const { Header, Sider, Content, Footer } = Layout;
interface Props extends RouteComponentProps<void> {
}

export default class Dashboard extends React.Component<Props> {
  private cms: typeof CMS;
  state = {
    visible: false,
    dataChanged: {},
    user: null,
    deploying: false
  }

  componentWillMount() {
    const {history, location} = this.props;

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        history.push({
          pathname: "/login",
          state: { from: location }
        })
      } else {
        this.setState({
          user: user as any
        });
      }
    });
  }

  headerMenuOnClick = (menuItem: {key: string}) => {
    const {history} = this.props;
    if(menuItem.key === 'logout') {
      firebase.auth().signOut()
        .then(function() {
          history.push("/");
        });
    } else if(menuItem.key === "overview") {
      this.setState({
        visible: true
      });
    } else if (menuItem.key === 'deploy') {
      this.deploy();
    }
  }

  siderMenuOnClick = (menuItem: {key: string}) => {
    const {history} = this.props;
    const {dataChanged} = this.state;
    const {key} = menuItem;
    if (dataChanged && Object.keys(dataChanged).length > 0) {
      confirm({
        title: 'Do you want to reset the all changes?',
        content: 'Leaving without deployment will reset all changes.',
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => {
          return new Promise((resolve, reject) => {
            setTimeout(resolve, 600);
          }).then(this.reset)
            .then(() => {
              history.push(`/dashboard/${key}`);
            });
        },
        onCancel: () => {
        },
      });
    } else {
      history.push(`/dashboard/${key}`);
    }
  }

  hideOverview = () => {
    this.setState({
      visible: false,
    });
  }

  dataDidChange = (dataChanged: object) => {
    console.log(dataChanged);
    this.setState({
      dataChanged
    });
  }

  deploy = () => {
    if (this.cms) {
      this.setState({
        deploying: true
      });
      return this.cms.deploy()
        .then(() => {
          setTimeout(() => {
            this.setState({
              deploying: false
            });
          }, 600)
        });
    }
  }

  reset = () => {
    if (this.cms) {
      return this.cms.reset();
    }
    return Promise.resolve();
  }

  render() {
    const {history} = this.props;
    const {dataChanged, user, deploying} = this.state;
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
    const hasChanged = dataChanged && Object.keys(dataChanged).length;
    const username = user ? user.displayName || user.email : 'Hi';
    const spinIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
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
                <Menu.SubMenu title={<span>
                  <AvatarWithIcon style={{color: '#f56a00', backgroundColor: '#fde3cf'}} icon="user" />
                  <UserName>{username}</UserName>
                  </span>}>
                  <Menu.Item key="overview">Overview</Menu.Item>
                  <Menu.Item key="logout">Log out</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="deploy">
                  {
                    deploying ?
                      spinIcon :
                      <Badge count={hasChanged ? 1 : 0} dot>
                        <MenuText>
                          Deploy
                        </MenuText>
                      </Badge>
                  }
                </Menu.Item>
              </Menu>
            </HeaderMenu>
          </Header>
          <Layout>
            <Sider width={200} style={{ minHeight: "100vh" }}>
              <Menu
                theme="dark"
                mode="inline"
                onClick={this.siderMenuOnClick}
                defaultSelectedKeys={[firstKey]}>
              {
                Object.keys(schema.cannerSchema).map(key => (
                  <Menu.Item key={key}>
                    {key.toLocaleUpperCase()}
                  </Menu.Item>
                ))
              }
              </Menu>
            </Sider>
            <Layout>
              <Content>
                <Spin indicator={spinIcon} spinning={deploying} tip="Depolying...">
                  <CMS
                    layouts={{Tabs, Focus}}
                    history={history}
                    schema={schema}
                    connector={connector.default.connector}
                    connectors={connector.default.connectors}
                    resolver={resolver.default}
                    baseUrl="/dashboard"
                    hideButtons={true}
                    dataDidChange={this.dataDidChange}
                    ref={(cms: typeof CMS) => this.cms = cms}
                  />
                </Spin>
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
