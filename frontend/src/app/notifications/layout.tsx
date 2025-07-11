import ClientLayout from "@/components/Common/ClientLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ClientLayout>{children}</ClientLayout>
    </ProtectedRoute>
  );
} 