"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // QueryClient 인스턴스를 상태로 관리하여 컴포넌트 리렌더링 시에도 유지되도록 합니다.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분 동안은 데이터를 신선하다고 판단
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
