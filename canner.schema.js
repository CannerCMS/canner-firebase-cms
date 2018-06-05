/** @jsx builder */

// eslint-disable-next-line no-unused-vars
import builder, {Block, Layout} from 'canner-script';

const Img = ({attributes}) => (
  <object keyName={attributes.keyName} title={attributes.title}>
    <string keyName="imageName" title="imageName" />
    <file keyName="imageSrc" title="imageSrc" contentType="images/*" />
  </object>
);

const Tabs = ({attributes, children}) => <Layout name="Tabs" {...attributes}>{children}</Layout>
const Focus = ({attributes, children}) => <Layout name="Focus" {...attributes}>{children}</Layout>
const siteDesc = `Edit, update, add your new page in your blog.`;
const postDesc = `Post dashboard is the place you manage all your blog posts.`;

export default (
  <root>
    <array keyName="pages" title="Pages" ui="tableRoute" description={siteDesc}
      uiParams={{
        columns: [{
          title: 'Title',
          dataIndex: 'title'
        }]
      }}
    >
      <toolbar>
        <pagination />
      </toolbar>
      <Focus focus={["title", "url", "content"]}>
        <string keyName="title" title="Title" />
        <string keyName="url" title="URL" packageName="./customize-cms-component/custom-string-url" />
        <object keyName="content" title="Content" ui="editor" />
        <object keyName="status" title="Status">
          <string keyName="publish" packageName="./customize-cms-component/custom-string-schedule_btn" />
          <boolean keyName="draft" packageName="./customize-cms-component/custom-boolean-review_btn" uiParams={{
            desc: "Pending review",
            help: "Flag this post to be reviewed for approval."
          }}/>
        </object>
        <file keyName="featureImage" title="Feature Image"/>
        <object keyName="pageProperty" title="Page Property">
          <boolean keyName="topLevel" title="Parent page" packageName="./customize-cms-component/custom-boolean-switch_desc" uiParams={{
            desc: "Top level",
            help: "Disable to select a parent page"
          }}/>
          <number keyName="order" title="Order" uiParams={{min: 0}}/>
        </object>
        <object keyName="share" title="Sharing">
          <boolean keyName="showShareButton" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
            desc: "Show sharing button"
          }}/>
          <boolean keyName="showLikeButton" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
            desc: "Show like button"
          }}/>
        </object>
        <object keyName="other" title="More Options">
          <string keyName="slug" title="Slug" description="The slug is the URL-friendly version of the page title."/>
          <string
            keyName="excerpt"
            ui="textarea"
            title="Excerpt"
            description="An excerpt is a short summary you can add to your posts. Some themes show excerpts alongside post titles on your site's homepage and archive pages."/>
          <boolean keyName="allowComment" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
            desc: "Allow comments",
            help: "Provide a comment section to give readers the ability to respond."
          }}/>
        </object>
      </Focus>
    </array>
    <array keyName="posts" title="Posts" ui="tableRoute" description={postDesc}
      uiParams={{
        columns: [{
          title: 'Title',
          dataIndex: 'title'
        }]
      }}
    >
      <toolbar>
        <pagination />
        <filter fields={[{
          title: 'All',
          condition: {
          }
        }, {
          title: 'Draft',
          condition: {
            status: {
              draft: {
                eq: true
              }
            }
          }
        }, {
          title: 'Stick',
          condition: {
            status: {
              stick: {
                eq: true
              }
            }
          }
        }]} search={{
          title: 'Search name',
          key: 'name'
        }} componentName="TabsFilter"/>
      </toolbar>
      <Focus focus={["title", "content"]}>
        <string keyName="title" title="Title" packageName="./customize-cms-component/custom-string-title_input"/>
        <object keyName="content" title="Content" ui="editor" />
        <object keyName="status" title="Status">
          <string keyName="publish" packageName="./customize-cms-component/custom-string-schedule_btn" />
          <boolean keyName="draft" title="Draft" packageName="./customize-cms-component/custom-boolean-review_btn" uiParams={{
            desc: "Pending review",
            help: "Flag this post to be reviewed for approval."
          }}/>
          <boolean keyName="stick" packageName="./customize-cms-component/custom-boolean-switch_desc" uiParams={{
            desc: "Stick to the front page",
            help: "Sticky posts will appear at the top of the posts listing."
          }}/>
        </object>
        <Layout name="default" title="Categories & Tags" keyName="CategoriesAndTags">
          <array keyName="tags" title="Tags" ui="tag" description="Use tags to associate more specific keywords with your posts.">
            <string/>
          </array>
          <relation keyName="category"
            title="category"
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
            }}/>
        </Layout>
        
        <file keyName="featureImage" title="Feature Image"/>
        <object keyName="share" title="Sharing">
          <boolean keyName="showShareButton" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
            desc: "Show sharing button"
          }}/>
          <boolean keyName="showLikeButton" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
            desc: "Show like button"
          }}/>
        </object>
        <string
          title="Post format"
          keyName="format"
          ui="radio"
          uiParams={{
            options: [{
              text: 'Standard',
              value: "standard"
            }, {
              text: 'Image',
              value: "image"
            }],
            defaultSelected: 0
          }}/>
        <object keyName="other" title="More Options">
          <string keyName="slug" title="Slug" description="The slug is the URL-friendly version of the page title."/>
          <string
            keyName="excerpt"
            ui="textarea"
            title="Excerpt"
            description="An excerpt is a short summary you can add to your posts. Some themes show excerpts alongside post titles on your site's homepage and archive pages."/>
          <boolean keyName="allowComment" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
            desc: "Allow comments",
            help: "Provide a comment section to give readers the ability to respond."
          }}/>
        </object>
      </Focus>
    </array>
    <array keyName="category" title="Category" hide={true} uiParams={{
      columns: [{
        title: 'Title',
        dataIndex: 'name'
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
        }}/>
    </array>
  </root>
);
