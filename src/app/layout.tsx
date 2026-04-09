import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "ORS 탐색기 - 한국 상쇄등록부 감축방법론",
    template: "%s | ORS 탐색기",
  },
  description:
    "한국 온실가스종합정보센터(GIR) 상쇄등록부시스템(ORS)에 등록된 314건의 감축방법론을 탐색하고 분석할 수 있는 플랫폼입니다.",
  keywords: [
    "배출권거래제",
    "감축방법론",
    "상쇄등록부",
    "ORS",
    "CDM",
    "온실가스",
    "탄소배출권",
    "외부사업",
  ],
  openGraph: {
    title: "ORS 탐색기 - 한국 상쇄등록부 감축방법론",
    description:
      "314건의 감축방법론을 탐색하고 분석할 수 있는 플랫폼",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
