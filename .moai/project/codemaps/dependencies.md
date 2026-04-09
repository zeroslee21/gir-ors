# GIR ORS 의존성 그래프

## 의존성 개요

GIR ORS는 정적 사이트이기 때문에 런타임 의존성을 최소화합니다. 총 10개의 프로덕션 의존성만 필요합니다.

## 프로덕션 의존성 (10개)

### 1. React & React DOM
- **버전**: ^18.2.0
- **역할**: 컴포넌트 렌더링 및 상태 관리
- **사용 위치**: 모든 컴포넌트 파일
- **핵심 기능**: 
  - JSX 변환
  - Virtual DOM
  - 훅 시스템

### 2. Next.js
- **버전**: ^15.0.0
- **역할**: 메타프레임워크, SSG, 라우팅
- **사용 위치**: app/ 디렉토리, 빌드 시스템
- **핵심 기능**:
  - App Router (파일 기반 라우팅)
  - 정적 생성 (SSG)
  - 이미지 최적화
  - 코드 분할

### 3. TypeScript
- **버전**: ^5.0.0
- **역할**: 정적 타입 검사
- **사용 위치**: 모든 `.ts`, `.tsx` 파일
- **핵심 기능**:
  - 타입 안전성
  - IDE 자동완성
  - 컴파일 타임 오류 감지

### 4. Tailwind CSS
- **버전**: ^3.3.0
- **역할**: 유틸리티 기반 스타일링
- **사용 위치**: 모든 컴포넌트의 `className` 속성
- **핵심 기능**:
  - 디자인 시스템 (색상, 간격)
  - Responsive 디자인
  - 다크 모드 지원

### 5. Recharts
- **버전**: ^2.10.0
- **역할**: 차트 라이브러리
- **사용 위치**: `components/charts/` 디렉토리
- **핵심 기능**:
  - LineChart, BarChart, PieChart
  - Responsive 차트
  - 범례, 툴팁

### 6. Fuse.js
- **버전**: ^7.0.0
- **역할**: 클라이언트 사이드 전문 검색
- **사용 위치**: `lib/search.ts`, `hooks/use-methodology-filter.ts`
- **핵심 기능**:
  - 314개 방법론 검색
  - 퍼지 매칭 (오타 허용)
  - 무서버 (API 불필요)

### 7. next-themes
- **버전**: ^0.2.0
- **역할**: 라이트/다크 모드 관리
- **사용 위치**: `components/common/ThemeToggle.tsx`
- **핵심 기능**:
  - localStorage 기반 테마 저장
  - CSS 변수 자동 전환
  - 초기 로딩 깜빡임 방지

### 8. clsx
- **버전**: ^2.0.0
- **역할**: 조건부 CSS 클래스 병합
- **사용 위치**: 모든 컴포넌트
- **핵심 기능**:
  - `cn()` 함수로 사용
  - 조건부 클래스
  - TypeScript 지원

### 9. date-fns
- **버전**: ^3.0.0
- **역할**: 날짜 형식화 및 조작
- **사용 위치**: `lib/utils.ts`, 페이지 컴포넌트
- **핵심 기능**:
  - 날짜 포매팅
  - 상대 시간 (예: "2개월 전")
  - 로케일 지원

### 10. lucide-react
- **버전**: ^0.292.0
- **역할**: 아이콘 라이브러리
- **사용 위치**: 모든 컴포넌트
- **핵심 기능**:
  - 300+ SVG 아이콘
  - 커스터마이징 가능
  - 트리 쉐이킹

## 개발 의존성 (9개)

### TypeScript 관련
1. **typescript**: ^5.0.0 - 타입 검사
2. **@types/react**: ^18.0.0 - React 타입
3. **@types/node**: ^20.0.0 - Node.js 타입

### 린팅 및 포매팅
4. **eslint**: ^8.0.0 - 코드 품질
5. **eslint-config-next**: ^15.0.0 - Next.js ESLint 규칙
6. **prettier**: ^3.0.0 - 코드 포매팅

### 빌드 도구
7. **postcss**: ^8.0.0 - CSS 후처리
8. **autoprefixer**: ^10.0.0 - 벤더 프리픽스
9. **tailwindcss**: ^3.3.0 - Tailwind CSS (이미 프로덕션)

## 내부 모듈 의존성 그래프

### 페이지 → 다른 모듈
```
app/page.tsx
  ├→ components/common/SearchBar.tsx
  ├→ components/ui/Button.tsx
  └→ hooks/use-methodology-filter.ts

app/methodologies/page.tsx
  ├→ components/methodology/MethodologyCard.tsx
  ├→ components/ui/Table.tsx
  ├→ components/ui/Pagination.tsx
  ├→ hooks/use-methodology-filter.ts
  └→ data/methodologies.json

app/methodologies/[slug]/page.tsx
  ├→ data/methodologies.json
  ├→ data/sectoral-scopes.json
  ├→ data/governing-bodies.json
  ├→ components/ui/Card.tsx
  ├→ hooks/use-bookmarks.ts
  └→ lib/utils.ts

app/statistics/page.tsx
  ├→ data/statistics.json
  ├→ data/methodologies.json
  ├→ components/charts/* (9개)
  └→ lib/utils.ts

app/guide/page.tsx
  ├→ components/ui/Card.tsx
  └→ components/common/SearchBar.tsx
```

### 컴포넌트 → 다른 모듈
```
components/ui/*.tsx
  └→ lib/utils.ts (cn 함수)
  └→ tailwindcss (클래스)

components/methodology/MethodologyCard.tsx
  ├→ components/ui/Card.tsx
  ├→ components/ui/Badge.tsx
  ├→ hooks/use-bookmarks.ts
  └→ lib/utils.ts

components/charts/*.tsx
  ├→ recharts (Chart 컴포넌트)
  └→ lib/utils.ts

components/common/SearchBar.tsx
  ├→ fuse.js (search index)
  ├→ hooks/use-methodology-filter.ts
  └→ lucide-react (Search 아이콘)

components/common/ThemeToggle.tsx
  ├→ next-themes
  └→ lucide-react (Sun/Moon 아이콘)

components/layout/Header.tsx
  ├→ next/link (라우팅)
  ├→ components/common/ThemeToggle.tsx
  └→ lucide-react (Menu 아이콘)
```

### 훅 → 다른 모듈
```
hooks/use-methodology-filter.ts
  ├→ fuse.js (fuzzy search)
  ├→ lib/search.ts (createSearchIndex)
  ├→ data/methodologies.json
  └→ types/methodology.ts

hooks/use-bookmarks.ts
  ├→ react (useState)
  ├→ types/methodology.ts
  └→ lib/utils.ts
```

### 라이브러리 → 다른 모듈
```
lib/search.ts
  ├→ fuse.js
  ├→ data/methodologies.json
  └→ types/methodology.ts

lib/utils.ts
  ├→ clsx (cn 함수)
  ├→ date-fns (날짜 포매팅)
  └→ types/* (타입)
```

## 외부 의존성 관계도

```
React & React DOM
  ├→ Next.js (기반)
  ├→ TypeScript (타입)
  └→ 모든 컴포넌트

Next.js
  ├→ React & React DOM
  ├→ TypeScript
  └→ 라우팅, SSG, 최적화

Tailwind CSS
  ├→ PostCSS
  ├→ Autoprefixer
  └→ 모든 스타일링

Fuse.js
  └→ 검색 기능

Recharts
  ├→ React
  └→ 차트 렌더링

next-themes
  ├→ React
  └→ 테마 관리

date-fns
  └→ 날짜 포매팅

lucide-react
  ├→ React
  └→ 아이콘

clsx
  └→ 클래스 병합
```

## 의존성 크기 분석

### 번들 크기에 미치는 영향

| 패키지 | 크기 (gzip) | 영향도 | 최적화 방법 |
|--------|-----------|--------|---------|
| React | ~42KB | 높음 | Code splitting |
| Next.js | ~60KB | 높음 | Dynamic import |
| Tailwind CSS | ~15KB | 중간 | Purge unused CSS |
| Recharts | ~80KB | 높음 | Lazy load charts |
| Fuse.js | ~8KB | 낮음 | Always included |
| lucide-react | ~10KB | 중간 | Tree shaking |
| date-fns | ~12KB | 중간 | Modular import |
| next-themes | ~2KB | 낮음 | Always included |
| clsx | ~1KB | 낮음 | Always included |

### 최적화 방안

1. **동적 임포트**: 차트는 필요한 페이지에서만 로드
2. **Tree shaking**: 사용하지 않는 lucide 아이콘 제거
3. **Lazy loading**: 대용량 이미지는 lazy load
4. **캐싱**: 변경이 적은 번들은 브라우저 캐시

## 버전 호환성

### 최소 지원 버전
- Node.js: 18.0.0
- npm: 9.0.0
- React: 18.0.0 이상 필수

### 업그레이드 경로
- Next.js 15 → 16 (마이너 업그레이드)
- React 18 → 19 (호환성 확인 필요)
- TypeScript 5 → 6 (호환성 확인 필요)

## 보안 고려사항

### 알려진 취약점 모니터링
- `npm audit` 정기 실행
- Dependabot 자동 업데이트
- 보안 관련 마이너 업그레이드 우선 적용

### 권장사항
- 프로덕션 배포 전 `npm audit fix` 실행
- 의존성 업데이트는 월 1회 이상
- 보안 패치는 즉시 적용
