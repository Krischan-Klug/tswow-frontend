import { useMemo } from "react";
import { Label, Input } from "@/components/ui/Input";
import Row from "@/components/ui/Row";
import Column from "@/components/ui/Column";
import { Muted } from "@/components/ui/Text";
import { toCopper, toPretty, formatPretty } from "@/lib/currency";

export default function WagerFields({ gold, silver, copper, onChange }) {
  const wagerCopper = useMemo(
    () => toCopper({ gold, silver, copper }),
    [gold, silver, copper]
  );

  return (
    <Row $align="flex-end">
      <Column $gap="var(--space-1)">
        <Label htmlFor="gold">Gold</Label>
        <Input
          id="gold"
          type="number"
          min={0}
          value={gold}
          onChange={(e) => onChange?.({ gold: e.target.value, silver, copper })}
        />
      </Column>
      <Column $gap="var(--space-1)">
        <Label htmlFor="silver">Silver</Label>
        <Input
          id="silver"
          type="number"
          min={0}
          max={99}
          value={silver}
          onChange={(e) => onChange?.({ gold, silver: e.target.value, copper })}
        />
      </Column>
      <Column $gap="var(--space-1)">
        <Label htmlFor="copper">Copper</Label>
        <Input
          id="copper"
          type="number"
          min={0}
          max={99}
          value={copper}
          onChange={(e) => onChange?.({ gold, silver, copper: e.target.value })}
        />
      </Column>
      <Muted>
        = {wagerCopper} copper ({formatPretty(toPretty(wagerCopper))})
      </Muted>
    </Row>
  );
}
