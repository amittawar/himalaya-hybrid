import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { Loader2 } from 'lucide-react';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="animate-spin h-10 w-10 text-[#2d5a27]" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'product/:catId/:cropId/:prodId',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductDetailPage />
          </Suspense>
        ),
      },
      // Redirect unknown routes to home
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ],
  },
], {
  basename: '/'
});
