import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar"; // POPRAWIONA ŚCIEŻKA
import { Header } from "@/components/Header";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary/10 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}