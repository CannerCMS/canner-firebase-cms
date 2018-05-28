import * as React from 'react';
import * as firebase from 'firebase';
import { RouteComponentProps, Redirect } from 'react-router';
import { FormComponentProps } from 'antd/lib/form';
import {Row, Col, Form, Input, Icon, Button, Alert, notification} from 'antd';
import {LoginContainer, LogoContainer, FooterContainer, BodyWrapper} from 'app/components/app'
import GithubCorner from 'react-github-corner';

import logoWhite from 'assets/logo-word-white.png';

const FormItem = Form.Item;

interface Props extends RouteComponentProps<void>, FormComponentProps {
}

class CMSApp extends React.Component<Props> {
  state = {
    redirectToReferrer: false
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
          .then((result) => {
            this.setState({redirectToReferrer: true})
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            notification.error({
              message: errorCode,
              description: errorMessage
            })
          });
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={"/Dashboard"} />;
    }

    return (
      <BodyWrapper>
        <GithubCorner href="https://github.com/canner/canner-firebase-cms" />
        <Row type="flex" justify="space-around" align="middle" style={{height: '100%'}}>
          <Col span={12}>
            <LogoContainer>
              <img src={logoWhite}/>
            </LogoContainer>
            <LoginContainer>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your Email!' }],
                  })(
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                    Log in
                  </Button>
                </FormItem>
              </Form>
            </LoginContainer>
            <FooterContainer>
              Powered by <a href="https://www.canner.io/" target="_blank">CannerIO</a>. License under Apache License 2.0
            </FooterContainer>
            {
              // DELETE HERE !!!!!!! This section is some information for demo.
            }
            <Alert
              style={{marginTop: '20px'}}
              message="Demo version"
              description={
                <div>
                  Username: <b>admin-test@canner.io</b><br/>
                  Password: <b>admin-test</b>
                </div>
              }
              type="info"
              showIcon
            />
          </Col>
        </Row>
      </BodyWrapper>
    );
  }
}

export default Form.create()(CMSApp);
