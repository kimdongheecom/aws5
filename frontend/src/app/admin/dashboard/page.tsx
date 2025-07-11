'use client';

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboard from "@/domain/admin/components/AdminDashboard";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
