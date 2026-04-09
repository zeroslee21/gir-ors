"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ors-bookmarks";

// 로컬 스토리지 기반 북마크 관리 훅
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // 초기 로딩
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch {
      // 로컬 스토리지 접근 실패 시 무시
    }
  }, []);

  // 저장
  const save = useCallback((ids: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // 저장 실패 시 무시
    }
  }, []);

  // 북마크 토글
  const toggle = useCallback(
    (id: string) => {
      setBookmarks((prev) => {
        const next = prev.includes(id)
          ? prev.filter((b) => b !== id)
          : [...prev, id];
        save(next);
        return next;
      });
    },
    [save]
  );

  // 북마크 여부 확인
  const isBookmarked = useCallback(
    (id: string) => bookmarks.includes(id),
    [bookmarks]
  );

  return { bookmarks, toggle, isBookmarked };
}
