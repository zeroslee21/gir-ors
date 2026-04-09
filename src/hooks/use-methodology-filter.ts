"use client";

import { useState, useMemo, useCallback } from "react";
import type { Methodology } from "@/types";
import {
  searchMethodologies,
  filterMethodologies,
  type MethodologyFilters,
} from "@/lib/search";

// 방법론 검색·필터링 상태 관리 훅
export function useMethodologyFilter(allData: Methodology[]) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<MethodologyFilters>({});
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // 검색 결과
  const searched = useMemo(
    () => searchMethodologies(query, allData),
    [query, allData]
  );

  // 필터 적용 결과
  const filtered = useMemo(
    () => filterMethodologies(searched, filters),
    [searched, filters]
  );

  // 페이지네이션
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  // 필터 업데이트 (페이지 리셋)
  const updateFilter = useCallback(
    (key: keyof MethodologyFilters, value: string | number | undefined) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    []
  );

  // 검색어 업데이트 (페이지 리셋)
  const updateQuery = useCallback((q: string) => {
    setQuery(q);
    setPage(1);
  }, []);

  // 필터 초기화
  const resetFilters = useCallback(() => {
    setFilters({});
    setQuery("");
    setPage(1);
  }, []);

  return {
    query,
    setQuery: updateQuery,
    filters,
    updateFilter,
    resetFilters,
    results: paged,
    totalResults: filtered.length,
    page,
    setPage,
    totalPages,
  };
}
