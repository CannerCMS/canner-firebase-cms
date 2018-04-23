import * as React from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';
// import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { FormComponentProps } from 'antd/lib/form';
import {Row, Col, Card, Form, Input, Icon, Button} from 'antd';
const FormItem = Form.Item;

const Title = styled.div`
  text-align: center;
`

const LoginContainer = styled.div`
  align-self: center;
  max-width: 500px;
  margin: 0 auto;
`

const BodyWrapper = styled.div`
  background: linear-gradient(to left top,#e4506d,#f2b173);
  min-height: 600px;
  height: 100vh;
  width: 100%;
`

export interface Props extends RouteComponentProps<void>, FormComponentProps {
}

class CMSApp extends React.Component<Props> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <BodyWrapper>
        <Row type="flex" justify="space-around" align="middle" style={{height: '100%'}}>
          <Col span={12}>
            <LoginContainer>
              <Card title={<Title>Welcome to Canner CMS for Firebase</Title>}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
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

export const App = Form.create()(CMSApp);
