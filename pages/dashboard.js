import * as React from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';
import {Layout, Menu, Modal, Table, Badge, Avatar, Icon, Spin, notification} from 'antd';
import Canner from 'canner';
import Container, {transformSchemaToMenuConfig} from '@canner/container';
import R from '@canner/history-router';
import {withRouter} from 'next/router';
import schema from '../schema/canner.schema';
import { LogoContainer, HeaderMenu } from '../components/dashboard';
import firebaseConfig from '../config-firebase';

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class Dashboard extends React.Component {
  state = {
    visible: false,
    dataChanged: {},
    user: null,
    deploying: false,
  }

  static async getInitialProps () {
    return {}
  }

  UNSAFE_componentWillMount() {
    const {router} = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        if (location.pathname.match("/dashboard")) {
          this.setState({
            user: user
          });
        } else {
          router.push('/dashboard');
        }
      }
    });
  }

  headerMenuOnClick = (menuItem) => {
    const {router} = this.props;
    if(menuItem.key === 'logout') {
      firebase.auth().signOut()
        .then(function() {
          router.push('/');
        });
    } else if(menuItem.key === "overview") {
      this.setState({
        visible: true
      });
    } else if (menuItem.key === 'deploy') {
      this.deploy();
    }
  }

  siderMenuOnClick = (menuItem) => {
    const {dataChanged} = this.state;
    const {router} = this.props;
    const {key} = menuItem;
    if (dataChanged && Object.keys(dataChanged).length > 0) {
      confirm({
        title: 'Do you want to reset all changes?',
        content: <div>Leaving without deployment will reset all changes. Click the <b>Save</b> button at the top-right corner to save them.</div>,
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => {
          return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
          }).then(this.reset)
            .then(() => {
              router.push(`/dashboard/${key}`);
            });
        },
        onCancel: () => {
        },
      });
    } else {
      router.push(`/dashboard/${key}`);
    }
  }

  hideOverview = () => {
    this.setState({
      visible: false,
    });
  }

  dataDidChange = (dataChanged) => {
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
            notification.success({
              message: 'Save successfully!',
              description: 'Your changes have been saved.',
              placement: 'bottomRight'
            });
          }, 1000)
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
    const {dataChanged, user, deploying} = this.state;
    const {router} = this.props;
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
      render: ((text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>),
    }];

    // const secondPath = window.location.pathname.split('/')[2];
    const secondPath = 'posts'
    const hasChanged = dataChanged && Object.keys(dataChanged).length;
    const username = user ? user.displayName || user.email : 'loading...';
    const spinIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <React.Fragment>
        <Container
          schema={schema}
          sidebarConfig={{
            menuConfig: [
              ...transformSchemaToMenuConfig(schema.schema)
            ]
          }}
          navbarConfig={{
            logo: (
              <LogoContainer>
                <img src="/static/logo-word-white.png" width={150} alt="logo"/>
              </LogoContainer>
            ),
            renderMenu: () => (
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
                  {
                    hasChanged ?
                    <Menu.Item key="deploy">
                    {
                      deploying ?
                        spinIcon :
                        <Badge dot>
                          <MenuText>
                          Save
                          </MenuText>
                        </Badge>
                    }
                    </Menu.Item> :
                    <Menu.Item key="saved">
                      Saved
                    </Menu.Item>
                  }

                </Menu>
              </HeaderMenu>
            )
          }}
          router={new R({
            history: {
              location: {
                pathname: router.asPath,
                search: ''
              },
              push: router.push
            },
            baseUrl: "/dashboard"
          })}
        >
          <Canner
            hideButtons={true}/>
        </Container>
        <Modal
          width={"80%"}
          title="Overview Firebase"
          visible={this.state.visible}
          onCancel={this.hideOverview}
          footer={null}
        >
          <Table columns={columns} dataSource={[firebaseConfig]} pagination={false} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard)
