"use client";

// 북마크 버튼 - 클라이언트 컴포넌트 (로컬 스토리지 토글)
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  methodologyId: string;
  className?: string;
}

export function BookmarkButton({
  methodologyId,
  className,
}: BookmarkButtonProps) {
  const { toggle, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(methodologyId);

  return (
    <button
      type="button"
      onClick={() => toggle(methodologyId)}
      aria-label={bookmarked ? "북마크 해제" : "북마크 추가"}
      aria-pressed={bookmarked}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
        bookmarked
          ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <Bookmark
        className={cn("h-4 w-4", bookmarked && "fill-current")}
      />
      {bookmarked ? "저장됨" : "저장"}
    </button>
  );
}
