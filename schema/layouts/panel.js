import * as React from 'react';
import {Row, Col, Collapse} from 'antd';
import {Item} from 'canner-helpers';
const Panel = Collapse.Panel;

export default class Focus extends React.Component {
  render() {
    const {children, refId} = this.props;
    return (
      <Collapse activeKey={children.map(child => child.keyName)}>
      {
        children.map((child, i) => (
          <Panel header={child.title || 'UNKNOWN TITLE'} key={child.keyName}>
            <Item
              hideTitle={true}
              refId={refId}
              filter={node => node.keyName === child.keyName} />
          </Panel>
        ))
      }
      </Collapse>
    )
  }
}
