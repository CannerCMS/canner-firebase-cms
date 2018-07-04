import * as React from 'react';
import {Icon} from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: table;
  height: 100%;
  position: absolute;
  width: 100%;
  left: 0;
`

const Inner = styled.div`
  display: table-cell;
  vertical-align: middle;
`

const Content = styled.div`
  text-align: center;
`

const Spinner = styled.div`
  display: inline-block;
`

export default class LockScreenLoading extends React.Component {
  render() {
    return (
      <Wrapper>
        <Inner>
          <Content>
            <Spinner>
              <Icon type="loading" style={{fontSize: '30px'}}/>
            </Spinner>
            <p>
              Loading please wait...
            </p>
          </Content>
        </Inner>
      </Wrapper>
    );
  }
}
