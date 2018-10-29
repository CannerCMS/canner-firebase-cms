// @flow
import * as React from 'react';
import styled from 'styled-components';
import {Tabs, Input, Row, Col} from 'antd';
const TabPane = Tabs.TabPane;
const Search = Input.Search;

type Props = {
  changeFilter: Object => void,
  fields: Array<any>,
  where: Object,
  search: Object
}

const Wrapper = styled.div`
  box-shadow: 1px 1px 1px 1px #ccc;
  margin-bottom: 24px;
  width: 100%;

  .ant-tabs-bar {
    margin-bottom: 0;
  }
  .ant-input-search-enter-button,
  .ant-input-search-button {
    height: 44px;
    line-height: 44px;
    border-radius: 0;
  }
`

type State = {
  search: Object,
  filter: Object
}

const fields = [{
  title: 'All',
  condition: {}
}, {
  title: 'Published',
  condition: {
    draft: {
      eq: false
    },
    trash: {
      eq: false
    }
  }
}, {
  title: 'Drafts',
  condition: {
    draft: {
      eq: true
    },
    trash: {
      eq: false
    }
  }
}, {
  title: 'Trashed',
  condition: {
    trash: {
      eq: true
    }
  }
}];

export default class TabsFilter extends React.Component<Props, State> {
  state = {
    search: {},
    filter: {}
  }

  onChange = (index: number) => {
    const {search} = this.state;
    this.props.changeFilter({
      ...search,
      ...fields[index].condition
    });
    this.setState({
      filter: fields[index].condition
    });
  }

  onSearch = (value: string) => {
    const {filter} = this.state;
    if (!value) {
      this.props.changeFilter({
        ...filter
      });
      this.setState({
        search: {}
      });
      return;
    }
    this.props.changeFilter({
      title: {eq: value},
      ...filter
    });
    this.setState({
      search: {title: {eq: value}}
    });
  }

  render() {
    const {where} = this.props;
    const activeKey = fields.findIndex(field => JSON.stringify(field.condition) === JSON.stringify(where));
    return (
      <Wrapper>
        <Row>
          <Col span={18}>
            <Tabs activeKey={`${activeKey}`} defaultActiveKey="0" onChange={this.onChange}>
              {fields.map((field, i) => (
                <TabPane tab={field.title} key={i}></TabPane>
              ))}
            </Tabs>
          </Col>
          <Col span={6}>
            <Search
              placeholder="Enter Name"
              onSearch={this.onSearch}
              enterButton
              onPressEnter={e => this.onSearch(e.target.value)}
            />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}
