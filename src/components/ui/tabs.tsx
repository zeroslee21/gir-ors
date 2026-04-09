// 탭 컴포넌트 - React 상태와 Context를 활용한 순수 구현체 탭 UI
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 탭 컨텍스트 타입 정의
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

// 탭 컨텍스트 생성
const TabsContext = React.createContext<TabsContextType | null>(null);

// 탭 컨텍스트 훅 - 컨텍스트 없이 사용시 에러 발생
function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("탭 컴포넌트는 Tabs 컨테이너 내에서 사용해야 합니다.");
  }
  return context;
}

// 탭 컨테이너 Props 타입 정의
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

// 탭 컨테이너 컴포넌트 - 상태 관리 담당
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue = "", value, onValueChange, children, ...props }, ref) => {
    // 내부 상태 - 비제어 컴포넌트 지원
    const [internalValue, setInternalValue] = React.useState(defaultValue);

    // 제어 컴포넌트 여부 확인
    const isControlled = value !== undefined;
    const activeTab = isControlled ? value : internalValue;

    const setActiveTab = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        <div
          ref={ref}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

// 탭 리스트 컴포넌트 - 탭 트리거들을 감싸는 컨테이너
const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

// 탭 트리거 Props 타입 정의
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

// 탭 트리거 컴포넌트 - 클릭하여 탭 전환
const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          // 기본 스타일
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all",
          // 포커스 스타일
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // 비활성화 스타일
          "disabled:pointer-events-none disabled:opacity-50",
          // 활성화 상태 스타일
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
          className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

// 탭 콘텐츠 Props 타입 정의
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

// 탭 콘텐츠 컴포넌트 - 활성화된 탭에 해당하는 콘텐츠 표시
const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
