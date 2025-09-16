import { useMemo } from "react";
import { Label, Input } from "@/components/ui/Input";
import Row from "@/components/ui/Row";
import { toCopper, toPretty, formatPretty } from "@/lib/currency";

export default function WagerFields({ gold, silver, copper, onChange }) {
  const wagerCopper = useMemo(
    () => toCopper({ gold, silver, copper }),
    [gold, silver, copper]
  );

  return (
    <>
      <Row>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Label htmlFor="gold">Gold</Label>
          <Input
            id="gold"
            type="number"
            min={0}
            value={gold}
            onChange={(e) => onChange?.({ gold: e.target.value, silver, copper })}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Label htmlFor="silver">Silver</Label>
          <Input
            id="silver"
            type="number"
            min={0}
            max={99}
            value={silver}
            onChange={(e) => onChange?.({ gold, silver: e.target.value, copper })}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Label htmlFor="copper">Copper</Label>
          <Input
            id="copper"
            type="number"
            min={0}
            max={99}
            value={copper}
            onChange={(e) => onChange?.({ gold, silver, copper: e.target.value })}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", marginLeft: 8 }}>
          <div style={{ color: "var(--muted)" }}>
            = {wagerCopper} copper ({formatPretty(toPretty(wagerCopper))})
          </div>
        </div>
      </Row>
    </>
  );
}

