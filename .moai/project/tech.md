# ORS 탐색기 - 기술 스택

## 프레임워크

- **Next.js 15** (App Router, SSG export)
- **React 19**
- **TypeScript 5.9** (strict mode)

## 스타일링

- **Tailwind CSS v4** (PostCSS 통합)
- **Pretendard** 한국어 웹폰트
- **다크모드** (next-themes, class 전략)

## UI 컴포넌트

- **shadcn/ui 스타일** 자체 구현 (10종)
  - Button, Card, Badge, Input, Select, Table, Tabs, Separator, Skeleton, ScrollArea
- **Lucide React** 아이콘
- **class-variance-authority** 변형 관리

## 데이터 및 검색

- **JSON 시드 데이터** (서버 불필요)
  - 314건 방법론, 15개 사업분야, 5개 관장기관
- **Fuse.js** 클라이언트 사이드 퍼지 검색
- **Recharts** 데이터 시각화 (4종 차트)

## 빌드 및 배포

- **pnpm** 패키지 매니저
- **Turbopack** 개발 서버
- **Static Export** (output: "export") - 서버 비용 0
- **Nginx** 정적 파일 서빙 (gzip, 캐싱)

## 인프라

- **AWS EC2** (t3.micro, ap-northeast-2)
- **AWS ALB** (verdex-web-alb)
- **Let's Encrypt / ACM** SSL
- **Amazon Linux 2023**

## 개발 환경

- Node.js 22 LTS
- ESLint 9 (next/core-web-vitals)
