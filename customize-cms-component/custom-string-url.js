import * as React from 'react';
import {Input} from 'antd';
import 'antd/lib/switch/style';

export default class CustomStringUrl extends React.Component {
  onChange = (e) => {
    const {onChange, refId} = this.props;
    onChange(refId, "update", e.target.value);
  }

  render() {
    const {value} = this.props;
    return (
      <Input addonBefore="http://<your blog url>/" defaultValue={value} />
    )
  }
}
