/** @jsx builder */

import builder from 'canner-script';
export default () => (
  <array keyName="category" title="Category" hide={true}
    uiParams={{
      columns: [{
        title: 'Title',
        dataIndex: 'name'
      }, {
        title: 'Parent Category',
        dataIndex: 'parent.name'
      }]
  }}>
    <toolbar>
      <pagination />
    </toolbar>
    <string keyName="name" title="Title"/>
    <relation keyName="parent"
      title="Parent category"
      packageName="./customize-cms-component/custom-relation-tree_toOne"
      relation={{
        type: 'toOne',
        to: 'category'
      }}
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