import { cn } from "@/lib/utils";

// 감축량 산정 공식 표시 컴포넌트
// ER = BE - PE - LE 수식을 시각적으로 렌더링
interface FormulaDisplayProps {
  formula: string;
  className?: string;
  showLegend?: boolean;
}

// 수식 요소별 설명
const formulaLegend: Record<string, string> = {
  ER: "감축량 (Emission Reduction)",
  BE: "기준선 배출량 (Baseline Emission)",
  PE: "사업 배출량 (Project Emission)",
  LE: "누출량 (Leakage Emission)",
};

export function FormulaDisplay({
  formula,
  className,
  showLegend = false,
}: FormulaDisplayProps) {
  // 수식의 각 변수를 하이라이트
  const renderFormula = (text: string) => {
    const parts = text.split(/(\b(?:ER|BE|PE|LE)\b)/g);
    return parts.map((part, i) => {
      if (part in formulaLegend) {
        const colors: Record<string, string> = {
          ER: "bg-primary/15 text-primary",
          BE: "bg-blue/15 text-blue",
          PE: "bg-amber/15 text-amber",
          LE: "bg-destructive/15 text-destructive",
        };
        return (
          <span
            key={i}
            className={cn(
              "inline-block rounded-md px-2 py-0.5 font-mono font-bold",
              colors[part]
            )}
            title={formulaLegend[part]}
          >
            {part}
          </span>
        );
      }
      return (
        <span key={i} className="font-mono text-muted-foreground">
          {part}
        </span>
      );
    });
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* 수식 */}
      <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 px-4 py-3 text-lg">
        {renderFormula(formula)}
      </div>

      {/* 범례 */}
      {showLegend && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(formulaLegend).map(([key, desc]) => {
            const dotColors: Record<string, string> = {
              ER: "bg-primary",
              BE: "bg-blue",
              PE: "bg-amber",
              LE: "bg-destructive",
            };
            return (
              <div key={key} className="flex items-center gap-2">
                <span
                  className={cn("h-2.5 w-2.5 rounded-full", dotColors[key])}
                />
                <span className="text-muted-foreground">
                  <strong className="font-medium text-foreground">{key}</strong>{" "}
                  = {desc}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
