'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboard from "@/features/admin/components/AdminDashboard";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
