'use client';

import LoginForm from '@/domain/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-teal-600 mb-2">LIF</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Life, Intelligence, Future</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
