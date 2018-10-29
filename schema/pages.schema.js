/** @jsx builder */

import builder, {Default} from 'canner-script';
import TabsFilter from './customize-cms-component/filter.js';
import {Focus} from './utils.schema';
import {renderUrl, renderStatus} from './utils/columns';

const siteDesc = `Edit, update, add your new page in your blog.`;

export default () => (
  <array keyName="pages" title="Pages" ui="tableRoute" description={siteDesc}
    uiParams={{
      columns: [{
        title: 'Title',
        dataIndex: 'title'
      }, {
        title: 'Url',
        dataIndex: 'Url',
        render: renderUrl
      }, {
        title: 'Status',
        dataIndex: 'status',
        render: renderStatus
      }]
    }}
  >
    <toolbar>
      <pagination />
      {/* customized filter bar */}
      <filter component={TabsFilter} />
    </toolbar>
    <Focus focusKeys={['title', 'url', 'content']}>
      <string keyName="title" title="Title" />
      <string keyName="url" title="URL" packageName="./customize-cms-component/custom-string-url" />
      <object keyName="content" title="Content" ui="editor" />
      <Default keyName="status" title="Status">
        <string keyName="publish" packageName="./customize-cms-component/custom-string-schedule_btn" />
        <boolean keyName="draft" packageName="./customize-cms-component/custom-boolean-review_btn" uiParams={{
          desc: "Pending review",
          help: "Flag this post to be reviewed for approval."
        }}/>
      </Default>
      <image keyName="featureImage" title="Feature Image"/>
      <Default keyName="pageProperty" title="Page Property">
        <boolean keyName="topLevel" title="Parent page" packageName="./customize-cms-component/custom-boolean-switch_desc" uiParams={{
          desc: "Top level",
          help: "Disable to select a parent page"
        }}/>
        <number keyName="order" title="Order" uiParams={{min: 0}}/>
      </Default>
      <Default keyName="share" title="Sharing">
        <boolean keyName="showShareButton" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
          desc: "Show sharing button"
        }}/>
        <boolean keyName="showLikeButton" packageName="./customize-cms-component/custom-boolean-check_desc" uiParams={{
          desc: "Show like button"
        }}/>
      </Default>
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