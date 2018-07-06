import dynamic from 'next/dynamic';
import LockScreenLoading from '../components/lockScreenLoading';
import 'antd/dist/antd.less';

const DynamicCMS = dynamic(import('../components/cms'), {
  ssr: false,
  loading: () => <LockScreenLoading/>
})

export default class extends React.Component {
  render() {
    return <DynamicCMS/>;
  }
}
