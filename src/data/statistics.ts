// GIR ORS - 연도별 통계 데이터

import type { YearlyData } from "@/types";

export const yearlyData: YearlyData[] = [
  { year: 2015, total: 220, cdm: 200, domestic: 20 },
  { year: 2016, total: 228, cdm: 205, domestic: 23 },
  { year: 2017, total: 235, cdm: 208, domestic: 27 },
  { year: 2018, total: 245, cdm: 209, domestic: 36 },
  { year: 2019, total: 255, cdm: 211, domestic: 44 },
  { year: 2020, total: 268, cdm: 211, domestic: 57 },
  { year: 2021, total: 280, cdm: 211, domestic: 69 },
  { year: 2022, total: 293, cdm: 211, domestic: 82 },
  { year: 2023, total: 303, cdm: 211, domestic: 92 },
  { year: 2024, total: 314, cdm: 211, domestic: 103 },
];

export const summaryStats = {
  totalMethodologies: 314,
  cdmCount: 211,
  domesticCount: 103,
  sectorCount: 15,
  governingBodyCount: 5,
  amCount: 95,
  acmCount: 25,
  amsCount: 91,
};
