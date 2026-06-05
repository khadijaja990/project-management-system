import Sidebar from "./Sidebar";

function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f3ff]">

      <Sidebar />

      <div className="flex-1">
        {children}
      </div>

    </div>
  );
}

export default MainLayout;