// GIR ORS - 소관 부처 데이터

import type { GoverningBody } from "@/types";

export const governingBodies: GoverningBody[] = [
  {
    id: "MOE",
    nameKo: "환경부",
    nameEn: "Ministry of Environment",
    abbreviation: "MOE",
    domains: ["폐기물", "대기질", "환경정책", "기후변화"],
    website: "https://www.me.go.kr",
  },
  {
    id: "MOTIE",
    nameKo: "산업통상자원부",
    nameEn: "Ministry of Trade, Industry and Energy",
    abbreviation: "MOTIE",
    domains: ["에너지", "산업", "전환", "신재생에너지"],
    website: "https://www.motie.go.kr",
  },
  {
    id: "MOLIT",
    nameKo: "국토교통부",
    nameEn: "Ministry of Land, Infrastructure and Transport",
    abbreviation: "MOLIT",
    domains: ["건물", "교통", "국토", "도시"],
    website: "https://www.molit.go.kr",
  },
  {
    id: "MAFRA",
    nameKo: "농림축산식품부",
    nameEn: "Ministry of Agriculture, Food and Rural Affairs",
    abbreviation: "MAFRA",
    domains: ["농업", "축산", "식품", "농촌"],
    website: "https://www.mafra.go.kr",
  },
  {
    id: "MOF",
    nameKo: "해양수산부",
    nameEn: "Ministry of Oceans and Fisheries",
    abbreviation: "MOF",
    domains: ["해양", "수산", "항만", "선박"],
    website: "https://www.mof.go.kr",
  },
];
