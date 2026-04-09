# GIR ORS 프로젝트 구조

## 디렉토리 트리 (전체)

```
gir-ors/
├── src/
│   ├── app/                          # Next.js 15 App Router 페이지 레이아웃
│   │   ├── layout.tsx                # 루트 레이아웃 (헤더, 푸터, 메타데이터)
│   │   ├── page.tsx                  # 홈페이지 (/)
│   │   ├── globals.css               # 전역 스타일 (Tailwind v4, 디자인 토큰)
│   │   ├── methodologies/
│   │   │   ├── page.tsx              # 방법론 목록 (/methodologies) - Server Component
│   │   │   └── [id]/page.tsx         # 방법론 상세 (/methodologies/[id]) - SSG 256 paths
│   │   ├── sectors/
│   │   │   ├── page.tsx              # 부문 목록 (/sectors) - 15개 UNFCCC 섹터
│   │   │   └── [id]/page.tsx         # 부문 상세 (/sectors/[id]) - SSG 15 paths
│   │   ├── statistics/
│   │   │   └── page.tsx              # 통계 대시보드 (/statistics) - 4개 차트
│   │   ├── agencies/
│   │   │   └── page.tsx              # 주관 기관 (/agencies) - 5개 부처
│   │   └── guide/
│   │       └── page.tsx              # 정책 교육 가이드 (/guide) - 마크다운 콘텐츠
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui 스타일 기본 UI 컴포넌트 (10종)
│   │   │   ├── button.tsx            # 버튼 컴포넌트 (cva 변형)
│   │   │   ├── card.tsx              # 카드 컴포넌트 (내용 그룹화)
│   │   │   ├── badge.tsx             # 배지 컴포넌트 (라벨)
│   │   │   ├── input.tsx             # 입력 필드 (검색, 폼)
│   │   │   ├── select.tsx            # 선택 드롭다운 (필터)
│   │   │   ├── table.tsx             # 테이블 (데이터 표시)
│   │   │   ├── tabs.tsx              # 탭 네비게이션
│   │   │   ├── separator.tsx         # 분리선
│   │   │   ├── skeleton.tsx          # 로딩 스켈레톤
│   │   │   └── scroll-area.tsx       # 스크롤 영역 (큰 콘텐츠)
│   │   │
│   │   ├── layout/                   # 레이아웃 컴포넌트 (3개)
│   │   │   ├── header.tsx            # 헤더 (네비게이션, 로고)
│   │   │   ├── footer.tsx            # 푸터 (저작권, 링크)
│   │   │   └── theme-provider.tsx    # 테마 프로바이더 (다크모드, next-themes)
│   │   │
│   │   ├── methodology/              # 방법론 도메인 컴포넌트 (1개)
│   │   │   └── methodology-table.tsx # 방법론 테이블 (Client Component, 검색/필터)
│   │   │
│   │   ├── charts/                   # 차트 컴포넌트 (4개, Recharts)
│   │   │   ├── pie-chart.tsx         # CDM vs 국내 정책 파이 차트
│   │   │   ├── bar-chart.tsx         # 기관별 방법론 수 막대 차트
│   │   │   ├── line-chart.tsx        # 연도별 추가 추이 선 그래프
│   │   │   └── radar-chart.tsx       # 부문별 분포 레이더 차트
│   │   │
│   │   └── common/                   # 공통 컴포넌트 (2개)
│   │       ├── stat-card.tsx         # 통계 카드 (숫자, 라벨, 아이콘)
│   │       └── formula-display.tsx   # 공식 렌더링 (LaTeX, react-katex)
│   │
│   ├── data/                         # 정적 시드 데이터 (JSON/TypeScript)
│   │   ├── methodologies.ts          # 314건 방법론 (CDM 211, 국내 103)
│   │   ├── sectoral-scopes.ts        # 15개 UNFCCC 섹터 분류
│   │   ├── governing-bodies.ts       # 5개 정부 주관 기관
│   │   └── statistics.ts             # 연도별 통계 데이터 (2015-2024)
│   │
│   ├── lib/                          # 유틸리티 함수
│   │   ├── utils.ts                  # cn() Tailwind CSS 클래스 병합 (clsx)
│   │   └── search.ts                 # Fuse.js 검색 및 필터 로직
│   │
│   ├── hooks/                        # React 커스텀 훅 (2개)
│   │   ├── use-methodology-filter.ts # 검색/필터 상태 관리 (Client)
│   │   └── use-bookmarks.ts          # 로컬스토리지 북마크 관리
│   │
│   └── types/
│       └── index.ts                  # TypeScript 인터페이스 (Methodology, SectoralScope, GoverningBody)
│
├── public/
│   └── images/                       # 정적 이미지 (로고, 아이콘)
│
├── .next/                            # Next.js 빌드 아웃풋 (git ignore)
│   └── static/                       # 정적 자산 (CSS, JS, 이미지)
│
├── node_modules/                     # npm 의존성 (git ignore)
│
├── .eslintrc.json                    # ESLint 설정 (next/core-web-vitals)
├── next.config.ts                    # Next.js 설정 (output: "export", SSG)
├── tsconfig.json                     # TypeScript 설정 (strict: true)
├── postcss.config.mjs                # PostCSS 설정 (Tailwind v4)
├── tailwind.config.ts                # Tailwind CSS 설정 (테마, 플러그인)
├── package.json                      # 의존성 및 스크립트 (pnpm)
├── pnpm-lock.yaml                    # pnpm 락파일
│
├── .gitignore                        # Git 무시 파일
├── README.md                         # 프로젝트 소개
├── LICENSE                           # 라이선스
│
└── .moai/
    ├── project/
    │   ├── product.md                # 제품 문서
    │   ├── structure.md              # 구조 문서 (이 파일)
    │   └── tech.md                   # 기술 스택 문서
    └── specs/                        # SPEC 문서 (향후 사용)
```

## 아키텍처 패턴 설명

### 정적 사이트 생성 (SSG)

모든 페이지가 빌드 타임(`npm run build`)에 HTML로 생성되어 서버 런타임 없이 정적 파일로 배포됩니다.

**장점:**
- 배포 비용 최소화 (EC2 t3.micro)
- 로딩 속도 극대화
- 캐싱 전략 최적화 (Nginx, CDN)

**구현:**
- Next.js `output: "export"` 설정
- `getStaticPaths()` 및 `getStaticProps()`로 256개 방법론 + 15개 부문 경로 생성
- 빌드 결과: `.next/standalone` 정적 파일

### Server Component vs Client Component 분리

**Server Component (데이터 페칭):**
- `/app/methodologies/page.tsx`: 314건 데이터 직접 로드
- `/app/sectors/[id]/page.tsx`: 부문별 필터링된 데이터
- 클라이언트 JavaScript 없이도 동작

**Client Component (인터랙션):**
- `<methodology-table.tsx>`: 검색, 필터, 페이지네이션 상태 관리
- `<charts/*>`: Recharts 차트 (클라이언트 렌더링 필수)
- `use-bookmarks()`: 북마크 UI 토글

### 데이터 레이어 (JSON)

데이터베이스 대신 TypeScript/JSON 파일로 관리:

**methodologies.ts 구조:**
```
export const methodologies = [
  {
    id: "CDM-1",
    name: "AM0001",
    sector: "Energy Industries",
    source: "CDM",
    govBody: "MOE",
    description: "...",
    formula: "ER = BE - PE - LE",
    ...
  },
  ...
]
```

**장점:**
- 파일 기반 버전 관리 (Git)
- API 서버 불필요
- 타입 안전성 (TypeScript)

**한계:**
- 314건 데이터 현재 관리 가능 (500건 이상 시 API 서버 필요)
- 실시간 업데이트 불가능

## 라우팅 구조

### 8개 라우트

| 경로 | 파일 | 타입 | 생성 방식 | 용도 |
|------|------|------|----------|------|
| `/` | `app/page.tsx` | Server | SSG | 홈: 통계 카드, 섹터 그리드, 공식 |
| `/methodologies` | `app/methodologies/page.tsx` | Server | SSG | 방법론 목록: 검색, 필터, 테이블 |
| `/methodologies/[id]` | `app/methodologies/[id]/page.tsx` | Server | SSG (256 paths) | 방법론 상세: 설명, 공식, 북마크 |
| `/sectors` | `app/sectors/page.tsx` | Server | SSG | 부문 목록: 15개 UNFCCC 섹터 그리드 |
| `/sectors/[id]` | `app/sectors/[id]/page.tsx` | Server | SSG (15 paths) | 부문 상세: 해당 부문 방법론 테이블 |
| `/statistics` | `app/statistics/page.tsx` | Client | SSG | 통계: 4종 Recharts 차트 |
| `/agencies` | `app/agencies/page.tsx` | Server | SSG | 주관 기관: 5개 부처 소개 |
| `/guide` | `app/guide/page.tsx` | Server | SSG | 정책 가이드: 마크다운 콘텐츠 |

### 동적 라우트 (Dynamic Routes)

**방법론 상세:**
- 경로: `/methodologies/[id]`
- 파일: `app/methodologies/[id]/page.tsx`
- 생성 경로: 256개 (각 방법론 1개)
- 데이터: `methodologies.ts`에서 `id` 기반 조회

**부문 상세:**
- 경로: `/sectors/[id]`
- 파일: `app/sectors/[id]/page.tsx`
- 생성 경로: 15개 (각 UNFCCC 섹터 1개)
- 데이터: `sectoral-scopes.ts`에서 `id` 기반 조회

## 컴포넌트 계층 구조

### Level 1: UI 기본 컴포넌트 (10종)

shadcn/ui 스타일의 원시 컴포넌트들:
- Button, Card, Badge, Input, Select, Table, Tabs, Separator, Skeleton, ScrollArea

**특성:**
- 재사용 가능
- Tailwind CSS 기반
- 접근성 준수 (ARIA)
- class-variance-authority로 변형 관리

### Level 2: 레이아웃 컴포넌트 (3개)

페이지 구조를 정의:
- Header: 네비게이션, 로고, 검색
- Footer: 저작권, 링크
- ThemeProvider: 다크모드, next-themes 통합

### Level 3: 도메인 컴포넌트

비즈니스 로직을 가진 특화 컴포넌트:
- MethodologyTable: 검색, 필터, 페이지네이션
- Charts (4개): Recharts 차트들

### Level 4: 공통 컴포넌트 (2개)

다중 페이지에서 재사용:
- StatCard: 숫자 통계 카드
- FormulaDisplay: LaTeX 공식 렌더링

## 데이터 흐름

### 1. 정적 빌드 (Build Time)

```
src/data/methodologies.ts (314건)
    ↓
getStaticPaths() [256 paths]
    ↓
getStaticProps(params) [각 경로별 데이터 로드]
    ↓
.next/static/ [HTML 파일 생성]
```

### 2. 사용자 방문 (Runtime)

```
사용자 요청 (예: /methodologies/CDM-1)
    ↓
Nginx [정적 HTML 파일 제공]
    ↓
브라우저 [렌더링]
    ↓
클라이언트 컴포넌트 [인터랙션: 북마크, 차트 조작]
```

### 3. 클라이언트 상호작용

```
사용자 입력 (검색어, 필터 선택)
    ↓
use-methodology-filter.ts [상태 업데이트]
    ↓
Fuse.js [실시간 검색 및 필터]
    ↓
MethodologyTable [결과 렌더링]
```

## 상태 관리 전략

### 로컬 컴포넌트 상태 (useState)

**MethodologyTable 컴포넌트:**
- `searchQuery`: 검색어
- `filters`: 활성 필터 (부문, 출처, 기관)
- `currentPage`: 페이지 번호

**InternalLogic:**
- `use-methodology-filter()`: 검색 및 필터 로직 캡슐화
- Fuse.js에서 실시간 결과 계산

### 로컬스토리지 (북마크)

**use-bookmarks 훅:**
- 저장: 사용자가 북마크 버튼 클릭
- 로드: 페이지 로드 시 localStorage에서 복원
- 동기화: 모든 방법론 상세 페이지에서 북마크 상태 표시

### 없음 (Global State)

Redux, Zustand, Context 미사용:
- 앱 규모가 작음 (8개 페이지)
- 서버 데이터 변화 없음 (정적)
- 로컬 상태만으로 충분

## 빌드 및 배포 파이프라인

### 빌드 프로세스

```
1. npm run build
   - TypeScript 컴파일
   - Next.js SSG 생성 (256 + 15 경로)
   - 정적 자산 최적화 (이미지, CSS, JS)

2. .next/standalone 생성
   - 모든 HTML 파일
   - CSS (Tailwind v4)
   - JavaScript번들 (Recharts, Fuse.js)
   - 정적 이미지

3. 파일 복사
   - Nginx의 /var/www/ors.verdex.kr/로 이동
```

### 배포 대상

```
AWS EC2 (t3.micro)
    ↓
Nginx [포트 80/443]
    ↓
Let's Encrypt 인증서 [HTTPS]
    ↓
ALB [로드 밸런싱]
```

## 성능 최적화

### 정적 파일 캐싱

**Nginx 설정:**
- CSS, JavaScript: 1년 캐시
- 이미지: 1개월 캐시
- HTML: 재검증 (Cache-Control: public, max-age=3600)

### Gzip 압축

Nginx에서 활성화:
- CSS: 80% 크기 감소
- JavaScript: 70% 크기 감소

### 코드 분할 (Code Splitting)

Next.js 자동 처리:
- 각 페이지별 독립 JavaScript 번들
- 미사용 코드 제거

### 이미지 최적화

next/image 미사용 (정적 사이트):
- SVG 아이콘 (Lucide React)
- WebP 이미지 수동 최적화

## 확장 계획

### 단기 (3-6개월)

- 데이터 500건 이상 추가
- 실시간 데이터 동기화 필요
- **액션:** Node.js API 서버 추가 (Express/FastAPI)

### 중기 (6-12개월)

- 다국어 지원 (영어, 중국어)
- 회원가입 및 프로필 관리
- **액션:** 데이터베이스 (PostgreSQL) 마이그레이션

### 장기 (12개월+)

- 기업 추천 엔진 (머신러닝)
- 실시간 협력 기능 (WebSocket)
- **액션:** 마이크로서비스 아키텍처로 진화
