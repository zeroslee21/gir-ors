# GIR ORS 데이터 흐름

## 전체 데이터 흐름 개요

GIR ORS는 빌드 타임과 런타임에 서로 다른 데이터 흐름을 가집니다.

```
개발 단계          빌드 단계              배포 단계            사용자 단계
---------         ---------             ---------            ---------
JSON 데이터    →   import/번들링    →   정적 HTML         →   렌더링/상호작용
src/data/         Server Components    .next/static/         Client Components
                  + generateStaticParams  파일
```

## 1. 빌드 타임 데이터 흐름

### 데이터 로드 및 번들링

**단계 1: 데이터 파일 로드**
```
src/data/methodologies.json (파일)
  ↓
JavaScript 런타임이 읽음 (JSON 파싱)
  ↓
JavaScript 객체로 변환: Methodology[]
```

**단계 2: Server Components에서 임포트**
```
app/methodologies/[slug]/page.tsx
  ↓
import methodologies from '@/data/methodologies.json'
  ↓
이 데이터는 Server Component에 임포트됨
```

**단계 3: generateStaticParams 실행**
```
export async function generateStaticParams() {
  return methodologies.map(m => ({
    slug: m.slug
  }))
}
```
- 314개의 경로 생성: `/methodologies/CDM-METHODOLOGY-001`, ...
- 각 경로에 대해 정적 HTML 생성

**단계 4: 정적 HTML 생성**
```
methodologies 데이터
  ↓
각 방법론 정보를 HTML로 변환
  ↓
<h1>{methodology.name}</h1>
<p>{methodology.description}</p>
...
  ↓
.next/static/methodologies/[slug].html
```

**단계 5: 번들링**
```
모든 페이지의 공통 코드
  ↓
JavaScript 번들로 압축
  ↓
.next/static/_next/js/main-[hash].js
  ↓
gzip 압축: ~100KB
```

### 구체적인 예제

**방법론: CDM-METHODOLOGY-001**

```json
// src/data/methodologies.json 원본
{
  "id": "CDM-001",
  "slug": "CDM-METHODOLOGY-001",
  "name": "CDM 방법론 001",
  "description": "온실가스 감축...",
  "sectorId": "1",
  "governingBodyId": "1",
  "year": 2005,
  "status": "active"
}
```

```
빌드 타임 처리:
  ↓
app/methodologies/[slug]/page.tsx 실행
  ↓
generateStaticParams() → slug: "CDM-METHODOLOGY-001"
  ↓
params = { slug: "CDM-METHODOLOGY-001" }
  ↓
methodologies.find(m => m.slug === "CDM-METHODOLOGY-001")
  ↓
HTML 생성
```

```html
<!-- .next/static/methodologies/CDM-METHODOLOGY-001.html -->
<div>
  <h1>CDM 방법론 001</h1>
  <p>온실가스 감축...</p>
  <p>섹터: 에너지</p>
  <p>연도: 2005</p>
  <p>상태: 활성</p>
</div>
```

## 2. 런타임 데이터 흐름

### 정적 HTML → 클라이언트 렌더링

**단계 1: 브라우저가 HTML 요청**
```
사용자 → Nginx 서버
         ↓
         .next/static/index.html 반환
         ↓
         브라우저에서 렌더링
```

**단계 2: JavaScript 실행**
```
HTML 다운로드
  ↓
<script src="_next/js/main-[hash].js"></script> 로드
  ↓
React 초기화
  ↓
클라이언트 컴포넌트 렌더링
```

**단계 3: 클라이언트 컴포넌트 활성화**
```
searchBar 입력
  ↓
onChange 이벤트
  ↓
use-methodology-filter 훅 실행
  ↓
상태 업데이트
  ↓
화면 다시 렌더링
```

## 3. 검색 흐름 (클라이언트 사이드)

### Fuse.js 기반 검색 프로세스

**단계 1: 검색 인덱스 생성**

빌드 타임에 생성되거나 첫 로드 시 생성됩니다.

```typescript
// lib/search.ts
export function createSearchIndex(methodologies: Methodology[]) {
  const fuseOptions = {
    keys: ['name', 'description'],
    threshold: 0.3  // 오타 허용
  }
  return new Fuse(methodologies, fuseOptions)
}
```

결과:
```
methodologies (314개)
  ↓
Fuse.js 인덱싱
  ↓
검색 엔진 준비 완료 (메모리)
```

**단계 2: 사용자 검색어 입력**

```
Input: "CDM"
  ↓
onChange 이벤트
  ↓
setSearchQuery("CDM")
  ↓
상태 업데이트
```

**단계 3: 필터링 실행**

```typescript
// hooks/use-methodology-filter.ts
const results = index.search(searchQuery)
  .map(result => result.item)
```

검색 과정:
```
"CDM" 검색어
  ↓
Fuse.js가 name, description 필드 검색
  ↓
매칭된 방법론 반환
예:
  - "CDM-METHODOLOGY-001" (name: "CDM 방법론 001")
  - "CDM-METHODOLOGY-002" (name: "CDM 방법론 002")
  - ... (약 50개)
  ↓
결과를 상태로 저장: setFiltered(results)
```

**단계 4: 페이지네이션**

```
filtered: 50개 결과
pageSize: 20
  ↓
page 1: 1-20번째 방법론
page 2: 21-40번째
page 3: 41-50번째
  ↓
currentPage 상태로 표시
```

**단계 5: 테이블 렌더링**

```jsx
{filtered
  .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  .map(methodology => <MethodologyRow />)}
```

결과: 20개 행이 화면에 표시됨

### 검색 성능

```
검색어 입력 → 필터링 실행 → 화면 업데이트
       <100ms        <50ms
```

전체 시간: ~100-150ms (매우 빠름)

## 4. 필터링 흐름

### 섹터별 필터링

```
사용자: 섹터 "에너지" 선택
  ↓
setSelectedSector("에너지")
  ↓
filtered 배열에서 sectorId 필터링
  ↓
methodologies.filter(m => m.sectorId === "에너지")
  ↓
20-50개 결과
  ↓
테이블에 표시
```

### 상태별 필터링

```
사용자: 상태 "활성" 선택
  ↓
setSelectedStatus("active")
  ↓
methodologies.filter(m => m.status === "active")
  ↓
결과 표시
```

### 다중 필터링

```
(searchQuery="CDM") AND (sectorId="에너지") AND (status="active")
  ↓
3가지 조건을 모두 만족하는 방법론만 반환
  ↓
예: 5-10개 결과
```

## 5. 북마크 흐름 (localStorage)

### 북마크 추가

```
사용자: 방법론 상세 페이지에서 "북마크" 버튼 클릭
  ↓
toggleBookmark(methodologyId)
  ↓
useBookmarks 훅 내부:
  - 현재 bookmarks 배열 읽음
  - methodologyId 추가
  - setBookmarks(...) 호출
  ↓
useEffect 실행:
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  ↓
localStorage에 저장 완료
```

### 북마크 조회

```
브라우저 새로고침
  ↓
useBookmarks 훅 초기화
  ↓
useEffect에서 localStorage 읽음:
  const saved = localStorage.getItem('bookmarks')
  ↓
JSON.parse(saved)
  ↓
bookmarks 상태 복원
  ↓
북마크 상태 유지
```

### 데이터 구조

```javascript
// localStorage
{
  "bookmarks": "[\"CDM-001\", \"CDM-002\", \"ENERGY-003\"]"
}

// 메모리 (상태)
bookmarks: ["CDM-001", "CDM-002", "ENERGY-003"]
```

## 6. 테마 흐름 (next-themes)

### 테마 초기화

```
페이지 로드
  ↓
next-themes 초기화
  ↓
localStorage에서 선호 테마 읽음
  또는 시스템 설정 확인
  ↓
<html class="dark"> 또는 class="" 설정
  ↓
CSS 변수 적용
```

### 테마 전환

```
사용자: ThemeToggle 클릭
  ↓
setTheme("dark") 또는 setTheme("light")
  ↓
next-themes가 내부적으로:
  1. localStorage 업데이트
  2. HTML class 변경
  3. 시스템 다시 렌더링
  ↓
CSS 변수 재적용:
  dark mode: --bg: #1a1a1a, --fg: #ffffff
  light mode: --bg: #ffffff, --fg: #000000
  ↓
모든 컴포넌트 색상 변경
```

### Tailwind CSS와 통합

```
// 정의
<button className="bg-white dark:bg-black">

// light mode 렌더링
<button style="background-color: white">

// dark mode 렌더링
<button style="background-color: black">
```

## 7. 차트 데이터 흐름

### 데이터 준비

```
data/statistics.json
  ↓
yearlyData: {
  2005: 10,
  2006: 15,
  2007: 20,
  ...
}
```

### Recharts 렌더링

```
<LineChart data={yearlyData}>
  <XAxis dataKey="year" />
  <YAxis />
  <Line type="monotone" dataKey="count" />
</LineChart>
  ↓
Recharts가 데이터를 SVG로 변환
  ↓
SVG 렌더링:
  <line x1="0" y1="100" x2="50" y2="80" />
  <line x1="50" y1="80" x2="100" y2="60" />
  ...
  ↓
브라우저에서 그래프 표시
```

### 차트 업데이트

```
사용자: 섹터 선택
  ↓
섹터의 yearlyData로 업데이트
  ↓
<LineChart data={sectorYearlyData}>
  ↓
Recharts 자동 재렌더링
  ↓
차트 애니메이션으로 업데이트
```

## 8. 전체 페이지 로드 시퀀스

### 방법론 목록 페이지 로드

```
1. 사용자가 /methodologies 요청
   ↓
2. Nginx가 .next/static/methodologies/page.html 반환
   ↓
3. HTML 파싱 및 렌더링
   ↓
4. JavaScript 번들 로드
   ↓
5. React 초기화
   - SearchBar 컴포넌트 마운트
   - use-methodology-filter 훅 초기화
   - Fuse.js 검색 인덱스 생성
   ↓
6. 초기 렌더링
   - 314개 전체 방법론 표시 (또는 처음 20개)
   ↓
7. 인터랙티브 상태
   - 사용자 입력 대기
```

### 성능 지표

```
HTML 다운로드: ~50ms
JavaScript 파싱: ~100ms
React 초기화: ~200ms
Fuse.js 인덱싱: ~50ms
첫 렌더링: ~100ms
---------
총 TTFB: ~100ms
총 TTI: ~500ms
```

## 9. 데이터 일관성

### 변경 감지

```
src/data/methodologies.json 수정
  ↓
npm run build 실행
  ↓
새 데이터를 읽음
  ↓
314개 HTML 모두 재생성
  ↓
배포
```

### 캐싱 전략

```
정적 파일 (.html, .js, .css):
  - Cache-Control: public, max-age=31536000
  - Nginx에서 설정

JSON 데이터:
  - 빌드에 포함되어 있음
  - 변경 없음
```

## 10. 데이터 흐름 다이어그램

```
빌드 타임:
src/data/ (JSON)
    ↓
import/번들링
    ↓
generateStaticParams()
    ↓
314개 HTML 생성
    ↓
.next/static/

런타임:
사용자 요청 → HTML 다운로드 → JS 로드 → React 렌더링 → 클라이언트 상호작용
                                              ↓
                                         hooks/상태 관리
                                              ↓
                                         Fuse.js/localStorage
                                              ↓
                                         화면 업데이트
```

## 성능 최적화 포인트

### 1. 검색 최적화
- Fuse.js는 클라이언트에서만 실행 (API 호출 없음)
- 314개 인덱싱: ~50ms

### 2. 이미지 최적화
- Next.js Image Component 사용
- WebP 변환, lazy loading

### 3. 캐싱 전략
- 정적 파일: 캐시 극대화 (1년)
- HTML: 조건부 캐시 (필요 시)

### 4. 코드 분할
- 페이지별 자동 분할
- 차트는 필요한 페이지에서만 로드
