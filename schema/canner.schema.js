/** @jsx builder */

// eslint-disable-next-line no-unused-vars
import builder, {Layout, Default, Row, Col} from 'canner-script';
import Pages from './pages.schema';
import Posts from './posts.schema';
import Categories from './categories.schema';
import utils from './utils/index';
import {renderUrl, renderStatus} from './utils/columns';
const {connector, imageStorage} = utils;
export default (
  <root connector={connector} imageStorage={imageStorage}>
    <Pages />
    <Posts />
    <Categories />
  </root>
);
