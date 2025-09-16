import Card from "@/components/ui/Card";
import { formatPretty, toPretty } from "@/lib/currency";

export default function ResultPanel({ result }) {
  if (!result) return null;
  const wager = formatPretty(toPretty(Number(result.wagerCopper || 0)));
  const prev = formatPretty(
    result.previousBalancePretty || toPretty(Number(result.previousBalance || 0))
  );
  const next = formatPretty(
    result.updatedBalancePretty || toPretty(Number(result.updatedBalance || 0))
  );

  return (
    <Card style={{
      background: result.win ? "#e6ffed" : "#fff7e6",
      border: `1px solid ${result.win ? "#8ce1a5" : "#ffd699"}`,
    }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        {result.win ? "You won!" : "You lost."}
      </div>
      <div>Outcome: {result.outcome}</div>
      {result.choice && <div>Choice: {result.choice}</div>}
      <div>Wager: {wager}</div>
      <div>Previous balance: {prev}</div>
      <div>Updated balance: {next}</div>
    </Card>
  );
}

