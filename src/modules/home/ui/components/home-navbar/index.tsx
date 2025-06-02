import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthButton from "@/modules/auth/ui/auth-button";
import SearchInput from "@/modules/home/ui/components/home-navbar/search-input";
import Image from "next/image";
import Link from "next/link";

export default function HomeNavbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center bg-white px-2 pr-5">
      <div className="flex w-full items-center gap-4">
        {/* 메뉴와 로고 */}
        <div className="flex shrink-0 items-center">
          <SidebarTrigger />
          <Link href={"/"}>
            <div className="flex items-center gap-1 p-4">
              <Image src={"/next.svg"} alt="Logo" width={32} height={32} />
              <p>K-tube</p>
            </div>
          </Link>
        </div>

        {/* 검색바 */}
        <div className="mx-auto flex max-w-[720px] flex-1 justify-center">
          <SearchInput />
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
