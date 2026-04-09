// 인풋 컴포넌트 - 텍스트 입력을 위한 일관된 스타일의 입력 필드
import * as React from "react";
import { cn } from "@/lib/utils";

// 인풋 컴포넌트 - forwardRef를 사용하여 ref 전달 지원
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // 기본 스타일
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
        // 플레이스홀더 스타일
        "placeholder:text-muted-foreground",
        // 파일 인풋 스타일
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // 포커스 스타일
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        // 비활성화 스타일
        "disabled:cursor-not-allowed disabled:opacity-50",
        // md 이상 화면에서 텍스트 크기
        "md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
