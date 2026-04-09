// 제도 안내 페이지 - 서버 컴포넌트
import type { Metadata } from "next";
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Scale,
  Globe,
  FileText,
  Layers,
  ExternalLink,
} from "lucide-react";
import { FormulaDisplay } from "@/components/common/formula-display";

export const metadata: Metadata = {
  title: "제도 안내",
  description:
    "배출권거래제 외부사업 감축방법론의 구조, 추가성 입증 기준, CDM 체계 및 제도 변화를 안내합니다.",
};

// 섹션 헤더 컴포넌트
function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">제도 안내</h1>
        <p className="mt-2 text-muted-foreground">
          배출권거래제 외부사업 감축방법론의 구조, 산정 방식, 제도 변화를
          안내합니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. 배출권거래제 외부사업 개요 */}
        <section className="rounded-xl border border-border bg-card p-6">
          <SectionHeader
            icon={BookOpen}
            title="배출권거래제 외부사업 개요"
            subtitle="한국 탄소시장의 외부 감축사업 제도"
          />
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">한국 배출권거래제(K-ETS)</strong>는
              2015년 세계 두 번째로 도입된 국가 단위 탄소배출권 거래시스템으로,
              할당 대상 업체 외의 사업장·개인·단체도 온실가스 감축 활동을 통해
              외부사업 인증실적(KCU)을 획득할 수 있습니다.
            </p>
            <p>
              외부사업은 GIR(온실가스종합정보센터)에서 운영하는{" "}
              <strong className="text-foreground">
                상쇄등록부시스템(ORS, Offset Registry System)
              </strong>
              을 통해 등록·관리됩니다. 사업자는 정부가 승인한 감축방법론에
              따라 사업을 수행하고, 모니터링 보고서를 제출하여 실적을 인증받습니다.
            </p>
            <p>
              현재 총{" "}
              <strong className="text-foreground">314건의 감축방법론</strong>이
              등록되어 있으며, UNFCCC CDM에서 채택한 211건과 국내에서 자체 개발한
              103건으로 구성됩니다.
            </p>
          </div>
        </section>

        {/* 2. 감축방법론의 4대 구성요소 */}
        <section className="rounded-xl border border-border bg-card p-6">
          <SectionHeader
            icon={Layers}
            title="감축방법론의 4대 구성요소"
            subtitle="모든 방법론이 공통으로 포함해야 하는 필수 항목"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                title: "적용조건",
                desc: "방법론을 적용할 수 있는 사업 유형, 규모, 기술적 조건을 명시합니다. 사업이 해당 조건을 모두 충족해야만 방법론 적용이 가능합니다.",
                color: "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/30",
                textColor: "text-blue-700 dark:text-blue-300",
              },
              {
                title: "베이스라인",
                desc: "사업이 없었을 경우 발생했을 기준 배출량(Reference Case)을 산정하는 방법론적 접근법을 규정합니다. 감축량 계산의 기준점이 됩니다.",
                color: "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30",
                textColor: "text-amber-700 dark:text-amber-300",
              },
              {
                title: "모니터링",
                desc: "실제 온실가스 감축을 확인하기 위해 수집해야 하는 데이터, 측정 방법, 모니터링 주기, 품질 관리 절차를 규정합니다.",
                color: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/30",
                textColor: "text-green-700 dark:text-green-300",
              },
              {
                title: "감축량 산정",
                desc: "모니터링 데이터를 이용하여 실제 온실가스 감축량을 계산하는 구체적인 공식과 파라미터를 규정합니다. ER = BE - PE - LE가 핵심 공식입니다.",
                color: "bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-900/30",
                textColor: "text-purple-700 dark:text-purple-300",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-lg border p-4 ${item.color}`}
              >
                <h3 className={`mb-2 font-semibold ${item.textColor}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 핵심 산정 공식 */}
        <section className="rounded-xl border border-border bg-card p-6">
          <SectionHeader
            icon={TrendingUp}
            title="핵심 산정 공식"
            subtitle="온실가스 감축량 계산의 기본 공식"
          />
          <p className="mb-4 text-sm text-muted-foreground">
            모든 감축방법론의 배출량 산정은 아래 기본 공식을 따릅니다.
            기준선 배출량에서 사업 배출량과 누출량을 차감하여 순 감축량을 계산합니다.
          </p>
          <FormulaDisplay formula="ER = BE - PE - LE" showLegend={true} />
          <p className="mt-4 text-xs text-muted-foreground">
            * 단위: tCO₂-eq (이산화탄소 환산톤) | ER이 양수일 때만 감축실적 인정
          </p>
        </section>

        {/* 4. 추가성 입증 */}
        <section className="rounded-xl border border-border bg-card p-6">
          <SectionHeader
            icon={CheckCircle2}
            title="추가성(Additionality) 입증"
            subtitle="방법론을 적용하는 모든 사업이 반드시 충족해야 하는 요건"
          />
          <p className="mb-4 text-sm text-muted-foreground">
            추가성이란 해당 사업이 배출권 거래제 지원 없이는 실현되지 않았을
            것임을 증명하는 요건입니다.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-4">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">법적·제도적 추가성</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">모든 사업</strong>에 적용됩니다.
                법령, 규정 등으로 의무화된 감축 활동은 추가성이 없는 것으로
                간주합니다. 법적으로 이미 요구되지 않는 자발적 감축임을 증명해야 합니다.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">경제적 추가성</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                연간 감축량{" "}
                <strong className="text-foreground">
                  60,000 tCO₂-eq 초과
                </strong>{" "}
                사업에 추가로 적용됩니다. 사업이 배출권 수익 없이는 경제적으로
                실현 가능하지 않음을 투자 분석(IRR, NPV 등)으로 증명해야 합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 5. CDM 방법론 체계 */}
        <section className="rounded-xl border border-border bg-card p-6">
          <SectionHeader
            icon={Globe}
            title="CDM 방법론 체계"
            subtitle="UNFCCC 청정개발체제(CDM)에서 채택된 211건의 분류"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                code: "AM",
                name: "대규모 방법론",
                count: "95건",
                desc: "대형 에너지·산업 시설 등 연간 감축량이 60,000 tCO₂-eq 초과인 대규모 사업에 적용되는 방법론",
                color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
              },
              {
                code: "ACM",
                name: "통합 대규모 방법론",
                count: "25건",
                desc: "유사한 여러 방법론을 통합하여 하나로 만든 통합 방법론으로, 더 넓은 범위의 사업에 유연하게 적용 가능",
                color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
              },
              {
                code: "AMS",
                name: "소규모 방법론",
                count: "약 91건",
                desc: "연간 감축량 60,000 tCO₂-eq 이하의 소규모 사업에 적용. 간소화된 절차 적용 가능하며 I/II/III 3개 카테고리로 세분",
                color: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300",
              },
            ].map((item) => (
              <div key={item.code} className="rounded-lg border border-border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-bold ${item.color}`}
                  >
                    {item.code}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {item.count}
                  </span>
                </div>
                <h3 className="mb-1.5 font-medium">{item.name}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 제도 변화 및 전망 */}
        <section className="rounded-xl border border-border bg-card p-6">
          <SectionHeader
            icon={Scale}
            title="제도 변화 및 전망"
            subtitle="K-ETS와 국제 탄소시장의 주요 변화"
          />
          <div className="space-y-4">
            {[
              {
                year: "2026-2035",
                title: "제4차 기본계획 시행",
                desc: "제4차 배출권거래제 기본계획(2026-2035)에 따라 외부사업 인정 범위 및 절차가 개편될 예정입니다. 국내 방법론 추가 개발 및 기존 방법론 갱신이 진행됩니다.",
                badge: "예정",
                badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
              },
              {
                year: "2027",
                title: "CDM 종료 및 전환",
                desc: "UNFCCC CDM 제도는 2027년 12월 31일 공식 종료됩니다. 기존 CDM 방법론의 K-ETS 활용 가능 여부 및 파리협정 제6조 체제로의 전환에 관한 규정이 마련될 예정입니다.",
                badge: "주의",
                badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
              },
              {
                year: "2024~",
                title: "파리협정 제6조 전환",
                desc: "파리협정 제6.2조(협력적 접근법)와 제6.4조(지속가능개발메커니즘) 체계로의 전환이 진행 중입니다. 국제적으로 이전 가능한 감축실적(ITMO)과의 연계 방안이 검토되고 있습니다.",
                badge: "진행중",
                badgeColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
              },
            ].map((item) => (
              <div
                key={item.year}
                className="flex items-start gap-4 rounded-lg border border-border p-4"
              >
                <div className="shrink-0 text-center">
                  <p className="text-xs text-muted-foreground">기준</p>
                  <p className="text-sm font-semibold">{item.year}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. 관련 법령 */}
        <section className="rounded-xl border border-border bg-card p-6">
          <SectionHeader
            icon={FileText}
            title="관련 법령 및 참고자료"
            subtitle="외부사업 감축방법론 관련 주요 법규 및 고시"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: "온실가스 배출권의 할당 및 거래에 관한 법률",
                org: "환경부",
                desc: "K-ETS 제도의 근거 법률. 외부사업 인정 및 외부사업 인증실적(KCU) 관련 규정 포함",
                url: "https://www.law.go.kr",
              },
              {
                title: "외부사업 등록·심사·발급 절차 등에 관한 지침",
                org: "환경부 고시",
                desc: "외부사업의 등록, 심사, 감축실적 발급 절차 및 방법론 적용 기준을 상세히 규정",
                url: "https://www.me.go.kr",
              },
              {
                title: "온실가스 배출권거래제 운영지침",
                org: "환경부",
                desc: "배출권 거래제 전반의 운영 기준 및 절차를 규정하는 상위 지침",
                url: "https://www.me.go.kr",
              },
              {
                title: "ORS 사용자 매뉴얼",
                org: "GIR (온실가스종합정보센터)",
                desc: "상쇄등록부시스템(ORS) 이용 절차 및 방법론 신청·등록 가이드",
                url: "https://ors.gir.go.kr",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium group-hover:text-primary">
                    {item.title}
                  </h3>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
                <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {item.org}
                </span>
                <p className="mt-2 text-xs text-muted-foreground">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
