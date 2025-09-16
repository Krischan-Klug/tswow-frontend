import Button from "@/components/ui/Button";

export default function TwoPickGrid({ canSubmit, pickedSide, correctSide, onPick }) {
  const options = [
    { key: "heads", side: "left", label: "Bild 1 (links)" },
    { key: "tails", side: "right", label: "Bild 2 (rechts)" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}
    >
      {options.map((opt) => {
        const isPicked = pickedSide === opt.side;
        const isCorrect = correctSide === opt.side;
        const borderColor = isCorrect ? "#22c55e" : isPicked ? "#3b82f6" : "#ccc";
        const bg = isCorrect ? "#e6ffed" : isPicked ? "#eef2ff" : "#f7f7f7";
        return (
          <Button
            as="button"
            key={opt.key}
            type="button"
            onClick={() => onPick?.(opt.key)}
            disabled={!canSubmit}
            style={{
              height: 200,
              border: `2px solid ${borderColor}`,
              borderRadius: 12,
              background: bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              position: "relative",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
            aria-label={opt.label}
            title={opt.label}
          >
            <span>{opt.label}</span>
            {typeof correctSide !== "undefined" && (
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  padding: "2px 6px",
                  borderRadius: 6,
                  background: isCorrect ? "#22c55e" : isPicked ? "#3b82f6" : "#aaa",
                  color: "white",
                  fontSize: 12,
                }}
              >
                {isCorrect ? "Richtig" : isPicked ? "Deine Wahl" : ""}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}

