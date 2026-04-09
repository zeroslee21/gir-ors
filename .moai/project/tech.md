# GIR ORS 기술 스택 문서

## 기술 스택 전체 목록 (버전 포함)

### 핵심 프레임워크

| 기술 | 버전 | 용도 | 역할 |
|------|------|------|------|
| Next.js | 15.0+ | 메타프레임워크 | SSG (정적 사이트 생성), App Router, 빌드 시스템 |
| React | 19+ | UI 라이브러리 | 컴포넌트 기반 UI |
| TypeScript | 5.8+ | 언어 | 타입 안전성, 개발 생산성 |

### 스타일링

| 기술 | 버전 | 용도 | 역할 |
|------|------|------|------|
| Tailwind CSS | 4.0+ | CSS 프레임워크 | 유틸리티 기반 스타일, 다크모드 |
| PostCSS | 8.4+ | CSS 전처리 | Tailwind 통합 |
| next-themes | 0.2+ | 테마 관리 | 다크/라이트 모드 전환 |
| Pretendard | 1.3+ | 웹폰트 | 한국어 산세리프 폰트 |

### UI 컴포넌트 및 아이콘

| 기술 | 버전 | 용도 | 역할 |
|------|------|------|------|
| shadcn/ui 스타일 | - | UI 컴포넌트 | Button, Card, Badge, Input, Select, Table, Tabs, Separator, Skeleton, ScrollArea (자체 구현) |
| Lucide React | 0.263+ | 아이콘 라이브러리 | 24x24 SVG 아이콘 (에너지, 산업, 농업 등) |
| class-variance-authority (cva) | 0.7+ | 컴포넌트 변형 | 버튼 크기, 상태에 따른 스타일 조합 |

### 데이터 및 검색

| 기술 | 버전 | 용도 | 역할 |
|------|------|------|------|
| Fuse.js | 7.0+ | 퍼지 검색 | 클라이언트 사이드 텍스트 검색 (threshold: 0.3) |
| Recharts | 2.10+ | 차트 라이브러리 | PieChart, BarChart, LineChart, RadarChart |
| react-katex | 3.1+ | 수식 렌더링 | LaTeX 공식 렌더링 (예: ER = BE - PE - LE) |

### 패키지 관리 및 빌드

| 기술 | 버전 | 용도 | 역할 |
|------|------|------|------|
| pnpm | 8.0+ | 패키지 매니저 | npm 대체, 디스크 효율 (monorepo 준비) |
| Turbopack | 포함 | 번들러/개발 서버 | Next.js 15 기본, Webpack 대체 |
| ESLint | 9.0+ | 린터 | next/core-web-vitals 규칙 |
| TypeScript Compiler | 5.8+ | 컴파일 | .ts/.tsx → .js 컴파일 |

### 개발 환경

| 기술 | 버전 | 용도 | 역할 |
|------|------|------|------|
| Node.js | 22 LTS | 런타임 | 빌드, 개발 서버 실행 |
| npm/yarn/pnpm | 최신 | 패키지 관리 | 의존성 설치 |

## 프레임워크 선택 근거

### Next.js 15 (App Router)

**선택 이유:**
- SSG (정적 사이트 생성): 서버 런타임 비용 0 (AWS t3.micro에 최적)
- getStaticPaths/getStaticProps: 256개 방법론 + 15개 부문 경로 자동 생성
- App Router: 파일 시스템 기반 라우팅 (직관적)
- Turbopack: 빌드 속도 극대화 (Webpack 대비 10배)

**대안 검토:**
- Gatsby: SSG 강점이지만 플러그인 의존성 높음
- Hugo: 정적 사이트 최적이지만 React 불가능
- SPA (Create React App): 서버 필요 (비용 증가)

### React 19 + TypeScript 5.8

**선택 이유:**
- 타입 안전성: 314건 방법론 데이터 구조 정의 (Methodology, SectoralScope 타입)
- React 19: 자동 리렌더링 최적화
- 컴포넌트 재사용성: UI 컴포넌트 라이브러리화 가능

### Tailwind CSS v4

**선택 이유:**
- 유틸리티 기반: 빠른 스타일 적용
- 다크모드 지원: next-themes와 통합
- CSS 크기 최소화: purge CSS로 미사용 스타일 제거
- OKLch 색상 공간: 더 정확한 색상 표현

**특징:**
- 사용자 정의 색상: 에너지(파랑), 산업(빨강), 농업(초록) 구분
- 반응형 디자인: mobile-first 접근

## 의존성 목록 (10개 프로덕션 + 9개 개발)

### 프로덕션 의존성

```json
{
  "next": "15.0+",
  "react": "19+",
  "react-dom": "19+",
  "typescript": "5.8+",
  "fuse.js": "7.0+",
  "recharts": "2.10+",
  "react-katex": "3.1+",
  "next-themes": "0.2+",
  "lucide-react": "0.263+",
  "class-variance-authority": "0.7+"
}
```

**역할:**
1. next, react, react-dom: 핵심 프레임워크
2. typescript: 타입 체킹
3. fuse.js: 검색 엔진
4. recharts: 차트 렌더링
5. react-katex: 수식 렌더링
6. next-themes: 다크모드
7. lucide-react: 아이콘
8. class-variance-authority: 컴포넌트 변형

### 개발 의존성

```json
{
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "typescript": "^5.8",
  "tailwindcss": "^4.0",
  "postcss": "^8.4",
  "autoprefixer": "^10.4",
  "eslint": "^9.0",
  "eslint-config-next": "15.0+"
}
```

**역할:**
1. @types/*: TypeScript 타입 정의
2. tailwindcss, postcss: 스타일 빌드
3. autoprefixer: CSS 벤더 프리픽스
4. eslint: 코드 품질 검사

## 빌드 설정 상세

### next.config.ts

```typescript
// 정적 사이트 생성 설정
export default {
  output: "export",              // SSG 모드 (서버 런타임 없음)
  basePath: "",                  // 기본 경로
  trailingSlash: false,          // URL 뒤 슬래시 없음
  images: {
    unoptimized: true,           // next/image 최적화 비활성 (정적)
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
    strict: true,
  },
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: false,
  },
}
```

**주요 옵션:**
- output: "export": 정적 HTML 생성
- unoptimized: true: 이미지 자동 최적화 불필요 (정적 파일)

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,              // 엄격한 타입 체킹
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "paths": {
      "@/*": ["./src/*"]         // 경로 별칭
    }
  }
}
```

**strict 모드:**
- noImplicitAny: 암시적 any 금지
- strictNullChecks: null/undefined 엄격 체크
- strictFunctionTypes: 함수 매개변수 타입 체크

### postcss.config.mjs

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### eslint.config.mjs

```javascript
import nextPlugin from 'eslint-plugin-next';

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'warn',
    }
  }
]
```

## CSS 아키텍처

### Tailwind v4 구조

**색상 정의 (globals.css):**
```css
@theme {
  --color-energy: #0066cc;     /* 에너지 (파랑) */
  --color-industry: #cc0000;   /* 산업 (빨강) */
  --color-agriculture: #00aa00; /* 농업 (초록) */
  --color-waste: #ff9900;      /* 폐기물 (주황) */
}
```

**다크모드 지원:**
- light: #ffffff 배경, #000000 텍스트
- dark: #0a0a0a 배경, #ffffff 텍스트
- next-themes: class 전략 (html[data-theme="dark"])

**디자인 토큰:**
- 간격: 4px 단위 (Tailwind 기본)
- 폰트 크기: 14px ~ 32px
- 경계 반경: 4px, 8px, 12px

### 반응형 디자인

**Breakpoints:**
- sm: 640px
- md: 768px (태블릿)
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

**구현:**
- 모바일 우선 (base → md: → lg:)
- 예: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (섹터 그리드)

## 폰트 전략

### Pretendard 한국어 웹폰트

**로딩 방식:**
- font-display: swap (FOUT 전략)
- 무게(weights): 400 (Regular), 600 (SemiBold), 700 (Bold)
- 파일 크기: ~300KB (woff2 압축)

**적용:**
```css
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

**우선순위:**
```css
body {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

## 검색 구현 (Fuse.js)

### 설정

```typescript
// lib/search.ts
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: ['name', 'description', 'id'],  // 검색 필드
  threshold: 0.3,                        // 0~1: 낮을수록 정확함
  includeScore: true,                    // 점수 반환
  minMatchCharLength: 1,                 // 최소 1글자
};

const fuse = new Fuse(methodologies, fuseOptions);
```

**threshold 0.3:** "CDM-1" → "CDM1" 매칭 가능

### 검색 성능

**314건 데이터:**
- 첫 입력 시 <50ms
- 실시간 입력 <100ms
- 클라이언트 사이드 (네트워크 레이턴시 없음)

**최적화:**
- Web Worker 사용 (향후)
- 검색 결과 캐싱

## 차트 구현 (Recharts 4종)

### 1. 파이 차트 (CDM vs 국내)

```typescript
<PieChart width={300} height={300}>
  <Pie
    data={[
      { name: 'CDM', value: 211 },
      { name: 'Domestic', value: 103 }
    ]}
    cx="50%"
    cy="50%"
    labelLine={false}
    label={({ name, value }) => `${name} ${value}`}
  />
</PieChart>
```

**렌더링:**
- 클라이언트 사이드 (SVG)
- 반응형 (부모 width에 따라 조정)

### 2. 막대 차트 (기관별)

```typescript
<BarChart data={byGovernBody} width={600} height={300}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="count" fill="#0066cc" />
</BarChart>
```

### 3. 선 그래프 (연도별 추이)

```typescript
<LineChart data={yearlyStats} width={800} height={400}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="year" />
  <YAxis />
  <Line type="monotone" dataKey="count" stroke="#0066cc" />
</LineChart>
```

**데이터:** 2015-2024 (10년간 누적)

### 4. 레이더 차트 (부문별 분포)

```typescript
<RadarChart data={bySector} width={400} height={400}>
  <PolarGrid />
  <PolarAngleAxis dataKey="sector" />
  <Radar name="Methods" dataKey="count" />
</RadarChart>
```

**축:** 에너지, 산업, 농업, 폐기물, 기타

## 배포 인프라 상세

### AWS EC2 구성

**인스턴스:**
- 타입: t3.micro
- vCPU: 1개
- 메모리: 1GB
- 스토리지: EBS 8GB
- 리전: ap-northeast-2 (서울)

**비용:**
- EC2: ~$5/월
- ALB: ~$15/월 (고정 요금)
- 총: ~$20/월

**OS:**
- Amazon Linux 2023
- glibc 2.34+
- 커널 5.15+

### Application Load Balancer (ALB)

**설정:**
- 이름: verdex-web-alb
- 프로토콜: HTTP, HTTPS
- 포트: 80, 443
- 대상: EC2 (포트 80)

**라우팅:**
```
verdex.kr → ALB (HTTPS 재지정)
         ↓
EC2:80 (Nginx)
      ↓
.next/standalone (정적 파일)
```

### Nginx 설정

**파일:** /etc/nginx/conf.d/ors.verdex.kr.conf

```nginx
server {
  listen 80;
  server_name ors.verdex.kr;
  root /var/www/ors.verdex.kr;
  
  # Gzip 압축
  gzip on;
  gzip_types text/css application/javascript;
  gzip_comp_level 9;
  
  # 캐싱
  location ~* \.(css|js|svg|png|jpg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
  
  # 정적 HTML
  location / {
    try_files $uri $uri.html =404;
  }
}
```

**성능:**
- Gzip: CSS 80% 압축, JS 70% 압축
- 캐싱: 브라우저 1년, CDN 1일

### SSL/TLS (Let's Encrypt + AWS ACM)

**발급:**
- 발급처: AWS Certificate Manager (무료)
- 갱신: 자동 (90일 주기)
- 프로토콜: TLS 1.3

**ALB 설정:**
- HTTPS 리스너: 포트 443
- 인증서: ACM
- HTTP → HTTPS 리다이렉트: 301

## 개발 환경 상세

### Node.js 22 LTS

**설치:**
```bash
nvm install 22
nvm use 22
node --version  # v22.x.x
```

**특징:**
- V8 엔진 최신 버전
- ECMAScript 2024 지원
- 성능 최적화 (약 10% 개선)

### pnpm (패키지 매니저)

**설치:**
```bash
npm install -g pnpm@latest
pnpm --version
```

**npm 대비 장점:**
- 디스크 효율: 링크 기반 (복제 없음)
- 설치 속도: 2-3배 빠름
- monorepo 지원: workspace

**명령어:**
```bash
pnpm install        # 의존성 설치
pnpm dev            # 개발 서버 (Turbopack)
pnpm build          # 정적 빌드
pnpm start          # 프로덕션 서버 (정적 파일)
pnpm lint           # ESLint 검사
```

### Turbopack (개발 서버)

**성능:**
- Webpack 대비 10배 빠름
- Hot Module Replacement (HMR) <100ms
- 1,000개 모듈 로드 <3초

**설정:** next.config.ts의 turbo 옵션

## 성능 고려사항

### 정적 사이트 생성 (SSG)

**장점:**
- TTFB (Time to First Byte): <100ms
- 캐싱: Nginx, CDN, 브라우저
- 대역폭: Gzip으로 50% 감소
- 서버 비용: t3.micro로 충분

**제약:**
- 데이터 변경 시 재빌드 필요
- 빌드 시간: 314건 방법론 ~30초

### 클라이언트 성능

**번들 크기:**
- HTML: ~100KB (gzip 후 ~30KB)
- CSS: ~80KB (gzip 후 ~15KB)
- JavaScript: ~600KB (gzip 후 ~150KB)
- 합계: 약 1.5MB (gzip 후 ~200KB)

**로딩 시간:**
- 초기 페이지 로드: ~1.5초 (3G)
- 상호작용: ~2초 (FCP, TTI)

**최적화:**
- 코드 분할 (Next.js 자동)
- Tree shaking (미사용 코드 제거)
- 이미지 최적화 (WebP)

### SEO 최적화

**정적 HTML:**
- 검색 엔진 크롤링 최적
- Open Graph 메타데이터
- Sitemap: `public/sitemap.xml`

**구조화된 데이터:**
```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "GIR ORS Methodology Registry",
  "description": "314 GHG reduction methodologies",
  "keywords": "CDM, carbon, methodology"
}
```

## 향후 기술 진화

### 단계 1: 데이터 확대 (500건+)

**문제:** JSON 파일 크기 증가, 빌드 시간 증가

**해결:**
- PostgreSQL 데이터베이스 도입
- Node.js API 서버 추가 (Express/Fastify)
- 동적 렌더링 (ISR: Incremental Static Regeneration)

### 단계 2: API 서버

**구현:**
- FastAPI (Python) 또는 Express (Node.js)
- 엔드포인트: /api/v1/methodologies, /api/v1/sectors
- 인증: API 키 또는 OAuth2
- 속도 제한: Rate limiting 구현

### 단계 3: 데이터베이스

**마이그레이션:**
- PostgreSQL (관계형)
- 스키마: methodologies, sectors, agencies, yearly_stats
- 인덱싱: 방법론 검색 최적화

### 단계 4: 고급 기능

**구현:**
- 사용자 인증 (Auth0)
- 실시간 협력 (WebSocket)
- 머신러닝 추천 (기업 → 적합 방법론)
- 블록체인 검증 (향후)
