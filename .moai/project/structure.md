# ORS 탐색기 - 프로젝트 구조

## 디렉토리 구조

```
gir-ors/
├── src/
│   ├── app/                          # Next.js App Router 페이지
│   │   ├── layout.tsx                # 루트 레이아웃 (헤더, 푸터, 테마)
│   │   ├── page.tsx                  # 홈페이지
│   │   ├── globals.css               # Tailwind v4 + 디자인 토큰
│   │   ├── methodologies/
│   │   │   ├── page.tsx              # 방법론 탐색 (검색/필터/테이블)
│   │   │   └── [id]/page.tsx         # 방법론 상세
│   │   ├── sectors/
│   │   │   ├── page.tsx              # 사업분야 목록
│   │   │   └── [id]/page.tsx         # 사업분야 상세
│   │   ├── statistics/page.tsx       # 통계 대시보드
│   │   ├── agencies/page.tsx         # 관장기관
│   │   └── guide/page.tsx            # 제도 안내
│   ├── components/
│   │   ├── ui/                       # shadcn/ui 스타일 기본 컴포넌트
│   │   ├── layout/                   # 헤더, 푸터, 테마 프로바이더
│   │   ├── methodology/              # 방법론 전용 컴포넌트
│   │   ├── charts/                   # 차트 컴포넌트 (예약)
│   │   ├── sector/                   # 사업분야 컴포넌트 (예약)
│   │   └── common/                   # 공통 컴포넌트 (StatCard, FormulaDisplay)
│   ├── data/                         # 정적 시드 데이터
│   │   ├── methodologies.ts          # 314건 방법론 데이터
│   │   ├── sectoral-scopes.ts        # 15개 사업분야
│   │   ├── governing-bodies.ts       # 5개 관장기관
│   │   └── statistics.ts             # 통계/연도별 데이터
│   ├── lib/                          # 유틸리티
│   │   ├── utils.ts                  # cn() Tailwind 병합
│   │   └── search.ts                 # Fuse.js 검색/필터
│   ├── hooks/                        # React 커스텀 훅
│   │   ├── use-methodology-filter.ts # 검색/필터 상태 관리
│   │   └── use-bookmarks.ts          # 로컬 북마크
│   └── types/
│       └── index.ts                  # Methodology, SectoralScope, GoverningBody 타입
├── public/images/                    # 정적 이미지
├── next.config.ts                    # Next.js 설정 (SSG export)
├── tsconfig.json                     # TypeScript strict 설정
├── postcss.config.mjs                # PostCSS + Tailwind v4
├── package.json                      # 의존성 및 스크립트
└── eslint.config.mjs                 # ESLint 설정
```

## 아키텍처 패턴

- **정적 사이트 생성(SSG)**: 모든 페이지가 빌드 타임에 HTML로 생성
- **서버 컴포넌트**: 데이터 직접 import (API 불필요)
- **클라이언트 컴포넌트**: 검색/필터/차트 등 인터랙티브 UI만
- **JSON 데이터 레이어**: DB 없이 TypeScript 파일로 데이터 관리
