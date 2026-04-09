"use client";

// 방법론 탐색 페이지 - 클라이언트 컴포넌트 (검색·필터·페이지네이션)
import { useMemo } from "react";
import Link from "next/link";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useMethodologyFilter } from "@/hooks/use-methodology-filter";
import { methodologies } from "@/data/methodologies";
import { sectoralScopes } from "@/data/sectoral-scopes";
import { governingBodies } from "@/data/governing-bodies";
import type { MethodologyStatus, MethodologyType, CdmCategory } from "@/types";

// 유형별 뱃지 색상
function TypeBadge({ type }: { type: MethodologyType }) {
  const styles: Record<MethodologyType, string> = {
    CDM: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    DOMESTIC:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };
  const labels: Record<MethodologyType, string> = {
    CDM: "CDM",
    DOMESTIC: "국내",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[type]}`}
    >
      {labels[type]}
    </span>
  );
}

// 상태별 뱃지 색상
function StatusBadge({ status }: { status: MethodologyStatus }) {
  const styles: Record<MethodologyStatus, string> = {
    active:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    superseded: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    inactive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  const labels: Record<MethodologyStatus, string> = {
    active: "유효",
    superseded: "대체",
    inactive: "비활성",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function MethodologiesPage() {
  const {
    query,
    setQuery,
    filters,
    updateFilter,
    resetFilters,
    results,
    totalResults,
    page,
    setPage,
    totalPages,
  } = useMethodologyFilter(methodologies);

  // 사업분야 ID → 한국어 이름 매핑
  const scopeNameMap = useMemo(
    () =>
      new Map(sectoralScopes.map((s) => [s.id, s.nameKo])),
    []
  );

  // 필터 활성 여부
  const hasFilters =
    query.trim() !== "" ||
    Object.values(filters).some((v) => v !== undefined && v !== "");

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            감축방법론 탐색
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            한국 상쇄등록부에 등록된 CDM 및 국내 감축방법론을 검색하고
            필터링합니다.
          </p>
        </div>

        {/* 검색창 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="방법론 번호, 이름, 설명으로 검색..."
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="검색어 지우기"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* 필터 행 */}
        <div className="mb-4 flex flex-wrap gap-2">
          {/* 유형 필터 */}
          <select
            value={filters.type ?? ""}
            onChange={(e) =>
              updateFilter(
                "type",
                e.target.value as MethodologyType | "all" | undefined || undefined
              )
            }
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="유형 필터"
          >
            <option value="">유형 전체</option>
            <option value="CDM">CDM</option>
            <option value="DOMESTIC">국내</option>
          </select>

          {/* CDM 분류 필터 */}
          <select
            value={filters.cdmCategory ?? ""}
            onChange={(e) =>
              updateFilter(
                "cdmCategory",
                (e.target.value as CdmCategory) || undefined
              )
            }
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="CDM 분류 필터"
          >
            <option value="">CDM분류 전체</option>
            <option value="AM">AM (주요방법론)</option>
            <option value="ACM">ACM (통합방법론)</option>
            <option value="AMS">AMS (소규모)</option>
            <option value="AR-AM">AR-AM (조림)</option>
            <option value="AR-AMS">AR-AMS (소규모 조림)</option>
            <option value="CCS">CCS (탄소포집)</option>
          </select>

          {/* 사업분야 필터 */}
          <select
            value={filters.sectoralScope?.toString() ?? ""}
            onChange={(e) =>
              updateFilter(
                "sectoralScope",
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="사업분야 필터"
          >
            <option value="">사업분야 전체</option>
            {sectoralScopes.map((scope) => (
              <option key={scope.id} value={scope.id}>
                {scope.id}. {scope.nameKo}
              </option>
            ))}
          </select>

          {/* 관장기관 필터 */}
          <select
            value={filters.governingBody ?? ""}
            onChange={(e) =>
              updateFilter("governingBody", e.target.value || undefined)
            }
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="관장기관 필터"
          >
            <option value="">관장기관 전체</option>
            {governingBodies.map((gb) => (
              <option key={gb.id} value={gb.id}>
                {gb.nameKo}
              </option>
            ))}
          </select>

          {/* 상태 필터 */}
          <select
            value={filters.status ?? ""}
            onChange={(e) =>
              updateFilter(
                "status",
                (e.target.value as MethodologyStatus) || undefined
              )
            }
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="상태 필터"
          >
            <option value="">상태 전체</option>
            <option value="active">유효</option>
            <option value="superseded">대체</option>
            <option value="inactive">비활성</option>
          </select>

          {/* 필터 초기화 버튼 */}
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              초기화
            </button>
          )}
        </div>

        {/* 결과 건수 */}
        <p className="mb-3 text-sm text-muted-foreground">
          총{" "}
          <strong className="text-foreground">{methodologies.length}건</strong>{" "}
          중{" "}
          <strong className="text-foreground">{totalResults}건</strong> 표시
        </p>

        {/* 데이터 테이블 */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-foreground">
                  번호
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  방법론명
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-foreground">
                  유형
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-foreground">
                  사업분야
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-foreground">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {results.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                results.map((method) => (
                  <tr
                    key={method.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                      {method.id}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/methodologies/${method.id}`}
                        className="font-medium text-foreground hover:text-primary hover:underline"
                      >
                        {method.name}
                      </Link>
                      {method.nameEn && (
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                          {method.nameEn}
                        </p>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <TypeBadge type={method.type} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {method.sectoralScopes.slice(0, 2).map((sid) => (
                          <span
                            key={sid}
                            className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {scopeNameMap.get(sid) ?? sid}
                          </span>
                        ))}
                        {method.sectoralScopes.length > 2 && (
                          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            +{method.sectoralScopes.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusBadge status={method.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              이전
            </button>
            <span className="text-sm text-muted-foreground">
              {page} / {totalPages} 페이지
            </span>
            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              다음
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
