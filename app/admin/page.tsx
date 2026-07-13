import { isAuthenticated } from "@/lib/auth";
import { getSiteContent } from "@/lib/storage";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata = {
  title: "Admin — ดวงจันทร์ CMS",
};

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return <AdminLogin />;
  }

  const content = await getSiteContent();
  return <AdminPanel initialContent={content} />;
}
