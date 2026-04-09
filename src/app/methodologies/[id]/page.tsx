// 방법론 상세 페이지 - 서버 컴포넌트
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  CalendarDays,
  Tag,
  Globe2,
  Building,
  Layers,
} from "lucide-react";
import { FormulaDisplay } from "@/components/common/formula-display";
import { BookmarkButton } from "@/components/methodology/bookmark-button";
import { methodologies } from "@/data/methodologies";
import { sectoralScopes } from "@/data/sectoral-scopes";
import { governingBodies } from "@/data/governing-bodies";
import type {
  MethodologyType,
  MethodologyStatus,
  AdditionalityType,
  CdmCategory,
} from "@/types";

// 정적 경로 생성
export async function generateStaticParams() {
  return methodologies.map((m) => ({ id: m.id }));
}

// 동적 메타데이터
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const method = methodologies.find((m) => m.id === id);
  if (!method) return { title: "방법론을 찾을 수 없습니다" };
  return {
    title: `${method.id} ${method.name}`,
    description: method.description,
  };
}

// 유형 뱃지
function TypeBadge({ type }: { type: MethodologyType }) {
  const styles: Record<MethodologyType, string> = {
    CDM: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    DOMESTIC:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };
  const labels: Record<MethodologyType, string> = {
    CDM: "CDM 방법론",
    DOMESTIC: "국내 방법론",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[type]}`}
    >
      {labels[type]}
    </span>
  );
}

// 상태 뱃지
function StatusBadge({ status }: { status: MethodologyStatus }) {
  const styles: Record<MethodologyStatus, string> = {
    active:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    superseded: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    inactive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  const labels: Record<MethodologyStatus, string> = {
    active: "유효",
    superseded: "대체됨",
    inactive: "비활성",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

// CDM 분류 레이블
function cdmCategoryLabel(cat?: CdmCategory): string {
  if (!cat) return "-";
  const map: Record<CdmCategory, string> = {
    AM: "AM (주요방법론)",
    ACM: "ACM (통합방법론)",
    AMS: "AMS (소규모방법론)",
    "AR-AM": "AR-AM (조림 주요방법론)",
    "AR-AMS": "AR-AMS (소규모 조림)",
    CCS: "CCS (탄소포집저장)",
  };
  return map[cat] ?? cat;
}

// 추가성 레이블
function additionalityLabel(type: AdditionalityType): string {
  const map: Record<AdditionalityType, string> = {
    legal: "법적 추가성",
    "legal+economic": "법적 + 경제적 추가성",
  };
  return map[type] ?? type;
}

export default async function MethodologyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const method = methodologies.find((m) => m.id === id);

  // 방법론이 없으면 404
  if (!method) notFound();

  // 관련 방법론: 같은 사업분야 중 자신 제외 최대 3개
  const related = methodologies
    .filter(
      (m) =>
        m.id !== method.id &&
        m.sectoralScopes.some((s) => method.sectoralScopes.includes(s))
    )
    .slice(0, 3);

  // 사업분야 이름
  const scopeNames = method.sectoralScopes
    .map((sid) => sectoralScopes.find((s) => s.id === sid)?.nameKo ?? sid)
    .join(", ");

  // 관장기관 이름
  const govBody = method.governingBody
    ? governingBodies.find((g) => g.id === method.governingBody)
    : undefined;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* 뒤로 가기 */}
        <Link
          href="/methodologies"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          방법론 목록으로
        </Link>

        {/* 헤더 */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
              <p className="mb-1 font-mono text-sm text-muted-foreground">
                {method.id}
              </p>
              <h1 className="text-xl font-bold leading-tight text-foreground sm:text-2xl">
                {method.name}
              </h1>
              {method.nameEn && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {method.nameEn}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <TypeBadge type={method.type} />
                <StatusBadge status={method.status} />
              </div>
            </div>
            {/* 북마크 버튼 (클라이언트 컴포넌트) */}
            <BookmarkButton methodologyId={method.id} />
          </div>

          {/* 기본 정보 그리드 */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                유형
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {method.type === "CDM" ? "CDM 방법론" : "국내 방법론"}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Globe2 className="h-3.5 w-3.5" />
                CDM 분류
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {cdmCategoryLabel(method.cdmCategory)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Layers className="h-3.5 w-3.5" />
                사업분야
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {scopeNames}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Building className="h-3.5 w-3.5" />
                관장기관
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {govBody ? govBody.nameKo : "-"}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                등록일
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {method.registrationDate ?? "-"}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                버전
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {method.version}
              </p>
            </div>
          </div>
        </div>

        {/* 세부 섹션들 */}
        <div className="mt-6 space-y-4">
          {/* 1. 적용조건 */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-3 text-base font-semibold text-foreground">
              적용조건
            </h2>
            {method.applicability && method.applicability.length > 0 ? (
              <ul className="space-y-2">
                {method.applicability.map((cond, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {idx + 1}
                    </span>
                    {cond}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                적용조건 정보가 없습니다.
              </p>
            )}
          </section>

          {/* 2. 베이스라인 설정 */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-3 text-base font-semibold text-foreground">
              베이스라인 설정
            </h2>
            <p className="text-sm leading-relaxed text-foreground">
              {method.baselineApproach}
            </p>
          </section>

          {/* 3. 모니터링 방법론 */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-3 text-base font-semibold text-foreground">
              모니터링 방법론
            </h2>
            <p className="text-sm leading-relaxed text-foreground">
              {method.monitoringMethod}
            </p>
          </section>

          {/* 4. 감축량 산정 */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-3 text-base font-semibold text-foreground">
              감축량 산정
            </h2>
            <FormulaDisplay formula={method.emissionFormula ?? "ER = BE - PE - LE"} showLegend />
          </section>

          {/* 5. 추가성 요건 */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-3 text-base font-semibold text-foreground">
              추가성 요건
            </h2>
            <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
              <span className="text-sm font-medium text-primary">
                {additionalityLabel(method.additionality ?? "legal")}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {(method.additionality ?? "legal") === "legal"
                ? "해당 사업이 법적으로 요구되지 않음을 증명하는 법적 추가성 요건을 적용합니다."
                : "법적 추가성과 함께 경제적으로 해당 사업이 없이는 수익성이 없음을 입증하는 경제적 추가성 요건을 적용합니다."}
            </p>
          </section>
        </div>

        {/* 출처 URL */}
        {method.sourceUrl && (
          <div className="mt-4 rounded-xl border border-border bg-card p-4">
            <a
              href={method.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              원문 문서 보기
            </a>
          </div>
        )}

        {/* 관련 방법론 */}
        {related.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              같은 사업분야 방법론
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/methodologies/${rel.id}`}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                >
                  <p className="font-mono text-xs text-muted-foreground">
                    {rel.id}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary">
                    {rel.name}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <TypeBadge type={rel.type} />
                    <StatusBadge status={rel.status} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
