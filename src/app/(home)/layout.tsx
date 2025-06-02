import HomeLayout from "@/modules/home/ui/layout/home-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}
