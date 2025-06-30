'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#2e7d32',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#d32f2f',
          },
        },
      }}
    />
  );
} 