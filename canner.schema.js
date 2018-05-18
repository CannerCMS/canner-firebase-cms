/** @jsx builder */

// eslint-disable-next-line no-unused-vars
import builder, {Block, Layout} from 'canner-script';

var contactInfo = [
  {
    key: 'phones',
    options: [{
      text: 'Home',
      value: 'HOME'
    }, {
      text: 'Company',
      value: 'COMPANY'
    }, {
      text: 'Mobile',
      value: 'MOBILE'
    }]
  },
  {
    key: 'addresses',
    options: [{
      text: 'Home',
      value: 'HOME'
    }, {
      text: 'Company',
      value: 'COMPANY'
    }]
  },
  {
    key: 'emails',
    options: []
  }
]

const Img = ({attributes}) => (
  <object keyName={attributes.keyName} title={attributes.title}>
    <string keyName="imageName" title="imageName" />
    <file keyName="imageSrc" title="imageSrc" contentType="images/*" />
  </object>
);

const Tabs = ({attributes, children}) => <Layout name="Tabs" {...attributes}>{children}</Layout>
const Focus = ({attributes, children}) => <Layout name="Focus" {...attributes}>{children}</Layout>
const infoDesc = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged`;
const postDesc = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`;
const Posts = () => (
<array keyName="posts" title="Posts" ui="table-route" description={postDesc}
  uiParams={{
    columns: [{
      title: 'Title',
      dataIndex: 'title'
    }]
  }}
>
  <Focus focus="content">
    <string keyName="title" title="Title" />
    <object keyName="status" title="Status">
      <date keyName="createAt" title="Create at"/>
      <boolean keyName="draft" title="Draft"/>
    </object>
    <file keyName="featureImage" title="Feature Image"/>
    <object keyName="pageProperty" title="Page Property">
      <number keyName="onTop" title="On Top"/>
      <number keyName="order" title="Order"/>
    </object>
    <object keyName="share" title="Share">
      <number keyName="showShareButton" title="Show Share Button"/>
      <number keyName="showGoodButton" title="Show Good Button"/>
    </object>
    <object keyName="other" title="Other">
      <string keyName="introduction" title="Introduction"/>
      <string keyName="position" title="Position"/>
    </object>
  </Focus>
</array>);

export default <root>
  <object keyName="info" title="MyInfo" description={infoDesc}>
    <Block title="MyInfo">
      <Tabs>
        {/* <file keyName="thumbnail" title="Thumbnail" contentType="image/*" ui="image"/> */}
        <string keyName="name" title="Name"/>
        <string keyName="nickname" title="Nickname" />
        <Img keyName="thumbnail" title="Photo" />
        <object keyName="contactInfo" title="ContactInfo">
        {
          contactInfo.map(info => (
            <array ui="table" title={info.key} keyName={info.key} uiParams={{
              columns: [{
                title: 'Type',
                dataIndex: 'type'
              }, {
                title: 'Value',
                dataIndex: 'value'
              }]
            }}>
              {
                info && <string ui="select"
                  uiParams={{options: info.options}}
                  keyName="type"
                />
              }
              <string keyName="value"/>
            </array>
          ))
        }
        </object>
      </Tabs>
    </Block>
  </object>
  <Posts />
  <object keyName="overview" title="Components Overview">
    <Block title="All Types">
      <Tabs>
        <object keyName="string" title="String type">
          <string keyName="demoInput" title="Demo" packageName="@canner/customize-string-input"/>
          <string keyName="input" title="Input" description="Input is the default ui of string type"/>
          <string keyName="card" title="Card" ui="card" uiParams={{
            options: [{
              text: 'YES',
              value: 'yes'
            }, {
              text: 'NO',
              value: 'no'
            }]
          }}/>
          <string keyName="link" title="Link" ui="link"/>
          <string keyName="radio" title="Radio" ui="radio" uiParams={{
            options: [{
              text: 'YES',
              value: 'yes'
            }, {
              text: 'NO',
              value: 'no'
            }]
          }}/>
          <string keyName="select" title="Select" ui="select" uiParams={{
            options: [{
              text: 'YES',
              value: 'yes'
            }, {
              text: 'NO',
              value: 'no'
            }]
          }}/>
          <string keyName="textarea" title="Textarea" ui="textarea" />
          <file keyName="image" title="Image" />
          <date keyName="date" title="Date" />
        </object>
        <object keyName="boolean" title="Boolean Types">
          <boolean keyName="card" ui="card" title="Card" />
          <boolean keyName="switch" ui="switch" title="Switch" />
        </object>
        <object keyName="number" title="Number Types">
          <number keyName="input" title="Title" ui="input" />
          <number keyName="rate" title="Rate" ui="rate" />
          <number keyName="slider" title="Slider" ui="slider" />
        </object>
        <object keyName="array" title="Array Type">
          <array keyName="tabs" ui="tabs" title="Tabs">
            <string keyName="info" title="info" />
          </array>
          <array keyName="panel" ui="panel" title="Panel">
            <string keyName="info" title="info" />
          </array>
          <array keyName="tableRoute" ui="table-route" title="Table-route" uiParams={{
            columns: [{
              title: 'info',
              dataIndex: 'info'
            }]
          }}>
            <string keyName="info" title="info" />
          </array>
          <array keyName="table" ui="table" title="Table" uiParams={{
            columns: [{
              title: 'info',
              dataIndex: 'info'
            }]
          }}>
            <string keyName="info" title="info" />
          </array>
          {/* <array keyName="slider" ui="slider" title="Slider">
            <string keyName="info" title="info" />
          </array>
          <array keyName="tag" ui="tag" title="Tag" />
          <array keyName="gallery" ui="gallery" title="Gallery" /> */}
        </object>
        <object keyName="object" title="Object type">
          {/* <geoPoint keyName="geoPoint" title="GeoPoint" /> */}
          {/* <object keyName="variants" title="Variants" ui="variants" /> */}
          <object keyName="options" title="Options" ui="options" uiParams={{
            options: [{
              title: 'One',
              key: 'one'
            }, {
              title: 'Two',
              key: 'two'
            }],
            optionKey: 'key'
          }}>
            <string keyName="one" />
            <boolean keyName="two" />
          </object>
          <object keyname="demoFields" packageName="@canner/customize-object-fields"/>
        </object>
      </Tabs>
    </Block>
  </object>
</root>
