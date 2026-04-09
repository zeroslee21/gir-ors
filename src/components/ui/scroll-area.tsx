// 스크롤 영역 컴포넌트 - 커스텀 스크롤바 스타일이 적용된 스크롤 가능한 영역
import * as React from "react";
import { cn } from "@/lib/utils";

// 스크롤 영역 Props 타입 정의
interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  // 스크롤 방향 - 기본값 vertical
  orientation?: "vertical" | "horizontal" | "both";
  // 최대 높이 설정
  maxHeight?: string;
  // 최대 너비 설정
  maxWidth?: string;
}

// 스크롤 영역 컴포넌트 - forwardRef를 사용하여 ref 전달 지원
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      children,
      orientation = "vertical",
      maxHeight,
      maxWidth,
      style,
      ...props
    },
    ref
  ) => {
    // 방향에 따른 overflow 스타일 설정
    const overflowStyle = {
      overflowY:
        orientation === "vertical" || orientation === "both"
          ? "auto"
          : "hidden",
      overflowX:
        orientation === "horizontal" || orientation === "both"
          ? "auto"
          : "hidden",
      maxHeight: maxHeight,
      maxWidth: maxWidth,
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          // 기본 레이아웃
          "relative overflow-hidden",
          className
        )}
        {...props}
      >
        {/* 내부 스크롤 컨테이너 - 커스텀 스크롤바 스타일 적용 */}
        <div
          style={overflowStyle}
          className={cn(
            // 커스텀 스크롤바 스타일 (webkit 기반)
            "[&::-webkit-scrollbar]:w-2",
            "[&::-webkit-scrollbar]:h-2",
            "[&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-border",
            "[&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/50",
            // 스크롤 영역 크기
            "h-full w-full"
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

// 스크롤바 컴포넌트 (독립 사용 가능한 커스텀 스크롤바)
const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "vertical" | "horizontal";
  }
>(({ className, orientation = "vertical", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    {/* 스크롤바 썸 */}
    <div className="relative flex-1 rounded-full bg-border" />
  </div>
));
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
