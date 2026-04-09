// 구분선 컴포넌트 - 수평 또는 수직 구분선 표시
import * as React from "react";
import { cn } from "@/lib/utils";

// 구분선 Props 타입 정의
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

// 구분선 컴포넌트 - forwardRef를 사용하여 ref 전달 지원
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      // 장식용이면 aria에서 숨김 처리
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      data-orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        // 방향에 따른 크기 설정
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
