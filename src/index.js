import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Heading from './Heading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Heading/>
    <App />
  </React.StrictMode>
);
