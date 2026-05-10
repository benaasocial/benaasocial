import Sidebar from "@/components/Sidebar/Sidebar";

/**
 * Dashboard layout
 */
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">

      {/* Sidebar section */}
      <div className="shrink-0">
        <Sidebar />
      </div>

      {/* Main page content */}
      <main className="flex-1 min-h-screen overflow-x-hidden p-2">
        {children}
      </main>
    </div>
  );
}