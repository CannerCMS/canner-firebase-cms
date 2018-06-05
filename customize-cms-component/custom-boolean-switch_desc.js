import * as React from 'react';
import {Switch, Row, Col, Icon, Tooltip} from 'antd';
import 'antd/lib/switch/style';

export default class CustomSwitchDesc extends React.Component {
  onChange = (checked) => {
    const {onChange, refId} = this.props;
    onChange(refId, "update", checked);
  }

  render() {
    const {uiParams = {}, value} = this.props;
    return (
      <Row>
        <Col span={6}>
          <Switch checked={value} onChange={this.onChange}/>
        </Col>
        <Col span={18}>
          {uiParams.desc || 'unknown'}
          {uiParams.help && (
            <Tooltip placement="top" title={uiParams.help}>
              <Icon type="info-circle-o" style={{marginLeft: '10px', color: '#CCC'}}/>
            </Tooltip>
          )}
        </Col>
      </Row>
    )
  }
}
