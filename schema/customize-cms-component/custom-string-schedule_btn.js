import * as React from 'react';
import {Form, Radio, DatePicker, Button} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

export default class PublishBtn extends React.Component {
  onChange = (e) => {
    const {onChange, refId, value} = this.props;
    onChange(refId, 'update', {
      ...value,
      type: e.target.value
    });
  }

  selectDate = (date) => {
    const {onChange, refId, value} = this.props
    const ISO = date.toISOString();
    onChange(refId, 'update', {
      ...value,
      date: ISO
    })
  }

  render() {
    const {value} = this.props;
    return (
      <div>
        <Radio.Group value={value ? value.type : 'now'} onChange={this.onChange}>
          <Radio.Button value="now">Publish immediately</Radio.Button>
          <Radio.Button value="schedule">Schedule</Radio.Button>
        </Radio.Group>
        {
          value && value.type === "schedule" && (
            <DatePicker
              style={{marginTop: 8}}
              value={value && value.date ? moment(value.date) : moment()}
              format="YYYY-MM-DD"
              onChange={this.selectDate}
            />
          )
        }
      </div>
    );
  }
}
