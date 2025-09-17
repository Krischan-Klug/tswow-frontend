import { formatPretty, toPretty } from "@/lib/currency";
import { Select } from "@/components/ui/Input";

export default function CharacterSelect({ characters = [], value = 0, onChange, ...props }) {
  return (
    <div>
      <Select value={value} onChange={(e) => onChange?.(Number(e.target.value))} {...props}>
        {characters.map((c, idx) => (
          <option key={c._key || `${c.realmId ?? 'r'}:${c.guid ?? 'g'}:${idx}`} value={idx}>
            {(c.realmName || c.realm?.name || "Realm")} - {(c.name || `#${idx}`)} ({formatPretty(toPretty(Number(c.balanceCopper || 0)))})
          </option>
        ))}
      </Select>
    </div>
  );
}

