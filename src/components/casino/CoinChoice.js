import Row from "@/components/ui/Row";

export default function CoinChoice({ value = "heads", onChange }) {
  return (
    <Row style={{ gap: 16, alignItems: "center" }}>
      <label>
        <input
          type="radio"
          name="choice"
          value="heads"
          checked={value === "heads"}
          onChange={() => onChange?.("heads")}
        />
        Heads
      </label>
      <label>
        <input
          type="radio"
          name="choice"
          value="tails"
          checked={value === "tails"}
          onChange={() => onChange?.("tails")}
        />
        Tails
      </label>
    </Row>
  );
}

