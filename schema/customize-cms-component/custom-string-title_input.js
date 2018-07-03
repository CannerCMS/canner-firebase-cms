import * as React from 'react';
import {Input} from 'antd';
import slug from 'slug';
import {baseUrl} from './blog';

export default class CustomStringUrl extends React.Component {
  onChange = (e) => {
    const {onChange, refId} = this.props;
    onChange(refId, "update", e.target.value);
  }

  render() {
    const {value} = this.props;
    const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    return (
      <React.Fragment>
        <Input defaultValue={value} onChange={this.onChange}/>
        <div style={{marginTop: '10px'}}>
          Post URL: <span style={{color: "#CCC"}}>
            {baseUrl} <b>{date}/{slug(value) || "title"}</b>
          </span>
        </div>
      </React.Fragment>
    )
  }
}
