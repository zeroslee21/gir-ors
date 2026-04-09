// GIR ORS - 연도별 통계 데이터
// 실제 크롤링 데이터 기반 (2026년 4월)
// 총 322건: CDM 209건 + 국내 113건

import type { YearlyData } from "@/types";

// 연도별 누적 등록 현황 (실제 등록일 기준)
// 2015: 8건, 2016: 215건(CDM 일괄등록), 2017: 9건, 2019: 2건,
// 2020: 12건, 2021: 7건, 2022: 13건, 2023: 11건, 2024: 14건,
// 2025: 25건, 2026: 6건
export const yearlyData: YearlyData[] = [
  { year: 2015, total: 8, cdm: 0, domestic: 8 },
  { year: 2016, total: 223, cdm: 211, domestic: 12 },
  { year: 2017, total: 232, cdm: 211, domestic: 21 },
  { year: 2018, total: 232, cdm: 211, domestic: 21 },
  { year: 2019, total: 234, cdm: 211, domestic: 23 },
  { year: 2020, total: 246, cdm: 211, domestic: 35 },
  { year: 2021, total: 253, cdm: 211, domestic: 42 },
  { year: 2022, total: 266, cdm: 211, domestic: 55 },
  { year: 2023, total: 277, cdm: 211, domestic: 66 },
  { year: 2024, total: 291, cdm: 211, domestic: 80 },
  { year: 2025, total: 316, cdm: 211, domestic: 105 },
  { year: 2026, total: 322, cdm: 209, domestic: 113 },
];

export const summaryStats = {
  totalMethodologies: 322,
  cdmCount: 209,
  domesticCount: 113,
  sectorCount: 15,
  governingBodyCount: 5,
  amCount: 87,
  acmCount: 25,
  amsCount: 95, // AMS-I:13 + AMS-II:19 + AMS-III:63
  arAmsCount: 2,
};
