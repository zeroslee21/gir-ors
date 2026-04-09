// 홈페이지 - 서버 컴포넌트 (GIR ORS 방법론 탐색기)
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Globe2,
  BarChart3,
  Layers,
  Zap,
  Cable,
  Building2,
  Factory,
  FlaskConical,
  HardHat,
  Truck,
  Mountain,
  Anvil,
  Wind,
  CloudFog,
  Droplets,
  Recycle,
  TreePine,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { StatCard } from "@/components/common/stat-card";
import { FormulaDisplay } from "@/components/common/formula-display";
import { methodologies } from "@/data/methodologies";
import { sectoralScopes } from "@/data/sectoral-scopes";

// Lucide 아이콘 이름 → 컴포넌트 매핑
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Cable,
  Building2,
  Factory,
  FlaskConical,
  HardHat,
  Truck,
  Mountain,
  Anvil,
  Wind,
  CloudFog,
  Droplets,
  Recycle,
  TreePine,
  Wheat,
};

export default function HomePage() {
  // 사업분야별 방법론 건수 집계
  const scopeCountMap = new Map<number, number>();
  for (const scope of sectoralScopes) {
    const count = methodologies.filter((m) =>
      m.sectoralScopes.includes(scope.id)
    ).length;
    scopeCountMap.set(scope.id, count);
  }

  const totalCount = methodologies.length;
  const cdmCount = methodologies.filter((m) => m.type === "CDM").length;
  const domesticCount = methodologies.filter(
    (m) => m.type === "DOMESTIC"
  ).length;

  return (
    <main className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative border-b border-border bg-gradient-to-b from-primary/5 to-background px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Globe2 className="h-3.5 w-3.5" />
            <span>한국 온실가스 감축 정보 플랫폼</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            한국 상쇄등록부
            <br />
            <span className="text-primary">감축방법론 탐색기</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            온실가스종합정보센터(GIR) 상쇄등록부(ORS)에 등록된{" "}
            <strong className="text-foreground">314건의 감축방법론</strong>을
            검색하고 분석하세요. CDM 방법론 211건과 국내 방법론 103건을 한곳에서
            확인할 수 있습니다.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/methodologies"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              방법론 탐색 시작
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sectors"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              사업분야 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 통계 카드 섹션 */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="전체 방법론"
              value={`${totalCount}건`}
              description="CDM + 국내 방법론"
              icon={BookOpen}
            />
            <StatCard
              title="CDM 방법론"
              value={`${cdmCount}건`}
              description="UNFCCC CDM 방법론"
              icon={Globe2}
            />
            <StatCard
              title="국내 방법론"
              value={`${domesticCount}건`}
              description="국내 자체 개발 방법론"
              icon={BarChart3}
            />
            <StatCard
              title="사업분야"
              value="15개"
              description="UNFCCC CDM 분야별 범위"
              icon={Layers}
            />
          </div>
        </div>
      </section>

      {/* 사업분야별 현황 */}
      <section className="border-t border-border bg-muted/20 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              사업분야별 현황
            </h2>
            <p className="mt-2 text-muted-foreground">
              UNFCCC CDM 분야별 범위(Sectoral Scope) 15개 카테고리별 방법론 현황
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sectoralScopes.map((scope) => {
              const Icon = iconMap[scope.icon] ?? Layers;
              const count = scopeCountMap.get(scope.id) ?? 0;
              return (
                <Link
                  key={scope.id}
                  href={`/sectors/${scope.id}`}
                  className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {count}건
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {scope.nameKo}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {scope.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 핵심 산정 공식 */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              핵심 산정 공식
            </h2>
            <p className="mt-2 text-muted-foreground">
              감축방법론의 핵심 원리인 온실가스 감축량 산정 방식
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <FormulaDisplay formula="ER = BE - PE - LE" showLegend />
          </div>
        </div>
      </section>

      {/* 제도 현황 */}
      <section className="border-t border-border bg-muted/20 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              제도 현황
            </h2>
            <p className="mt-2 text-muted-foreground">
              한국 온실가스 감축사업 관련 주요 정책 및 제도 현황
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* CDM 종료 */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                CDM 종료
              </div>
              <h3 className="text-base font-bold text-foreground">
                청정개발체제(CDM) 종료
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                UNFCCC 교토의정서 체계의 CDM은 2027년 말 공식 종료 예정.
                등록된 방법론은 국내 외부사업으로 계속 활용됩니다.
              </p>
              <p className="mt-3 text-xs font-medium text-primary">2027년 종료 예정</p>
            </div>

            {/* 제4차 기본계획 */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                진행 중
              </div>
              <h3 className="text-base font-bold text-foreground">
                제4차 배출권거래제 기본계획
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                2026~2035년을 계획기간으로 하는 제4차 기본계획에서 외부사업
                감축방법론의 확대 및 다양화를 추진합니다.
              </p>
              <p className="mt-3 text-xs font-medium text-primary">2026~2035년 계획기간</p>
            </div>

            {/* 파리협정 제6조 */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                국제협력
              </div>
              <h3 className="text-base font-bold text-foreground">
                파리협정 제6조 이행
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                파리협정 제6조에 따른 국제감축활동(ITMOs) 연계를 위해 국내
                방법론의 국제 정합성 제고가 추진되고 있습니다.
              </p>
              <p className="mt-3 text-xs font-medium text-primary">ITMO 연계 추진 중</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
