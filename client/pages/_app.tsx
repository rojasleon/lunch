import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react';
import Header from '../components/header';
import { store } from '../state/store';
import 'semantic-ui-css/semantic.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  );
}

export default MyApp;
