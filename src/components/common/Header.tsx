"use client";

import { BackHeader } from "@/components/common/BackHeader";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return <BackHeader title={title} />;
};

export default Header;
