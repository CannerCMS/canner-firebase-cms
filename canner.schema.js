/** @jsx builder */

// eslint-disable-next-line no-unused-vars
import builder, {Block, Layout, Default} from 'canner-script';
import Focus from 'app/components/layouts/focus';
import Tabs from 'app/components/layouts/tabs';
import TabsFilter from './customize-cms-component/filter.js';
import utils from './utils';
const {connector, storage} = utils;
const Img = ({attributes}) => (
  <object keyName={attributes.keyName} title={attributes.title}>
    <string keyName="imageName" title="imageName" />
    <file keyName="imageSrc" title="imageSrc" contentType="images/*" />
  </object>
);

const siteDesc = `Edit, update, add your new page in your blog.`;
const postDesc = `Post dashboard is the place you manage all your blog posts.`;

export default (
  <root connector={connector}>
    <array keyName="pages" title="Pages" ui="tableRoute" description={siteDesc}
      storage={storage}
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
          title: 'Published',
          condition: {
            status: {
              draft: {
                eq: false
              },
            },
            trash: {
              eq: false
            }
          }
        }, {
          title: 'Drafts',
          condition: {
            status: {
              draft: {
                eq: true
              },
            },
            trash: {
              eq: false
            }
          }
        }, {
          title: 'Trashed',
          condition: {
            trash: {
              eq: true
            }
          }
        }]} search={{
          title: 'Search title',
          key: 'title'
        }} component={TabsFilter}/>
      </toolbar>
      <Layout component={Focus} focus={["title", "url", "content"]}>
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
        <image keyName="featureImage" title="Feature Image"/>
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
        <boolean title="Move to trash" keyName="trash" packageName="./customize-cms-component/custom-boolean-trash_btn" uiParams={{
          true: {
            title: 'Deleted Page',
            desc: 'This page has been sent to the trash. Restore it to continue writing.'
          },
          false: {
            text: "Move to trash",
            confirmText: "Are you sure you want to trash this page?",
          }
        }}/>
      </Layout>
    </array>
    <array keyName="posts" title="Posts" ui="tableRoute" description={postDesc}
      storage={storage}
      uiParams={{
        columns: [{
          title: 'Title',
          dataIndex: 'title'
        }, {
          title: 'Category',
          dataIndex: 'category.name'
        }]
      }}
    >
      <toolbar>
        <pagination />
        <filter fields={[{
          title: 'Published',
          condition: {
            status: {
              draft: {
                eq: false
              },
            },
            trash: {
              eq: false
            }
          }
        }, {
          title: 'Drafts',
          condition: {
            status: {
              draft: {
                eq: true
              },
            },
            trash: {
              eq: false
            }
          }
        }, {
          title: 'Trashed',
          condition: {
            trash: {
              eq: true
            }
          }
        }]} search={{
          title: 'Search name',
          key: 'name'
        }} component={TabsFilter} />
      </toolbar>
      <Layout component={Focus} focus={["title", "content"]}>
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
        <Default title="Categories & Tags" keyName="CategoriesAndTags">
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
        </Default>
        
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
        <boolean title="Move to trash" keyName="trash" packageName="./customize-cms-component/custom-boolean-trash_btn" uiParams={{
          true: {
            title: 'Deleted Page',
            desc: 'This page has been sent to the trash. Restore it to continue writing.'
          },
          false: {
            text: "Move to trash",
            confirmText: "Are you sure you want to trash this page?",
          }
        }}/>
      </Layout>
    </array>
    <array keyName="category" title="Category" hide={true}
      storage={storage}
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
        }}/>
    </array>
  </root>
);
