import * as React from 'react';
import {Button, Icon, Modal} from 'antd';
const confirm = Modal.confirm;

export default class CustomReviewBtn extends React.Component {
  componentDidMount() {
    const {refId, onChange, value, uiParams, goTo, routes, deploy, reset} = this.props;
    if (value) {
      confirm({
        title: uiParams.true.title,
        content: uiParams.true.desc,
        okText: 'Restore',
        cancelText: `Don't restore`,
        onOk: () => {
          onChange(refId, 'update', false);
          deploy(refId.getPathArr()[0]).then(() => {
            goTo(routes[0]);
            reset(refId.getPathArr()[0])
          });
        },
        onCancel: () => {
          goTo(routes[0]);
        }
      })
    }
  }

  confirmDelete = () => {
    const {refId, onChange, uiParams, goTo, routes, deploy, reset} = this.props;
    confirm({
      title: uiParams.false.confirmText,
      okText: 'Move to trash',
      cancelText: `Back`,
      onOk: () => {
        onChange(refId, 'update', true);
        deploy(refId.getPathArr()[0]).then(() => {
          goTo(routes[0]);
          reset(refId.getPathArr()[0])
        })
      },
      onCancel: () => {
      }
    })
  }

  render() {
    const {uiParams = {}, value} = this.props;
    return (
      <div>
        {
          !value && (
            <Button onClick={this.confirmDelete}>
              <Icon type="delete" />
              {uiParams.false.text}
            </Button>
          )
        }
      </div>
    )
  }
}
