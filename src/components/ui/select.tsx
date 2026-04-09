// 셀렉트 컴포넌트 - 네이티브 HTML select를 래핑하는 일관된 스타일의 선택 컴포넌트
import * as React from "react";
import { cn } from "@/lib/utils";

// 셀렉트 옵션 타입 정의
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// 셀렉트 래퍼 컴포넌트 Props 타입 정의
export interface SelectWrapperProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  placeholder?: string;
}

// SelectWrapper - 네이티브 select를 일관된 스타일로 래핑
const SelectWrapper = React.forwardRef<HTMLSelectElement, SelectWrapperProps>(
  ({ className, options, placeholder, children, ...props }, ref) => {
    return (
      // 상대 포지션 컨테이너 - 화살표 아이콘 배치를 위해
      <div className="relative">
        <select
          className={cn(
            // 기본 스타일
            "flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 pr-8 text-sm shadow-sm transition-colors",
            // 포커스 스타일
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            // 비활성화 스타일
            "disabled:cursor-not-allowed disabled:opacity-50",
            // 텍스트 색상
            "text-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {/* 플레이스홀더 옵션 */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {/* options prop으로 전달된 옵션 렌더링 */}
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
          {/* children으로 전달된 옵션 렌더링 */}
          {children}
        </select>
        {/* 커스텀 화살표 아이콘 */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="h-4 w-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }
);
SelectWrapper.displayName = "SelectWrapper";

export { SelectWrapper };
