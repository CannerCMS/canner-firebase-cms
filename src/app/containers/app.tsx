import * as React from 'react';
import * as firebase from 'firebase';
// import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router';
import { FormComponentProps } from 'antd/lib/form';
import {Row, Col, Card, Form, Input, Icon, Button, notification} from 'antd';
import {Title, LoginContainer, BodyWrapper} from 'app/components/app'
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
      return <Redirect to={"/"} />;
    }

    return (
      <BodyWrapper>
        <Row type="flex" justify="space-around" align="middle" style={{height: '100%'}}>
          <Col span={12}>
            <LoginContainer>
              <Card title={<Title>Welcome to Canner CMS for Firebase</Title>}>
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
              </Card>
            </LoginContainer>
          </Col>
        </Row>
      </BodyWrapper>
    );
  }
}

export default Form.create()(CMSApp);
