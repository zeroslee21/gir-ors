# GIR ORS 진입점 (Entry Points)

## 빌드 진입점

### 1. 빌드 프로세스 진입점: next.config.js

**목적**: Next.js 빌드 설정 및 최적화

**핵심 설정**:
```
- output: "export" (정적 HTML 생성)
- images.unoptimized: true (정적 이미지)
- reactStrictMode: true (개발 중 오류 감지)
- swcMinify: true (SWC 최소화)
```

**동작**:
1. `npm run build` 실행
2. `next.config.js` 로드
3. `generateStaticParams()` 함수 호출
4. 모든 페이지 사전 생성
5. `.next/static` 폴더에 HTML 파일 출력

**산출물**: `.next/static/` 디렉토리의 정적 파일들

## 페이지 진입점 (8개)

### 1. 홈 페이지: app/page.tsx

**라우트**: `/`

**렌더링 방식**: 정적 생성 (SSG)

**역할**: 애플리케이션의 첫 진입 페이지

**주요 기능**:
- 프로젝트 헤더
- 314개 방법론 숫자 표시
- 검색 바 (SearchBar 컴포넌트)
- 주요 섹터 소개
- 통계 요약

**컴포넌트 구성**:
- Layout (header, footer 포함)
- SearchBar (검색 기능)
- Hero Section (프로젝트 소개)
- Feature Cards (주요 기능)

**데이터 의존성**: data/methodologies.json 일부

**빌드 타임 동작**:
1. `npm run build` 시 이 파일 감지
2. 정적 HTML 생성: `.next/static/[hash]/pages/index.html`
3. 관련 컴포넌트 번들링

### 2. 방법론 목록: app/methodologies/page.tsx

**라우트**: `/methodologies`

**렌더링 방식**: 정적 구조 + 클라이언트 상호작용

**역할**: 533개 전체 방법론 목록 표시 (211개 CDM + 322개 국내)

**주요 기능**:
- 테이블 뷰로 모든 방법론 표시
- 검색 기능 (Fuse.js, 533개 데이터셋)
- 필터링 (섹터별, 상태별, 방법론 타입별)
- 페이지네이션 (20개 단위)
- 북마크 기능

**클라이언트 컴포넌트**:
- `use client` 지시어 포함
- use-methodology-filter 훅 사용
- 클라이언트 사이드 검색 및 필터링

**데이터 의존성**:
- data/methodologies.ts (전체 533개, 5,460줄)
- data/sectoral-scopes.json (필터링)

**빌드 타임 동작**:
1. 정적 구조만 생성 (검색 로직 제외)
2. JavaScript 번들에 검색 엔진 포함
3. 브라우저에서 런타임에 검색 실행

### 3. 방법론 상세: app/methodologies/[slug]/page.tsx

**라우트**: `/methodologies/{methodology-id}`

**렌더링 방식**: 정적 생성 (generateStaticParams 사용)

**역할**: 개별 방법론의 상세 정보 표시

**generateStaticParams 함수**:
```typescript
// 533개 각각에 대해 페이지 생성 (211개 CDM + 322개 국내)
export async function generateStaticParams() {
  return methodologies.map(m => ({
    slug: m.slug
  }))
}
// 결과: /methodologies/CDM-METHODOLOGY-001.html
//       /methodologies/DOMESTIC-METHODOLOGY-001.html
//       ... (533개 전체)
```

**주요 기능**:
- 방법론 이름, 설명
- 섹터 정보 (링크)
- 정부기관 정보 (링크, 국내 방법론은 MOTIE/MOLIT/MOE/MAFRA/MOF)
- 연도, 상태, 리비전 횟수 표시
- 북마크 버튼
- 관련 방법론 추천

**클라이언트 컴포넌트**:
- use-bookmarks 훅 (localStorage)
- 북마크 토글 버튼

**데이터 의존성**:
- data/methodologies.ts (전체 533개, 5,460줄)
- data/sectoral-scopes.json (15개 섹터 정보)
- data/governing-bodies.json (국제 및 국내 정부기관)

**빌드 타임 동작**:
1. 533개 방법론에 대해 `generateStaticParams()` 호출
2. 각각에 대해 정적 HTML 생성
3. 약 533개의 `.html` 파일 생성
4. 빌드 시간: 약 1-2분

**성능 영향**:
- 빌드 시간 증가 (533개 페이지, 이전 314개에서 증가)
- 배포 크기 증가 (약 10-15MB)
- 런타임 성능: 매우 빠름 (캐시 활용)

### 4. 섹터 목록: app/sectors/page.tsx

**라우트**: `/sectors`

**렌더링 방식**: 정적 생성

**역할**: 모든 섹터 목록 표시

**주요 기능**:
- 섹터 목록
- 각 섹터의 방법론 개수
- 검색 기능
- 섹터별 통계

**데이터 의존성**:
- data/sectoral-scopes.json
- data/methodologies.json

**빌드 타임 동작**:
1. 정적 HTML 생성
2. 섹터 통계 계산

### 5. 섹터 상세: app/sectors/[slug]/page.tsx

**라우트**: `/sectors/{sector-id}`

**렌더링 방식**: 정적 생성 (generateStaticParams 사용)

**역할**: 섹터별 방법론 목록 표시

**generateStaticParams 함수**:
```typescript
export async function generateStaticParams() {
  return sectors.map(s => ({
    slug: s.slug
  }))
}
// 결과: /sectors/agriculture.html
//       /sectors/energy.html
//       ... (15개 섹터)
```

**주요 기능**:
- 섹터 설명
- 해당 섹터의 모든 방법론 목록
- 차트 (연도별 분포)
- 통계

**컴포넌트**:
- YearlyDistribution 차트 (Recharts)

**데이터 의존성**:
- data/sectoral-scopes.json
- data/methodologies.json

**빌드 타임 동작**:
1. 섹터 개수만큼 정적 생성 (15개)
2. 차트 데이터 포함

### 6. 통계: app/statistics/page.tsx

**라우트**: `/statistics`

**렌더링 방식**: 정적 생성

**역할**: 전체 통계 대시보드 (533개 방법론 기준)

**주요 기능**:
- 총 방법론 개수 (533개: 211 CDM + 322 국내)
- 방법론 타입별 분포 (CDM vs 국내)
- 정부기관별 분포 (국내 방법론: MOTIE 200, MOLIT 52, MOE 47, MAFRA 16, MOF 7)
- 섹터별 분포 차트 (PieChart)
- 연도별 추이 차트 (LineChart, 2005-2026년)
- 정부기관별 분포 (BarChart)

**컴포넌트**:
- 9개의 Recharts 기반 차트

**데이터 의존성**:
- data/statistics.json (미리 계산된 통계, 533개 데이터 기준)
- data/methodologies.ts (533개 방법론)

**빌드 타임 동작**:
1. 정적 HTML 생성
2. 차트 데이터 포함

### 7. 가이드: app/guide/page.tsx

**라우트**: `/guide`

**렌더링 방식**: 정적 생성

**역할**: 사용자 가이드 및 설명서

**주요 내용**:
- 기본 용어 설명
- 사용 방법 안내
- FAQ
- 데이터 출처

**컴포넌트**:
- Card 컴포넌트로 섹션 구성

**빌드 타임 동작**:
1. 정적 HTML 생성
2. Markdown 콘텐츠 변환 (필요 시)

### 8. 공통 레이아웃: app/layout.tsx

**역할**: 모든 페이지의 기본 구조 정의

**포함 내용**:
- HTML, body 태그
- 전역 스타일 (Tailwind CSS)
- 메타데이터 (title, description)
- Header 컴포넌트
- Footer 컴포넌트
- 테마 프로바이더 (next-themes)

**렌더링 방식**: 정적 구조

**영향 범위**: 모든 하위 페이지

**빌드 타임 동작**:
1. 모든 페이지의 기본 템플릿으로 사용
2. 한 번 생성되어 모든 페이지에 포함

## 클라이언트 컴포넌트 진입점

### SearchBar.tsx
- **위치**: `components/common/SearchBar.tsx`
- **용도**: 검색 입력 및 실행
- **의존성**: Fuse.js 검색 엔진
- **생명주기**: 클라이언트에서 즉시 로드

### MethodologyFilter Hook 진입점
- **훅**: `hooks/use-methodology-filter.ts`
- **사용 위치**: methodologies/page.tsx
- **동작**: 
  1. 검색어 입력 감지
  2. Fuse.js로 검색
  3. 결과 필터링
  4. 페이지네이션

### ThemeToggle.tsx
- **위치**: `components/common/ThemeToggle.tsx`
- **용도**: 라이트/다크 모드 토글
- **라이브러리**: next-themes
- **동작**: localStorage에 선택 저장

## 데이터 진입점

### JSON 데이터 로드 시점

**빌드 타임 로드** (generateStaticParams 내):
- methodologies.json
- sectoral-scopes.json
- governing-bodies.json

**런타임 로드** (클라이언트):
- Fuse.js로 methodologies.json 재 인덱싱
- 검색 성능 최적화

## 렌더링 방식 요약

| 페이지 | 렌더링 | 생성 방식 | 파일 개수 |
|--------|--------|---------|---------|
| 홈 | SSG | 수동 | 1 |
| 방법론 목록 | SSG + 클라이언트 | 수동 | 1 |
| 방법론 상세 | SSG | generateStaticParams | 533 |
| 섹터 목록 | SSG | 수동 | 1 |
| 섹터 상세 | SSG | generateStaticParams | 15 |
| 통계 | SSG | 수동 | 1 |
| 가이드 | SSG | 수동 | 1 |
| _not-found | SSG | 자동 | 1 |
| **총합** | | | **557개** |

## 빌드 순서

1. **초기화**: `next.config.js` 로드
2. **데이터 처리**: ORS 크롤링 결과 (methodologies.ts) 로드
3. **페이지 수집**: app/ 디렉토리 스캔
4. **동적 페이지 생성**:
   - methodologies/[slug]/page.tsx → 533개 HTML (211 CDM + 322 국내)
   - sectors/[slug]/page.tsx → 15개 HTML
5. **정적 페이지 생성**: 나머지 페이지 (홈, 통계, 가이드, _not-found)
6. **번들링**: 공통 JavaScript 번들 생성 (Fuse.js 533개 데이터셋 인덱싱 포함)
7. **최적화**: 이미지, CSS 최적화
8. **산출**: `.next/static/` 에 결과물 저장

## 성능 영향

### 빌드 시간
- 총 빌드 시간: 약 3-5분
- 방법론 페이지 생성: 약 1-2분 (533개)
- 데이터 처리: 약 30-60초

### 배포 크기
- 정적 HTML: 약 10-15MB (533개 방법론 + 15개 섹터 + 기타 페이지)
- JavaScript 번들: 약 120-200KB (Fuse.js 인덱싱 포함)
- CSS: 약 50-100KB
- 전체: 약 10-15MB

### 런타임 성능
- 페이지 로딩: < 1초 (캐시 우수)
- 검색 성능: < 100ms (533개 데이터셋)
- TTFB (Time to First Byte): ~100ms
- TTI (Time to Interactive): ~500ms
