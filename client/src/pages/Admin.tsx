import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2 } from "lucide-react";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/Dashboard";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    setLocation("/");
    return null;
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
