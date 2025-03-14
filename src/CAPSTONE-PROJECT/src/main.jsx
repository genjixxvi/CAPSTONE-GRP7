import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/contextProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
);
