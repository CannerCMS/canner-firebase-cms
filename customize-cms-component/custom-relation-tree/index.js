// @flow
import React, { PureComponent } from "react";
import { Tree } from "antd";
import { List, fromJS } from 'immutable';
import template from 'lodash/template';
import update from 'lodash/update';
import 'antd/lib/tree/style';
const TreeNode = Tree.TreeNode;
// type 
import type {RelationDefaultProps} from 'types/RelationDefaultProps';
import type {FieldDisabled} from 'types/DefaultProps';

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
      selectedKeys: [],
      treeData: []
    }
  }
 
  componentDidMount() {
    const {updateQuery, relation, value, uiParams: {textCol}, fetch} = this.props;
    updateQuery([relation.to], {
      pagination: {
        first: 99
      }
    });
    fetch(relation.to)
      .then(data => {
        const treeData = genRelationTree(data.getIn([relation.to, 'edges']).map(edge => edge.get('node')).toJS(), textCol);
        this.setState({
          treeData
        });
      })

  }

  onSelect = (selectedKeys, info) => {
    const {onChange, refId, value} = this.props;
    if (selectedKeys[0]) {
      onChange(refId, 'connect', fromJS({id: selectedKeys[0]}));
    } else {
      onChange(refId, 'disconnect', value);
    }
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  render() {
    const { treeData } = this.state;
    const { disabled, value, uiParams, refId, relation, fetch, fetchRelation, subscribe, updateQuery } = this.props;
    return (
      <Tree
        autoExpandParent
        // defaultExpandAll
        onSelect={this.onSelect}
        selectedKeys={value ? [value.get('id')] : []}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}
function genRelationTree(data: any, textCol: string, treeData: array = [], treeMap: object = {}) {
  const leftData = [];
  data.forEach(datum => {
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

function getTag(v: {[string]: any}, uiParams: {
  textCol: string,
  subtextCol: string,
  renderText?: string  
}): string {
  // use value and uiParams to generateTagName
  const {textCol, subtextCol, renderText} = uiParams;
  let tag = '';
  if (renderText) {
    // if there is renderText, textCol and subtextCol will be ignored;
    const compiler = template(renderText);
    try {
      tag = compiler(v);
    } catch (e) {
      throw e;
    }
  } else {
    const text = v[textCol];
    const subtext = v[subtextCol];
    tag = text + (subtext ? `(${subtext})` : '');
  }

  return tag;
}