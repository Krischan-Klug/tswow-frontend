import Alert from "@/components/ui/Alert";
import styled from "styled-components";
import { formatPretty, toPretty } from "@/lib/currency";

export default function ResultPanel({ result, playerChoice }) {
  if (!result) return null;

  // Expect the inner result object here (pages pass data.result already)
  const res = result;

  const wagerCopper = Number(res.wagerCopper ?? res.wager ?? 0);
  const prevRaw = Number(res.previousBalance ?? 0);
  const nextRaw = Number(res.updatedBalance ?? prevRaw);
  const outcome = res.outcome ?? "";
  const choice = res.choice ?? playerChoice ?? "";
  const win = typeof res.win === "boolean" ? res.win : undefined;

  const wager = formatPretty(toPretty(wagerCopper));
  const prev = res.previousBalancePretty
    ? formatPretty(res.previousBalancePretty)
    : formatPretty(toPretty(prevRaw));
  const next = res.updatedBalancePretty
    ? formatPretty(res.updatedBalancePretty)
    : formatPretty(toPretty(nextRaw));
  const delta =
    typeof res.balanceChange === "number"
      ? res.balanceChange
      : Number.isFinite(prevRaw) && Number.isFinite(nextRaw)
      ? nextRaw - prevRaw
      : undefined;

  return (
    <Alert $variant={win === false ? "warning" : win === true ? "success" : undefined}>
      <Title>{win === true ? "You won!" : win === false ? "You lost." : "Result"}</Title>
      <div>Outcome: {String(outcome || "—")}</div>
      {(choice || playerChoice) && <div>Choice: {String(choice || playerChoice)}</div>}
      <div>Wager: {wager}</div>
      {Number.isFinite(delta) && (
        <div>
          Change: {delta > 0 ? "+" : ""}
          {formatPretty(toPretty(Math.abs(delta)))}
        </div>
      )}
      <div>Previous balance: {prev}</div>
      <div>Updated balance: {next}</div>
    </Alert>
  );
}

const Title = styled.div`
  font-weight: 600;
  margin-bottom: var(--space-2);
`;
