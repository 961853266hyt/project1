import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from '../src/app/App.tsx'
import { Provider } from 'react-redux';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)