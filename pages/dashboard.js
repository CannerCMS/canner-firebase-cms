import dynamic from 'next/dynamic';
import {Route} from 'react-router';
const DynamicCMS = dynamic(import('../components/cms'), { ssr: false })

export default () => <DynamicCMS/>;
