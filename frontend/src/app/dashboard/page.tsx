'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/domain/dashboard/compoenets";
import { useAuthStore } from "@/domain/auth/store/auth.store";

export default function DashboardPage() {
  const { user } = useAuthStore();
  
  return (
    <ProtectedRoute role={['user', 'subscriber']}>
      <div className="dashboard-container">
        <h1 className="text-2xl font-bold mb-4">사용자 대시보드</h1>
        {user?.name && (
          <p className="mb-5">안녕하세요, {user.name}님!</p>
        )}
        <Dashboard />
      </div>
    </ProtectedRoute>
  );
} 