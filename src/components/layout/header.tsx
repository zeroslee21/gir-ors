"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Leaf,
  Menu,
  X,
  Moon,
  Sun,
  BarChart3,
  BookOpen,
  Building2,
  Search,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 네비게이션 메뉴 항목 정의
const navItems = [
  { href: "/methodologies", label: "방법론 탐색", icon: Search },
  { href: "/sectors", label: "사업분야", icon: Layers },
  { href: "/statistics", label: "통계", icon: BarChart3 },
  { href: "/agencies", label: "관장기관", icon: Building2 },
  { href: "/guide", label: "제도 안내", icon: BookOpen },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight">
              ORS 탐색기
            </span>
            <span className="hidden text-[11px] leading-tight text-muted-foreground sm:block">
              한국 상쇄등록부 감축방법론
            </span>
          </div>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center gap-2">
          {/* 다크모드 토글 */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="테마 변경"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-accent md:hidden"
            aria-label="메뉴"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 네비게이션 */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
