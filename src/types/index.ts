// GIR ORS 방법론 탐색기 - 타입 정의

export type MethodologyType = "CDM" | "DOMESTIC";
export type CdmCategory = "AM" | "ACM" | "AMS" | "AR-AM" | "AR-AMS" | "CCS";
export type AmsType = "I" | "II" | "III";
export type MethodologyStatus = "active" | "inactive" | "superseded";
export type AdditionalityType = "legal" | "legal+economic";

export interface Methodology {
  id: string;
  name: string;
  nameEn?: string;
  type: MethodologyType;
  cdmCategory?: CdmCategory;
  amsType?: AmsType;
  version: string;
  sectoralScopes: number[];
  governingBody?: string;
  status: MethodologyStatus;
  registrationDate?: string;
  approvedDate?: string; // 승인 날짜 (YYYY-MM-DD)
  description?: string;
  applicability?: string[];
  baselineApproach?: string;
  monitoringMethod?: string;
  emissionFormula?: string;
  additionality?: AdditionalityType;
  sourceUrl?: string;
}

export interface SectoralScope {
  id: number;
  nameKo: string;
  nameEn: string;
  category: "industry" | "emission-source";
  description: string;
  icon: string; // Lucide 아이콘 이름
}

export interface GoverningBody {
  id: string;
  nameKo: string;
  nameEn: string;
  abbreviation: string;
  domains: string[];
  website?: string;
}

export interface YearlyData {
  year: number;
  total: number;
  cdm: number;
  domestic: number;
}
