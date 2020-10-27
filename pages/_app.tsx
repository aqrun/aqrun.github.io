import 'antd/lib/style/themes/default.less';
import 'antd/dist/antd.less';
import 'antd/dist/antd.compact.less';
import '../assets/antd-custom.less';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
};

export default App;
