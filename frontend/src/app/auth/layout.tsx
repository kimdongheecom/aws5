'use client';

import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-violet-200 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-4 w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-50 animate-pulse-slow-delay"></div>
      </div>
      
      <main className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
} 