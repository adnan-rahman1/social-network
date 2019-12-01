import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// APP CSS
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// END

import store from './redux/store';
import {Provider} from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, 
  document.getElementById('root')
);

