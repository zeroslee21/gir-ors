// 스켈레톤 컴포넌트 - 콘텐츠 로딩 중 펄스 애니메이션으로 로딩 상태 표시
import { cn } from "@/lib/utils";

// 스켈레톤 컴포넌트 Props 타입 정의
type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

// 스켈레톤 컴포넌트 - 로딩 플레이스홀더
function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        // 펄스 애니메이션과 둥근 모서리
        "animate-pulse rounded-md bg-primary/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
