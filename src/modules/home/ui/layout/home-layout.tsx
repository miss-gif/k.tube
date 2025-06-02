import { SidebarProvider } from "@/components/ui/sidebar";
import HomeSidebar from "@/modules/home-sidebar";
import HomeNavbar from "@/modules/home/ui/components/home-navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
