import { AdminLayout } from "./_components/AdminLayout";
import { HomePage } from "./_components/HomePage";

export default function Home() {
  return (
    <div>
      <AdminLayout>
        <HomePage />
      </AdminLayout>
    </div>
  );
}
