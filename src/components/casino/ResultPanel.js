import Alert from "@/components/ui/Alert";
import styled from "styled-components";
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
    <Alert $variant={result.win ? "success" : "warning"}>
      <Title>{result.win ? "You won!" : "You lost."}</Title>
      <div>Outcome: {result.outcome}</div>
      {result.choice && <div>Choice: {result.choice}</div>}
      <div>Wager: {wager}</div>
      <div>Previous balance: {prev}</div>
      <div>Updated balance: {next}</div>
    </Alert>
  );
}

const Title = styled.div`
  font-weight: 600;
  margin-bottom: var(--space-2);
`;
