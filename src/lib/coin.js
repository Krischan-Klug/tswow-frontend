export function normalizeSide(value) {
  if (value == null) return undefined;
  const s = String(value).trim().toLowerCase();
  if (s === "heads" || s === "head" || s === "h" || s === "0" || s === "kopf") return "heads";
  if (s === "tails" || s === "tail" || s === "t" || s === "1" || s === "zahl") return "tails";
  if (s === "left") return "heads";
  if (s === "right") return "tails";
  return undefined;
}

export function parseBool(val) {
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val === 1;
  if (typeof val === "string") return val.trim().toLowerCase() === "true" || val.trim() === "1";
  return undefined;
}

export function sideLabel(side) {
  if (side === "heads") return "Heads (Left)";
  if (side === "tails") return "Tails (Right)";
  return "—";
}
