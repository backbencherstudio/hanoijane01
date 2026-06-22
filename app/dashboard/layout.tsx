import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-[#f9fafb]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
