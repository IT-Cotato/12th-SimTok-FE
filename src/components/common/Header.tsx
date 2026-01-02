"use client";

import { BackHeader } from "@/components/common/BackHeader";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return <BackHeader title={title} />;
}
