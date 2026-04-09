import Fuse, { type IFuseOptions } from "fuse.js";
import type { Methodology } from "@/types";

// Fuse.js 기반 퍼지 검색 설정
const fuseOptions: IFuseOptions<Methodology> = {
  keys: [
    { name: "id", weight: 0.3 },
    { name: "name", weight: 0.4 },
    { name: "nameEn", weight: 0.2 },
    { name: "description", weight: 0.1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

let fuseInstance: Fuse<Methodology> | null = null;

// Fuse 인스턴스 초기화 (지연 로딩)
export function initSearch(data: Methodology[]) {
  fuseInstance = new Fuse(data, fuseOptions);
}

// 방법론 검색
export function searchMethodologies(
  query: string,
  data: Methodology[]
): Methodology[] {
  if (!query.trim()) return data;

  if (!fuseInstance) {
    initSearch(data);
  }

  const results = fuseInstance!.search(query);
  return results.map((r) => r.item);
}

// 방법론 필터링
export interface MethodologyFilters {
  type?: "CDM" | "DOMESTIC" | "all";
  cdmCategory?: string;
  sectoralScope?: number;
  governingBody?: string;
  status?: string;
}

export function filterMethodologies(
  data: Methodology[],
  filters: MethodologyFilters
): Methodology[] {
  return data.filter((m) => {
    if (filters.type && filters.type !== "all" && m.type !== filters.type)
      return false;
    if (filters.cdmCategory && m.cdmCategory !== filters.cdmCategory)
      return false;
    if (
      filters.sectoralScope &&
      !m.sectoralScopes.includes(filters.sectoralScope)
    )
      return false;
    if (filters.governingBody && m.governingBody !== filters.governingBody)
      return false;
    if (filters.status && m.status !== filters.status) return false;
    return true;
  });
}
