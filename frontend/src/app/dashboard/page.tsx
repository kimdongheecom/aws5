'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/features/dashboard/compoenets";
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();
  
  return (
    <ProtectedRoute role={['user', 'subscriber']}>
      <div className="dashboard-container">
        <h1 className="text-2xl font-bold mb-4">사용자 대시보드</h1>
        {session?.user?.name && (
          <p className="mb-5">안녕하세요, {session.user.name}님!</p>
        )}
        <Dashboard />
      </div>
    </ProtectedRoute>
  );
} 