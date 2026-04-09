// 사업분야(Sectoral Scope) 목록 페이지 - 서버 컴포넌트
import type { Metadata } from "next";
import Link from "next/link";
import {
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
import { sectoralScopes } from "@/data/sectoral-scopes";
import { methodologies } from "@/data/methodologies";
import type { SectoralScope } from "@/types";

export const metadata: Metadata = {
  title: "사업분야",
  description: "UNFCCC CDM의 15개 Sectoral Scope를 준용한 분류체계",
};

// 아이콘 이름을 실제 컴포넌트에 매핑하는 맵
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

// 개별 섹터 카드 컴포넌트
function SectorCard({ scope }: { scope: SectoralScope }) {
  // 해당 분야에 속하는 방법론 수 계산
  const methodologyCount = methodologies.filter((m) =>
    m.sectoralScopes.includes(scope.id)
  ).length;

  const IconComponent = iconMap[scope.icon] ?? Zap;

  return (
    <Link
      href={`/sectors/${scope.id}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
    >
      {/* 섹터 번호와 아이콘 */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
          <IconComponent className="h-5 w-5 text-primary" />
        </div>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          SS{scope.id}
        </span>
      </div>

      {/* 분야명 */}
      <h3 className="font-semibold text-foreground group-hover:text-primary">
        {scope.nameKo}
      </h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{scope.nameEn}</p>

      {/* 설명 */}
      <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
        {scope.description}
      </p>

      {/* 방법론 수 */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm text-muted-foreground">해당 방법론</span>
        <span className="text-sm font-semibold text-primary">
          {methodologyCount}건
        </span>
      </div>
    </Link>
  );
}

export default function SectorsPage() {
  // 산업 부문 (1~9번)
  const industrySectors = sectoralScopes.filter((s) => s.id <= 9);
  // 배출원 기반 (10~15번)
  const emissionSectors = sectoralScopes.filter((s) => s.id >= 10);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          사업분야 (Sectoral Scope)
        </h1>
        <p className="mt-2 text-muted-foreground">
          UNFCCC CDM의 15개 Sectoral Scope를 준용한 분류체계입니다. 각 분야를
          클릭하면 해당 분야의 방법론 목록을 확인할 수 있습니다.
        </p>
      </div>

      {/* 산업 부문별 분류 (1~9번) */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full bg-primary" />
          <h2 className="text-xl font-semibold">산업 부문별 분류 (1~9번)</h2>
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          에너지, 제조, 수송 등 산업 활동에 기반한 분류
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industrySectors.map((scope) => (
            <SectorCard key={scope.id} scope={scope} />
          ))}
        </div>
      </section>

      {/* 배출원 기반 분류 (10~15번) */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full bg-amber-500" />
          <h2 className="text-xl font-semibold">배출원 기반 분류 (10~15번)</h2>
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          탈루 배출, 폐기물, 농업 등 특정 배출원에 기반한 분류
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emissionSectors.map((scope) => (
            <SectorCard key={scope.id} scope={scope} />
          ))}
        </div>
      </section>
    </div>
  );
}
