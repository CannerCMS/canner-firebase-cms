import * as React from 'react';
import {Form, Radio, DatePicker, Button} from 'antd';
const FormItem = Form.Item;

export default class PublishBtn extends React.Component {
  state = {
    value: "now"
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const {refId} = this.props;
    const {value} = this.state;

    return (
      <div>
        <Radio.Group value={value} onChange={this.onChange}>
          <Radio.Button value="now">Publish immediately</Radio.Button>
          <Radio.Button value="schedule">Schedule</Radio.Button>
        </Radio.Group>
        {
          value === "schedule" && (
            <Form layout="inline" style={{marginTop: '10px'}}>
              <FormItem span={20}>
                <DatePicker
                  format="YYYY-MM-DD"
                />
              </FormItem>
              <FormItem span={4}>
                <Button type="primary">Save</Button>
              </FormItem>
            </Form>
          )
        }
      </div>
    )
  }
}
