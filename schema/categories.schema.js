/** @jsx builder */

import builder from 'canner-script';
export default () => (
  <array keyName="category" title="Category"
    ui="tree"
    uiParams={{
      relationField: 'parent',
      textCol: 'name',
      columns: [{
        title: 'Title',
        dataIndex: 'name'
      }, {
        title: 'Parent Category',
        dataIndex: 'parent.name'
      }]
  }}>
    <string keyName="name" title="Title"/>
    <relation keyName="parent"
      title="Parent category"
      relation={{
        type: 'toOne',
        to: 'category'
      }}
      ui="singleSelectTree"
      uiParams={{
        textCol: "name",
        columns: [{
          title: 'Title',
          dataIndex: 'name'
        }]
      }}
    />
  </array>
);