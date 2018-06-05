import * as React from 'react';
import {Checkbox, Row, Col, Icon, Tooltip} from 'antd';

export default class CustomCheckboxDesc extends React.Component {
  onChange = (e) => {
    const {onChange, refId} = this.props;
    onChange(refId, "update", e.target.checked);
  }

  render() {
    const {uiParams = {}, value} = this.props;
    return (
      <Row>
        <Checkbox onChange={this.onChange}>
          {uiParams.desc || 'unknown'}
          {uiParams.help && (
            <Tooltip placement="top" title={uiParams.help}>
              <Icon type="info-circle-o" style={{marginLeft: '10px', color: '#CCC'}}/>
            </Tooltip>
          )}
        </Checkbox>
      </Row>
    )
  }
}
