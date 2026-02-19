import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const baseHost = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000';
const BASE_API = codespaceName ? `https://${baseHost}/api` : `http://${baseHost}/api`;
console.log('BASE_API set to', BASE_API);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
