
/** @jsx builder */
import builder, {Layout, Row, Col} from 'canner-script';
import Panel from './layouts/panel';

const Collapse = ({children}) => <Layout component={Panel}>{children}</Layout>
export const Focus = ({children, attributes: {focusKeys}}) => {
  return (
    <Row type="flex" gutter={16}>
      <Col xs={24} sm={24} md={16} lg={16}>
        {
          children.filter(child => focusKeys.includes(child.keyName))
        }
      </Col>
      <Col xs={24} sm={24} md={8} lg={8}>
        <Collapse>
          {
            children.filter(child => !focusKeys.includes(child.keyName))
          }
        </Collapse>
      </Col>
    </Row>
  );
}
