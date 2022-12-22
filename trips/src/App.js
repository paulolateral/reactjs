import {BrowserRouter, Router} from 'react-router-dom';
import Rotas from './routes';
import Header from './component/Header';
import { Provider } from 'react-redux';
import store from './store';
import history from './services/history';

export default function App() {
 return (
  <Provider store={store}>
    <BrowserRouter  history={history}>
      
        <Header />
        <Rotas/>
      
    </BrowserRouter>
  </Provider>
  );
}