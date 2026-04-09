// 사업분야 상세 페이지 - 서버 컴포넌트
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";
import { sectoralScopes } from "@/data/sectoral-scopes";
import { methodologies } from "@/data/methodologies";

// 정적 파라미터 생성 - 15개 분야 ID를 문자열로 매핑
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return sectoralScopes.map((scope) => ({
    id: scope.id.toString(),
  }));
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sectorId = parseInt(id, 10);
  const scope = sectoralScopes.find((s) => s.id === sectorId);

  if (!scope) {
    return { title: "분야를 찾을 수 없음" };
  }

  return {
    title: `${scope.nameKo} (SS${scope.id})`,
    description: scope.description,
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sectorId = parseInt(id, 10);

  // 해당 섹터 찾기
  const scope = sectoralScopes.find((s) => s.id === sectorId);
  if (!scope) {
    notFound();
  }

  // 해당 분야 방법론 필터링
  const sectorMethodologies = methodologies.filter((m) =>
    m.sectoralScopes.includes(sectorId)
  );

  // CDM vs 국내 비율 계산
  const cdmCount = sectorMethodologies.filter((m) => m.type === "CDM").length;
  const domesticCount = sectorMethodologies.filter(
    (m) => m.type === "DOMESTIC"
  ).length;
  const total = sectorMethodologies.length;
  const cdmPercent = total > 0 ? Math.round((cdmCount / total) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 뒤로가기 링크 */}
      <Link
        href="/sectors"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        사업분야 목록으로
      </Link>

      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            SS{scope.id}
          </span>
          <h1 className="text-3xl font-bold tracking-tight">{scope.nameKo}</h1>
        </div>
        <p className="mt-1 text-lg text-muted-foreground">{scope.nameEn}</p>
        <p className="mt-3 text-muted-foreground">{scope.description}</p>
      </div>

      {/* 통계 카드 */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">해당 분야 방법론</p>
              <p className="text-2xl font-bold">{total}건</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            CDM vs 국내 비율
          </p>
          {/* 비율 시각화 바 */}
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${cdmPercent}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span className="text-blue-500">CDM {cdmCount}건 ({cdmPercent}%)</span>
            <span className="text-emerald-500">
              국내 {domesticCount}건 ({100 - cdmPercent}%)
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            분야 구분
          </p>
          <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium">
            {scope.category === "industry" ? "산업 부문" : "배출원 기반"}
          </span>
        </div>
      </div>

      {/* 방법론 목록 테이블 */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">이 분야의 방법론</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            총 {total}건의 방법론이 {scope.nameKo} 분야에 적용됩니다.
          </p>
        </div>

        {total === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground">
            이 분야에 등록된 방법론이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left text-sm font-medium text-muted-foreground">
                  <th className="px-6 py-3">번호</th>
                  <th className="px-6 py-3">방법론명</th>
                  <th className="px-6 py-3">유형</th>
                  <th className="px-6 py-3">상태</th>
                </tr>
              </thead>
              <tbody>
                {sectorMethodologies.map((method, index) => (
                  <tr
                    key={method.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/methodologies/${method.id}`}
                        className="text-sm font-medium hover:text-primary hover:underline"
                      >
                        {method.name}
                      </Link>
                      {method.nameEn && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {method.nameEn}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          method.type === "CDM"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                        }`}
                      >
                        {method.type === "CDM" ? "CDM" : "국내"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          method.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : method.status === "superseded"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                        }`}
                      >
                        {method.status === "active"
                          ? "유효"
                          : method.status === "superseded"
                          ? "대체됨"
                          : "비활성"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
