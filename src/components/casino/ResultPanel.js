import Alert from "@/components/ui/Alert";
import styled from "styled-components";
import { formatPretty, toPretty } from "@/lib/currency";
import { normalizeSide, sideLabel } from "@/lib/coin";

export default function ResultPanel({ result, playerChoice }) {
  if (!result) return null;

  // Accept either shape: { result: {...} } or direct {...}
  const res = result.result ? result.result : result;

  const wagerCopper = Number(res.wagerCopper ?? res.wager ?? 0);
  const prevRaw = Number(res.previousBalance ?? 0);
  const nextRaw = Number(res.updatedBalance ?? prevRaw);
  const outcome = normalizeSide(res.outcome);
  const choice = normalizeSide(res.choice ?? playerChoice);
  const win = typeof res.win === "boolean" ? res.win : outcome && choice ? outcome === choice : Number.isFinite(prevRaw) && Number.isFinite(nextRaw) ? nextRaw > prevRaw : undefined;

  const wager = formatPretty(toPretty(wagerCopper));
  const prev = res.previousBalancePretty
    ? formatPretty(res.previousBalancePretty)
    : formatPretty(toPretty(prevRaw));
  const next = res.updatedBalancePretty
    ? formatPretty(res.updatedBalancePretty)
    : formatPretty(toPretty(nextRaw));
  const delta = res.balanceChange != null ? Number(res.balanceChange) : Number.isFinite(prevRaw) && Number.isFinite(nextRaw) ? nextRaw - prevRaw : undefined;
  const outcomeText = sideLabel(outcome);

  return (
    <Alert $variant={win === false ? "warning" : win === true ? "success" : undefined}>
      <Title>{win === true ? "You won!" : win === false ? "You lost." : "Result"}</Title>
      <div>Outcome: {outcomeText}</div>
      <div>Choice: {sideLabel(choice)}</div>
      <div>Wager: {wager}</div>
      {Number.isFinite(delta) && (<div>Change: {delta > 0 ? "+" : ""}{formatPretty(toPretty(Math.abs(delta)))}</div>)}
      <div>Previous balance: {prev}</div>
      <div>Updated balance: {next}</div>
    </Alert>
  );
}

const Title = styled.div`
  font-weight: 600;
  margin-bottom: var(--space-2);
`;
