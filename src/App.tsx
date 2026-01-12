import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { router } from './routes';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
};

export default App;