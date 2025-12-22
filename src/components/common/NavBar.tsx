"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/constants/navBarItems";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav>
      {NAV_ITEMS.map(({ key, label, href, icons }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        const Icon = isActive ? icons.fill : icons.blank;

        return (
          <Link key={key} href={href}>
            <div>
              <Icon />
              <p>{label}</p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
