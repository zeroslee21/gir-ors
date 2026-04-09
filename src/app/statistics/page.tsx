"use client";

// 통계 대시보드 페이지 - recharts 기반 인터랙티브 차트
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart2,
  Globe,
  Home,
  Layers,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/common/stat-card";
import { summaryStats, yearlyData } from "@/data/statistics";

// 차트 색상 팔레트 - CSS 변수와 호환되는 hex 값
const COLORS = {
  primary: "#059669",
  blue: "#2563EB",
  amber: "#d97706",
  slate: "#64748b",
  green2: "#10b981",
  purple: "#7c3aed",
};

// CDM vs 국내 분포 데이터
const cdmDomesticData = [
  { name: "CDM 방법론", value: 211 },
  { name: "국내 방법론", value: 103 },
];

// CDM 분류별 데이터
const cdmCategoryData = [
  { name: "AM (대규모)", value: 95 },
  { name: "ACM (통합)", value: 25 },
  { name: "AMS (소규모)", value: 91 },
];

// 사업분야별 방법론 수 데이터 (추정치)
const sectorData = [
  { name: "에너지산업", count: 98 },
  { name: "에너지수요", count: 72 },
  { name: "폐기물 처리", count: 45 },
  { name: "수송", count: 38 },
  { name: "제조업", count: 32 },
  { name: "농업", count: 28 },
  { name: "에너지공급", count: 24 },
  { name: "조림·재조림", count: 20 },
  { name: "화학산업", count: 18 },
  { name: "연료 탈루", count: 15 },
  { name: "금속생산", count: 12 },
  { name: "건설", count: 10 },
  { name: "광업·광물", count: 8 },
  { name: "할로카본", count: 7 },
  { name: "용제 사용", count: 4 },
];

// 커스텀 툴팁 컴포넌트
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        {label && <p className="mb-1 text-sm font-medium">{label}</p>}
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}건
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 파이 차트 커스텀 레이블
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function StatisticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">통계 대시보드</h1>
        <p className="mt-2 text-muted-foreground">
          한국 상쇄등록부 감축방법론 현황 및 분포를 시각적으로 분석합니다.
        </p>
      </div>

      {/* 요약 통계 카드 */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          title="전체 방법론"
          value={summaryStats.totalMethodologies}
          icon={BarChart2}
          description="총 등록 방법론"
        />
        <StatCard
          title="CDM 방법론"
          value={summaryStats.cdmCount}
          icon={Globe}
          description="UNFCCC 승인"
        />
        <StatCard
          title="국내 방법론"
          value={summaryStats.domesticCount}
          icon={Home}
          description="국내 자체 개발"
        />
        <StatCard
          title="AM 방법론"
          value={summaryStats.amCount}
          icon={Layers}
          description="대규모 방법론"
        />
        <StatCard
          title="ACM 방법론"
          value={summaryStats.acmCount}
          icon={BookOpen}
          description="통합 방법론"
        />
        <StatCard
          title="AMS 방법론"
          value={`~${summaryStats.amsCount}`}
          icon={TrendingUp}
          description="소규모 방법론"
        />
      </div>

      {/* 차트 그리드 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. CDM vs 국내 분포 파이 차트 */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">CDM vs 국내 분포</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            전체 314건 방법론의 CDM / 국내 구분 비율
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={cdmDomesticData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                dataKey="value"
              >
                <Cell fill={COLORS.blue} />
                <Cell fill={COLORS.primary} />
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}건`, ""]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 2. CDM 분류별 파이 차트 */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">CDM 분류별 분포</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            CDM 211건을 AM / ACM / AMS 유형별로 구분
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={cdmCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                dataKey="value"
              >
                <Cell fill={COLORS.blue} />
                <Cell fill={COLORS.amber} />
                <Cell fill={COLORS.slate} />
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}건`, ""]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. 사업분야별 방법론 수 막대 차트 */}
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">사업분야별 방법론 수</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            15개 Sectoral Scope 별 방법론 분포 (중복 적용 포함 추정치)
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={sectorData}
              layout="vertical"
              margin={{ top: 0, right: 30, left: 80, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12 }}
                width={75}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="방법론 수" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 4. 연도별 증가 추이 라인 차트 */}
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">연도별 방법론 증가 추이</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            2015-2024년 CDM(고정) 및 국내 방법론 누적 증가 현황
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={yearlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 250]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="cdm"
                name="CDM 방법론"
                stroke={COLORS.blue}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="domestic"
                name="국내 방법론"
                stroke={COLORS.primary}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
