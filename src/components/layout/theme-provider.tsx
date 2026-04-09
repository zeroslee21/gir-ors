"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// 다크모드 테마 프로바이더
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
