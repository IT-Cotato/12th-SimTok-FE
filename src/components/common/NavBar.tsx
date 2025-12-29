"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/constants/navBarItems";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="grid grid-cols-1 items-center justify-center">
      {NAV_ITEMS.map(({ key, label, href, icons }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        const Icon = isActive ? icons.fill : icons.blank;

        return (
          <Link key={key} href={href}>
            <div className="flex flex-col">
              {" "}
              {/* 디자인추가해야함 */}
              <Icon />
              <p>{label}</p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
