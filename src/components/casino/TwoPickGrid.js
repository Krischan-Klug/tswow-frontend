import styled from "styled-components";
import Button from "@/components/ui/Button";
import Grid from "@/components/ui/Grid";

export default function TwoPickGrid({ canSubmit, pickedSide, correctSide, onPick }) {
  const options = [
    { key: "heads", side: "left", label: "Bild 1 (links)" },
    { key: "tails", side: "right", label: "Bild 2 (rechts)" },
  ];

  return (
    <Grid $cols={2} $gap="var(--space-4)">
      {options.map((opt) => {
        const isPicked = pickedSide === opt.side;
        const isCorrect = correctSide === opt.side;
        const state = isCorrect ? "correct" : isPicked ? "picked" : "default";
        return (
          <PickButton
            key={opt.key}
            type="button"
            onClick={() => onPick?.(opt.key)}
            disabled={!canSubmit}
            $state={state}
            $canSubmit={!!canSubmit}
            aria-label={opt.label}
            title={opt.label}
          >
            <span>{opt.label}</span>
            {typeof correctSide !== "undefined" && (
              <Badge $variant={isCorrect ? "correct" : isPicked ? "picked" : "default"}>
                {isCorrect ? "Richtig" : isPicked ? "Deine Wahl" : ""}
              </Badge>
            )}
          </PickButton>
        );
      })}
    </Grid>
  );
}

const PickButton = styled(Button)`
  height: 200px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ $state }) =>
    $state === "correct" ? "#22c55e" : $state === "picked" ? "#3b82f6" : "#ccc"};
  border-radius: 12px;
  background: ${({ $state }) =>
    $state === "correct" ? "#e6ffed" : $state === "picked" ? "#eef2ff" : "#f7f7f7"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: relative;
  cursor: ${({ $canSubmit }) => ($canSubmit ? "pointer" : "not-allowed")};
`;

const Badge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 6px;
  border-radius: 6px;
  color: white;
  font-size: 12px;
  background: ${({ $variant }) =>
    $variant === "correct" ? "#22c55e" : $variant === "picked" ? "#3b82f6" : "#aaa"};
`;
