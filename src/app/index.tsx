import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { withProviders } from './providers';
import { App } from './ui';
import './styles/normalize.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    {withProviders(App)()}
  </StrictMode>,
);
