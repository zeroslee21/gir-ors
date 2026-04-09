# ORS 탐색기

한국 온실가스종합정보센터(GIR) 상쇄등록부시스템(ORS)에 등록된 **314건의 감축방법론**을 탐색하고 분석할 수 있는 웹 플랫폼입니다.

**https://ors.verdex.kr**

## 주요 기능

- **방법론 탐색**: 314건 검색, 필터링, 페이지네이션
- **통계 대시보드**: CDM/국내 분포, 사업분야별, 연도별 추이 차트
- **사업분야**: UNFCCC 15개 Sectoral Scope 분류
- **관장기관**: 5개 부처별 방법론 현황
- **제도 안내**: 배출권거래제, 감축량 산정, 추가성 해설

## 데이터

| 구분 | 건수 |
|------|------|
| CDM 방법론 (AM/ACM/AMS) | 211건 |
| 국내 자체 개발 방법론 | 103건 |
| **합계** | **314건** |

- 15개 사업분야 (UNFCCC Sectoral Scope)
- 5개 관장기관 (환경부, 산업통상자원부, 국토교통부, 농림축산식품부, 해양수산부)
- 2026년 4월 기준

## 기술 스택

- **Next.js 15** (App Router, Static Export)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** + Pretendard 폰트
- **Recharts** 데이터 시각화
- **Fuse.js** 퍼지 검색

## 시작하기

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # 정적 빌드 (out/)
```

## 데이터 출처

- [ORS 상쇄등록부시스템](https://ors.gir.go.kr)
- [한국에너지공단 외부사업 포털](https://offset.energy.or.kr)
- [UNFCCC CDM 방법론](https://cdm.unfccc.int/methodologies)
- 환경부 고시 제2023-258호 「외부사업 타당성 평가 및 감축량 인증에 관한 지침」

## 라이선스

이 프로젝트는 공개 데이터를 기반으로 제작된 비공식 정보 플랫폼입니다.
