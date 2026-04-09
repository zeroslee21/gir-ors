# GIR ORS 모듈 구조

## 모듈 개요

GIR ORS는 기능별로 다음 모듈로 구성됩니다:

```
src/
├── app/              # 페이지 (Next.js App Router)
├── components/       # 재사용 가능한 컴포넌트
├── data/            # 정적 JSON 데이터
├── hooks/           # 커스텀 React 훅
├── lib/             # 유틸리티 함수
├── types/           # TypeScript 타입 정의
└── utils/           # 헬퍼 함수
```

## 모듈별 상세 설명

### 1. app/ - 페이지 모듈 (8개)

Next.js App Router를 사용하는 페이지 구조입니다. 각 파일이 자동으로 라우트가 됩니다.

#### layout.tsx
- **역할**: 모든 페이지의 기본 레이아웃
- **포함 내용**: `<html>`, `<body>`, 네비게이션 바, 푸터
- **책임**: 전역 스타일 적용, 메타데이터 설정

#### page.tsx (홈 페이지)
- **라우트**: `/`
- **역할**: 애플리케이션 진입점
- **주요 기능**: 프로젝트 소개, 314개 방법론 개수 표시, 검색 바
- **렌더링**: 정적 생성 (SSG)

#### methodologies/page.tsx
- **라우트**: `/methodologies`
- **역할**: 모든 방법론의 목록 표시
- **주요 기능**: 
  - 페이지네이션
  - 검색 기능 (Fuse.js)
  - 필터링 (섹터별, 상태별)
  - 테이블 뷰
- **렌더링**: 클라이언트 사이드 렌더링 (상호작용)

#### methodologies/[slug]/page.tsx
- **라우트**: `/methodologies/{methodology-slug}`
- **역할**: 개별 방법론 상세 정보
- **주요 기능**:
  - 방법론 설명
  - 섹터 정보
  - 정부기관 정보
  - 북마크 기능
  - 관련 방법론 추천
- **렌더링**: 정적 생성 + ISR (필요 시)

#### sectors/page.tsx
- **라우트**: `/sectors`
- **역할**: 모든 섹터의 목록 표시
- **주요 기능**:
  - 섹터별 방법론 개수
  - 섹터별 통계
  - 검색 기능
- **렌더링**: 정적 생성

#### sectors/[slug]/page.tsx
- **라우트**: `/sectors/{sector-slug}`
- **역할**: 섹터별 방법론 목록
- **주요 기능**:
  - 섹터 설명
  - 해당 섹터의 모든 방법론
  - 차트 (방법론 연도별 분포)
- **렌더링**: 정적 생성

#### statistics/page.tsx
- **라우트**: `/statistics`
- **역할**: 전체 통계 대시보드
- **주요 기능**:
  - 총 방법론 개수
  - 섹터별 분포 차트
  - 연도별 추이 차트
  - 정부기관별 분포
- **렌더링**: 정적 생성

#### guide/page.tsx
- **라우트**: `/guide`
- **역할**: 사용자 가이드 및 설명서
- **주요 기능**:
  - 기본 용어 설명
  - 사용 방법 안내
  - FAQ
  - 데이터 출처
- **렌더링**: 정적 생성

### 2. components/ - 컴포넌트 (25개)

컴포넌트는 기능별로 4개 그룹으로 분류됩니다.

#### ui/ 컴포넌트 (10개)
기본적인 UI 요소들입니다.

- **Button.tsx**: 범용 버튼 컴포넌트
- **Card.tsx**: 카드 컨테이너
- **Input.tsx**: 입력 필드
- **Select.tsx**: 드롭다운 선택
- **Checkbox.tsx**: 체크박스
- **Table.tsx**: 테이블 레이아웃
- **Pagination.tsx**: 페이지 네비게이션
- **Modal.tsx**: 모달 다이얼로그
- **Toast.tsx**: 알림 메시지
- **Badge.tsx**: 라벨/배지

#### layout/ 컴포넌트 (3개)
전체 페이지 구조를 관리합니다.

- **Header.tsx**: 상단 네비게이션 바
- **Navigation.tsx**: 사이드 네비게이션 (모바일)
- **Footer.tsx**: 하단 푸터

#### common/ 컴포넌트 (2개)
공통 기능을 제공합니다.

- **SearchBar.tsx**: 검색 입력 (Fuse.js 연동)
- **ThemeToggle.tsx**: 라이트/다크 모드 토글

#### methodology/ 컴포넌트 (1개)
방법론 특화 컴포넌트입니다.

- **MethodologyCard.tsx**: 방법론 정보 카드

#### charts/ 컴포넌트 (9개)
Recharts 기반 시각화 컴포넌트입니다.

- **LineChart.tsx**: 라인 차트
- **BarChart.tsx**: 막대 차트
- **PieChart.tsx**: 파이 차트
- **AreaChart.tsx**: 영역 차트
- **ScatterChart.tsx**: 산점도
- **RadarChart.tsx**: 레이더 차트
- **TreemapChart.tsx**: 트리맵
- **ComposedChart.tsx**: 복합 차트
- **YearlyDistribution.tsx**: 연도별 분포 차트

### 3. data/ - 데이터 모듈 (4개)

정적 JSON 데이터 파일들입니다. 빌드 타임에 읽혀 페이지에 포함됩니다.

#### methodologies.json
- **크기**: ~500KB
- **내용**: 314개 방법론의 전체 정보
- **필드**: 
  - id, slug, name, description
  - sectorId, governingBodyId
  - year, status
  - createdAt, updatedAt

#### sectoral-scopes.json
- **크기**: ~50KB
- **내용**: 모든 섹터(Sectoral Scope) 정보
- **필드**:
  - id, slug, name, description
  - methodologyCount

#### governing-bodies.json
- **크기**: ~20KB
- **내용**: 정부기관/기구 정보
- **필드**:
  - id, name, description
  - website, foundedYear

#### statistics.json
- **크기**: ~50KB
- **내용**: 미리 계산된 통계 데이터
- **필드**:
  - totalMethodologies
  - byYear: { year: count }
  - bySector: { sectorId: count }
  - byGoverningBody: { bodyId: count }

### 4. hooks/ - 커스텀 훅 (2개)

React 상태 관리 로직을 캡슐화합니다.

#### use-methodology-filter.ts
- **역할**: 방법론 필터링 로직
- **기능**:
  - 검색어 입력 (Fuse.js 통합)
  - 섹터별 필터링
  - 상태별 필터링
  - 결과 페이지네이션
- **반환값**: `{ filtered, currentPage, totalPages, search, setSearch }`

#### use-bookmarks.ts
- **역할**: 북마크 관리
- **기능**:
  - localStorage에 저장
  - 북마크 추가/제거
  - 북마크 목록 조회
  - 영속성 관리
- **반환값**: `{ bookmarks, toggleBookmark, isBookmarked }`

### 5. lib/ - 라이브러리 함수 (2개)

유틸리티 함수들입니다.

#### search.ts
- **기능**: Fuse.js를 사용한 검색 엔진
- **내보내기**:
  - `createSearchIndex(methodologies)`: 인덱스 생성
  - `search(query, index)`: 검색 실행
- **특징**: 오프라인 검색 (무서버)

#### utils.ts
- **기능**: 범용 유틸리티 함수
- **함수**:
  - `formatDate(date)`: 날짜 포매팅
  - `slugify(text)`: URL 슬러그 생성
  - `truncate(text, length)`: 텍스트 자르기
  - `cn(...classes)`: Tailwind CSS 클래스 병합 (clsx 유사)

### 6. types/ - 타입 정의 (4개)

TypeScript 타입 안전성을 제공합니다.

#### methodology.ts
```typescript
interface Methodology {
  id: string
  slug: string
  name: string
  description: string
  sectorId: string
  governingBodyId: string
  year: number
  status: 'active' | 'inactive' | 'proposed'
  createdAt: string
  updatedAt: string
}
```

#### sectoral-scope.ts
```typescript
interface SectoralScope {
  id: string
  slug: string
  name: string
  description: string
  methodologyCount: number
}
```

#### governing-body.ts
```typescript
interface GoverningBody {
  id: string
  name: string
  description: string
  website?: string
  foundedYear?: number
}
```

#### statistics.ts
```typescript
interface Statistics {
  totalMethodologies: number
  byYear: Record<number, number>
  bySector: Record<string, number>
  byGoverningBody: Record<string, number>
  lastUpdated: string
}
```

### 7. 기타 구조

#### public/ 디렉토리
- 정적 이미지, 폰트, 메타데이터
- `favicon.ico`, `robots.txt`, `sitemap.xml`

#### styles/ 디렉토리
- 전역 CSS 파일
- Tailwind CSS 커스텀 설정

## 모듈 간 통신

### 데이터 흐름
```
data/ → 컴포넌트/페이지 (import)
     ↓
     hooks/ (필터링, 상태)
     ↓
     lib/ (검색, 포매팅)
     ↓
     UI (렌더링)
```

### 의존성 관계
- **페이지**: data, components, hooks, lib에 의존
- **컴포넌트**: hooks, lib, types에 의존
- **훅**: lib, types에 의존
- **lib**: types에만 의존

## 모듈별 책임 정리

| 모듈 | 책임 | 크기 |
|------|------|------|
| app/ | 페이지 정의 및 라우팅 | 8 파일 |
| components/ui | 기본 UI 요소 | 10 컴포넌트 |
| components/layout | 페이지 레이아웃 | 3 컴포넌트 |
| components/common | 공통 기능 | 2 컴포넌트 |
| components/charts | 데이터 시각화 | 9 컴포넌트 |
| components/methodology | 도메인 특화 | 1 컴포넌트 |
| data/ | 정적 데이터 | 4 JSON 파일 |
| hooks/ | 상태 관리 | 2 훅 |
| lib/ | 유틸리티 함수 | 2 파일 |
| types/ | 타입 정의 | 4 파일 |
