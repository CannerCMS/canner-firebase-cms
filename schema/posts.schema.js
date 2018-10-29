/** @jsx builder */

import builder, {Default} from 'canner-script';
import {Focus} from './utils.schema';
import {renderUrl, renderStatus, renderCategory} from './utils/columns';

const postDesc = `Post dashboard is the place you manage all your blog posts.`;

export default () => (
  <array keyName="posts" title="Posts" ui="tableRoute" description={postDesc}
    uiParams={{
      columns: [{
        title: 'Title',
        dataIndex: 'title'
      }, {
        title: 'Category',
        dataIndex: 'category',
        render: renderCategory
      }]
    }}
  >
    <toolbar>
      <pagination />
      <actions>
        <filter />
      </actions>
      <filter>
        <textFilter field="title" label="Search Title" placeholder="Enter title." />
        <selectFilter
          label="Status"
          options={[{
            text: 'All',
            condition: {}
          }, {
            text: 'Published',
            condition: {
              draft: {
                eq: false
              },
              trash: {
                eq: false
              }
            }
          }, {
            text: 'Drafts',
            condition: {
              draft: {
                eq: true
              },
              trash: {
                eq: false
              }
            }
          }, {
            text: 'Trashed',
            condition: {
              trash: {
                eq: true
              }
            }
          }]}
        />
      </filter>
    </toolbar>
    <Focus focusKeys={['title', 'content']}>
      <string keyName="title" title="Title" packageName="./customize-cms-component/custom-string-title_input"/>
      <object keyName="content" title="Content" ui="editor" />
      <Default keyName="status" title="Status">
        <string keyName="publish" packageName="./customize-cms-component/custom-string-schedule_btn" />
        <boolean keyName="draft" title="Draft" packageName="./customize-cms-component/custom-boolean-review_btn" uiParams={{
          desc: "Pending review",
          help: "Flag this post to be reviewed for approval."
        }}/>
        <boolean keyName="stick" packageName="./customize-cms-component/custom-boolean-switch_desc" uiParams={{
          desc: "Stick to the front page",
          help: "Sticky posts will appear at the top of the posts listing."
        }}/>
      </Default>
      <Default title="Categories & Tags" keyName="CategoriesAndTags">
        <array keyName="tags" title="Tags" ui="tag" description="Use tags to associate more specific keywords with your posts.">
          <string/>
        </array>
        <relation keyName="category"
          title="category"
          ui="singleSelectTree"
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

      <image keyName="featureImage" title="Feature Image"/>
      <Default keyName="share" title="Sharing">
        <boolean keyName="showShareButton" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
          desc: "Show sharing button"
        }}/>
        <boolean keyName="showLikeButton" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
          desc: "Show like button"
        }}/>
      </Default>
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
      <Default keyName="other" title="More Options">
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
      </Default>
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
    </Focus>
  </array>
);