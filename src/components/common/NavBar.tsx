"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/constants/navBarItems";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed bottom-0 left-1/2 z-50 grid h-[112px] w-full max-w-[440px] -translate-x-1/2 grid-cols-5 ${pathname === "/garden" ? "" : "bg-white"} p-4`}
    >
      {NAV_ITEMS.map(({ key, label, href, icons }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        const Icon = isActive ? icons.fill : icons.blank;

        return (
          <Link key={key} href={href}>
            <div className="flex flex-col items-center justify-center gap-[5px]">
              {/* box-shadow 디자인추가해야함 */}
              <Icon
                className={`${pathname === "/garden" ? "text-neutral-07" : "text-neutral-04"} h-6 w-6`}
              />
              <p
                className={`${pathname === "/garden" ? "text-neutral-07" : "text-neutral-04"} text-navigation`}
              >
                {label}
              </p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
