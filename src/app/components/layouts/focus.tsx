import * as React from 'react';
import {Row, Col, Collapse} from 'antd';
import {Item} from 'canner-helpers';
const Panel = Collapse.Panel;
export default class Focus extends React.Component {
  render() {
    const {children, focus, refId} = this.props;
    return (
      <Row gutter={32} type="flex">
        <Col span={18}>
          <Item filter={node => node.keyName === focus} />
        </Col>
        <Col span={6}>
          <Collapse>
          {
            children.map((child, i) => (
              child.keyName !== focus &&
                <Panel header={child.title || 'UNKNOWN TITLE'} key={i}>
                  <Item refId={refId} filter={node => node.keyName === child.keyName} />
                </Panel>
            ))
          }
          </Collapse>
        </Col>
      </Row>
    )
  }
}
