import * as React from 'react';
import {Button, Icon, Row, Col, Switch, Tooltip} from 'antd';

export default class CustomReviewBtn extends React.Component {
  onChange = (checked) => {
    const {onChange, refId} = this.props;
    onChange(refId, "update", checked);
  }

  render() {
    const {uiParams = {}, value} = this.props;
    return (
      <div>
        {
          !value ? (
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
          ) : (
            <Button onClick={() => this.onChange(false)}>
              <Icon type="rollback" />
              Revert to draft
            </Button>
          )
        }
      </div>
    )
  }
}
