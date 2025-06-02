import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import MainSection from "@/modules/home-sidebar/main-section";
import PersonalSection from "@/modules/home-sidebar/personal-section";

export default function HomeSidebar() {
  return (
    <Sidebar className="z-40 border-none pt-16" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
}
