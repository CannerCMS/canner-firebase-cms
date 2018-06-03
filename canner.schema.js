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
const postDesc = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`;

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
        <filter fields={[{
          key: 'title',
          type: 'text',
          label: 'Title'
        }]}/>
      </toolbar>
      <Focus focus={["title", "url", "content"]}>
        <string keyName="title" title="Title" />
        <string keyName="url" title="URL" packageName="./customize-cms-component/custom-string-url" />
        <object keyName="content" title="Content" ui="editor" />
        <object keyName="status" title="Status">
          <string keyName="publish" packageName="./customize-cms-component/custom-string-schedule_btn" />
          <boolean keyName="draft" packageName="./customize-cms-component/custom-boolean-switch_desc" uiParams={{
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
        <object keyName="other" title="More options">
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
          key: 'title',
          type: 'text',
          label: 'Title'
        }]}/>
      </toolbar>
      <Focus focus={["title", "content"]}>
        <string keyName="title" title="Title" />
        <object keyName="content" title="Content" ui="editor" />
        <object keyName="status" title="Status">
          <string keyName="publish" packageName="./customize-cms-component/custom-string-schedule_btn" />
          <boolean keyName="draft" packageName="./customize-cms-component/custom-boolean-switch_desc" uiParams={{
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
        <object keyName="other" title="More options">
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
  </root>
);
