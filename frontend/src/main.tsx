import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from '../src/app/App.tsx'
import { Provider } from 'react-redux';
import store from './redux/store.js';
import ErrorBoundary from './components/custom/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
)