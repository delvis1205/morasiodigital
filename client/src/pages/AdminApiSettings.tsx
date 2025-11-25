import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import AdminLayout from "./admin/AdminLayout";
import ApiSettings from "./admin/ApiSettings";

export default function AdminApiSettingsPage() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!user || user.role !== "admin") {
    setLocation("/login");
    return null;
  }

  return (
    <AdminLayout>
      <ApiSettings />
    </AdminLayout>
  );
}
