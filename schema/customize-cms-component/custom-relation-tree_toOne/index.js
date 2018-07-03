// @flow
import React, { PureComponent } from "react";
import { Tree } from "antd";
import { fromJS } from 'immutable';
import update from 'lodash/update';
import 'antd/lib/tree/style';
import type {RelationDefaultProps} from 'types/RelationDefaultProps';
import type {FieldDisabled} from 'types/DefaultProps';
const TreeNode = Tree.TreeNode;

// type
type State = {
  modalVisible: boolean
};

type Props = RelationDefaultProps & {
  uiParams: {
    textCol: string,
    subtextCol: string,
    renderText?: string,
    columns: Array<*>
  },
  rootValue: any,
  value: any,
  subscribe: Function,
  disabled: FieldDisabled,
  updateQuery: Function
};

export default class RelationTree extends PureComponent<Props, State> {
  isOnComposition: boolean;
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      treeData: [],
      data: fromJS({
        [props.relation.to]: {
          edges: []
        }
      })
    }
  }

  componentDidMount() {
    const {updateQuery, relation} = this.props;
    updateQuery([relation.to], {
      pagination: {
        first: 99
      }
    });
    this.fetchData();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  UNSAFE_componentWillReceiveProps(props: Props) {
    if (props.refId.toString() !== this.props.refId.toString()) {
      this.updateData(this.state.data);
    }
  }

  fetchData = () => {
    const {fetch, relation} = this.props;
    fetch(relation.to)
      .then(data => {
        this.updateData(data);
        this.subscribe();
      })
  }

  subscribe = () => {
    const {subscribe, relation} = this.props;
    this.subscription = subscribe(relation.to, this.updateData);
  }

  updateData = (data: any) => {
    const {relation, uiParams: {textCol}} = this.props;
    const treeData = genRelationTree(data.getIn([relation.to, 'edges']).map(edge => edge.get('node')).toJS(), textCol);
    this.setState({
      treeData,
      data
    });
  }

  onCheck = (v, info) => {
    const checkedKeys = v.checked;
    const nodes = info.checkedNodes;
    const {onChange, refId, value, relation} = this.props;
    const {data} = this.state;
    if (checkedKeys.length > 1 && !nodes[1].props.disableCheckbox) {
      const checked = data.getIn([relation.to, 'edges'])
        .find(edge => edge.get('cursor') === checkedKeys[1])
        .get('node');
      onChange(refId, 'connect', checked);
    } else if (checkedKeys[0] && !nodes[0].props.disableCheckbox) {
      const checked = data.getIn([relation.to, 'edges'])
        .find(edge => edge.get('cursor') === checkedKeys[0])
        .get('node');
      onChange(refId, 'connect', checked);
    } else {
      onChange(refId, 'disconnect', value);
    }
  }

  renderTreeNodes = (data, checkedId, selfId, disableCheckbox) => {
    return data.map((item) => {
      const isChecked = item.key === checkedId;
      const isSelf = item.key === selfId;
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} disableCheckbox={isSelf || disableCheckbox}>
            {this.renderTreeNodes(item.children, checkedId, selfId, isSelf || isChecked || disableCheckbox)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} disableCheckbox={isSelf || disableCheckbox}/>;
    });
  }

  render() {
    const { treeData, data } = this.state;
    const { value, refId, relation } = this.props;
    const [key, index] = refId.getPathArr();
    const checkedId = value && value.get('id');
    let selfId = null;
    if (key === relation.to) {
      // self relation
      selfId = data.getIn([key, 'edges', index, 'cursor']);
    }
    return (
      <Tree
        defaultExpandAll
        checkStrictly
        checkable
        onCheck={this.onCheck}
        checkedKeys={value ? [value.get('id')] : []}
      >
        {this.renderTreeNodes(treeData, checkedId, selfId)}
      </Tree>
    );
  }
}
function genRelationTree(data: any, textCol: string, treeData: array = [], treeMap: object = {}) {
  const leftData = [];
  data.forEach(datum => {
    if (!datum.parent) {
      return ;
    }
    const parentId = datum.parent.id;
    if (datum.id === parentId || !parentId) {
      treeMap[datum.id] = `[${treeData.length}]`;
      treeData.push({
        title: datum[textCol],
        key: datum.id,
        children: []
      });
    } else if (treeMap[parentId]) {
      treeData = update(treeData, treeMap[parentId], item => {
        treeMap[datum.id] = `${treeMap[parentId]}.children[${item.children.length}]`;
        item.children.push({
          title: datum[textCol],
          key: datum.id,
          children: []
        });
        return item;
      });
    } else {
      leftData.push(datum);
    }
  });
  if (data.length === leftData.length) {
    leftData[0].parent.id = null;
  }
  if (leftData.length) {
    genRelationTree(leftData, textCol, treeData, treeMap)
  }
  return treeData;

}

// function getTag(v: {[string]: any}, uiParams: {
//   textCol: string,
//   subtextCol: string,
//   renderText?: string
// }): string {
//   // use value and uiParams to generateTagName
//   const {textCol, subtextCol, renderText} = uiParams;
//   let tag = '';
//   if (renderText) {
//     // if there is renderText, textCol and subtextCol will be ignored;
//     const compiler = template(renderText);
//     try {
//       tag = compiler(v);
//     } catch (e) {
//       throw e;
//     }
//   } else {
//     const text = v[textCol];
//     const subtext = v[subtextCol];
//     tag = text + (subtext ? `(${subtext})` : '');
//   }

//   return tag;
// }
