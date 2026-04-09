// 관장기관 목록 페이지 - 서버 컴포넌트
import type { Metadata } from "next";
import { ExternalLink, Building2, Globe } from "lucide-react";
import { governingBodies } from "@/data/governing-bodies";
import { methodologies } from "@/data/methodologies";

export const metadata: Metadata = {
  title: "관장기관",
  description: "5개 관장기관이 방법론을 개발하고 승인합니다",
};

export default function AgenciesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">관장기관</h1>
        <p className="mt-2 text-muted-foreground">
          5개 관장기관이 방법론을 개발하고 승인합니다.
        </p>
      </div>

      {/* 요약 배너 */}
      <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">국내 자체 개발 방법론 관리 체계</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              국내 자체 개발 방법론 113건을 5개 부처가 분담 관리합니다.
              각 부처는 소관 분야의 방법론 개발, 승인 및 유지관리를 담당합니다.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <div className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
                <span className="text-muted-foreground">국내 방법론: </span>
                <span className="font-semibold text-primary">113건</span>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
                <span className="text-muted-foreground">CDM 방법론: </span>
                <span className="font-semibold text-blue-600">209건</span>
                <span className="ml-1 text-xs text-muted-foreground">(UNFCCC 직접 승인)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CDM 방법론 안내 카드 */}
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/30 dark:bg-blue-950/20">
        <div className="flex items-start gap-3">
          <Globe className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100">
              CDM 방법론: 209건 (UNFCCC 직접 승인)
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              CDM 방법론은 UNFCCC(유엔기후변화협약) 산하 CDM 집행위원회(EB)에서
              직접 승인한 방법론으로, 국내 관장기관이 별도 지정되어 있지 않습니다.
              AM (대규모), ACM (통합), AMS (소규모) 세 가지 유형으로 구분됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 관장기관 카드 그리드 */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {governingBodies.map((body) => {
          // 해당 관장기관 방법론 수 계산
          const count = methodologies.filter(
            (m) => m.governingBody === body.id
          ).length;

          return (
            <div
              key={body.id}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              {/* 기관명 */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{body.nameKo}</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {body.nameEn}
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {body.abbreviation}
                </span>
              </div>

              {/* 관할 분야 배지 */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  관할 분야
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {body.domains.map((domain) => (
                    <span
                      key={domain}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>

              {/* 방법론 수 */}
              <div className="mt-auto border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">관할 방법론</p>
                    <p className="mt-0.5 text-2xl font-bold text-primary">
                      {count}건
                    </p>
                  </div>

                  {/* 웹사이트 링크 */}
                  {body.website && (
                    <a
                      href={body.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      웹사이트
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
