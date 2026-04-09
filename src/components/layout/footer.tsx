import Link from "next/link";
import { Leaf, ExternalLink } from "lucide-react";

// 외부 참고 링크
const externalLinks = [
  {
    label: "ORS 상쇄등록부",
    href: "https://ors.gir.go.kr",
  },
  {
    label: "한국에너지공단",
    href: "https://offset.energy.or.kr",
  },
  {
    label: "KRX 배출권시장",
    href: "https://ets.krx.co.kr",
  },
  {
    label: "국가법령정보센터",
    href: "https://www.law.go.kr",
  },
];

// 사이트 네비게이션
const siteLinks = [
  { label: "방법론 탐색", href: "/methodologies" },
  { label: "사업분야", href: "/sectors" },
  { label: "통계", href: "/statistics" },
  { label: "관장기관", href: "/agencies" },
  { label: "제도 안내", href: "/guide" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 사이트 소개 */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">ORS 탐색기</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              한국 온실가스종합정보센터(GIR) 상쇄등록부시스템에 등록된 322건의
              감축방법론을 탐색하고 분석할 수 있는 플랫폼입니다.
            </p>
            <p className="mt-2 text-xs text-muted-foreground/70">
              2026년 4월 기준 데이터
            </p>
          </div>

          {/* 사이트 메뉴 */}
          <div>
            <h3 className="text-sm font-semibold">사이트 메뉴</h3>
            <ul className="mt-3 space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 외부 참고 */}
          <div>
            <h3 className="text-sm font-semibold">참고 사이트</h3>
            <ul className="mt-3 space-y-2">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            본 사이트는 공개 데이터를 기반으로 제작된 비공식 정보 플랫폼입니다.
            공식 데이터는{" "}
            <a
              href="https://ors.gir.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              ORS 상쇄등록부시스템
            </a>
            을 참고해주세요.
          </p>
        </div>
      </div>
    </footer>
  );
}
